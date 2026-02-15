# PineUI CLI (Future Vision)

Inspired by shadcn/ui, a CLI tool for adding components to your PineUI project.

## Concept

Instead of installing components as dependencies, copy them directly into your project where you have full control and can customize them.

## Future Commands

### Add Component

```bash
pineui add alert
```

This will:
1. Copy the alert component files to your project
2. Add the component to your local registry
3. Show usage instructions

### Add Specific Variant

```bash
pineui add alert:destructive
```

Copy only the destructive variant of the alert component.

### Add Multiple Components

```bash
pineui add alert badge card
```

Add multiple components at once.

### List Available Components

```bash
pineui list
```

Shows all available components in the registry.

### Search Components

```bash
pineui search dialog
```

Search for components by name or description.

## Component Installation Path

By default, components are installed to:
```
<project-root>/components/ui/
```

You can customize this in `pineui.config.json`:
```json
{
  "componentsPath": "./src/components/ui"
}
```

## Registry

The CLI uses the component registry to understand what's available:
- Component metadata
- Variants
- Dependencies
- Props schema

## Benefits

1. **Full Control**: Components are copied to your project, not locked in a package
2. **Customizable**: Modify components to fit your needs
3. **Version Control**: Components are versioned with your code
4. **No Dependencies**: No need to keep updating component packages
5. **Type Safety**: Props are documented in the registry

## Marketplace Vision

Future marketplace where developers can:
- **Publish**: Share custom components with the community
- **Discover**: Browse components by category, popularity
- **Rate**: Review and rate components
- **Contribute**: Improve existing components

Example:
```bash
# Install from official registry
pineui add alert

# Install from community registry
pineui add @johndoe/custom-card

# Install from GitHub
pineui add github:username/repo/components/ui/alert
```

## Component Categories

- **Layout**: Grid, Stack, Container, Divider
- **Forms**: Input, Select, Checkbox, Radio, Switch, DatePicker
- **Feedback**: Alert, Toast, Progress, Skeleton, Spinner
- **Navigation**: Tabs, Menu, Breadcrumb, Pagination
- **Data Display**: Table, List, Card, Badge, Avatar, Chip
- **Overlay**: Dialog, Drawer, Popover, Tooltip, Sheet
- **Media**: Image, Video, Carousel, Gallery

## Implementation Roadmap

1. **Phase 1**: Create core component library (✅ Done)
2. **Phase 2**: Build CLI tool for adding components
3. **Phase 3**: Create web-based component browser
4. **Phase 4**: Implement marketplace for community components
5. **Phase 5**: Add versioning and dependency management

## Contributing Components

To publish a component to the registry:

1. Create component JSON files
2. Add metadata to `registry.json`
3. Write documentation and examples
4. Test across React and Flutter
5. Submit PR to PineUI repository

## Quality Standards

Components must:
- Follow Material Design 3 guidelines
- Be fully typed (props documented)
- Work on both React and Flutter
- Include usage examples
- Be accessible (WCAG 2.1 AA)
- Support theming
