import React from 'react';
import { RenderContext } from '../types';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  visible?: boolean;
  context?: RenderContext;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color,
  visible = true,
}) => {
  if (!visible) return null;

  const styles: React.CSSProperties = {
    fontSize: `${size}px`,
    color: color ? `var(--md-sys-color-${color}, ${color})` : undefined,
  };

  // Simple emoji mapping for now
  const iconMap: Record<string, string> = {
    verified: '✓',
    favorite: '❤️',
    favoriteBorder: '🤍',
    chatBubbleOutline: '💬',
    repeat: '🔁',
    bookmark: '🔖',
    bookmarkBorder: '🔖',
    iosShare: '↗️',
    moreVert: '⋮',
  };

  return (
    <span className="pineui-icon" style={styles}>
      {iconMap[name] || name}
    </span>
  );
};
