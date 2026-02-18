# PineUI - LLM Context Guide

> Use this guide as context when asking LLMs to build applications with PineUI.
> All component types, action names, and examples here are verified against the runtime.

## What is PineUI?

PineUI is a Server-Driven UI framework for building dynamic, cross-platform interfaces from JSON schemas. It's designed to be AI-friendly - LLMs can generate complete, working UIs without specific training.

## CDN Links

```html
<!-- CSS -->
<link rel="stylesheet" href="https://pineui.github.io/PineUI/pineui.css">

<!-- JavaScript (Standalone - includes React) -->
<script src="https://pineui.github.io/PineUI/pineui.standalone.js"></script>
```

## Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://pineui.github.io/PineUI/pineui.css">
</head>
<body>
  <div id="app"></div>
  <script src="https://pineui.github.io/PineUI/pineui.standalone.js"></script>
  <script>
    PineUI.render({
      target: '#app',
      schema: { /* Your schema here */ }
    });
  </script>
</body>
</html>
```

## Schema Structure

Every PineUI app is a JSON schema:

```json
{
  "schemaVersion": "1.0.0",
  "state": { },
  "intents": { },
  "overlays": { },
  "components": { },
  "screen": { }
}
```

- `state` — initial reactive state (optional)
- `intents` — named, reusable action handlers (optional)
- `overlays` — modals and bottom sheets (optional)
- `components` — reusable custom components (optional)
- `screen` — root component (required)

---

## Data Bindings

Use `{{expression}}` to bind data. Supported contexts:

| Context | Available in | Example |
|---------|-------------|---------|
| `state` | Anywhere | `{{state.user.name}}` |
| `item` | Inside `collection` / `collection.map` itemTemplate | `{{item.title}}` |
| `index` | Inside `collection` / `collection.map` itemTemplate | `{{index}}` |
| `props` | Inside `components` definition | `{{props.card.title}}` |
| `response` | Inside `collection.data.onSuccess` only | `{{response}}` |

**Supported expressions:**
```
{{state.counter}}                          Simple access
{{state.items[0]}}                         Array index
{{state.user.name}}                        Nested property
{{state.price * 1.1}}                      Arithmetic
{{state.age >= 18}}                        Comparison
{{state.isActive ? 'Active' : 'Inactive'}} Ternary
{{state.firstName + ' ' + state.lastName}} String concat
{{state.tab == 'home'}}                    Equality
{{!state.loading}}                         Negation
{{item.badge != null}}                     Null check
{{item.score | number}}                    Filter
```

---

## Components

### layout.column / layout.row

Vertical or horizontal stack.

```json
{
  "type": "layout.column",
  "padding": 16,
  "spacing": 8,
  "mainAxisAlignment": "start",
  "crossAxisAlignment": "stretch",
  "children": [...]
}
```

**Props:**
- `padding`: number (all sides) or `{top, bottom, left, right}`
- `spacing`: number (gap between children)
- `mainAxisAlignment`: `"start"` | `"center"` | `"end"` | `"spaceBetween"` | `"spaceAround"`
- `crossAxisAlignment`: `"start"` | `"center"` | `"end"` | `"stretch"`
- `flex`: number (for proportional sizing in a parent row/column)

### layout.scaffold

App structure with optional app bar, bottom navigation, and FAB.

```json
{
  "type": "layout.scaffold",
  "appBar": {
    "title": "My App",
    "leading": { "type": "button.icon", "icon": "☰", "onPress": {...} },
    "actions": [
      { "type": "button.icon", "icon": "🔍", "onPress": {...} }
    ]
  },
  "body": { "type": "layout.column", "children": [...] },
  "bottomNav": {
    "items": [
      { "label": "Home", "icon": "🏠", "tab": "home" },
      { "label": "Search", "icon": "🔍", "tab": "search" }
    ],
    "activeTab": "{{state.activeTab}}",
    "onTabChange": { "type": "action.state.patch", "path": "activeTab", "value": "{{tab}}" }
  },
  "floatingActionButton": {
    "icon": "✏️",
    "onPress": { "type": "action.overlay.open", "overlayId": "composeModal" }
  }
}
```

### grid

Static grid with fixed children.

```json
{
  "type": "grid",
  "columns": 3,
  "spacing": 16,
  "children": [...]
}
```

> Use `collection` with `layout: "grid"` instead when data comes from an API.

### text

```json
{
  "type": "text",
  "content": "Hello {{state.user.name}}",
  "style": "titleLarge",
  "color": "#6750A4",
  "align": "center"
}
```

**Text Styles (MD3):**
- `headlineLarge` (32px) | `headlineMedium` (28px) | `headlineSmall` (24px)
- `titleLarge` (22px) | `titleMedium` (16px) | `titleSmall` (14px)
- `bodyLarge` (16px) | `bodyMedium` (14px) | `bodySmall` (12px)
- `labelLarge` (14px) | `labelMedium` (12px) | `labelSmall` (11px)

### button.filled / button.text / button.outlined / button.icon / button.fab

```json
{
  "type": "button.filled",
  "label": "Save",
  "icon": "💾",
  "disabled": "{{!state.isValid}}",
  "fullWidth": true,
  "onPress": { "intent": "form.submit" }
}
```

**Button types:**
- `button.filled` — primary (filled background)
- `button.outlined` — secondary (border only)
- `button.text` — tertiary (no background)
- `button.icon` — icon only (square, no label)
- `button.fab` — floating action button

### input.text / input.email / input.password / input.number / input.search

```json
{
  "type": "input.email",
  "label": "E-mail",
  "placeholder": "your@email.com",
  "value": "{{state.email}}",
  "error": "{{state.emailError}}",
  "onChange": {
    "type": "action.state.patch",
    "path": "email",
    "value": "{{event.value}}"
  }
}
```

**Props:**
- `label`: string — label displayed above the input
- `placeholder`: string
- `value`: binding to state — `"{{state.fieldName}}"`
- `error`: string — error message displayed below (red)
- `multiline`: boolean — turns into textarea
- `maxLines`: number — textarea height (multiline only)
- `maxLength`: number
- `autofocus`: boolean
- `onChange` or `onChanged`: action triggered on each keystroke; use `{{event.value}}` for the current value

> `input.textarea` does NOT exist. Use `input.text` with `multiline: true`.

### card

```json
{
  "type": "card",
  "elevation": 1,
  "padding": 16,
  "onPress": { "intent": "item.open", "id": "{{item.id}}" },
  "child": {
    "type": "layout.column",
    "children": [...]
  }
}
```

**Props:**
- `elevation`: `0` | `1` — shadow level
- `variant`: `"elevated"` | `"filled"` | `"outlined"`
- `padding`: number
- `onPress`: action
- `child`: single child component (preferred)
- `children`: array of children (also supported)

### image

```json
{
  "type": "image",
  "src": "{{item.imageUrl}}",
  "borderRadius": 12,
  "aspectRatio": 1.78,
  "style": { "width": "100%", "objectFit": "cover" }
}
```

### avatar

```json
{
  "type": "avatar",
  "src": "{{state.user.avatar}}",
  "size": 40
}
```

### chip

Selectable filter chip.

```json
{
  "type": "chip",
  "label": "Design",
  "selected": "{{state.selectedCategory == 'Design'}}",
  "onPress": {
    "intent": "category.select",
    "category": "Design"
  }
}
```

### badge

```json
{
  "type": "badge",
  "label": "New",
  "color": "success"
}
```

**Colors:** `default` | `success` | `warning` | `error` | `info`

### progress

Linear progress bar.

```json
{
  "type": "progress",
  "value": "{{state.uploadProgress}}",
  "label": "{{state.uploadProgress}}% complete",
  "color": "primary"
}
```

**Colors:** `primary` | `success` | `error`

> `progress.circular` and `progress.linear` do NOT exist. Use `progress`.

### divider

```json
{ "type": "divider", "spacing": 16 }
```

### icon

```json
{
  "type": "icon",
  "name": "⭐",
  "size": 24,
  "color": "#E91E63"
}
```

### tabs

```json
{
  "type": "tabs",
  "activeTab": "{{state.activeTab}}",
  "onTabChange": {
    "type": "action.state.patch",
    "path": "activeTab",
    "value": "{{tab}}"
  },
  "tabs": [
    {
      "id": "home",
      "label": "Home",
      "content": { "type": "layout.column", "children": [...] }
    },
    {
      "id": "profile",
      "label": "Profile",
      "content": { "type": "layout.column", "children": [...] }
    }
  ]
}
```

### table

```json
{
  "type": "table",
  "columns": [
    { "key": "name", "label": "Name" },
    { "key": "email", "label": "Email" },
    { "key": "role", "label": "Role", "width": "120px" }
  ],
  "data": {
    "type": "action.http",
    "method": "GET",
    "url": "/api/users"
  }
}
```

### collection — HTTP data source

Fetches data from an API and renders each item with a template.
Supports pagination, loading/empty/error states.

```json
{
  "type": "collection",
  "layout": "list",
  "data": {
    "type": "action.http",
    "method": "GET",
    "url": "/api/posts?category={{state.selectedCategory}}",
    "onSuccess": {
      "type": "action.state.patch",
      "path": "postList",
      "value": "{{response}}"
    }
  },
  "itemTemplate": {
    "type": "component.postCard",
    "props": { "post": "{{item}}" }
  },
  "loadingState": { "type": "text", "content": "Loading..." },
  "emptyState": { "type": "text", "content": "No results." },
  "errorState": { "type": "text", "content": "Error loading." }
}
```

**Props:**
- `layout`: `"list"` | `"grid"` | `"table"`
- `columns`: number (grid only, default 3)
- `spacing`: number (grid gap)
- `itemSpacing`: number (list gap between items)
- `data`: `action.http` object
- `itemTemplate`: component rendered for each item
- `loadingState`, `emptyState`, `errorState`: optional fallback components

**`onSuccess`:** executed after a successful fetch. Use `{{response}}` to access the returned array.
Collection reloads automatically when state values used in the URL change.

**Context variables in `itemTemplate`:**
- `{{item}}` — current item object
- `{{index}}` — 0-based index

### collection.map — static array from state

Renders an array already in state (no HTTP call).

```json
{
  "type": "collection.map",
  "data": "{{state.items}}",
  "layout": "list",
  "spacing": 12,
  "template": {
    "type": "card",
    "child": { "type": "text", "content": "{{item.title}}" }
  }
}
```

**The `data` expression re-evaluates on every state change.** Any filtering, sorting, or transformation must live inside the binding itself — full JS array methods are supported:

```json
"data": "{{state.items.filter(i => i.active)}}"
"data": "{{state.filter == 'all' ? state.items : state.items.filter(i => i.type == state.filter)}}"
"data": "{{state.items.slice(0, state.limit)}}"
"data": "{{state.items.sort((a, b) => a.name.localeCompare(b.name))}}"
```

| | `collection` | `collection.map` |
|---|---|---|
| Data source | HTTP (action.http) | State (`{{state.xxx}}`) |
| Pagination | Yes | No |
| Use when | Data comes from API | Data already in state |

### conditionalRender — multiple cases

Show different content based on multiple conditions.

```json
{
  "type": "conditionalRender",
  "conditions": [
    {
      "when": "{{state.tab == 'home'}}",
      "render": { "type": "text", "content": "Home" }
    },
    {
      "when": "{{state.tab == 'profile'}}",
      "render": { "type": "text", "content": "Profile" }
    }
  ]
}
```

### conditional.render — simple condition

Show/hide a single child based on one condition.

```json
{
  "type": "conditional.render",
  "condition": "{{state.isLoggedIn}}",
  "child": {
    "type": "text",
    "content": "Welcome back!"
  }
}
```

Also supports `children` (array):
```json
{
  "type": "conditional.render",
  "condition": "{{item.progress > 0}}",
  "children": [
    { "type": "text", "content": "In progress" },
    { "type": "progress", "value": "{{item.progress}}" }
  ]
}
```

> `conditional.render` has NO `fallback` prop. For if/else use `conditionalRender` with multiple conditions.

---

## Overlays (Modals & Sheets)

Overlays are defined at the schema level in `overlays`, not inline as components.

```json
{
  "overlays": {
    "settingsModal": {
      "type": "modal",
      "presentation": "modal",
      "dismissible": true,
      "child": {
        "type": "layout.column",
        "padding": 24,
        "spacing": 16,
        "children": [
          { "type": "text", "content": "Settings", "style": "titleLarge" },
          { "type": "button.filled", "label": "Close",
            "onPress": { "type": "action.overlay.close", "overlayId": "settingsModal" }
          }
        ]
      }
    }
  }
}
```

**Presentation modes:**
- `"modal"` — centered modal (default)
- `"bottomSheet"` — slides up from bottom
- `"dialog"` — small centered dialog (400px)
- `"fullscreen"` — 95vw × 95vh, rounded corners

**Open/close:**
```json
{ "type": "action.overlay.open", "overlayId": "settingsModal" }
{ "type": "action.overlay.close", "overlayId": "settingsModal" }
```

---

## Actions

### action.state.patch

Update a value in state (supports nested paths).

```json
{
  "type": "action.state.patch",
  "path": "user.name",
  "value": "{{event.value}}"
}
```

### action.http

Make an HTTP request.

```json
{
  "type": "action.http",
  "method": "POST",
  "url": "/api/posts",
  "body": {
    "text": "{{state.composer.text}}"
  }
}
```

> The action type is `action.http`, NOT `action.http.request`.

### action.snackbar.show

Show a temporary notification.

```json
{
  "type": "action.snackbar.show",
  "message": "Saved! {{state.itemName}}",
  "duration": 3000,
  "action": {
    "label": "Undo",
    "onPress": { "intent": "item.undo" }
  }
}
```

### action.overlay.open / action.overlay.close

```json
{ "type": "action.overlay.open", "overlayId": "myModal" }
{ "type": "action.overlay.close", "overlayId": "myModal" }
```

> Do NOT use `action.overlay.show` or `action.overlay.hide` — they don't exist.

### action.sequence

Run multiple actions sequentially (awaits each one).

```json
{
  "type": "action.sequence",
  "actions": [
    { "type": "action.state.patch", "path": "loading", "value": true },
    { "type": "action.http", "method": "POST", "url": "/api/save", "body": {...} },
    { "type": "action.state.patch", "path": "loading", "value": false },
    { "type": "action.snackbar.show", "message": "Saved!" }
  ]
}
```

### action.delay

Wait a fixed amount of time. Use inside `action.sequence`.

```json
{
  "type": "action.sequence",
  "actions": [
    { "type": "action.snackbar.show", "message": "Processing..." },
    { "type": "action.delay", "duration": 1500 },
    { "type": "action.snackbar.show", "message": "Done!" }
  ]
}
```

> `action.delay` has NO `then` field. Always wrap it in `action.sequence`.

---

## Intents

Named, reusable handlers. Keep business semantics out of UI nodes.

**Defining:**
```json
{
  "intents": {
    "category.select": {
      "handler": {
        "type": "action.state.patch",
        "path": "selectedCategory",
        "value": "{{category}}"
      }
    },
    "post.like": {
      "handler": {
        "type": "action.sequence",
        "actions": [
          { "type": "action.http", "method": "POST", "url": "/api/posts/{{postId}}/like" },
          { "type": "action.snackbar.show", "message": "Liked!" }
        ]
      }
    }
  }
}
```

**Dispatching (short syntax — preferred):**
```json
{
  "intent": "category.select",
  "category": "Design"
}
```

Parameters defined alongside `intent` are passed to the handler and can be used with `{{paramName}}`.

**Alternative syntax (also valid):**
```json
{ "type": "intent", "name": "category.select", "category": "Design" }
```

---

## Custom Components

Define reusable component templates with props.

```json
{
  "components": {
    "component.courseCard": {
      "definition": {
        "type": "card",
        "elevation": 1,
        "onPress": { "intent": "course.open", "courseData": "{{item}}", "courseIndex": "{{index}}" },
        "child": {
          "type": "layout.column",
          "spacing": 0,
          "children": [
            {
              "type": "image",
              "src": "{{props.course.image}}",
              "borderRadius": 12,
              "aspectRatio": 1.33
            },
            {
              "type": "layout.column",
              "padding": 12,
              "spacing": 8,
              "children": [
                { "type": "text", "content": "{{props.course.title}}", "style": "titleSmall" },
                { "type": "text", "content": "{{props.course.instructor}}", "style": "bodySmall" }
              ]
            }
          ]
        }
      }
    }
  }
}
```

**Using a custom component:**
```json
{
  "type": "component.courseCard",
  "props": {
    "course": "{{item}}"
  }
}
```

Inside the definition, use `{{props.fieldName}}` to access passed props.

---

## Complete Example: Course Gallery with Navigation

```json
{
  "schemaVersion": "1.0.0",
  "state": {
    "selectedCategory": "All",
    "courseList": [],
    "selectedCourse": null,
    "selectedCourseIndex": 0
  },
  "intents": {
    "category.select": {
      "handler": {
        "type": "action.state.patch",
        "path": "selectedCategory",
        "value": "{{category}}"
      }
    },
    "course.open": {
      "handler": {
        "type": "action.sequence",
        "actions": [
          { "type": "action.state.patch", "path": "selectedCourse", "value": "{{courseData}}" },
          { "type": "action.state.patch", "path": "selectedCourseIndex", "value": "{{courseIndex}}" },
          { "type": "action.overlay.open", "overlayId": "courseModal" }
        ]
      }
    },
    "course.next": {
      "handler": {
        "type": "action.sequence",
        "actions": [
          {
            "type": "action.state.patch",
            "path": "selectedCourseIndex",
            "value": "{{(state.selectedCourseIndex + 1) % state.courseList.length}}"
          },
          {
            "type": "action.state.patch",
            "path": "selectedCourse",
            "value": "{{state.courseList[(state.selectedCourseIndex + 1) % state.courseList.length]}}"
          }
        ]
      }
    }
  },
  "overlays": {
    "courseModal": {
      "type": "modal",
      "presentation": "fullscreen",
      "dismissible": true,
      "child": {
        "type": "layout.column",
        "children": [
          {
            "type": "layout.row",
            "mainAxisAlignment": "spaceBetween",
            "padding": 16,
            "children": [
              { "type": "text", "content": "{{state.selectedCourse.title}}", "style": "titleLarge" },
              { "type": "button.text", "label": "✕",
                "onPress": { "type": "action.overlay.close", "overlayId": "courseModal" } }
            ]
          },
          { "type": "image", "src": "{{state.selectedCourse.image}}", "style": { "width": "100%" } },
          {
            "type": "layout.column",
            "padding": 16,
            "spacing": 12,
            "children": [
              { "type": "text", "content": "{{state.selectedCourse.instructor}}", "style": "bodyLarge" },
              { "type": "progress", "value": "{{state.selectedCourse.progress}}", "color": "primary" }
            ]
          },
          {
            "type": "layout.row",
            "mainAxisAlignment": "spaceBetween",
            "padding": 16,
            "children": [
              { "type": "button.outlined", "label": "← Prev", "onPress": { "intent": "course.prev" } },
              { "type": "text", "content": "{{state.selectedCourseIndex + 1}} / {{state.courseList.length}}" },
              { "type": "button.outlined", "label": "Next →", "onPress": { "intent": "course.next" } }
            ]
          }
        ]
      }
    }
  },
  "screen": {
    "type": "layout.scaffold",
    "body": {
      "type": "layout.column",
      "padding": 16,
      "spacing": 16,
      "children": [
        { "type": "text", "content": "Courses", "style": "titleLarge" },
        {
          "type": "layout.row",
          "spacing": 8,
          "children": [
            {
              "type": "chip",
              "label": "All",
              "selected": "{{state.selectedCategory == 'All'}}",
              "onPress": { "intent": "category.select", "category": "All" }
            },
            {
              "type": "chip",
              "label": "Design",
              "selected": "{{state.selectedCategory == 'Design'}}",
              "onPress": { "intent": "category.select", "category": "Design" }
            }
          ]
        },
        {
          "type": "collection",
          "layout": "grid",
          "columns": 3,
          "spacing": 16,
          "data": {
            "type": "action.http",
            "method": "GET",
            "url": "/api/courses?category={{state.selectedCategory}}",
            "onSuccess": {
              "type": "action.state.patch",
              "path": "courseList",
              "value": "{{response}}"
            }
          },
          "itemTemplate": {
            "type": "component.courseCard",
            "props": { "course": "{{item}}", "index": "{{index}}" }
          }
        }
      ]
    }
  },
  "components": {
    "component.courseCard": {
      "definition": {
        "type": "card",
        "elevation": 1,
        "padding": 0,
        "onPress": {
          "intent": "course.open",
          "courseData": "{{item}}",
          "courseIndex": "{{index}}"
        },
        "child": {
          "type": "layout.column",
          "spacing": 0,
          "children": [
            { "type": "image", "src": "{{props.course.image}}", "borderRadius": 12, "aspectRatio": 1.33 },
            {
              "type": "layout.column",
              "padding": 12,
              "spacing": 4,
              "children": [
                { "type": "text", "content": "{{props.course.title}}", "style": "titleSmall" },
                { "type": "text", "content": "{{props.course.instructor}}", "style": "bodySmall" }
              ]
            }
          ]
        }
      }
    }
  }
}
```

---

## ✅ Dos and ❌ Don'ts

### Actions

| ✅ Correct | ❌ Wrong |
|-----------|---------|
| `"type": "action.http"` | `"type": "action.http.request"` |
| `"type": "action.overlay.open"` | `"type": "action.overlay.show"` |
| `"type": "action.overlay.close"` | `"type": "action.overlay.hide"` |
| `action.delay` inside `action.sequence` | `action.delay` with `"then": {...}` |

### Components

| ✅ Correct | ❌ Wrong |
|-----------|---------|
| `"type": "progress"` | `"type": "progress.circular"` or `"progress.linear"` |
| `"type": "grid"` | `"type": "layout.grid"` |
| `"type": "input.text"` + `"multiline": true` | `"type": "input.textarea"` |
| `card` with `"child": {...}` | `card` with `"content": {...}` |

### Bindings

| ✅ Correct | ❌ Wrong |
|-----------|---------|
| `{{response}}` in `collection.data.onSuccess` | `{{response.data}}` |
| `{{event.value}}` in `onChange` | `{{value}}` in `onChange` |
| `{{item.field}}` in `itemTemplate` | `{{item.field}}` outside collection context |

### Overlays

| ✅ Correct | ❌ Wrong |
|-----------|---------|
| Define in top-level `"overlays": { ... }` | Define as `{ "type": "modal", ... }` inline |
| Open with `action.overlay.open` + `overlayId` | No inline modal rendering |

### Intents

| ✅ Correct | ❌ Wrong |
|-----------|---------|
| `{ "intent": "name", "param": "val" }` | `{ "type": "intent.name" }` (legacy, avoid) |
| Intent handler receives params by name | Don't use `event.` prefix for intent params |

---

## Resources

- **Live Demos**: https://pineui.github.io/PineUI/
- **Full Documentation**: https://pineui.github.io/PineUI/documentation.html
- **GitHub**: https://github.com/PineUI/PineUI

---

*Created by David Ruiz (wupsbr) — CPTO at Ingresse*
