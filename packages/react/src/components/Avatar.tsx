import React from 'react';
import { RenderContext, ActionNode } from '../types';

interface AvatarProps {
  src: string;
  size?: number;
  onPress?: ActionNode;
  context?: RenderContext;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = 40,
  onPress,
  context,
}) => {
  const handleClick = async () => {
    if (onPress && context) {
      await context.executeAction(onPress);
    }
  };

  const styles: React.CSSProperties = {
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '50%',
    objectFit: 'cover',
    cursor: onPress ? 'pointer' : undefined,
  };

  return (
    <img
      className="pineui-avatar"
      src={src}
      alt="Avatar"
      style={styles}
      onClick={onPress ? handleClick : undefined}
    />
  );
};
