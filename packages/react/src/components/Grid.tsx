import React from 'react';
import { ComponentNode, RenderContext } from '../types';

interface GridProps {
  children: ComponentNode[];
  columns?: number;
  spacing?: number;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Grid: React.FC<GridProps> = ({
  children,
  columns = 3,
  spacing = 16,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  const styles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: `${spacing}px`,
  };

  return (
    <div className="pineui-grid" style={styles}>
      {children.map((child, index) => (
        <Renderer key={index} node={child} context={context} />
      ))}
    </div>
  );
};
