# @pineui/react

Server-Driven UI framework for AI-native applications. Build dynamic, multi-platform interfaces from JSON schemas.

🍍 **PineUI** helps you peel through the tough challenges of building dynamic, cross-platform UIs.

## Installation

```bash
npm install @pineui/react react react-dom
```

## Quick Start

```tsx
import { PineUI } from '@pineui/react';

function App() {
  return (
    <PineUI
      schema={{
        schemaVersion: "1.0.0",
        screen: {
          type: "layout.column",
          padding: 16,
          spacing: 16,
          children: [
            {
              type: "text",
              content: "Hello PineUI!",
              style: "titleLarge"
            },
            {
              type: "button.filled",
              label: "Click Me",
              onPress: {
                type: "action.snackbar.show",
                message: "Button clicked!"
              }
            }
          ]
        }
      }}
    />
  );
}
```

## Standalone Usage (CDN)

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
        schemaVersion: "1.0.0",
        screen: {
          type: "text",
          content: "Hello from PineUI!",
          style: "titleLarge"
        }
      }
    });
  </script>
</body>
</html>
```

## Features

- 🚀 **Fast** - 60 FPS guaranteed, ~52KB gzipped
- 🌍 **Cross-Platform** - Same JSON schema works on Web and Mobile (Flutter coming soon)
- 🤖 **AI-Friendly** - LLMs can generate valid UIs without specific training
- 🎨 **Material Design 3** - Beautiful components out of the box
- 🔄 **Reactive** - Built-in state management with automatic UI updates
- 📱 **Responsive** - Mobile-first with automatic breakpoints

## Documentation

📖 [Complete Documentation](https://pineui.github.io/PineUI/documentation.html)

🚀 [Live Demos](https://pineui.github.io/PineUI/)

## Example: LLM-Generated UI

```javascript
// Just describe what you want to an LLM:
// "Create a course gallery with category filters using PineUI"

const schema = {
  schemaVersion: "1.0.0",
  state: { selectedCategory: "All" },
  screen: {
    type: "layout.column",
    children: [
      // ... LLM generates complete UI ...
    ]
  }
};

PineUI.render({ target: '#app', schema });
```

## License

Apache 2.0 with Commons Clause

**You CAN:**
- ✅ Use PineUI for free in your projects (commercial or non-commercial)
- ✅ Modify the source code
- ✅ Distribute copies of PineUI
- ✅ Use it in proprietary software

**You CANNOT:**
- ❌ Sell PineUI itself as a product or service
- ❌ Offer hosting or consulting services where the primary value comes from PineUI

For commercial licensing: wupsbr@gmail.com

## Creator

Created by **David Ruiz (wupsbr)** - CPTO at Ingresse, former Director of Engineering at iFood (R$70B+ GMV), CTO at Paraná Banco, and co-founder of ONOVOLAB.

Developed by Luma Ventures Ltda (CNPJ: 21.951.820/0001-39)

## Links

- [GitHub Repository](https://github.com/PineUI/PineUI)
- [Documentation](https://pineui.github.io/PineUI/documentation.html)
- [Live Demos](https://pineui.github.io/PineUI/)
- [Issues](https://github.com/PineUI/PineUI/issues)

---

🍍 **Peel through tough UI challenges with PineUI**
