# PineUI - LLM Context Guide

> Use this guide as context when asking LLMs to build applications with PineUI

## What is PineUI?

PineUI is a Server-Driven UI framework for building dynamic, cross-platform interfaces from JSON schemas. It's designed to be AI-friendly - LLMs can generate complete, working UIs without specific training.

## CDN Links

```html
<!-- CSS -->
<link rel="stylesheet" href="https://unpkg.com/@pineui/react@latest/dist/style.css">

<!-- JavaScript (Standalone - includes React) -->
<script src="https://unpkg.com/@pineui/react@latest/dist/pineui.standalone.js"></script>
```

## Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@pineui/react@latest/dist/style.css">
</head>
<body>
  <div id="app"></div>

  <script src="https://unpkg.com/@pineui/react@latest/dist/pineui.standalone.js"></script>
  <script>
    PineUI.render({
      target: '#app',
      schema: {
        // Your schema here
      }
    });
  </script>
</body>
</html>
```

## Schema Structure

Every PineUI app is defined by a JSON schema:

```json
{
  "schemaVersion": "1.0.0",
  "state": {
    // Initial state (optional)
  },
  "intents": {
    // Named actions (optional)
  },
  "screen": {
    // Root component (required)
  }
}
```

## State Management

### Defining State

```json
{
  "state": {
    "counter": 0,
    "selectedTab": "home",
    "items": ["apple", "banana", "orange"],
    "user": {
      "name": "John",
      "email": "john@example.com"
    }
  }
}
```

### Data Bindings

Use `{{expression}}` syntax to bind data:

```json
{
  "type": "text",
  "content": "Hello {{state.user.name}}!"
}
```

**Supported expressions:**
- State access: `{{state.counter}}`
- Array access: `{{state.items[0]}}`
- Object properties: `{{state.user.name}}`
- Arithmetic: `{{state.price * 1.1}}`
- Comparisons: `{{state.age >= 18}}`
- String concat: `{{state.firstName + ' ' + state.lastName}}`
- Ternary: `{{state.isActive ? 'Active' : 'Inactive'}}`

## Components

### Layout Components

#### layout.column
Vertical stack of children

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
- `padding`: number (all sides) or object `{top, bottom, left, right}`
- `spacing`: number (gap between children)
- `mainAxisAlignment`: "start" | "center" | "end" | "spaceBetween" | "spaceAround"
- `crossAxisAlignment`: "start" | "center" | "end" | "stretch"
- `width`, `height`: number | "100%"

#### layout.row
Horizontal stack of children

```json
{
  "type": "layout.row",
  "spacing": 12,
  "mainAxisAlignment": "spaceBetween",
  "children": [...]
}
```

Same props as `layout.column`

#### layout.grid
Responsive grid layout

```json
{
  "type": "layout.grid",
  "columns": 3,
  "spacing": 16,
  "children": [...]
}
```

**Props:**
- `columns`: number (default: 3)
- `spacing`: number
- `responsive`: boolean (auto-adjusts columns on mobile)

#### layout.scaffold
App structure with app bar, bottom nav, and FAB

```json
{
  "type": "layout.scaffold",
  "appBar": {
    "title": "My App",
    "leading": {...},
    "actions": [...]
  },
  "bottomNav": {...},
  "floatingActionButton": {...},
  "body": {...}
}
```

### Text Components

#### text
Display text with Material Design styles

```json
{
  "type": "text",
  "content": "Hello World",
  "style": "titleLarge",
  "color": "#6750A4",
  "align": "center"
}
```

**Text Styles:**
- `displayLarge`, `displayMedium`, `displaySmall`
- `headlineLarge`, `headlineMedium`, `headlineSmall`
- `titleLarge`, `titleMedium`, `titleSmall`
- `bodyLarge`, `bodyMedium`, `bodySmall`
- `labelLarge`, `labelMedium`, `labelSmall`

### Button Components

#### button.filled
Primary action button

```json
{
  "type": "button.filled",
  "label": "Click Me",
  "icon": "add",
  "onPress": {
    "type": "action.snackbar.show",
    "message": "Clicked!"
  }
}
```

**Button Types:**
- `button.filled` - Primary (filled background)
- `button.outlined` - Secondary (outline only)
- `button.text` - Tertiary (no background)
- `button.elevated` - Raised with shadow
- `button.tonal` - Filled with tonal color

**Props:**
- `label`: string (required)
- `icon`: string (Material Icons name)
- `iconPosition`: "start" | "end"
- `disabled`: boolean
- `fullWidth`: boolean
- `onPress`: action object

### Input Components

#### input.text
Text input field

```json
{
  "type": "input.text",
  "label": "Email",
  "placeholder": "Enter your email",
  "value": "{{state.email}}",
  "onChange": {
    "type": "action.state.patch",
    "path": "email",
    "value": "{{event.value}}"
  }
}
```

**Input Types:**
- `input.text` - Single-line text
- `input.email` - Email validation
- `input.password` - Masked input
- `input.number` - Numeric input
- `input.textarea` - Multi-line text

**Props:**
- `label`: string
- `placeholder`: string
- `value`: string (with binding)
- `required`: boolean
- `disabled`: boolean
- `error`: string (error message)
- `helperText`: string
- `onChange`: action object

### Card Components

#### card
Material Design card

```json
{
  "type": "card",
  "variant": "elevated",
  "padding": 16,
  "onPress": {...},
  "children": [...]
}
```

**Variants:**
- `elevated` - Raised with shadow
- `filled` - Filled background
- `outlined` - Border only

### Image Components

#### image
Display images

```json
{
  "type": "image",
  "src": "https://picsum.photos/400/300",
  "alt": "Description",
  "fit": "cover",
  "width": "100%",
  "height": 200,
  "borderRadius": 8
}
```

**Fit options:**
- `cover` - Fill container, crop if needed
- `contain` - Fit inside container
- `fill` - Stretch to fill

#### avatar
Circular user avatar

```json
{
  "type": "avatar",
  "src": "https://i.pravatar.cc/150",
  "alt": "User name",
  "size": 40,
  "fallback": "JD"
}
```

### Chip Components

#### chip
Compact selectable element

```json
{
  "type": "chip",
  "label": "Filter",
  "variant": "outlined",
  "selected": "{{state.category === 'design'}}",
  "icon": "design_services",
  "onPress": {...}
}
```

**Variants:**
- `outlined` - Border only
- `filled` - Filled background

### Badge Components

#### badge
Small status indicator

```json
{
  "type": "badge",
  "label": "New",
  "color": "primary"
}
```

**Colors:**
- `primary`, `secondary`, `error`, `success`, `warning`, `info`

### Collection Components

#### collection.map
Render array of items

```json
{
  "type": "collection.map",
  "data": "{{state.items}}",
  "template": {
    "type": "card",
    "children": [
      {
        "type": "text",
        "content": "{{item.title}}"
      }
    ]
  }
}
```

**Context variables:**
- `{{item}}` - Current item
- `{{index}}` - Current index

### Conditional Components

#### conditional.render
Show/hide based on condition

```json
{
  "type": "conditional.render",
  "condition": "{{state.isLoggedIn}}",
  "children": [
    {
      "type": "text",
      "content": "Welcome back!"
    }
  ]
}
```

### Modal Components

#### modal
Overlay dialog

```json
{
  "type": "modal",
  "id": "confirm-dialog",
  "title": "Confirm Action",
  "fullScreen": false,
  "children": [...]
}
```

### Icon Components

#### icon
Material Design icon

```json
{
  "type": "icon",
  "name": "favorite",
  "size": 24,
  "color": "#E91E63"
}
```

Find icons at: https://fonts.google.com/icons

### Progress Components

#### progress.circular
Circular loading indicator

```json
{
  "type": "progress.circular",
  "size": 40,
  "color": "primary"
}
```

#### progress.linear
Linear progress bar

```json
{
  "type": "progress.linear",
  "value": 75,
  "color": "primary"
}
```

### Divider Component

#### divider
Visual separator

```json
{
  "type": "divider",
  "spacing": 16
}
```

## Actions

Actions define what happens when users interact with your app.

### action.state.patch
Update state values

```json
{
  "type": "action.state.patch",
  "path": "counter",
  "value": "{{state.counter + 1}}"
}
```

**Props:**
- `path`: string (dot notation for nested: "user.name")
- `value`: any (supports bindings)

### action.http.request
Make HTTP requests

```json
{
  "type": "action.http.request",
  "url": "https://api.example.com/data",
  "method": "GET",
  "onSuccess": {
    "type": "action.state.patch",
    "path": "data",
    "value": "{{response.data}}"
  },
  "onError": {
    "type": "action.snackbar.show",
    "message": "Failed to load data"
  }
}
```

**Methods:** GET, POST, PUT, DELETE, PATCH

**Context variables:**
- `{{response}}` - Response data (in onSuccess)
- `{{error}}` - Error object (in onError)

### action.snackbar.show
Show temporary message

```json
{
  "type": "action.snackbar.show",
  "message": "Item saved successfully!",
  "duration": 3000,
  "action": {
    "label": "Undo",
    "onPress": {...}
  }
}
```

### action.overlay.show
Open modal/dialog

```json
{
  "type": "action.overlay.show",
  "overlayId": "settings-modal"
}
```

### action.overlay.hide
Close modal/dialog

```json
{
  "type": "action.overlay.hide",
  "overlayId": "settings-modal"
}
```

### action.sequence
Run multiple actions in order

```json
{
  "type": "action.sequence",
  "actions": [
    {
      "type": "action.state.patch",
      "path": "loading",
      "value": true
    },
    {
      "type": "action.http.request",
      "url": "https://api.example.com/save",
      "method": "POST"
    },
    {
      "type": "action.state.patch",
      "path": "loading",
      "value": false
    }
  ]
}
```

### action.delay
Wait before next action

```json
{
  "type": "action.delay",
  "duration": 1000,
  "then": {
    "type": "action.snackbar.show",
    "message": "Delayed message"
  }
}
```

## Intents

Intents are named, reusable actions:

```json
{
  "intents": {
    "incrementCounter": {
      "handler": {
        "type": "action.state.patch",
        "path": "counter",
        "value": "{{state.counter + 1}}"
      }
    },
    "loadData": {
      "handler": {
        "type": "action.http.request",
        "url": "https://api.example.com/data",
        "method": "GET",
        "onSuccess": {
          "type": "action.state.patch",
          "path": "items",
          "value": "{{response}}"
        }
      }
    }
  },
  "screen": {
    "type": "button.filled",
    "label": "Load",
    "onPress": {
      "type": "intent",
      "name": "loadData"
    }
  }
}
```

## Design System

### Colors

Material Design 3 color tokens:

```javascript
// Primary
--md-sys-color-primary: #6750A4
--md-sys-color-on-primary: #FFFFFF

