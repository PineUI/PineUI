/**
 * PineUI - Server-Driven UI for AI-Native Applications
 *
 * Copyright (c) 2026 Luma Ventures Ltda
 * CNPJ: 21.951.820/0001-39
 *
 * Licensed under the Apache License 2.0 with Commons Clause
 * See LICENSE file for details
 */

import React, { useEffect, useState } from 'react';
import { PineUISchema, RenderContext, ActionNode } from './types';
import { Renderer } from './renderer/Renderer';
import { SnackbarContainer, SnackbarMessage } from './components/Snackbar';
import { ModalContainer } from './components/Modal';

interface PineUIProps {
  schema?: PineUISchema;
  schemaUrl?: string;
  baseUrl?: string;
}

export const PineUI: React.FC<PineUIProps> = ({ schema: initialSchema, schemaUrl, baseUrl = '' }) => {
  const [schema, setSchema] = useState<PineUISchema | null>(initialSchema || null);
  const [loading, setLoading] = useState(!initialSchema);
  const [error, setError] = useState<Error | null>(null);
  const [snackbars, setSnackbars] = useState<SnackbarMessage[]>([]);
  const [overlays, setOverlays] = useState<Record<string, { visible: boolean; config: any }>>({});
  const [state, setState] = useState<Record<string, any>>({
    currentUser: {
      id: 'user_current',
      username: 'currentuser',
      displayName: 'Current User',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    composer: {
      text: '',
      media: null,
      posting: false,
    },
    testInput: '',
  });

  useEffect(() => {
    if (schemaUrl && !initialSchema) {
      loadSchema();
    }
  }, [schemaUrl, initialSchema]);

  const loadSchema = async () => {
    try {
      setLoading(true);
      const response = await fetch(schemaUrl!);
      const data = await response.json();
      setSchema(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const executeAction = async (action: ActionNode, _params?: any): Promise<void> => {
    console.log('Executing action:', action);

    switch (action.type) {
      case 'action.http': {
        try {
          const url = action.url.startsWith('http') ? action.url : `${baseUrl}${action.url}`;
          const response = await fetch(url, {
            method: action.method || 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: action.body ? JSON.stringify(action.body) : undefined,
          });
          const data = await response.json();
          console.log('HTTP action result:', data);
        } catch (err) {
          console.error('HTTP action error:', err);
        }
        break;
      }

      case 'action.state.patch': {
        setState((prev) => {
          const newState = { ...prev };
          setNestedValue(newState, action.path, action.value);
          return newState;
        });
        break;
      }

      case 'action.overlay.open': {
        const overlayConfig = schema?.overlays?.[action.overlayId];
        if (overlayConfig) {
          setOverlays((prev) => ({
            ...prev,
            [action.overlayId]: { visible: true, config: overlayConfig },
          }));
        } else {
          console.warn('Overlay not found:', action.overlayId);
        }
        break;
      }

      case 'action.overlay.close': {
        setOverlays((prev) => ({
          ...prev,
          [action.overlayId]: { ...prev[action.overlayId], visible: false },
        }));
        break;
      }

      case 'action.collection.refresh': {
        console.log('Refresh collection:', action.collectionId);
        // TODO: Trigger collection refresh
        break;
      }

      case 'action.snackbar.show': {
        const snackbar: SnackbarMessage = {
          id: `snackbar-${Date.now()}`,
          message: action.message,
          duration: action.duration || 3000,
          action: action.action ? {
            label: action.action.label,
            onPress: () => executeAction(action.action.onPress),
          } : undefined,
        };
        setSnackbars((prev) => [...prev, snackbar]);
        break;
      }

      default:
        console.warn('Unknown action type:', action.type);
    }
  };

  const executeIntent = async (intentName: string, params?: any): Promise<void> => {
    console.log('Executing intent:', intentName, params);

    if (!schema?.intents) return;

    const intent = schema.intents[intentName];
    if (!intent) {
      console.warn('Intent not found:', intentName);
      return;
    }

    // Support array of actions
    if (Array.isArray(intent.handler)) {
      for (const action of intent.handler) {
        await executeAction(action, params);
      }
    } else {
      await executeAction(intent.handler, params);
    }
  };

  const context: RenderContext = {
    state,
    data: {},
    patterns: schema?.patterns || {},
    intents: schema?.intents || {},
    executeAction,
    executeIntent,
  };

  if (loading) {
    return (
      <div className="pineui-loading">
        <p>Loading PineUI...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pineui-error">
        <p>Error loading schema: {error.message}</p>
      </div>
    );
  }

  if (!schema) {
    return (
      <div className="pineui-error">
        <p>No schema provided</p>
      </div>
    );
  }

  const dismissSnackbar = (id: string) => {
    setSnackbars((prev) => prev.filter((s) => s.id !== id));
  };

  const closeOverlay = (id: string) => {
    setOverlays((prev) => ({
      ...prev,
      [id]: { ...prev[id], visible: false },
    }));
  };

  return (
    <div className="pineui-root">
      <Renderer node={schema.screen} context={context} />
      <SnackbarContainer messages={snackbars} onDismiss={dismissSnackbar} />
      <ModalContainer overlays={overlays} onClose={closeOverlay} context={context} renderer={Renderer} />
    </div>
  );
};

function setNestedValue(obj: any, path: string, value: any): void {
  const parts = path.split('.');
  let current = obj;

  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]]) {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }

  current[parts[parts.length - 1]] = value;
}
