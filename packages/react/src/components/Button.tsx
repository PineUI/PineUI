import React from 'react';
import { RenderContext, ActionNode } from '../types';
import clsx from 'clsx';

interface ButtonProps {
  type: 'button.filled' | 'button.text' | 'button.icon' | 'button.fab';
  label?: string;
  icon?: string;
  enabled?: boolean;
  loading?: boolean;
  onPress?: ActionNode;
  context?: RenderContext;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const Button: React.FC<ButtonProps> = ({
  type,
  label,
  icon,
  enabled = true,
  loading = false,
  onPress,
  context,
  size = 'medium',
  color,
}) => {
  const handleClick = async () => {
    if (!enabled || loading || !onPress || !context) return;
    await context.executeAction(onPress);
  };

  const className = clsx('pineui-button', `pineui-button--${type.split('.')[1]}`, {
    'pineui-button--disabled': !enabled,
    'pineui-button--loading': loading,
    [`pineui-button--${size}`]: size,
  });

  const styles: React.CSSProperties = {
    color: color ? `var(--md-sys-color-${color}, ${color})` : undefined,
  };

  return (
    <button
      className={className}
      onClick={handleClick}
      disabled={!enabled || loading}
      style={styles}
    >
      {loading ? (
        <span className="pineui-button__spinner">⏳</span>
      ) : icon ? (
        <span className="pineui-button__icon">{icon}</span>
      ) : null}
      {label && <span className="pineui-button__label">{label}</span>}
    </button>
  );
};
