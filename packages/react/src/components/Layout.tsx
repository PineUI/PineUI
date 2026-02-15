import React from 'react';
import { ComponentNode, RenderContext } from '../types';
import clsx from 'clsx';

interface LayoutProps {
  type: 'layout.column' | 'layout.row';
  children?: ComponentNode[];
  spacing?: number;
  padding?: number;
  mainAxisAlignment?: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround';
  crossAxisAlignment?: 'start' | 'center' | 'end' | 'stretch';
  flex?: number;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Layout: React.FC<LayoutProps> = ({
  type,
  children = [],
  spacing = 0,
  padding = 0,
  mainAxisAlignment = 'start',
  crossAxisAlignment = 'start',
  flex,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  const isColumn = type === 'layout.column';
  const className = clsx('pineui-layout', {
    'pineui-layout--column': isColumn,
    'pineui-layout--row': !isColumn,
  });

  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: isColumn ? 'column' : 'row',
    gap: `${spacing}px`,
    padding: `${padding}px`,
    justifyContent: mapAlignment(mainAxisAlignment),
    alignItems: mapCrossAlignment(crossAxisAlignment),
    flex: flex,
  };

  return (
    <div className={className} style={styles}>
      {children.map((child, index) => (
        <Renderer key={index} node={child} context={context} />
      ))}
    </div>
  );
};

function mapAlignment(alignment: string): string {
  const map: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    spaceBetween: 'space-between',
    spaceAround: 'space-around',
  };
  return map[alignment] || 'flex-start';
}

function mapCrossAlignment(alignment: string): string {
  const map: Record<string, string> = {
    start: 'flex-start',
    center: 'center',
    end: 'flex-end',
    stretch: 'stretch',
  };
  return map[alignment] || 'flex-start';
}
