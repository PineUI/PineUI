import React from 'react';

interface ProgressProps {
  value: number; // 0-100
  label?: string;
  showPercentage?: boolean;
  color?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  label,
  showPercentage = false,
  color = 'primary',
}) => {
  const percentage = Math.min(100, Math.max(0, value));

  return (
    <div className="pineui-progress">
      {(label || showPercentage) && (
        <div className="pineui-progress__header">
          {label && <span className="pineui-progress__label">{label}</span>}
          {showPercentage && <span className="pineui-progress__percentage">{percentage}%</span>}
        </div>
      )}
      <div className="pineui-progress__track">
        <div
          className={`pineui-progress__fill pineui-progress__fill--${color}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
