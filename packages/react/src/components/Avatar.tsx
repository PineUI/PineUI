import React from 'react';
import { RenderContext, ActionNode } from '../types';

interface AvatarProps {
  src: string;
  size?: number;
  onTap?: ActionNode;
  context?: RenderContext;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 40,
  onTap,
  context,
}) => {
  const handleClick = async () => {
    if (onTap && context) {
      await context.executeAction(onTap);
    }
  };

  const styles: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: onTap ? 'pointer' : undefined,
  };

  return (
    <img
      className="pineui-avatar"
      src={src}
      alt="Avatar"
      style={styles}
      onClick={onTap ? handleClick : undefined}
    />
  );
};
