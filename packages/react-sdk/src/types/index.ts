/**
 * Core PineUI Types
 */

export interface PineUISchema {
  schemaVersion: string;
  screen: ComponentSchema;
  patterns?: Record<string, PatternDefinition>;
  overlays?: Record<string, OverlaySchema>;
  intents?: Record<string, IntentDefinition>;
  telemetry?: TelemetryConfig;
}

export interface ComponentSchema {
  id?: string;
  type: string;
  [key: string]: any;
}

export interface PatternDefinition {
  type: string;
  definition: ComponentSchema;
}

export interface OverlaySchema {
  type: string;
  presentation?: 'modal' | 'bottomSheet' | 'drawer';
  dismissible?: boolean;
  child: ComponentSchema;
}

export interface IntentDefinition {
  handler: ActionSchema;
}

export interface ActionSchema {
  type: string;
  [key: string]: any;
}

export interface TelemetryConfig {
  screenView?: {
    event: string;
    properties?: Record<string, any>;
  };
}

export interface PineUIConfig {
  baseUrl?: string;
  actionHandler?: ActionHandler;
  intentHandler?: IntentHandler;
  customComponents?: Record<string, React.ComponentType<any>>;
  telemetry?: {
    onEvent?: (event: string, properties?: Record<string, any>) => void;
  };
  theme?: PineUITheme;
}

export interface PineUITheme {
  colors?: {
    primary?: string;
    secondary?: string;
    error?: string;
    success?: string;
    background?: string;
    surface?: string;
    surfaceVariant?: string;
    onPrimary?: string;
    onSecondary?: string;
    onError?: string;
    onSuccess?: string;
    onBackground?: string;
    onSurface?: string;
    onSurfaceVariant?: string;
  };
  typography?: {
    fontFamily?: string;
  };
  spacing?: number;
  borderRadius?: number;
}

export type ActionHandler = (
  action: ActionSchema,
  context: ActionContext
) => Promise<any> | any;

export type IntentHandler = (
  intent: string,
  params: Record<string, any>,
  context: ActionContext
) => Promise<any> | any;

export interface ActionContext {
  schema: PineUISchema;
  state: Record<string, any>;
  setState: (path: string, value: any) => void;
  openOverlay: (overlayId: string) => void;
  closeOverlay: (overlayId: string) => void;
  navigate: (destination: string, params?: Record<string, any>) => void;
  showSnackbar: (message: string, options?: any) => void;
}
