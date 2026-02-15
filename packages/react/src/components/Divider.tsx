import React from 'react';

interface DividerProps {
  thickness?: number;
  color?: string;
}

export const Divider: React.FC<DividerProps> = ({
  thickness = 1,
  color = 'surfaceVariant',
}) => {
  const styles: React.CSSProperties = {
    height: `${thickness}px`,
    backgroundColor: `var(--md-sys-color-${color}, #e0e0e0)`,
    border: 'none',
    margin: 0,
  };

  return <hr className="pineui-divider" style={styles} />;
};
