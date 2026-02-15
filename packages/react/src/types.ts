// PineUI Schema Types

export interface PineUISchema {
  schemaVersion: string;
  screen: ComponentNode;
  patterns?: Record<string, PatternDefinition>;
  overlays?: Record<string, OverlayDefinition>;
  intents?: Record<string, IntentDefinition>;
  telemetry?: TelemetryConfig;
}

export interface ComponentNode {
  type: string;
  id?: string;
  [key: string]: any;
}

export interface PatternDefinition {
  type: string;
  definition: ComponentNode;
}

export interface OverlayDefinition {
  type: string;
  presentation?: 'modal' | 'bottomSheet' | 'dialog';
  dismissible?: boolean;
  child: ComponentNode;
}

export interface IntentDefinition {
  handler: ActionNode;
}

export interface ActionNode {
  type: string;
  [key: string]: any;
}

export interface TelemetryConfig {
  screenView?: {
    event: string;
    properties: Record<string, any>;
  };
}

export interface RenderContext {
  state: Record<string, any>;
  data: Record<string, any>;
  patterns: Record<string, PatternDefinition>;
  intents: Record<string, IntentDefinition>;
  executeAction: (action: ActionNode, context?: any) => Promise<void>;
  executeIntent: (intentName: string, params?: any) => Promise<void>;
}

export interface PineUIConfig {
  target: string | HTMLElement;
  schema?: PineUISchema;
  schemaUrl?: string;
  baseUrl?: string;
  onReady?: () => void;
  onError?: (error: Error) => void;
}
