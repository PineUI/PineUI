import React, { useEffect, useState } from 'react';
import { ComponentNode, RenderContext, ActionNode } from '../types';

interface CollectionProps {
  id: string;
  layout: 'list' | 'grid' | 'table';
  data: ActionNode;
  itemTemplate: ComponentNode;
  loadingState?: ComponentNode;
  emptyState?: ComponentNode;
  errorState?: ComponentNode;
  virtualized?: boolean;
  refreshable?: boolean;
  onRefresh?: ActionNode;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Collection: React.FC<CollectionProps> = ({
  id,
  data: dataAction,
  itemTemplate,
  loadingState,
  emptyState,
  errorState,
  refreshable = false,
  context,
  renderer: Renderer,
}) => {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!context) return;

    try {
      setLoading(true);
      setError(null);

      // Execute data action
      if (dataAction.type === 'action.http') {
        const response = await fetch(dataAction.url);
        const result = await response.json();
        setItems(result.data || result);
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  if (!Renderer || !context) return null;

  if (loading && loadingState) {
    return <Renderer node={loadingState} context={context} />;
  }

  if (error && errorState) {
    return <Renderer node={errorState} context={context} />;
  }

  if (items.length === 0 && emptyState) {
    return <Renderer node={emptyState} context={context} />;
  }

  return (
    <div className="pineui-collection" data-collection-id={id}>
      {refreshable && (
        <div className="pineui-collection__refresh">
          <button onClick={loadData}>Refresh</button>
        </div>
      )}
      <div className="pineui-collection__list">
        {items.map((item, index) => (
          <div key={item.id || index} className="pineui-collection__item">
            <Renderer node={itemTemplate} context={context} parentData={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
