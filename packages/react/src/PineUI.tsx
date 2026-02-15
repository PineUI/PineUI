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
import { loadImports } from './loader/imports';

// Helper function to get nested values from objects
function getNestedValue(obj: any, path: string): any {
  const parts = path.split('.');
  let value = obj;
  for (const part of parts) {
    if (value == null) return undefined;
    value = value[part];
  }
  return value;
}

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

  // Initialize state with schema state if provided, or use defaults
  const initialState = initialSchema?.state || {
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
  };

  const [state, setState] = useState<Record<string, any>>(initialState);

  useEffect(() => {
    if (schemaUrl && !initialSchema) {
      loadSchema();
    }
  }, [schemaUrl, initialSchema]);

  const loadSchema = async () => {
    try {
      setLoading(true);
      const response = await fetch(schemaUrl!);
      let data = await response.json();

      // Load imports if present
      if (data.imports && baseUrl) {
        data = await loadImports(data, baseUrl);
      }

      setSchema(data);
      // Update state with schema's initial state if provided
      if (data.state) {
        setState(prevState => ({ ...prevState, ...data.state }));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const executeAction = async (action: ActionNode, params?: any): Promise<void> => {
    console.log('Executing action:', action, 'with params:', params);

    // Resolve bindings in action using params
    let resolvedAction = action;
    if (params) {
      const actionStr = JSON.stringify(action);
      const resolvedStr = actionStr.replace(/\{\{([^}]+)\}\}/g, (_, key) => {
        const trimmed = key.trim();
        return params[trimmed] !== undefined ? String(params[trimmed]) : '';
      });
      resolvedAction = JSON.parse(resolvedStr);
    }

    // Handle intent (new syntax with "intent" field)
    if (resolvedAction.intent) {
      const intentName = resolvedAction.intent;
      const intentParams = { ...params, ...resolvedAction };
      delete intentParams.intent;
      return executeIntent(intentName, intentParams);
    }

    // Handle legacy intent.* type syntax (backwards compatibility)
    if (resolvedAction.type && resolvedAction.type.startsWith('intent.')) {
      const intentName = resolvedAction.type.substring(7);
      const intentParams = { ...params, ...resolvedAction };
      delete intentParams.type;
      return executeIntent(intentName, intentParams);
    }

    switch (resolvedAction.type) {
      case 'action.http': {
        try {
          const url = resolvedAction.url.startsWith('http') ? resolvedAction.url : `${baseUrl}${resolvedAction.url}`;
          const response = await fetch(url, {
            method: resolvedAction.method || 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
            body: resolvedAction.body ? JSON.stringify(resolvedAction.body) : undefined,
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
          setNestedValue(newState, resolvedAction.path, resolvedAction.value);
          return newState;
        });
        break;
      }

      case 'action.overlay.open': {
        const overlayConfig = schema?.overlays?.[resolvedAction.overlayId];
        if (overlayConfig) {
          setOverlays((prev) => ({
            ...prev,
            [resolvedAction.overlayId]: { visible: true, config: overlayConfig },
          }));
        } else {
          console.warn('Overlay not found:', resolvedAction.overlayId);
        }
        break;
      }

      case 'action.overlay.close': {
        setOverlays((prev) => ({
          ...prev,
          [resolvedAction.overlayId]: { ...prev[resolvedAction.overlayId], visible: false },
        }));
        break;
      }

      case 'action.collection.refresh': {
        console.log('Refresh collection:', resolvedAction.collectionId);
        // TODO: Trigger collection refresh
        break;
      }

      case 'action.snackbar.show': {
        // Resolve bindings in the message (e.g., {{state.testInput}})
        const resolvedMessage = typeof resolvedAction.message === 'string' && resolvedAction.message.includes('{{')
          ? resolvedAction.message.replace(/\{\{(.+?)\}\}/g, (_, expr) => {
              const trimmed = expr.trim();
              if (trimmed.startsWith('state.')) {
                const path = trimmed.substring(6); // Remove "state."
                const value = getNestedValue(state, path);
                return value != null ? String(value) : '';
              }
              return '';
            })
          : resolvedAction.message;

        const snackbar: SnackbarMessage = {
          id: `snackbar-${Date.now()}`,
          message: resolvedMessage,
          duration: resolvedAction.duration || 3000,
          action: resolvedAction.action ? {
            label: resolvedAction.action.label,
            onPress: () => executeAction(resolvedAction.action.onPress),
          } : undefined,
        };
        setSnackbars((prev) => [...prev, snackbar]);
        break;
      }

      case 'action.delay': {
        const duration = resolvedAction.duration || 1000;
        await new Promise(resolve => setTimeout(resolve, duration));
        break;
      }

      default:
        console.warn('Unknown action type:', resolvedAction.type);
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
    components: schema?.components || {},
    views: schema?.views || {},
    intents: schema?.intents || {},
    schema: schema!,
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
