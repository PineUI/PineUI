import React from 'react';
import { RenderContext } from '../types';
import clsx from 'clsx';

interface TextProps {
  content: string;
  style?: 'titleLarge' | 'titleMedium' | 'titleSmall' | 'bodyLarge' | 'bodyMedium' | 'bodySmall' | 'labelLarge' | 'labelMedium' | 'labelSmall' | 'headlineSmall';
  color?: string;
  fontWeight?: 'normal' | 'bold';
  maxLines?: number | null;
  linkify?: boolean;
  context?: RenderContext;
}

export const Text: React.FC<TextProps> = ({
  content,
  style = 'bodyMedium',
  color,
  fontWeight,
  maxLines,
}) => {
  const className = clsx('pineui-text', `pineui-text--${style}`, {
    'pineui-text--bold': fontWeight === 'bold',
  });

  const styles: React.CSSProperties = {
    color: color ? `var(--md-sys-color-${color}, ${color})` : undefined,
    WebkitLineClamp: maxLines ?? undefined,
    display: maxLines ? '-webkit-box' : undefined,
    WebkitBoxOrient: maxLines ? 'vertical' : undefined,
    overflow: maxLines ? 'hidden' : undefined,
  };

  return (
    <p className={className} style={styles}>
      {content || '(empty)'}
    </p>
  );
};
