# 🍍 PineUI

[![License](https://img.shields.io/badge/License-Apache%202.0%20with%20Commons%20Clause-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-green.svg)](package.json)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-61dafb.svg)](https://reactjs.org/)

**Server-Driven UI Protocol and SDK for AI-Native Applications**

PineUI é um protocolo completo e SDK multi-plataforma para construir interfaces declarativas renderizadas a partir de JSON, com governança centralizada no servidor. Projetado para escalar para milhões de usuários e ser compreensível por Large Language Models.

> 🏢 Desenvolvido por [Luma Ventures](https://lumaventures.com) | CNPJ: 21.951.820/0001-39

---

## 📑 Índice

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Arquitetura](#-arquitetura)
- [Conceitos Fundamentais](#-conceitos-fundamentais)
- [Componentes (Primitives)](#-componentes-primitives)
- [Patterns](#-patterns)
- [Actions vs Intents](#-actions-vs-intents)
- [State Management](#-state-management)
- [Data Binding](#-data-binding)
- [Collections & Pagination](#-collections--pagination)
- [Layouts](#-layouts)
- [Modals & Overlays](#-modals--overlays)
- [Styling](#-styling)
- [Demos Completas](#-demos-completas)
- [API Reference](#-api-reference)
- [Best Practices](#-best-practices)
- [Roadmap](#️-roadmap)

---

## 🌟 Features

- 🚀 **Escala para milhões** - Virtualização automática, cache inteligente, lazy loading
- 🌍 **Multi-plataforma** - React hoje, Flutter amanhã, mesmo JSON
- 🤖 **AI-Friendly** - LLMs podem gerar UIs válidas sem treinamento específico
- 🧱 **Consistência Total** - Material Design 3 nativo garantindo UX uniforme
- 🔐 **Governança Server-Side** - 100% da lógica de negócio no servidor
- ⚡ **Zero Dependencies** - Script tag único de ~50KB gzipped
- 📊 **Performance** - 60 FPS garantido em listas infinitas
- 🎨 **Theming** - Suporte completo a temas customizados
- 🔄 **Real-time Updates** - State management reativo
- 📱 **Responsive** - Mobile-first com breakpoints automáticos

---

## 🚀 Quick Start

### Instalação

```bash
git clone https://github.com/pineui/pineui.git
cd pineui
npm install
```

### Build & Run

```bash
# Build do SDK React
npm run build --workspace=@pineui/react

# Iniciar servidor de desenvolvimento
cd docs
python3 -m http.server 8080

# Abrir no navegador
open http://localhost:8080
```

### Demos Disponíveis

| Demo | URL | Descrição |
|------|-----|-----------|
| 🐦 Twitter | `?demo=twitter` | Feed completo com posts, likes, compose |
| 🖼️ Gallery | `?demo=gallery` | Grid de cursos com filtros por categoria |
| 📬 Inbox | `?demo=inbox` | Mensageiro com 3 colunas interativas |
| 👥 Admin | `?demo=admin` | Dashboard com tabs e tabela de usuários |

---

## 🏗️ Arquitetura

### Visão Geral

```
┌─────────────────────────────────────────────────┐
│                   SERVER                        │
│  ┌─────────────┐         ┌──────────────┐     │
│  │  Business   │────────▶│  JSON Schema │     │
│  │    Logic    │         │   Generator  │     │
│  └─────────────┘         └──────────────┘     │
│                                   │             │
└───────────────────────────────────┼─────────────┘
                                    │ HTTP/JSON
                                    ▼
┌─────────────────────────────────────────────────┐
│                   CLIENT                        │
│  ┌──────────────┐       ┌───────────────┐     │
│  │   PineUI SDK │──────▶│   Renderer    │     │
│  │  (React/Web) │       │  (React/Flt)  │     │
│  └──────────────┘       └───────────────┘     │
│         │                        │              │
│         │                        ▼              │
│         │               ┌───────────────┐      │
│         └──────────────▶│  Native UI    │      │
│                         └───────────────┘      │
└─────────────────────────────────────────────────┘
```

### Fluxo de Dados

1. **Server** gera JSON schema baseado em lógica de negócio
2. **Client** recebe schema via HTTP/JSON
3. **PineUI SDK** parseia e valida o schema
4. **Renderer** converte JSON em componentes nativos
5. **User interactions** disparam intents
6. **Intents** são resolvidos para actions no servidor
7. **State** é atualizado e UI re-renderiza

---

## 🧠 Conceitos Fundamentais

### 1. Schema-Driven UI

Todo o UI é definido em JSON declarativo:

```json
{
  "schemaVersion": "1.0.0",
  "state": {
    "counter": 0
  },
  "screen": {
    "type": "layout.column",
    "children": [...]
  }
}
```

**Vantagens:**
- ✅ UI pode mudar sem rebuild do app
- ✅ A/B testing sem deploy
- ✅ Personalização por usuário
- ✅ IA pode gerar UIs válidas

### 2. Separação UI/Data

PineUI separa claramente:
- **ui.json** - Estrutura da interface
- **api.json** - Dados e endpoints

Exemplo de estrutura:
```
demos/
  inbox/
    ui.json    ← Componentes, layouts, patterns
    api.json   ← Endpoints, responses, mock data
```

### 3. Material Design 3

Todos os componentes seguem MD3:
- **Tokens de cor:** `primary`, `onPrimary`, `surface`, `error`
- **Tipografia:** `titleLarge`, `bodyMedium`, `labelSmall`
- **Elevation:** Sombras automáticas
- **Motion:** Transições suaves

### 4. Progressive Enhancement

```json
{
  "type": "button.filled",
  "label": "Click me",
  "enabled": true,          // ← Basic
  "loading": false,         // ← Enhanced
  "icon": "✓",             // ← Enhanced
  "onPress": {...}          // ← Interactive
}
```

Funciona de simples a complexo progressivamente.

---

## 🧩 Componentes (Primitives)

### Text

Renderiza texto com estilos Material Design 3.

**Props:**
```typescript
{
  type: "text"
  content: string              // Texto ou binding {{...}}
  style?: "titleLarge" | "titleMedium" | "titleSmall" |
          "bodyLarge" | "bodyMedium" | "bodySmall" |
          "headlineSmall"
  fontWeight?: "normal" | "bold" | "500" | "600" | "700"
  color?: "primary" | "onPrimary" | "surface" | "onSurface" |
          "onSurfaceVariant" | "error" | "success"
}
```

**Exemplo:**
```json
{
  "type": "text",
  "content": "Welcome, {{user.name}}!",
  "style": "titleLarge",
  "fontWeight": "bold",
  "color": "primary"
}
```

### Button

Botões seguindo MD3 com variantes.

**Variantes:**
- `button.filled` - Botão preenchido (call-to-action principal)
- `button.text` - Botão de texto (ações secundárias)
- `button.icon` - Botão apenas com ícone
- `button.fab` - Floating Action Button

**Props:**
```typescript
{
  type: "button.filled" | "button.text" | "button.icon" | "button.fab"
  label?: string              // Texto do botão
  icon?: string               // Emoji ou ícone
  enabled?: boolean           // Habilitado/desabilitado
  loading?: boolean           // Estado de loading
  size?: "small" | "medium" | "large"
  onPress?: ActionNode        // Ação ao clicar
}
```

**Exemplos:**

```json
// Botão filled
{
  "type": "button.filled",
  "label": "Salvar",
  "icon": "💾",
  "onPress": {
    "type": "intent.form.submit"
  }
}

// Botão icon
{
  "type": "button.icon",
  "icon": "❤️",
  "size": "small",
  "onPress": {
    "type": "intent.post.like",
    "postId": "{{post.id}}"
  }
}

// FAB
{
  "type": "button.fab",
  "icon": "✏️",
  "onPress": {
    "type": "intent.compose.open"
  }
}
```

### Input

Campos de texto para entrada de dados.

**Props:**
```typescript
{
  type: "input.text"
  placeholder?: string         // Texto placeholder
  value?: string              // Binding para state: {{state.fieldName}}
  multiline?: boolean         // Textarea vs input
  onChange?: ActionNode       // Disparado ao digitar
}
```

**Exemplo com State Binding:**
```json
{
  "type": "input.text",
  "placeholder": "Digite sua mensagem...",
  "value": "{{state.messageText}}",
  "onChange": {
    "type": "action.state.patch",
    "path": "messageText",
    "value": "{{value}}"
  }
}
```

### Avatar

Imagem circular para perfis.

**Props:**
```typescript
{
  type: "avatar"
  src: string                 // URL da imagem
  size?: number               // Tamanho em pixels (padrão: 40)
}
```

**Exemplo:**
```json
{
  "type": "avatar",
  "src": "{{user.avatar}}",
  "size": 80
}
```

### Card

Container com elevation para agrupar conteúdo.

**Props:**
```typescript
{
  type: "card"
  child: ComponentNode        // Filho único
  elevation?: 0 | 1 | 2       // Nível de sombra
  padding?: number            // Padding interno
  onTap?: ActionNode          // Clicável
}
```

**Exemplo:**
```json
{
  "type": "card",
  "elevation": 1,
  "padding": 16,
  "onTap": {
    "type": "intent.product.view",
    "productId": "{{product.id}}"
  },
  "child": {
    "type": "text",
    "content": "{{product.name}}"
  }
}
```

### Image

Renderiza imagens com carregamento otimizado.

**Props:**
```typescript
{
  type: "image"
  src: string                 // URL da imagem
  width?: number | string     // Largura
  height?: number | string    // Altura
  fit?: "cover" | "contain" | "fill"
}
```

### Divider

Linha horizontal para separar conteúdo.

**Props:**
```typescript
{
  type: "divider"
}
```

### Tabs

Navegação por abas com badge support.

**Props:**
```typescript
{
  type: "tabs"
  tabs: Array<{
    id: string
    label: string
    icon?: string
    badge?: number           // Badge de contagem
    content: ComponentNode
  }>
  defaultTab?: string
}
```

**Exemplo:**
```json
{
  "type": "tabs",
  "tabs": [
    {
      "id": "inbox",
      "label": "Inbox",
      "content": {...}
    },
    {
      "id": "unread",
      "label": "Unread",
      "badge": 5,
      "content": {...}
    }
  ],
  "defaultTab": "inbox"
}
```

### Badge

Label colorido para status/contadores.

**Props:**
```typescript
{
  type: "badge"
  label: string
  variant?: "default" | "success" | "warning" | "error" | "info"
  size?: "small" | "medium" | "large"
}
```

**Exemplo:**
```json
{
  "type": "badge",
  "label": "New",
  "variant": "success",
  "size": "small"
}
```

### Chip

Tag interativa e selecionável.

**Props:**
```typescript
{
  type: "chip"
  label: string
  selected?: boolean
  onPress?: ActionNode
}
```

**Exemplo:**
```json
{
  "type": "chip",
  "label": "Design",
  "selected": "{{state.selectedCategory == 'Design'}}",
  "onPress": {
    "type": "intent.category.select",
    "category": "Design"
  }
}
```

### Progress

Barra de progresso visual.

**Props:**
```typescript
{
  type: "progress"
  label?: string
  value: number              // 0-100
  variant?: "primary" | "success" | "error"
}
```

**Exemplo:**
```json
{
  "type": "progress",
  "label": "Course Progress",
  "value": 75,
  "variant": "primary"
}
```

### Table

Tabela de dados com ordenação.

**Props:**
```typescript
{
  type: "table"
  columns: Array<{
    key: string
    label: string
    width?: string
    template?: ComponentNode
  }>
  data: any[] | ActionNode    // Array estático ou HTTP
}
```

**Exemplo:**
```json
{
  "type": "table",
  "columns": [
    {"key": "name", "label": "Name"},
    {"key": "email", "label": "Email"},
    {"key": "role", "label": "Role"}
  ],
  "data": {
    "type": "action.http",
    "method": "GET",
    "url": "/api/users"
  }
}
```

---

## 🎨 Patterns

Patterns são **componentes compostos reutilizáveis** definidos no schema.

### Como Definir um Pattern

```json
{
  "patterns": {
    "pattern.postCard": {
      "definition": {
        "type": "card",
        "padding": 16,
        "child": {
          "type": "layout.column",
          "spacing": 12,
          "children": [
            {
              "type": "layout.row",
              "spacing": 12,
              "children": [
                {
                  "type": "avatar",
                  "src": "{{props.post.author.avatar}}",
                  "size": 40
                },
                {
                  "type": "layout.column",
                  "flex": 1,
                  "children": [
                    {
                      "type": "text",
                      "content": "{{props.post.author.displayName}}",
                      "style": "bodyMedium",
                      "fontWeight": "bold"
                    },
                    {
                      "type": "text",
                      "content": "{{props.post.createdAt | timeAgo}}",
                      "style": "bodySmall",
                      "color": "onSurfaceVariant"
                    }
                  ]
                }
              ]
            },
            {
              "type": "text",
              "content": "{{props.post.content.text}}",
              "style": "bodyMedium"
            }
          ]
        }
      }
    }
  }
}
```

### Como Usar um Pattern

```json
{
  "type": "pattern.postCard",
  "props": {
    "post": {
      "id": "123",
      "author": {...},
      "content": {...}
    }
  }
}
```

### Vantagens dos Patterns

✅ **Reusabilidade** - Define uma vez, usa em múltiplos lugares
✅ **Consistência** - Mantém UI uniforme automaticamente
✅ **Manutenibilidade** - Atualiza em um só lugar
✅ **AI-Friendly** - LLMs aprendem patterns rapidamente

---

## ⚡ Actions vs Intents

### Filosofia

**Actions** = **COMO** fazer (técnico)
**Intents** = **O QUE** o usuário quer (semântico)

### Actions (Low-Level)

Actions são instruções técnicas diretas:

```json
{
  "type": "action.http",
  "method": "POST",
  "url": "/api/posts/123/like",
  "body": {"liked": true}
}

{
  "type": "action.state.patch",
  "path": "counter",
  "value": 10
}

{
  "type": "action.overlay.open",
  "overlayId": "confirmDialog"
}
```

**Actions disponíveis:**

| Action | Descrição |
|--------|-----------|
| `action.http` | Requisição HTTP |
| `action.state.patch` | Atualiza state local |
| `action.overlay.open` | Abre modal/overlay |
| `action.overlay.close` | Fecha overlay |
| `action.snackbar.show` | Mostra toast |
| `action.collection.refresh` | Recarrega collection |

### Intents (High-Level)

Intents expressam **intenção do usuário**:

```json
{
  "type": "intent.post.like",
  "postId": "123"
}

{
  "type": "intent.conversation.select",
  "conversationId": "456"
}

{
  "type": "intent.category.select",
  "category": "Design"
}
```

**Definindo Intents no Schema:**

```json
{
  "intents": {
    "post.like": {
      "handler": [
        {
          "type": "action.http",
          "method": "POST",
          "url": "/api/posts/{{postId}}/like"
        },
        {
          "type": "action.snackbar.show",
          "message": "Post liked!"
        }
      ]
    },
    "conversation.select": {
      "handler": {
        "type": "action.state.patch",
        "path": "selectedConversationId",
        "value": "{{conversationId}}"
      }
    }
  }
}
```

### Por Que Usar Intents?

✅ **Governança** - Server controla implementação
✅ **Flexibilidade** - Muda lógica sem mudar UI
✅ **Analytics** - Track user intentions facilmente
✅ **Testing** - Mock intents independentemente
✅ **AI-Friendly** - Semântica clara para LLMs

**Exemplo Completo:**

```json
// Component usa intent
{
  "type": "button.icon",
  "icon": "❤️",
  "onPress": {
    "type": "intent.post.like",
    "postId": "{{post.id}}"
  }
}

// Server define como implementar
{
  "intents": {
    "post.like": {
      "handler": [
        {
          "type": "action.http",
          "method": "POST",
          "url": "/api/posts/{{postId}}/like"
        },
        {
          "type": "action.state.patch",
          "path": "likedPosts",
          "value": ["{{postId}}"]
        },
        {
          "type": "action.snackbar.show",
          "message": "Liked! ❤️"
        }
      ]
    }
  }
}
```

---

## 🔄 State Management

PineUI tem state management reativo built-in.

### Declarando State Inicial

```json
{
  "schemaVersion": "1.0.0",
  "state": {
    "counter": 0,
    "selectedTab": "home",
    "selectedConversationId": "1",
    "messageText": "",
    "filters": {
      "category": "All",
      "sortBy": "date"
    }
  }
}
```

### Binding de State em Componentes

Use a sintaxe `{{state.path}}`:

```json
{
  "type": "text",
  "content": "Counter: {{state.counter}}"
}

{
  "type": "chip",
  "label": "All",
  "selected": "{{state.filters.category == 'All'}}"
}
```

### Atualizando State

Use `action.state.patch`:

```json
{
  "type": "button.filled",
  "label": "Increment",
  "onPress": {
    "type": "action.state.patch",
    "path": "counter",
    "value": "{{state.counter + 1}}"
  }
}
```

### State em URLs

State pode ser injetado em URLs de API:

```json
{
  "type": "collection",
  "data": {
    "type": "action.http",
    "url": "/api/messages?conversationId={{state.selectedConversationId}}"
  }
}
```

Quando `state.selectedConversationId` muda, a collection recarrega automaticamente!

### State Complexo

```json
{
  "state": {
    "user": {
      "id": "123",
      "name": "John",
      "preferences": {
        "theme": "dark",
        "notifications": true
      }
    }
  }
}

// Acesso:
"{{state.user.name}}"
"{{state.user.preferences.theme}}"
```

---

## 🔗 Data Binding

### Binding Syntax

PineUI usa `{{expression}}` para bindings:

```json
"{{item}}"                          // Item atual (collections)
"{{item.author.name}}"              // Navegação de propriedades
"{{props.post.content.text}}"       // Props de patterns
"{{state.counter}}"                 // State global
"{{state.category == 'All'}}"       // Expressões booleanas
"{{item.createdAt | timeAgo}}"      // Filters
```

### Contextos de Binding

**1. Collections (`item`)**

Dentro de `itemTemplate` de collections:

```json
{
  "type": "collection",
  "data": [...],
  "itemTemplate": {
    "type": "text",
    "content": "{{item.name}}"  // ← 'item' = elemento atual
  }
}
```

**2. Patterns (`props`)**

Dentro da `definition` de patterns:

```json
{
  "patterns": {
    "pattern.userCard": {
      "definition": {
        "type": "text",
        "content": "{{props.user.name}}"  // ← 'props' passado externamente
      }
    }
  }
}

// Uso:
{
  "type": "pattern.userCard",
  "props": {
    "user": {"name": "John"}
  }
}
```

**3. State (`state`)**

Global, acessível em qualquer lugar:

```json
{
  "type": "text",
  "content": "Hello {{state.user.name}}"
}
```

### Expressões Condicionais

```json
// Comparação
"{{state.tab == 'home'}}"

// Negação
"{{!state.loading}}"

// Verificação de nulo
"{{item.badge != null}}"
```

### Filters

Transformações de dados:

```json
// timeAgo - converte timestamp para "2h ago"
"{{post.createdAt | timeAgo}}"

// Futuros: capitalize, truncate, currency, etc.
```

---

## 📋 Collections & Pagination

Collections renderizam listas com virtualização automática.

### Props

```typescript
{
  type: "collection"
  layout: "list" | "grid"           // Layout da coleção
  columns?: number                  // Colunas (grid apenas)
  spacing?: number                  // Espaçamento entre itens
  data: any[] | ActionNode          // Dados estáticos ou HTTP
  itemTemplate: ComponentNode       // Template para cada item
  emptyState?: ComponentNode        // Exibido se vazio
  loadingState?: ComponentNode      // Exibido durante load
}
```

### Collection com Array Estático

```json
{
  "type": "collection",
  "layout": "list",
  "data": [
    {"id": "1", "name": "Item 1"},
    {"id": "2", "name": "Item 2"}
  ],
  "itemTemplate": {
    "type": "text",
    "content": "{{item.name}}"
  }
}
```

### Collection com HTTP

```json
{
  "type": "collection",
  "layout": "list",
  "data": {
    "type": "action.http",
    "method": "GET",
    "url": "/api/posts"
  },
  "itemTemplate": {
    "type": "pattern.postCard",
    "props": {
      "post": "{{item}}"
    }
  }
}
```

### Grid Layout

```json
{
  "type": "collection",
  "layout": "grid",
  "columns": 3,
  "spacing": 16,
  "data": {...},
  "itemTemplate": {
    "type": "card",
    "child": {
      "type": "text",
      "content": "{{item.title}}"
    }
  }
}
```

### Paginação Infinita

Resposta da API deve incluir `pagination`:

```json
{
  "data": [
    {"id": "1", "title": "Post 1"},
    {"id": "2", "title": "Post 2"}
  ],
  "pagination": {
    "hasMore": true,
    "cursor": "post_2"
  }
}
```

Collection automaticamente adiciona botão "Carregar mais".

### Estado Vazio

```json
{
  "type": "collection",
  "data": {...},
  "itemTemplate": {...},
  "emptyState": {
    "type": "layout.column",
    "crossAxisAlignment": "center",
    "children": [
      {
        "type": "text",
        "content": "😔",
        "style": "headlineSmall"
      },
      {
        "type": "text",
        "content": "No items found",
        "style": "bodyMedium"
      }
    ]
  }
}
```

### Reload Automático

Collection recarrega quando **state usado na URL** muda:

```json
{
  "type": "collection",
  "data": {
    "type": "action.http",
    "url": "/api/courses?category={{state.selectedCategory}}"
  }
}

// Quando state.selectedCategory muda → reload automático!
```

---

## 📐 Layouts

### layout.column

Layout vertical (flexbox column).

**Props:**
```typescript
{
  type: "layout.column"
  children: ComponentNode[]
  spacing?: number                  // Gap entre children
  padding?: number                  // Padding interno
  flex?: number                     // Flex grow
  width?: number | string           // Largura fixa
  height?: number | string          // Altura fixa
  overflow?: "visible" | "hidden" | "scroll" | "auto"
  mainAxisAlignment?: "start" | "center" | "end" | "spaceBetween" | "spaceAround"
  crossAxisAlignment?: "start" | "center" | "end" | "stretch"
  onPress?: ActionNode              // Clicável
}
```

**Exemplo:**
```json
{
  "type": "layout.column",
  "spacing": 16,
  "padding": 16,
  "crossAxisAlignment": "center",
  "children": [
    {"type": "text", "content": "Title"},
    {"type": "text", "content": "Subtitle"}
  ]
}
```

### layout.row

Layout horizontal (flexbox row).

Mesmas props que `layout.column`, mas direção horizontal.

**Exemplo:**
```json
{
  "type": "layout.row",
  "spacing": 12,
  "mainAxisAlignment": "spaceBetween",
  "crossAxisAlignment": "center",
  "children": [
    {"type": "text", "content": "Left"},
    {"type": "text", "content": "Right"}
  ]
}
```

### layout.scaffold

Estrutura base com AppBar, Body, FAB, BottomNav.

**Props:**
```typescript
{
  type: "layout.scaffold"
  appBar?: {
    type: "layout.appBar"
    leading?: ComponentNode
    title?: ComponentNode
    actions?: ComponentNode[]
  }
  body: ComponentNode
  fab?: ComponentNode
  bottomNav?: {
    type: "layout.bottomNav"
    items: Array<{
      id: string
      label: string
      icon: string
      badge?: number
    }>
    selectedId?: string
    onSelect?: ActionNode
  }
}
```

**Exemplo:**
```json
{
  "type": "layout.scaffold",
  "appBar": {
    "type": "layout.appBar",
    "title": {
      "type": "text",
      "content": "My App",
      "style": "titleLarge"
    },
    "actions": [
      {
        "type": "button.icon",
        "icon": "⚙️"
      }
    ]
  },
  "body": {
    "type": "layout.column",
    "children": [...]
  },
  "fab": {
    "type": "button.fab",
    "icon": "➕"
  },
  "bottomNav": {
    "type": "layout.bottomNav",
    "items": [
      {"id": "home", "label": "Home", "icon": "🏠"},
      {"id": "search", "label": "Search", "icon": "🔍"},
      {"id": "profile", "label": "Profile", "icon": "👤"}
    ],
    "selectedId": "{{state.selectedTab}}"
  }
}
```

### layout.appBar

Barra superior com título e ações.

**Exemplo:**
```json
{
  "type": "layout.appBar",
  "leading": {
    "type": "button.icon",
    "icon": "←"
  },
  "title": {
    "type": "text",
    "content": "Inbox",
    "style": "titleMedium",
    "fontWeight": "bold"
  },
  "actions": [
    {"type": "button.icon", "icon": "🔍"},
    {"type": "button.icon", "icon": "⋮"}
  ]
}
```

### layout.bottomNav

Navegação inferior (tabs mobile).

**Exemplo:**
```json
{
  "type": "layout.bottomNav",
  "items": [
    {
      "id": "home",
      "label": "Home",
      "icon": "🏠",
      "badge": 5
    },
    {
      "id": "messages",
      "label": "Messages",
      "icon": "💬",
      "badge": 2
    },
    {
      "id": "profile",
      "label": "Profile",
      "icon": "👤"
    }
  ],
  "selectedId": "{{state.currentTab}}",
  "onSelect": {
    "type": "action.state.patch",
    "path": "currentTab",
    "value": "{{itemId}}"
  }
}
```

### Layouts Complexos

**3-Column Layout (Inbox):**
```json
{
  "type": "layout.row",
  "height": "100vh",
  "children": [
    {
      "type": "layout.column",
      "width": 280,
      "height": "100%",
      "overflow": "auto",
      "children": [...]  // ← Left sidebar
    },
    {"type": "divider"},
    {
      "type": "layout.column",
      "flex": 1,
      "height": "100%",
      "children": [...]  // ← Main content (grows)
    },
    {"type": "divider"},
    {
      "type": "layout.column",
      "width": 320,
      "height": "100%",
      "overflow": "auto",
      "children": [...]  // ← Right sidebar
    }
  ]
}
```

---

## 🎭 Modals & Overlays

Sistema de modals/dialogs configurável.

### Definindo Overlays

```json
{
  "overlays": {
    "composeModal": {
      "type": "overlay.modal",
      "presentation": "modal",
      "dismissible": true,
      "child": {
        "type": "layout.column",
        "padding": 24,
        "spacing": 16,
        "children": [
          {
            "type": "text",
            "content": "Compose Tweet",
            "style": "titleMedium"
          },
          {
            "type": "input.text",
            "placeholder": "What's happening?",
            "multiline": true,
            "value": "{{state.composer.text}}"
          },
          {
            "type": "button.filled",
            "label": "Tweet",
            "onPress": {
              "type": "intent.post.create"
            }
          }
        ]
      }
    }
  }
}
```

### Abrindo Overlay

```json
{
  "type": "button.fab",
  "icon": "✏️",
  "onPress": {
    "type": "action.overlay.open",
    "overlayId": "composeModal"
  }
}
```

### Fechando Overlay

```json
{
  "type": "button.text",
  "label": "Cancel",
  "onPress": {
    "type": "action.overlay.close",
    "overlayId": "composeModal"
  }
}
```

### Presentation Modes

- `modal` - Full screen modal (default)
- `bottomSheet` - Slide up from bottom
- `dialog` - Centered small dialog

```json
{
  "overlays": {
    "confirmDialog": {
      "type": "overlay.modal",
      "presentation": "dialog",
      "dismissible": false,
      "child": {...}
    }
  }
}
```

---

## 🎨 Styling

### Material Design 3 Tokens

PineUI usa tokens MD3 automaticamente:

**Cores:**
```
--md-sys-color-primary
--md-sys-color-onPrimary
--md-sys-color-secondary
--md-sys-color-onSecondary
--md-sys-color-error
--md-sys-color-onError
--md-sys-color-success
--md-sys-color-surface
--md-sys-color-onSurface
--md-sys-color-surfaceVariant
--md-sys-color-onSurfaceVariant
--md-sys-color-outline
--md-sys-color-background
--md-sys-color-onBackground
```

**Tipografia:**
```
titleLarge:     22px / 500 / 28px line-height
titleMedium:    16px / 500 / 24px
titleSmall:     14px / 500 / 20px
bodyLarge:      16px / 400 / 24px
bodyMedium:     14px / 400 / 20px
bodySmall:      12px / 400 / 16px
headlineSmall:  24px / 400 / 32px
```

### Custom Theming

Override CSS variables:

```css
:root {
  --md-sys-color-primary: #6750a4;
  --md-sys-color-onPrimary: #ffffff;
  /* ... */
}
```

### Responsive Design

PineUI é mobile-first por padrão. Use media queries CSS para customizar:

```css
.pineui-card {
  width: 100%;
}

@media (min-width: 768px) {
  .pineui-card {
    max-width: 600px;
  }
}
```

---

## 🎯 Demos Completas

### Twitter Demo

**Arquivo:** `demos/twitter/ui.json`

**Features:**
- ✅ Feed infinito com paginação
- ✅ Posts com avatars, texto, imagens
- ✅ Like/comment/retweet buttons
- ✅ Composer modal (FAB)
- ✅ Pattern.postCard reusável
- ✅ State management para composer
- ✅ Intents para actions

**Conceitos demonstrados:**
- Collections com HTTP + pagination
- Patterns complexos
- Overlays/Modals
- State binding em inputs
- Intents (post.like, post.create)

### Gallery Demo

**Arquivo:** `demos/gallery/ui.json`

**Features:**
- ✅ Grid 3-column de cursos
- ✅ Filtros por categoria (chips)
- ✅ Progress bars
- ✅ Badges (New, Completed)
- ✅ State-driven filtering

**Conceitos demonstrados:**
- Collection com grid layout
- State em URLs (category filter)
- Chips selecionáveis
- Reload automático ao mudar state

### Inbox Demo

**Arquivo:** `demos/inbox/ui.json`

**Features:**
- ✅ 3-column layout (280px | flex | 320px)
- ✅ Conversation list com tabs
- ✅ Message thread no meio
- ✅ Profile panel na direita
- ✅ Click em conversa → carrega mensagens
- ✅ Click em avatar → mostra profile
- ✅ Intents (conversation.select, user.viewProfile)

**Conceitos demonstrados:**
- Layouts complexos com flex
- State management avançado
- Multiple collections com state binding
- Intents para navigation
- Patterns para conversationItem, messageItem, profilePanel

### Admin Demo

**Arquivo:** `demos/admin/ui.json`

**Features:**
- ✅ Tabs (Users, Settings, Analytics)
- ✅ Table component com sorting
- ✅ HTTP data loading
- ✅ Badges para status

**Conceitos demonstrados:**
- Table component
- Tabs navigation
- HTTP data in tables

---

## 📚 API Reference

### PineUI.render()

Inicializa o SDK e renderiza UI.

```typescript
PineUI.render({
  target: string | HTMLElement,    // Seletor CSS ou elemento DOM
  schema?: PineUISchema,           // Schema inline (opcional)
  schemaUrl?: string,              // URL para carregar schema (opcional)
  baseUrl?: string,                // Base URL para HTTP actions
  onReady?: () => void,           // Callback quando pronto
  onError?: (error: Error) => void // Callback de erro
})
```

**Exemplo:**
```javascript
PineUI.render({
  target: '#app',
  schemaUrl: 'https://api.example.com/ui/schema',
  baseUrl: 'https://api.example.com',
  onReady: () => console.log('UI ready!'),
  onError: (err) => console.error('Error:', err)
});
```

### Schema Structure

```typescript
interface PineUISchema {
  schemaVersion: "1.0.0"
  state?: Record<string, any>
  screen: ComponentNode
  patterns?: Record<string, PatternDefinition>
  overlays?: Record<string, OverlayDefinition>
  intents?: Record<string, IntentDefinition>
  telemetry?: TelemetryConfig
}
```

### ComponentNode

```typescript
interface ComponentNode {
  type: string
  [key: string]: any  // Props específicas do componente
}
```

### ActionNode

```typescript
interface ActionNode {
  type: "action.http" | "action.state.patch" | "action.overlay.open" | ...
  [key: string]: any
}
```

---

## ✨ Best Practices

### 1. Use Intents, Não Actions Diretas

❌ **Errado:**
```json
{
  "onPress": {
    "type": "action.http",
    "url": "/api/like"
  }
}
```

✅ **Certo:**
```json
{
  "onPress": {
    "type": "intent.post.like",
    "postId": "{{post.id}}"
  }
}

// Intents definidos no schema:
{
  "intents": {
    "post.like": {
      "handler": {
        "type": "action.http",
        "url": "/api/posts/{{postId}}/like"
      }
    }
  }
}
```

### 2. Crie Patterns para UI Repetida

❌ **Errado:** Repetir estrutura em cada item
```json
{
  "type": "card",
  "child": {
    "type": "layout.row",
    "children": [
      {"type": "avatar", "src": "..."},
      {"type": "text", "content": "..."}
    ]
  }
}
// ... repetido 100x
```

✅ **Certo:** Defina pattern uma vez
```json
{
  "patterns": {
    "pattern.userCard": {
      "definition": {
        "type": "card",
        "child": {
          "type": "layout.row",
          "children": [
            {"type": "avatar", "src": "{{props.user.avatar}}"},
            {"type": "text", "content": "{{props.user.name}}"}
          ]
        }
      }
    }
  }
}

// Uso:
{"type": "pattern.userCard", "props": {"user": {...}}}
```

### 3. Separe UI de Dados

❌ **Errado:** Dados embutidos no schema
```json
{
  "type": "collection",
  "data": [
    {"id": "1", "name": "Item 1"},
    {"id": "2", "name": "Item 2"}
  ]
}
```

✅ **Certo:** Carregar via HTTP
```json
{
  "type": "collection",
  "data": {
    "type": "action.http",
    "url": "/api/items"
  }
}
```

### 4. Use State para Interatividade

✅ **Certo:** State-driven UI
```json
{
  "state": {"selectedTab": "home"},
  "screen": {
    "type": "tabs",
    "tabs": [...],
    "selectedTab": "{{state.selectedTab}}"
  }
}
```

### 5. Valide Schema no CI/CD

Use JSON Schema validation:
```bash
npm run validate-schema demos/twitter/ui.json
```

### 6. Otimize Imagens

Use CDN com resize automático:
```json
{
  "type": "image",
  "src": "https://cdn.example.com/image.jpg?w=400&q=80"
}
```

### 7. Implemente Empty States

```json
{
  "type": "collection",
  "emptyState": {
    "type": "layout.column",
    "crossAxisAlignment": "center",
    "children": [
      {"type": "text", "content": "No items yet"},
      {"type": "button.filled", "label": "Add First Item"}
    ]
  }
}
```

---

## 🗺️ Roadmap

### v0.1.0 (Atual) ✅

- ✅ SDK React completo
- ✅ 15+ componentes Material Design 3
- ✅ System de Patterns
- ✅ Intents + Actions
- ✅ State management reativo
- ✅ Collections com virtualização
- ✅ Overlays/Modals
- ✅ Tabs, Badges, Chips, Progress, Table
- ✅ 4 demos completas (Twitter, Gallery, Inbox, Admin)

### v0.2.0 (Q2 2026) 🚧

- [ ] SDK Flutter nativo
- [ ] Form validation declarativa
- [ ] Optimistic updates
- [ ] Video component
- [ ] Grid layouts avançados (masonry, staggered)
- [ ] Animation declarativas
- [ ] Temas dark/light automáticos
- [ ] Localization (i18n) built-in

### v0.3.0 (Q3 2026) 🔮

- [ ] Drag & drop support
- [ ] Charts components (bar, line, pie)
- [ ] Calendar/DatePicker
- [ ] File upload component
- [ ] Rich text editor
- [ ] Gerador de UI por IA
- [ ] Visual schema editor
- [ ] A/B testing framework

### v1.0.0 (Q4 2026) 🎯

- [ ] Production-ready
- [ ] Performance 99th percentile < 50ms
- [ ] 100+ production apps usando
- [ ] Documentação completa em PT/EN
- [ ] Certificação de segurança
- [ ] SLA enterprise

---

## 📦 Tamanhos & Performance

| Métrica | Valor |
|---------|-------|
| **Standalone Bundle** | ~160KB (~52KB gzipped) |
| **React Package** | ~30KB (~8KB gzipped) |
| **CSS** | ~11KB (~2.4KB gzipped) |
| **Parse Time** | < 5ms para schemas complexos |
| **Render Time** | < 16ms (60 FPS garantido) |
| **Collection (1000 items)** | < 100ms first render |
| **State Update** | < 5ms re-render |

**Browser Support:**
- Chrome/Edge 90+
- Safari 14+
- Firefox 88+
- Mobile iOS 14+
- Mobile Android 10+

---

## 🤝 Contribuindo

Aceitamos contribuições! Siga o processo:

1. **Fork** o projeto
2. **Clone** seu fork
3. **Crie branch** (`git checkout -b feature/amazing-feature`)
4. **Commit** (`git commit -m 'Add amazing feature'`)
5. **Push** (`git push origin feature/amazing-feature`)
6. **Pull Request** no GitHub

**Guidelines:**
- ✅ Mantenha TypeScript estrito
- ✅ Adicione tests para novas features
- ✅ Siga Material Design 3
- ✅ Documente no README
- ✅ Use conventional commits

---

## 📜 Licença

PineUI é licenciado sob **Apache 2.0 with Commons Clause**.

### 🟢 Permitido:

- ✅ Uso comercial em aplicações próprias
- ✅ Modificação e distribuição
- ✅ Uso em projetos open source
- ✅ Embedar em produtos
- ✅ Uso acadêmico/pesquisa

### 🔴 Proibido:

- ❌ Vender PineUI como produto standalone
- ❌ Oferecer como SaaS/managed service
- ❌ Hosting comercial para terceiros

**Licença Comercial:**
Para casos de uso comercial avançado, entre em contato:
📧 **wupsbr@gmail.com**
📄 Veja [COMMERCIAL.md](./COMMERCIAL.md)

---

## 📞 Contato

**Commercial Licensing:**
📧 Email: wupsbr@gmail.com
🏢 Company: Luma Ventures Ltda
📋 CNPJ: 21.951.820/0001-39

**Community:**
🐙 GitHub: https://github.com/pineui/pineui
🐛 Issues: https://github.com/pineui/pineui/issues
💬 Discussions: https://github.com/pineui/pineui/discussions

---

## 🙏 Créditos

Desenvolvido com ❤️ por **Luma Ventures**

**Tecnologias:**
- React 18
- TypeScript 5
- Vite
- Material Design 3
- Highlight.js

**Inspirações:**
- Jetpack Compose (declarative UI)
- Flutter (widget tree)
- React Native (cross-platform)
- Judo App (server-driven UI)
- Airbnb Epoxy (list optimization)

---

## ⭐ Showcase

Aplicações usando PineUI em produção:

_Em breve..._

---

**🍍 Grow interfaces from structured data.**

© 2026 Luma Ventures Ltda. All rights reserved.
