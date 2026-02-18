import React, { useEffect, useState } from 'react';
import { ComponentNode, RenderContext, ActionNode } from '../types';

interface CollectionProps {
  id: string;
  layout?: 'list' | 'grid' | 'table';
  columns?: number;
  spacing?: number;
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

/** Substitui recursivamente a string literal "{{response}}" pelo valor real dos itens. */
function substituteResponseBinding(node: any, items: any[]): any {
  if (node === '{{response}}') return items;
  if (typeof node !== 'object' || node === null) return node;
  if (Array.isArray(node)) return node.map(n => substituteResponseBinding(n, items));
  return Object.fromEntries(
    Object.entries(node).map(([k, v]) => [k, substituteResponseBinding(v, items)])
  );
}

export const Collection: React.FC<CollectionProps> = ({
  id,
  layout = 'list',
  columns = 3,
  spacing = 16,
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
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | null>(null);

  // Resolve URL bindings to a string key — only changes when URL params change.
  // Using this instead of context?.state prevents infinite loops when onSuccess
  // updates state fields that are not part of the URL (e.g. state.courses).
  const fetchKey = dataAction.type === 'action.http' && context
    ? dataAction.url.replace(/\{\{state\.([^}]+)\}\}/g, (_: string, path: string) => {
        const keys = path.split('.');
        let value: any = context.state;
        for (const key of keys) {
          if (value == null) return '';
          value = value[key];
        }
        return value != null ? String(value) : '';
      })
    : '';

  useEffect(() => {
    loadData();
  }, [fetchKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async (append = false) => {
    if (!context) return;

    try {
      append ? setLoadingMore(true) : setLoading(true);
      setError(null);

      if (dataAction.type === 'action.http') {
        let url = dataAction.url;

        // Resolve {{state.xxx}} bindings in URL
        if (url.includes('{{state.')) {
          url = url.replace(/\{\{state\.([^}]+)\}\}/g, (_: string, path: string) => {
            const keys = path.split('.');
            let value: any = context.state;
            for (const key of keys) {
              if (value == null) return '';
              value = value[key];
            }
            return value != null ? String(value) : '';
          });
        }

        if (append && cursor) {
          url += `${url.includes('?') ? '&' : '?'}after=${cursor}`;
        }

        const response = await fetch(url);
        const result = await response.json();

        const newItems = result.data || result;
        setItems(prev => append ? [...prev, ...newItems] : newItems);

        // Execute onSuccess to sync items into global state
        if (dataAction.onSuccess && context) {
          console.log(`[Collection] onSuccess called with ${newItems.length} items`);
          // Pre-resolve {{response}} before calling executeAction.
          // The params-based binding resolution is unreliable inside async closures;
          // substituting the value directly is the safest approach.
          const resolvedOnSuccess = substituteResponseBinding(dataAction.onSuccess, newItems);
          await context.executeAction(resolvedOnSuccess);
          console.log(`[Collection] onSuccess done`);
        }

        // Handle pagination
        if (result.pagination) {
          setHasMore(result.pagination.hasMore);
          setCursor(result.pagination.cursor);
        } else {
          setHasMore(false);
        }
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = () => {
    if (!loadingMore && hasMore) {
      loadData(true);
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
          <button onClick={() => loadData(false)}>Refresh</button>
        </div>
      )}
      <div
        className={`pineui-collection__${layout}`}
        style={layout === 'grid' ? {
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap: `${spacing}px`
        } : undefined}
      >
        {items.map((item, index) => {
          const itemContext = { ...context, item, index };
          return (
            <div key={item.id || index} className={`pineui-collection__item ${layout === 'grid' ? 'pineui-collection__item--grid' : ''}`}>
              <Renderer node={itemTemplate} context={itemContext} />
            </div>
          );
        })}
      </div>

      {/* Load More button */}
      {hasMore && !loading && (
        <div className="pineui-collection__load-more" style={{ padding: '16px', textAlign: 'center' }}>
          <button
            onClick={loadMore}
            disabled={loadingMore}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: loadingMore ? 'not-allowed' : 'pointer',
              opacity: loadingMore ? 0.6 : 1
            }}
          >
            {loadingMore ? 'Carregando...' : 'Carregar mais'}
          </button>
        </div>
      )}
    </div>
  );
};
