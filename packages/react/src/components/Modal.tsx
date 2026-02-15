import React, { useEffect } from 'react';
import { ComponentNode, RenderContext } from '../types';

interface ModalProps {
  id: string;
  presentation?: 'modal' | 'bottomSheet' | 'dialog';
  dismissible?: boolean;
  child: ComponentNode;
  onClose: () => void;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Modal: React.FC<ModalProps> = ({
  presentation = 'modal',
  dismissible = true,
  child,
  onClose,
  context,
  renderer: Renderer,
}) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!Renderer || !context) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (dismissible && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEscape = (e: KeyboardEvent) => {
    if (dismissible && e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [dismissible]);

  const backdropClass = presentation === 'bottomSheet'
    ? 'pineui-modal-backdrop pineui-modal-backdrop--bottomSheet'
    : 'pineui-modal-backdrop';

  return (
    <div className={backdropClass} onClick={handleBackdropClick}>
      <div className={`pineui-modal pineui-modal--${presentation}`}>
        <Renderer node={child} context={context} />
      </div>
    </div>
  );
};

interface ModalContainerProps {
  overlays: Record<string, { visible: boolean; config: any }>;
  onClose: (id: string) => void;
  context: RenderContext;
  renderer: React.ComponentType<any>;
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
  overlays,
  onClose,
  context,
  renderer,
}) => {
  return (
    <>
      {Object.entries(overlays).map(([id, { visible, config }]) =>
        visible ? (
          <Modal
            key={id}
            id={id}
            {...config}
            onClose={() => onClose(id)}
            context={context}
            renderer={renderer}
          />
        ) : null
      )}
    </>
  );
};
