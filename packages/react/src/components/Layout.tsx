import React from 'react';
import { ComponentNode, RenderContext, ActionNode } from '../types';
import { resolveBindings } from '../renderer/bindings';
import clsx from 'clsx';

interface LayoutProps {
  type: 'layout.column' | 'layout.row';
  children?: ComponentNode[];
  spacing?: number;
  padding?: number;
  mainAxisAlignment?: 'start' | 'center' | 'end' | 'spaceBetween' | 'spaceAround';
  crossAxisAlignment?: 'start' | 'center' | 'end' | 'stretch';
  flex?: number;
  width?: number | string;
  height?: number | string;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  onPress?: ActionNode;
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
  width,
  height,
  overflow,
  onPress,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  const handleClick = async () => {
    if (onPress && context) {
      // Resolve bindings in the action before executing
      const resolvedAction = resolveBindings(onPress, context);
      await context.executeAction(resolvedAction);
    }
  };

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
    width: width !== undefined
      ? (typeof width === 'number' ? `${width}px` : width)
      : undefined,
    height: height !== undefined
      ? (typeof height === 'number' ? `${height}px` : height)
      : undefined,
    overflow: overflow,
    minWidth: 0, // Permite que flex shrink funcione corretamente
    cursor: onPress ? 'pointer' : undefined,
  };

  return (
    <div className={className} style={styles} onClick={onPress ? handleClick : undefined}>
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
