import React from 'react';
import { ComponentNode, RenderContext } from '../types';

interface ScaffoldProps {
  appBar?: ComponentNode;
  body: ComponentNode;
  floatingActionButton?: ComponentNode;
  bottomNavigationBar?: ComponentNode;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Scaffold: React.FC<ScaffoldProps> = ({
  appBar,
  body,
  floatingActionButton,
  bottomNavigationBar,
  context,
  renderer: Renderer,
}) => {
  if (!Renderer || !context) return null;

  return (
    <div className="pineui-scaffold">
      {appBar && (
        <header className="pineui-scaffold__appbar">
          <Renderer node={appBar} context={context} />
        </header>
      )}

      <main className="pineui-scaffold__body">
        <Renderer node={body} context={context} />
      </main>

      {floatingActionButton && (
        <div className="pineui-scaffold__fab">
          <Renderer node={floatingActionButton} context={context} />
        </div>
      )}

      {bottomNavigationBar && (
        <footer className="pineui-scaffold__bottomnav">
          <Renderer node={bottomNavigationBar} context={context} />
        </footer>
      )}
    </div>
  );
};
