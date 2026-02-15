# Component Library Roadmap

Planned components for the PineUI component library, inspired by shadcn/ui and Material Design 3.

## ✅ Completed

- [x] Alert (default, destructive, success, warning)
- [x] Badge (default, destructive, success, outline)
- [x] Card (default, elevated, with-footer)
- [x] Alert Dialog (default, destructive)

## 🚧 Priority Components

### Forms & Input
- [ ] **Input** - Text input with variants (outlined, filled)
- [ ] **Textarea** - Multi-line text input
- [ ] **Select** - Dropdown selection
- [ ] **Combobox** - Searchable select with autocomplete
- [ ] **Checkbox** - Binary choice input
- [ ] **Radio Group** - Mutually exclusive options
- [ ] **Switch** - Toggle switch
- [ ] **Slider** - Range input
- [ ] **Date Picker** - Calendar date selection
- [ ] **Time Picker** - Time selection
- [ ] **Form** - Form container with validation

### Feedback & Loading
- [ ] **Toast / Snackbar** - Temporary notification
- [ ] **Progress** - Linear and circular progress indicators
- [ ] **Skeleton** - Loading placeholder
- [ ] **Spinner** - Loading indicator
- [ ] **Empty State** - No data placeholder

### Navigation
- [ ] **Menu** - Dropdown menu
- [ ] **Context Menu** - Right-click menu
- [ ] **Breadcrumb** - Navigation trail
- [ ] **Pagination** - Page navigation
- [ ] **Navigation Rail** - Side navigation
- [ ] **Bottom Navigation** - Mobile bottom nav
- [ ] **App Bar / Top Bar** - Application header

### Data Display
- [ ] **Table** - Data table with sorting/filtering
- [ ] **Data Grid** - Advanced table with inline editing
- [ ] **List** - Ordered/unordered lists
- [ ] **Timeline** - Chronological event display
- [ ] **Stat Card** - Metric display card
- [ ] **Accordion** - Collapsible content sections
- [ ] **Collapse** - Expandable content

### Overlay & Modal
- [ ] **Dialog** - General purpose modal
- [ ] **Drawer** - Side panel
- [ ] **Sheet** - Bottom sheet (mobile)
- [ ] **Popover** - Floating content container
- [ ] **Tooltip** - Hover information
- [ ] **Modal** - Full-screen overlay

### Media
- [ ] **Carousel** - Sliding image/content gallery
- [ ] **Gallery** - Grid image gallery
- [ ] **Image** - Optimized image with loading states
- [ ] **Video Player** - Video with controls

### Layout
- [ ] **Container** - Max-width centered container
- [ ] **Grid** - Responsive grid layout
- [ ] **Stack** - Layered components
- [ ] **Separator** - Visual divider (already have divider primitive)
- [ ] **Aspect Ratio** - Fixed ratio container
- [ ] **Scroll Area** - Custom scrollbar container

### Advanced Components
- [ ] **Command** - Command palette (⌘K)
- [ ] **Search** - Search input with suggestions
- [ ] **Calendar** - Full calendar view
- [ ] **Color Picker** - Color selection
- [ ] **File Upload** - Drag-drop file upload
- [ ] **Rating** - Star rating input
- [ ] **Stepper** - Multi-step process indicator
- [ ] **Chart** - Data visualization (bar, line, pie)

## 🎨 Material Design 3 Specific

### Navigation Components
- [ ] **Navigation Drawer** - MD3 drawer with sections
- [ ] **Navigation Bar** - MD3 bottom navigation
- [ ] **Search Bar** - MD3 search with history
- [ ] **Top App Bar** - Small, medium, large variants

### Selection Components
- [ ] **Chips** - Input, filter, suggestion chips
- [ ] **Segmented Button** - Grouped toggle buttons
- [ ] **List Item** - MD3 list with leading/trailing

### Container Components
- [ ] **FAB** - Floating action button (small, medium, large)
- [ ] **Extended FAB** - FAB with label
- [ ] **Bottom Sheet** - Modal and standard variants

## 🌟 Advanced Features

### Composition Patterns
- [ ] **Form Builder** - Dynamic form generation
- [ ] **Dashboard Grid** - Resizable dashboard layout
- [ ] **Split Pane** - Resizable split view
- [ ] **Virtualized List** - Performance for large lists
- [ ] **Infinite Scroll** - Load more on scroll

### Specialized Components
- [ ] **Markdown Viewer** - Rendered markdown
- [ ] **Code Block** - Syntax highlighted code
- [ ] **Diff Viewer** - Side-by-side diff
- [ ] **JSON Viewer** - Collapsible JSON tree
- [ ] **Kanban Board** - Drag-drop task board

## 📱 Mobile-First Components

- [ ] **Pull to Refresh** - Mobile refresh pattern
- [ ] **Swipe Actions** - Swipe-to-reveal actions
- [ ] **Bottom Sheet** - Native mobile sheet
- [ ] **Action Sheet** - iOS-style action picker
- [ ] **Toast** - Mobile notification

## 🎯 Component Priority Levels

### P0 (Essential - Next Sprint)
1. Input (text, email, password variants)
2. Select / Dropdown
3. Toast / Snackbar
4. Dialog (general purpose)
5. Menu / Dropdown Menu

### P1 (High Priority)
1. Checkbox & Radio Group
2. Switch
3. Skeleton
4. Progress (linear, circular)
5. Table
6. Breadcrumb
7. Tooltip
8. Popover

### P2 (Medium Priority)
1. Tabs (already in primitives, need styled version)
2. Accordion
3. Carousel
4. Date Picker
5. Navigation Rail
6. Drawer
7. Bottom Sheet

### P3 (Nice to Have)
1. Calendar
2. Command Palette
3. Color Picker
4. File Upload
5. Charts
6. Advanced Data Grid

## 🔄 Update Frequency

- **Monthly**: Release 3-5 new components
- **Quarterly**: Major feature additions (CLI, marketplace)
- **Continuous**: Bug fixes and improvements

## 📦 Variant Strategy

Each component should have:
- **default**: Standard variant
- **outlined**: Outlined style
- **filled**: Filled background
- **text**: Text-only (for buttons)
- **elevated**: With elevation
- **tonal**: Filled with tonal color

State variants:
- **disabled**: Non-interactive state
- **error**: Error state
- **success**: Success state
- **loading**: Loading state

## 🌐 Platform Support

All components must support:
- ✅ Web (React)
- ✅ Mobile (Flutter)
- 🔜 Desktop (Flutter)
- 🔜 Server-side rendering

## 📚 Documentation

Each component needs:
- Props documentation
- Usage examples
- Accessibility notes
- Best practices
- Related components

## 🤝 Community Contributions

We welcome:
- New component ideas
- Variant suggestions
- Bug reports
- Documentation improvements
- Example applications

## Next Steps

1. ✅ Create core components (Alert, Badge, Card, Alert Dialog)
2. 🎯 Build CLI tool for component installation
3. 🎯 Create P0 components (Input, Select, Toast, Dialog, Menu)
4. 🎯 Build web-based component browser
5. 🔜 Implement marketplace
6. 🔜 Add Flutter implementation for all components
