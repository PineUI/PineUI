import React from 'react';
import { ActionNode, RenderContext } from '../types';
import clsx from 'clsx';

interface ChipProps {
  label: string;
  icon?: string;
  selected?: boolean;
  onPress?: ActionNode;
  context?: RenderContext;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  selected = false,
  onPress,
  context,
}) => {
  const handleClick = async () => {
    if (onPress && context) {
      await context.executeAction(onPress);
    }
  };

  const className = clsx('pineui-chip', {
    'pineui-chip--selected': selected,
  });

  return (
    <button className={className} onClick={handleClick}>
      {icon && <span className="pineui-chip__icon">{icon}</span>}
      <span className="pineui-chip__label">{label}</span>
    </button>
  );
};
