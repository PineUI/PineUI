/**
 * PineUI - Server-Driven UI for AI-Native Applications
 *
 * Copyright (c) 2026 Luma Ventures Ltda
 * CNPJ: 21.951.820/0001-39
 *
 * Licensed under the Apache License 2.0 with Commons Clause
 * See LICENSE file for details
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { PineUI } from './PineUI';
import { PineUIConfig } from './types';
import './styles.css';

// Export components for library usage
export { PineUI } from './PineUI';
export * from './types';

// Global render function for script tag usage
export function render(config: PineUIConfig): void {
  const target = typeof config.target === 'string'
    ? document.querySelector(config.target)
    : config.target;

  if (!target) {
    console.error('PineUI: Target element not found');
    config.onError?.(new Error('Target element not found'));
    return;
  }

  const root = ReactDOM.createRoot(target as HTMLElement);

  root.render(
    React.createElement(PineUI, {
      schema: config.schema,
      schemaUrl: config.schemaUrl,
      baseUrl: config.baseUrl,
    })
  );

  config.onReady?.();
}

// Make available globally for UMD usage
if (typeof window !== 'undefined') {
  (window as any).PineUI = {
    render,
  };
}

// Version banner
console.log('%c🍍 PineUI v0.1.7%c — Server-Driven UI for AI-Native Apps', 'color:#6750A4;font-weight:700;font-size:14px', 'color:#79747E;font-size:12px');
