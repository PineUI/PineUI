import React from 'react';
import { RenderContext } from '../types';

export interface ViewProps {
  name: string;
  context: RenderContext;
  renderer: React.ComponentType<any>;
  flex?: number;
  width?: number | string;
  height?: number | string;
}

export const View: React.FC<ViewProps> = ({ name, context, renderer: Renderer, flex, width, height }) => {
  const view = context?.views?.[name];

  if (!view) {
    console.warn(`View not found: ${name}`);
    return null;
  }

  // Apply flex/size styles
  const style: React.CSSProperties = {};
  if (flex) style.flex = flex;
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div className="pineui-view" style={style}>
      <Renderer node={view.screen} context={context} />
    </div>
  );
};
