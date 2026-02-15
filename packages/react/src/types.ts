// PineUI Schema Types

export interface PineUISchema {
  schemaVersion: string;
  imports?: {
    components?: string[];
    views?: string[];
  };
  state?: Record<string, any>;
  screen: ComponentNode;
  components?: Record<string, ComponentDefinition>;
  views?: Record<string, ViewDefinition>;
  overlays?: Record<string, OverlayDefinition>;
  intents?: Record<string, IntentDefinition>;
  telemetry?: TelemetryConfig;
}

export interface ComponentNode {
  type: string;
  id?: string;
  [key: string]: any;
}

export interface ComponentDefinition {
  type: string;
  definition: ComponentNode;
}

export interface ViewDefinition {
  source?: string;
  screen: ComponentNode;
  state?: Record<string, any>;
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
  components: Record<string, ComponentDefinition>;
  views: Record<string, ViewDefinition>;
  intents: Record<string, IntentDefinition>;
  schema: PineUISchema;
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