// Secondary
--md-sys-color-secondary: #625B71
--md-sys-color-on-secondary: #FFFFFF

// Surface
--md-sys-color-surface: #FFFBFE
--md-sys-color-on-surface: #1D1B20
```

Use hex colors directly in components:
```json
{
  "type": "text",
  "color": "#6750A4"
}
```

### Spacing

Use 8-point grid: 8, 16, 24, 32, 40, 48...

### Typography Scale

- Display: Hero text (45-57px)
- Headline: Section headers (24-32px)
- Title: Card/list titles (14-22px)
- Body: Paragraphs (12-16px)
- Label: Buttons, chips (11-14px)

## Complete Example: Course Gallery

```json
{
  "schemaVersion": "1.0.0",
  "state": {
    "selectedCategory": "All",
    "courses": [
      {
        "id": 1,
        "title": "UI/UX Design Masterclass",
        "category": "Design",
        "instructor": "Sarah Johnson",
        "rating": 4.8,
        "price": "$49.99",
        "image": "https://picsum.photos/seed/course1/400/225"
      },
      {
        "id": 2,
        "title": "React Development",
        "category": "Development",
        "instructor": "Mike Chen",
        "rating": 4.9,
        "price": "$59.99",
        "image": "https://picsum.photos/seed/course2/400/225"
      }
    ]
  },
  "screen": {
    "type": "layout.scaffold",
    "appBar": {
      "title": "Course Gallery"
    },
    "body": {
      "type": "layout.column",
      "padding": 16,
      "spacing": 24,
      "children": [
        {
          "type": "layout.row",
          "spacing": 8,
          "children": [
            {
              "type": "chip",
              "label": "All",
              "variant": "{{state.selectedCategory === 'All' ? 'filled' : 'outlined'}}",
              "onPress": {
                "type": "action.state.patch",
                "path": "selectedCategory",
                "value": "All"
              }
            },
            {
              "type": "chip",
              "label": "Design",
              "variant": "{{state.selectedCategory === 'Design' ? 'filled' : 'outlined'}}",
              "onPress": {
                "type": "action.state.patch",
                "path": "selectedCategory",
                "value": "Design"
              }
            }
          ]
        },
        {
          "type": "layout.grid",
          "columns": 3,
          "spacing": 16,
          "children": [
            {
              "type": "collection.map",
              "data": "{{state.courses.filter(c => state.selectedCategory === 'All' || c.category === state.selectedCategory)}}",
              "template": {
                "type": "card",
                "variant": "elevated",
                "children": [
                  {
                    "type": "image",
                    "src": "{{item.image}}",
                    "height": 160,
                    "fit": "cover"
                  },
                  {
                    "type": "layout.column",
                    "padding": 16,
                    "spacing": 8,
                    "children": [
                      {
                        "type": "badge",
                        "label": "{{item.category}}",
                        "color": "primary"
                      },
                      {
                        "type": "text",
                        "content": "{{item.title}}",
                        "style": "titleMedium"
                      },
                      {
                        "type": "text",
                        "content": "{{item.instructor}}",
                        "style": "bodySmall",
                        "color": "#79747E"
                      },
                      {
                        "type": "layout.row",
                        "mainAxisAlignment": "spaceBetween",
                        "children": [
                          {
                            "type": "text",
                            "content": "⭐ {{item.rating}}",
                            "style": "bodySmall"
                          },
                          {
                            "type": "text",
                            "content": "{{item.price}}",
                            "style": "titleMedium",
                            "color": "#6750A4"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            }
          ]
        }
      ]
    }
  }
}
```

## Best Practices

### 1. Use Meaningful State Keys
```json
// Good
"state": {
  "selectedCategory": "All",
  "isLoading": false,
  "userProfile": {...}
}

// Avoid
"state": {
  "cat": "All",
  "loading": false,
  "profile": {...}
}
```

### 2. Leverage Intents for Reusability
```json
"intents": {
  "selectCategory": {
    "handler": {
      "type": "action.sequence",
      "actions": [
        {
          "type": "action.state.patch",
          "path": "selectedCategory",
          "value": "{{event.category}}"
        },
        {
          "type": "action.state.patch",
          "path": "currentPage",
          "value": 1
        }
      ]
    }
  }
}
```

### 3. Use Conditional Rendering for Dynamic UIs
```json
{
  "type": "conditional.render",
  "condition": "{{state.items.length === 0}}",
  "children": [
    {
      "type": "text",
      "content": "No items found",
      "style": "bodyLarge",
      "color": "#79747E"
    }
  ]
}
```

### 4. Proper Error Handling
```json
{
  "type": "action.http.request",
  "url": "{{state.apiUrl}}",
  "onError": {
    "type": "action.sequence",
    "actions": [
      {
        "type": "action.state.patch",
        "path": "error",
        "value": "{{error.message}}"
      },
      {
        "type": "action.snackbar.show",
        "message": "Failed to load data. Please try again."
      }
    ]
  }
}
```

### 5. Responsive Layouts
```json
{
  "type": "layout.grid",
  "columns": 3,
  "responsive": true,
  "spacing": 16,
  "children": [...]
}
```

## Common Patterns

### Loading State
```json
{
  "state": {
    "isLoading": false
  },
  "screen": {
    "type": "conditional.render",
    "condition": "{{state.isLoading}}",
    "children": [
      {
        "type": "layout.column",
        "mainAxisAlignment": "center",
        "crossAxisAlignment": "center",
        "padding": 48,
        "children": [
          {
            "type": "progress.circular"
          }
        ]
      }
    ],
    "fallback": [
      {
        "type": "text",
        "content": "Content loaded!"
      }
    ]
  }
}
```

### Form Validation
```json
{
  "state": {
    "email": "",
    "emailError": ""
  },
  "intents": {
    "validateEmail": {
      "handler": {
        "type": "action.state.patch",
        "path": "emailError",
        "value": "{{state.email.includes('@') ? '' : 'Invalid email'}}"
      }
    }
  },
  "screen": {
    "type": "input.email",
    "label": "Email",
    "value": "{{state.email}}",
    "error": "{{state.emailError}}",
    "onChange": {
      "type": "action.sequence",
      "actions": [
        {
          "type": "action.state.patch",
          "path": "email",
          "value": "{{event.value}}"
        },
        {
          "type": "intent",
          "name": "validateEmail"
        }
      ]
    }
  }
}
```

### Pagination
```json
{
  "state": {
    "currentPage": 1,
    "itemsPerPage": 10,
    "totalItems": 100
  },
  "screen": {
    "type": "layout.row",
    "spacing": 8,
    "children": [
      {
        "type": "button.outlined",
        "label": "Previous",
        "disabled": "{{state.currentPage <= 1}}",
        "onPress": {
          "type": "action.state.patch",
          "path": "currentPage",
          "value": "{{state.currentPage - 1}}"
        }
      },
      {
        "type": "text",
        "content": "Page {{state.currentPage}}"
      },
      {
        "type": "button.outlined",
        "label": "Next",
        "disabled": "{{state.currentPage * state.itemsPerPage >= state.totalItems}}",
        "onPress": {
          "type": "action.state.patch",
          "path": "currentPage",
          "value": "{{state.currentPage + 1}}"
        }
      }
    ]
  }
}
```

## Tips for LLM Integration

1. **Be Specific**: Describe exact components, layouts, and interactions
2. **Reference This Guide**: Paste relevant sections as context
3. **Provide CDN Links**: Always include the unpkg links
4. **Use Examples**: Reference the course gallery or other examples
5. **Iterate**: Ask the LLM to refine or add features incrementally

## Resources

- **Documentation**: https://pineui.github.io/PineUI/documentation.html
- **NPM Package**: https://www.npmjs.com/package/@pineui/react
- **GitHub**: https://github.com/PineUI/PineUI
- **Material Icons**: https://fonts.google.com/icons

---

**Created by David Ruiz (wupsbr)** - CPTO at Ingresse, former Director of Engineering at iFood
