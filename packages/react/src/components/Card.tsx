import React from 'react';
import { ComponentNode, RenderContext, ActionNode } from '../types';
import { resolveBindings } from '../renderer/bindings';
import clsx from 'clsx';

interface CardProps {
  child: ComponentNode;
  elevation?: number;
  padding?: number;
  onTap?: ActionNode;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Card: React.FC<CardProps> = ({
  child,
  elevation = 1,
  padding = 16,
  onTap,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  const handleClick = async () => {
    if (onTap && context) {
      const resolvedAction = resolveBindings(onTap, context);
      await context.executeAction(resolvedAction);
    }
  };

  const className = clsx('pineui-card', `pineui-card--elevation-${elevation}`, {
    'pineui-card--clickable': !!onTap,
  });

  const styles: React.CSSProperties = {
    padding: `${padding}px`,
  };

  return (
    <div className={className} style={styles} onClick={onTap ? handleClick : undefined}>
      <Renderer node={child} context={context} />
    </div>
  );
};
