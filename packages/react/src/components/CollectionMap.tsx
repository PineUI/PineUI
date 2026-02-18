import React from 'react';
import { ComponentNode, RenderContext } from '../types';
import { resolveBindings } from '../renderer/bindings';

interface CollectionMapProps {
  data: any[] | string;
  template?: ComponentNode;
  itemTemplate?: ComponentNode;
  layout?: 'list' | 'grid';
  columns?: number;
  spacing?: number;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const CollectionMap: React.FC<CollectionMapProps> = ({
  data,
  template,
  itemTemplate,
  layout = 'list',
  columns = 3,
  spacing = 16,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  const nodeTemplate = template || itemTemplate;
  if (!nodeTemplate) return null;

  // Renderer skips binding resolution for collection.map so that item.* expressions
  // in the template aren't evaluated prematurely. Resolve only the `data` field here.
  const resolvedData = typeof data === 'string'
    ? resolveBindings(data, context)
    : data;
  const items: any[] = Array.isArray(resolvedData) ? resolvedData : [];

  if (items.length === 0) return null;

  const containerStyle: React.CSSProperties = layout === 'grid'
    ? { display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: `${spacing}px` }
    : { display: 'flex', flexDirection: 'column', gap: `${spacing}px` };

  return (
    <div style={containerStyle}>
      {items.map((item, index) => {
        const itemContext = { ...context, item, index };
        return (
          <Renderer
            key={item.id ?? index}
            node={nodeTemplate}
            context={itemContext}
          />
        );
      })}
    </div>
  );
};
