import React, { useEffect, useState } from 'react';
import { RenderContext, ComponentNode, ActionNode } from '../types';

interface TableColumn {
  key: string;
  label: string;
  width?: string;
  template?: ComponentNode;
}

interface TableProps {
  columns: TableColumn[];
  data: any[] | ActionNode;
  context?: RenderContext;
  renderer?: React.ComponentType<any>;
}

export const Table: React.FC<TableProps> = ({
  columns,
  data: dataSource,
  context,
  renderer: Renderer,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    if (!context) return;

    // If data is already an array, use it directly
    if (Array.isArray(dataSource)) {
      setData(dataSource);
      setLoading(false);
      return;
    }

    // If data is an HTTP action, fetch it
    if ((dataSource as ActionNode).type === 'action.http') {
      try {
        const action = dataSource as ActionNode;
        const response = await fetch(action.url, {
          method: action.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: action.body ? JSON.stringify(action.body) : undefined,
        });

        const result = await response.json();
        setData(result.data || result);
        setLoading(false);
      } catch (error) {
        console.error('Table data fetch error:', error);
        setLoading(false);
      }
    }
  };

  if (!Renderer || !context) return null;

  if (loading) {
    return (
      <div className="pineui-table">
        <p style={{ padding: '16px', textAlign: 'center' }}>Loading...</p>
      </div>
    );
  }

  return (
    <div className="pineui-table">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                style={{ width: column.width }}
                className="pineui-table__header"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="pineui-table__row">
              {columns.map((column) => (
                <td key={column.key} className="pineui-table__cell">
                  {column.template ? (
                    <Renderer
                      node={column.template}
                      context={context}
                      parentData={row}
                    />
                  ) : (
                    <span>{row[column.key]}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
