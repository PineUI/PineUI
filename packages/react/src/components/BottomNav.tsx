import React from 'react';
import { RenderContext, ActionNode } from '../types';

interface BottomNavItem {
  icon: string;
  label: string;
  destination: string;
  badge?: number;
}

interface BottomNavProps {
  items: BottomNavItem[];
  currentIndex: number;
  onItemTap: ActionNode;
  context?: RenderContext;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  items,
  currentIndex,
  onItemTap,
  context,
}) => {
  const handleTap = async (item: BottomNavItem) => {
    if (!context) return;

    // Resolve the action with item data
    const resolvedAction = JSON.parse(
      JSON.stringify(onItemTap).replace(/\{\{item\.(\w+)\}\}/g, (_match: string, key: string) => {
        const value = item[key as keyof BottomNavItem];
        return value != null ? String(value) : '';
      })
    );

    await context.executeAction(resolvedAction);
  };

  return (
    <nav className="pineui-bottomnav">
      {items.map((item, index) => (
        <button
          key={index}
          className={`pineui-bottomnav__item ${
            index === currentIndex ? 'pineui-bottomnav__item--active' : ''
          }`}
          onClick={() => handleTap(item)}
        >
          <div className="pineui-bottomnav__icon-container">
            <span className="pineui-bottomnav__icon">{item.icon}</span>
            {item.badge && item.badge > 0 && (
              <span className="pineui-bottomnav__badge">{item.badge}</span>
            )}
          </div>
          <span className="pineui-bottomnav__label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
