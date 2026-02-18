/**
 * Resolves template bindings in the format {{expression}}
 * Example: "Hello {{user.name}}" -> "Hello John"
 */

export function resolveBindings(obj: any, context: any): any {
  if (typeof obj === 'string') {
    return resolveString(obj, context);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => resolveBindings(item, context));
  }

  if (obj && typeof obj === 'object') {
    const resolved: any = {};
    for (const key in obj) {
      resolved[key] = resolveBindings(obj[key], context);
    }
    return resolved;
  }

  return obj;
}

function resolveString(str: string, context: any): any {
  // Check if entire string is a single binding (no }} before the final one)
  const firstClose = str.indexOf('}}');
  const isFullBinding = str.startsWith('{{') && str.endsWith('}}') && firstClose === str.length - 2;
  if (isFullBinding) {
    const expr = str.slice(2, -2).trim();

    // Keep binding unresolved if it references context vars not yet available
    if ((expr === 'item' || expr.startsWith('item.')) && (!('item' in context) || context.item === undefined)) {
      return str;
    }
    if ((expr === 'props' || expr.startsWith('props.')) && (!('props' in context) || context.props === undefined)) {
      return str;
    }
    // 'response' só existe no momento do fetch (Collection.onSuccess) — preservar fora desse contexto
    if ((expr === 'response' || expr.startsWith('response.')) && !('response' in context)) {
      return str;
    }

    const result = evaluateExpression(expr, context);
    return result;
  }

  // Replace inline bindings
  return str.replace(/\{\{(.+?)\}\}/g, (_, expr) => {
    const value = evaluateExpression(expr.trim(), context);
    return value != null ? String(value) : '';
  });
}

function evaluateExpression(expr: string, context: any): any {
  try {
    // Fast path: simple property access like item.author.name
    if (/^[\w.]+$/.test(expr)) {
      return getNestedValue(context, expr);
    }

    // Handle filters: value | filter (must check before Function fallback)
    if (expr.includes('|') && !expr.includes('||')) {
      return evaluateFilter(expr, context);
    }

    // General case: evaluate as JS expression with context variables injected
    // Handles array access, arithmetic, ternary, comparisons, etc.
    const keys = Object.keys(context).filter(k => /^[a-zA-Z_$][\w$]*$/.test(k));
    const values = keys.map(k => context[k]);
    const fn = new Function(...keys, `"use strict"; try { return (${expr}); } catch(e) { return undefined; }`);
    return fn(...values);
  } catch (error) {
    console.warn(`Failed to evaluate expression: ${expr}`, error);
    return undefined;
  }
}

function getNestedValue(obj: any, path: string): any {
  const parts = path.split('.');
  let value = obj;

  for (const part of parts) {
    if (value == null) return undefined;
    value = value[part];
  }

  return value;
}


function evaluateFilter(expr: string, context: any): any {
  const [value, filter] = expr.split('|').map(s => s.trim());
  const resolvedValue = getNestedValue(context, value);

  // timeAgo filter
  if (filter === 'timeAgo') {
    return formatTimeAgo(resolvedValue);
  }

  return resolvedValue;
}

function formatTimeAgo(dateString: string): string {
  if (!dateString) return '';

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString; // Return original if invalid

  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)}mo`;
  return `${Math.floor(seconds / 31536000)}y`;
}
