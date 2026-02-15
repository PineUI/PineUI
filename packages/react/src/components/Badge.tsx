import React from 'react';
import clsx from 'clsx';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'small' | 'medium' | 'large';
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'medium',
}) => {
  const className = clsx(
    'pineui-badge',
    `pineui-badge--${variant}`,
    `pineui-badge--${size}`
  );

  return (
    <span className={className}>
      {label}
    </span>
  );
};
