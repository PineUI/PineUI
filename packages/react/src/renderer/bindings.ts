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
  // Check if entire string is a binding
  const fullMatch = str.match(/^\{\{(.+)\}\}$/);
  if (fullMatch) {
    const expr = fullMatch[1].trim();

    // IMPORTANT: If binding references 'item' but item is not in context, keep the binding
    // This allows itemTemplate to be resolved later when item is available
    if (expr === 'item' || expr.startsWith('item.')) {
      if (!('item' in context) || context.item === undefined) {
        return str; // Keep the original binding string
      }
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
    // Handle simple property access: item.author.name
    if (/^[\w.]+$/.test(expr)) {
      return getNestedValue(context, expr);
    }

    // Handle operators: !value, value != null
    if (expr.includes('!') || expr.includes('==') || expr.includes('!=')) {
      return evaluateCondition(expr, context);
    }

    // Handle filters: value | filter
    if (expr.includes('|')) {
      return evaluateFilter(expr, context);
    }

    return getNestedValue(context, expr);
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

function evaluateCondition(expr: string, context: any): boolean {
  // Handle negation: !value
  if (expr.startsWith('!')) {
    const value = getNestedValue(context, expr.slice(1).trim());
    return !value;
  }

  // Handle != null
  if (expr.includes('!= null')) {
    const varName = expr.split('!=')[0].trim();
    const value = getNestedValue(context, varName);
    return value != null;
  }

  // Handle == comparison
  if (expr.includes('==')) {
    const [left, right] = expr.split('==').map(s => s.trim());
    const leftValue = getNestedValue(context, left);
    const rightValue = right.startsWith("'") || right.startsWith('"')
      ? right.slice(1, -1)
      : getNestedValue(context, right);
    return leftValue == rightValue;
  }

  return false;
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
