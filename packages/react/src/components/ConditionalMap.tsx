import React from 'react';
import { ComponentNode, RenderContext } from '../types';
import { resolveBindings } from '../renderer/bindings';

interface ConditionalMapProps {
  condition: string | boolean;
  children?: ComponentNode[];
  child?: ComponentNode;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

/**
 * conditional.render — simple condition + children API
 * Shows children when `condition` is truthy.
 */
export const ConditionalMap: React.FC<ConditionalMapProps> = ({
  condition,
  children,
  child,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  const resolved = resolveBindings({ condition }, context);
  const isVisible = resolved.condition === true || resolved.condition === 'true' || resolved.condition === 1;

  if (!isVisible) return null;

  if (child) return <Renderer node={child} context={context} />;

  if (children) {
    return <>{children.map((c, i) => <Renderer key={i} node={c} context={context} />)}</>;
  }

  return null;
};
