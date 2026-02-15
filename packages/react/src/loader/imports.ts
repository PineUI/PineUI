import { PineUISchema, ComponentDefinition, ViewDefinition } from '../types';

function resolveRelativePath(baseUrl: string, relativePath: string): string {
  if (relativePath.startsWith('http://') || relativePath.startsWith('https://')) {
    return relativePath;
  }

  // Remove leading ./
  const cleanPath = relativePath.replace(/^\.\//, '');

  // Combine base URL with path
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  return `${base}/${cleanPath}`;
}

export async function loadImports(schema: PineUISchema, baseUrl: string): Promise<PineUISchema> {
  if (!schema.imports) return schema;

  const loaded: PineUISchema = { ...schema };

  // Load components
  if (schema.imports.components) {
    for (const componentPath of schema.imports.components) {
      try {
        const url = resolveRelativePath(baseUrl, componentPath);
        const response = await fetch(url);
        const componentData = await response.json() as Record<string, ComponentDefinition>;

        // Merge loaded components
        loaded.components = {
          ...loaded.components,
          ...componentData
        };
      } catch (error) {
        console.error(`Failed to load component from ${componentPath}:`, error);
      }
    }
  }

  // Load views
  if (schema.imports.views) {
    for (const viewPath of schema.imports.views) {
      try {
        const url = resolveRelativePath(baseUrl, viewPath);
        const response = await fetch(url);
        const viewData = await response.json() as Record<string, ViewDefinition>;

        // Merge loaded views
        loaded.views = {
          ...loaded.views,
          ...viewData
        };
      } catch (error) {
        console.error(`Failed to load view from ${viewPath}:`, error);
      }
    }
  }

  return loaded;
}
