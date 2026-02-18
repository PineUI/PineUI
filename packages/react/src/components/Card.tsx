import React from 'react';
import { ComponentNode, RenderContext, ActionNode } from '../types';
import { resolveBindings } from '../renderer/bindings';
import clsx from 'clsx';

interface CardProps {
  child?: ComponentNode;
  children?: ComponentNode[];
  elevation?: number;
  padding?: number;
  variant?: 'elevated' | 'filled' | 'outlined';
  onPress?: ActionNode;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Card: React.FC<CardProps> = ({
  child,
  children,
  elevation = 1,
  padding = 16,
  variant,
  onPress,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  const handleClick = async () => {
    if (onPress && context) {
      const resolvedAction = resolveBindings(onPress, context);
      await context.executeAction(resolvedAction);
    }
  };

  // Determine elevation from variant
  const resolvedElevation = variant === 'outlined' ? 0 : variant === 'filled' ? 0 : elevation;

  const className = clsx('pineui-card', `pineui-card--elevation-${resolvedElevation}`, {
    'pineui-card--clickable': !!onPress,
    'pineui-card--outlined': variant === 'outlined',
    'pineui-card--filled': variant === 'filled',
  });

  const styles: React.CSSProperties = {
    padding: `${padding}px`,
    ...(variant === 'outlined' ? { border: '1px solid var(--md-sys-color-outline)' } : {}),
    ...(variant === 'filled' ? { background: 'var(--md-sys-color-surfaceVariant)' } : {}),
  };

  // Support both `child` (single) and `children` (array)
  const content = child ? (
    <Renderer node={child} context={context} />
  ) : children ? (
    <>{children.map((c, i) => <Renderer key={i} node={c} context={context} />)}</>
  ) : null;

  return (
    <div className={className} style={styles} onClick={onPress ? handleClick : undefined}>
      {content}
    </div>
  );
};
