import React from 'react';
import { RenderContext, ActionNode } from '../types';

interface InputProps {
  type: 'input.text' | 'input.email' | 'input.password' | 'input.number' | 'input.search';
  id?: string;
  label?: string;
  placeholder?: string;
  value?: string;
  error?: string;
  multiline?: boolean;
  maxLines?: number;
  maxLength?: number;
  autofocus?: boolean;
  onChanged?: ActionNode;
  onChange?: ActionNode;
  context?: RenderContext;
}

export const Input: React.FC<InputProps> = ({
  type,
  id,
  label,
  placeholder = '',
  value = '',
  error,
  multiline = false,
  maxLines = 1,
  maxLength,
  autofocus = false,
  onChanged,
  onChange,
  context,
}) => {
  const changeHandler = onChange || onChanged;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!changeHandler || !context) return;
    await context.executeAction(changeHandler, { event: { value: e.target.value }, value: e.target.value });
  };

  // Derive HTML input type from component type
  const inputTypeMap: Record<string, string> = {
    'input.email': 'email',
    'input.password': 'password',
    'input.number': 'number',
    'input.search': 'search',
    'input.text': 'text',
  };
  const htmlInputType = inputTypeMap[type] || 'text';

  const commonProps = {
    id,
    placeholder,
    defaultValue: value,
    maxLength,
    autoFocus: autofocus,
    onChange: handleChange,
    className: `pineui-input${error ? ' pineui-input--error' : ''}`,
  };

  return (
    <div className="pineui-input-wrapper" style={{ width: '100%' }}>
      {label && (
        <label
          htmlFor={id}
          style={{
            display: 'block',
            fontSize: '12px',
            fontWeight: 500,
            color: error ? 'var(--md-sys-color-error)' : 'var(--md-sys-color-onSurfaceVariant)',
            marginBottom: '4px',
          }}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea
          {...commonProps}
          rows={maxLines}
          style={{ resize: 'none', minHeight: `${maxLines * 24}px` }}
        />
      ) : (
        <input {...commonProps} type={htmlInputType} />
      )}
      {error && (
        <p style={{
          fontSize: '12px',
          color: 'var(--md-sys-color-error)',
          marginTop: '4px',
        }}>
          {error}
        </p>
      )}
    </div>
  );
};
