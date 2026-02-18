import React from 'react';
import { RenderContext, ActionNode } from '../types';

interface ImageProps {
  src: string;
  thumbnail?: string;
  alt?: string;
  aspectRatio?: number | string;
  borderRadius?: number;
  loading?: 'eager' | 'lazy';
  onPress?: ActionNode;
  context?: RenderContext;
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  aspectRatio,
  borderRadius = 0,
  loading = 'lazy',
  onPress,
  context,
}) => {
  const handleClick = async () => {
    if (onPress && context) {
      await context.executeAction(onPress);
    }
  };

  const styles: React.CSSProperties = {
    width: '100%',
    aspectRatio: typeof aspectRatio === 'number' ? aspectRatio : aspectRatio,
    borderRadius: `${borderRadius}px`,
    objectFit: 'cover',
    cursor: onPress ? 'pointer' : undefined,
  };

  return (
    <img
      className="pineui-image"
      src={src}
      alt={alt}
      loading={loading}
      style={styles}
      onClick={onPress ? handleClick : undefined}
    />
  );
};
