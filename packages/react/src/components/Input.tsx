import React from 'react';
import { RenderContext, ActionNode } from '../types';

interface InputProps {
  type: 'input.text';
  id?: string;
  placeholder?: string;
  value?: string;
  multiline?: boolean;
  maxLines?: number;
  maxLength?: number;
  autofocus?: boolean;
  onChanged?: ActionNode;
  context?: RenderContext;
}

export const Input: React.FC<InputProps> = ({
  id,
  placeholder = '',
  value = '',
  multiline = false,
  maxLines = 1,
  maxLength,
  autofocus = false,
  onChanged,
  context,
}) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!onChanged || !context) return;

    // Replace {{value}} with the actual input value
    const resolvedAction = JSON.parse(
      JSON.stringify(onChanged).replace(/\{\{value\}\}/g, e.target.value)
    );

    await context.executeAction(resolvedAction);
  };

  const commonProps = {
    id,
    placeholder,
    defaultValue: value,
    maxLength,
    autoFocus: autofocus,
    onChange: handleChange,
    className: 'pineui-input',
  };

  if (multiline) {
    return (
      <textarea
        {...commonProps}
        rows={maxLines}
        style={{
          resize: 'none',
          minHeight: `${maxLines * 24}px`,
        }}
      />
    );
  }

  return <input {...commonProps} type="text" />;
};
