import React, { useState } from 'react';
import { ComponentNode, RenderContext } from '../types';

interface TabsProps {
  tabs: Array<{
    id: string;
    label: string;
    icon?: string;
    badge?: number;
    content: ComponentNode;
  }>;
  defaultTab?: string;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  defaultTab,
  context,
  renderer: Renderer,
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  if (!Renderer || !context) return null;

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="pineui-tabs">
      <div className="pineui-tabs__header">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`pineui-tabs__tab ${activeTab === tab.id ? 'pineui-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon && <span className="pineui-tabs__icon">{tab.icon}</span>}
            <span className="pineui-tabs__label">{tab.label}</span>
            {tab.badge !== undefined && tab.badge > 0 && (
              <span className="pineui-tabs__badge">{tab.badge}</span>
            )}
          </button>
        ))}
      </div>
      <div className="pineui-tabs__content">
        {activeTabData && <Renderer node={activeTabData.content} context={context} />}
      </div>
    </div>
  );
};
