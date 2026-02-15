import React from 'react';
import { ComponentNode, RenderContext } from '../types';
import { resolveBindings } from '../renderer/bindings';

interface Condition {
  when: string | boolean;
  render: ComponentNode;
}

interface ConditionalRenderProps {
  conditions: Condition[];
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const ConditionalRender: React.FC<ConditionalRenderProps> = ({
  conditions,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  // Find first matching condition
  for (const condition of conditions) {
    const resolved = resolveBindings({ when: condition.when }, context);
    if (resolved.when === true || resolved.when === 'true') {
      return <Renderer node={condition.render} context={context} />;
    }
  }

  return null;
};
