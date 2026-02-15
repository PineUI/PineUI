# PineUI Component Library

A collection of reusable, customizable components built with PineUI primitives and inspired by shadcn/ui, following Material Design 3 principles.

## Philosophy

These components are:
- **Copy-paste friendly**: Each component is a standalone JSON file
- **Customizable**: Built with PineUI primitives, easy to modify
- **Material Design 3**: Following MD3 color system and elevation
- **Framework agnostic**: Works with PineUI React, Flutter, and future implementations

## Component Registry

The `registry.json` file contains metadata for all available components, including:
- Component descriptions
- Available variants
- Required and optional props
- Usage examples

## Available Components

### Alert
Displays a callout for user attention with variants for different severity levels.

**Variants**: `default`, `destructive`, `success`, `warning`

**Props**:
- `title` (string, required): Alert title
- `description` (string, required): Alert message

**Example**:
```json
{
  "type": "component.alert.default",
  "props": {
    "title": "Heads up!",
    "description": "You can add components to your app using the cli."
  }
}
```

### Alert Dialog
A modal dialog that interrupts the user with important content and expects a response.

**Variants**: `default`, `destructive`

**Props**:
- `title` (string, required): Dialog title
- `description` (string, required): Dialog message
- `cancelLabel` (string, required): Cancel button label
- `confirmLabel` (string, required): Confirm button label
- `onCancel` (intent, required): Intent to trigger on cancel
- `onConfirm` (intent, required): Intent to trigger on confirm

**Example**:
```json
{
  "type": "component.alert-dialog.destructive",
  "props": {
    "title": "Delete account",
    "description": "This will permanently delete your account and all associated data.",
    "cancelLabel": "Cancel",
    "confirmLabel": "Delete",
    "onCancel": "dialog.close",
    "onConfirm": "account.delete"
  }
}
```

### Badge
Displays a badge or tag to highlight an item or status.

**Variants**: `default`, `destructive`, `success`, `outline`

**Props**:
- `label` (string, required): Badge text

**Example**:
```json
{
  "type": "component.badge.success",
  "props": {
    "label": "Active"
  }
}
```

### Card
Displays a card with optional header, content, and footer sections.

**Variants**: `default`, `elevated`, `with-footer`

**Props**:
- `title` (string, required): Card title
- `description` (string, required): Card content
- `cancelLabel` (string, optional): Cancel button label (with-footer only)
- `actionLabel` (string, optional): Action button label (with-footer only)
- `onCancel` (intent, optional): Intent to trigger on cancel (with-footer only)
- `onAction` (intent, optional): Intent to trigger on action (with-footer only)

**Example**:
```json
{
  "type": "component.card.elevated",
  "props": {
    "title": "Elevated Card",
    "description": "This card has elevation for a lifted appearance."
  }
}
```

## Using Components

### 1. Import in your UI JSON

Add the component files to your imports section:

```json
{
  "imports": {
    "components": [
      "../../components/ui/alert/default.json",
      "../../components/ui/badge/success.json"
    ]
  }
}
```

### 2. Use in your screen

Reference the component by its type:

```json
{
  "type": "component.alert.default",
  "props": {
    "title": "Welcome!",
    "description": "Thanks for using PineUI components."
  }
}
```

## Component Structure

Each component is built using PineUI primitives:
- `layout.column` / `layout.row`: For layout structure
- `text`: For displaying text content
- `button.*`: For interactive elements
- `divider`: For visual separation

Components follow Material Design 3 color system:
- **Primary**: `#6750A4` (primary container: `#E8DEF8`)
- **Error**: `#B3261E` (error container: `#F9DEDC`)
- **Success**: `#2E7D32` (success container: `#D5E8D4`)
- **Warning**: `#F57F17` (warning container: `#FFF3CD`)

## Creating New Components

To create a new component:

1. Create a new directory in `ui/` with your component name
2. Create variant JSON files (e.g., `default.json`, `outlined.json`)
3. Add metadata to `registry.json`
4. Test your component in the showcase demo

## Showcase Demo

See all components in action: `docs/demos/components-showcase/ui.json`

## Flutter Compatibility

All components are designed to be 100% compatible with Flutter mobile:
- Uses standard PineUI primitives that work across platforms
- Border radius, padding, spacing values work in both web and mobile
- Material Design 3 colors are consistent across platforms
- Layout properties (flex, spacing, alignment) are universal

## Contributing

Feel free to contribute new components or variants! Follow the existing patterns and Material Design 3 guidelines.

## License

MIT
