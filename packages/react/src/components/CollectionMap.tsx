import React from 'react';
import { ComponentNode, RenderContext } from '../types';

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

  // data should already be resolved by Renderer (since collection.map is not in the skip list)
  const items: any[] = Array.isArray(data) ? data : [];

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
