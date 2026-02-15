import React from 'react';
import { ComponentNode, RenderContext } from '../types';

interface AppBarProps {
  title?: ComponentNode;
  leading?: ComponentNode;
  actions?: ComponentNode[];
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  leading,
  actions = [],
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  return (
    <div className="pineui-appbar">
      {leading && (
        <div className="pineui-appbar__leading">
          <Renderer node={leading} context={context} />
        </div>
      )}

      {title && (
        <div className="pineui-appbar__title">
          <Renderer node={title} context={context} />
        </div>
      )}

      {actions.length > 0 && (
        <div className="pineui-appbar__actions">
          {actions.map((action, index) => (
            <Renderer key={index} node={action} context={context} />
          ))}
        </div>
      )}
    </div>
  );
};
