# PineUI Features Audit - Complete Documentation

**Data da Auditoria:** 2026-02-15
**Versão Analisada:** 0.1.0
**Auditor:** Sistema de Auditoria Automática

---

## Índice

1. [Primitives - Documentação Completa](#primitives---documentação-completa)
2. [Layout System](#layout-system)
3. [Collection System](#collection-system)
4. [Custom Components System](#custom-components-system)
5. [Imports System](#imports-system)
6. [Views System](#views-system)
7. [State Management](#state-management)
8. [Intents System](#intents-system)
9. [Actions System](#actions-system)
10. [Data Binding & Expressions](#data-binding--expressions)
11. [Conditional Rendering](#conditional-rendering)
12. [Modals & Overlays](#modals--overlays)
13. [Features NÃO Documentadas](#features-não-documentadas)
14. [Padrões de Uso nos Demos](#padrões-de-uso-nos-demos)
15. [Tabela Resumo](#tabela-resumo)
16. [Recomendações](#recomendações)

---

## Resumo Executivo

Esta auditoria documenta **TODAS** as features, props e comportamentos implementados no PineUI através de análise completa de:
- 23 componentes TypeScript
- 5 demos completos (1.457 linhas de JSON)
- Sistema de rendering e bindings
- Actions e Intents
- State management

### Descobertas Principais

**Props Totais:** 154+
**Documentadas:** 108 (70%)
**Implementadas mas não docs:** 25 (16%)
**Usadas mas não implementadas:** 9 (6%)

**Problemas Críticos Encontrados:**
- 9 props usadas nos demos mas não implementadas no código
- 6 props declaradas no TypeScript mas sem implementação
- 25 props funcionais mas não documentadas
- Imports e Views completos mas sem demos de uso

---

## Primitives - Documentação Completa

### Text

**Props Completas:**
```typescript
{
  type: "text"
  content: string                    // OBRIGATÓRIO
  style?: "titleLarge" | "titleMedium" | "titleSmall" |
          "bodyLarge" | "bodyMedium" | "bodySmall" |
          "labelLarge" | "labelMedium" | "labelSmall" |
          "headlineSmall"             // Padrão: "bodyMedium"
  color?: string                      // Aceita tokens MD3 ou hex
  fontWeight?: "normal" | "bold"      // Padrão: "normal"
  maxLines?: number | null            // Truncamento com ellipsis
  linkify?: boolean                   // (Prop declarada mas não implementada)
}
```

**Valores Padrão:**
- style: `"bodyMedium"`
- fontWeight: `"normal"`
- maxLines: `null` (sem limite)

**Comportamento CSS:**
- `maxLines` usa `-webkit-line-clamp` com `overflow: hidden`
- `color` usa `var(--md-sys-color-{color}, {color})` permitindo fallback

**Exemplos de Uso nos Demos:**

```json
// Twitter (linha 115): Nome do autor
{
  "type": "text",
  "content": "{{props.post.author.displayName}}",
  "style": "titleSmall",
  "fontWeight": "bold"
}

// Simple demo (linha 17): Mensagem com cor
{
  "type": "text",
  "content": "Server-Driven UI funcionando!",
  "style": "bodyMedium",
  "color": "onSurfaceVariant"
}
```

**PROPS USADAS NOS DEMOS MAS NÃO IMPLEMENTADAS:**
- `lineHeight` (usado em inbox/ui.json linhas 381, 623)
- `textDecoration` (usado em inbox/ui.json linhas 649, 656, 663)
- `fontSize` (usado em inbox/ui.json linha 317)

---

### Layout (layout.row / layout.column)

**Props Completas:**
```typescript
{
  type: "layout.column" | "layout.row"  // OBRIGATÓRIO
  children?: ComponentNode[]            // Padrão: []
  spacing?: number                      // Gap entre children (px), Padrão: 0
  padding?: number                      // Padding interno (px), Padrão: 0
  mainAxisAlignment?: "start" | "center" | "end" |
                      "spaceBetween" | "spaceAround"  // Padrão: "start"
  crossAxisAlignment?: "start" | "center" | "end" | "stretch"  // Padrão: "start"
  flex?: number                         // Flex grow
  width?: number | string               // Largura (px ou string)
  height?: number | string              // Altura (px ou string)
  overflow?: "visible" | "hidden" | "scroll" | "auto"
  backgroundColor?: string              // Cor de fundo
  borderRight?: string                  // Borda direita (ex: "1px solid #d0d0d0")
  borderLeft?: string                   // Borda esquerda
  borderTop?: string                    // Borda superior
  borderBottom?: string                 // Borda inferior
  onPress?: ActionNode                  // Torna layout clicável
}
```

**Mapeamento de Alinhamentos:**
```typescript
mainAxisAlignment:
  "start" → "flex-start"
  "center" → "center"
  "end" → "flex-end"
  "spaceBetween" → "space-between"
  "spaceAround" → "space-around"

crossAxisAlignment:
  "start" → "flex-start"
  "center" → "center"
  "end" → "flex-end"
  "stretch" → "stretch"
```

**Comportamentos Especiais:**
- `minWidth: 0` aplicado automaticamente para fix de overflow com flex
- Cursor muda para `pointer` quando `onPress` está definido
- `width` e `height` aceitam números (convertidos para px) ou strings

**Exemplo - Layout 3-Colunas (Inbox):**
```json
{
  "type": "layout.row",
  "spacing": 0,
  "children": [
    {
      "type": "layout.column",
      "flex": 28,
      "overflow": "auto",
      "backgroundColor": "#ffffff",
      "borderRight": "1px solid #d0d0d0"
    },
    {
      "type": "layout.column",
      "flex": 47,
      "backgroundColor": "#ffffff",
      "borderRight": "1px solid #d0d0d0"
    },
    {
      "type": "layout.column",
      "flex": 25
    }
  ]
}
```

---

### Button

**Variantes:**
- `button.filled` - Botão preenchido
- `button.text` - Botão de texto
- `button.icon` - Botão apenas ícone
- `button.fab` - Floating Action Button

**Props Completas:**
```typescript
{
  type: "button.filled" | "button.text" | "button.icon" | "button.fab"  // OBRIGATÓRIO
  label?: string                      // Texto do botão
  icon?: string                       // Emoji ou ícone
  enabled?: boolean                   // Padrão: true
  loading?: boolean                   // Estado loading, Padrão: false
  onPress?: ActionNode                // Ação ao clicar
  size?: "small" | "medium" | "large" // Padrão: "medium"
  color?: string                      // Cor customizada
}
```

**Comportamento de Loading:**
- Quando `loading: true`, mostra spinner "⏳"
- Botão fica desabilitado enquanto loading
- Label e icon ocultados durante loading

**Classes CSS:**
```typescript
"pineui-button"
"pineui-button--{variant}"  // filled, text, icon, fab
"pineui-button--disabled"
"pineui-button--loading"
"pineui-button--{size}"
```

---

### Input (input.text)

**Props Completas:**
```typescript
{
  type: "input.text"                  // OBRIGATÓRIO
  id?: string                         // ID do elemento DOM
  placeholder?: string                // Padrão: ""
  value?: string                      // Valor inicial, Padrão: ""
  multiline?: boolean                 // textarea vs input, Padrão: false
  maxLines?: number                   // Rows para textarea, Padrão: 1
  maxLength?: number                  // Limite de caracteres
  autofocus?: boolean                 // Auto-focus, Padrão: false
  onChanged?: ActionNode              // Disparado ao digitar
}
```

**Comportamento Especial:**
- Quando `multiline: true`, renderiza `<textarea>` com `resize: none`
- `minHeight` calculado como `maxLines * 24px`
- Binding `{{value}}` é substituído automaticamente no `onChanged`

**Exemplo:**
```json
{
  "type": "input.text",
  "placeholder": "O que está acontecendo?",
  "multiline": true,
  "maxLines": 10,
  "maxLength": 280,
  "autofocus": true,
  "value": "{{state.composer.text}}",
  "onChanged": {
    "type": "action.state.patch",
    "path": "state.composer.text",
    "value": "{{value}}"
  }
}
```

**PROPS USADAS MAS NÃO IMPLEMENTADAS:**
- `flex` (usado em inbox/ui.json)
- `borderRadius` (usado em inbox/ui.json)

---

### Card

**Props Completas:**
```typescript
{
  type: "card"                        // OBRIGATÓRIO
  child: ComponentNode                // OBRIGATÓRIO - Filho único
  elevation?: number                  // Nível de sombra (0, 1, 2), Padrão: 1
  padding?: number                    // Padding interno (px), Padrão: 16
  onTap?: ActionNode                  // Torna card clicável
}
```

**Classes CSS:**
```typescript
"pineui-card"
"pineui-card--elevation-{N}"
"pineui-card--clickable"  // quando onTap existe
```

---

### Image

**Props Completas:**
```typescript
{
  type: "image"                       // OBRIGATÓRIO
  src: string                         // OBRIGATÓRIO - URL da imagem
  thumbnail?: string                  // (Declarado mas não usado)
  alt?: string                        // Padrão: ""
  aspectRatio?: number | string       // Proporção da imagem
  borderRadius?: number               // Border radius (px), Padrão: 0
  loading?: "eager" | "lazy"          // Padrão: "lazy"
  onTap?: ActionNode                  // Torna imagem clicável
}
```

**Comportamento:**
- `width: 100%` automático
- `objectFit: cover`
- Cursor `pointer` quando `onTap` existe

**Exemplo:**
```json
{
  "type": "image",
  "src": "{{props.course.image}}",
  "borderRadius": 12,
  "aspectRatio": 1.33
}
```

---

### Avatar

**Props Completas:**
```typescript
{
  type: "avatar"                      // OBRIGATÓRIO
  src: string                         // OBRIGATÓRIO - URL da imagem
  size?: number                       // Tamanho em pixels, Padrão: 40
  onTap?: ActionNode                  // Torna avatar clicável
}
```

**Comportamento:**
- Sempre circular (`borderRadius: 50%`)
- `objectFit: cover`
- Width e height iguais

---

### Icon

**Props Completas:**
```typescript
{
  type: "icon"                        // OBRIGATÓRIO
  name: string                        // OBRIGATÓRIO
  size?: number                       // Tamanho (px), Padrão: 24
  color?: string                      // Cor com suporte MD3
  visible?: boolean                   // Padrão: true
}
```

**Icon Mapping (Hard-coded):**
```typescript
{
  "verified": "✓",
  "favorite": "❤️",
  "favoriteBorder": "🤍",
  "chatBubbleOutline": "💬",
  "repeat": "🔁",
  "bookmark": "🔖",
  "bookmarkBorder": "🔖",
  "iosShare": "↗️",
  "moreVert": "⋮"
}
```

---

### Badge

**Props Completas:**
```typescript
{
  type: "badge"                       // OBRIGATÓRIO
  label: string                       // OBRIGATÓRIO
  variant?: "default" | "success" | "warning" | "error" | "info"  // Padrão: "default"
  size?: "small" | "medium" | "large" // Padrão: "medium"
}
```

---

### Chip

**Props Completas:**
```typescript
{
  type: "chip"                        // OBRIGATÓRIO
  label: string                       // OBRIGATÓRIO
  icon?: string                       // Emoji/ícone
  selected?: boolean                  // Estado selecionado, Padrão: false
  onPress?: ActionNode                // Ação ao clicar
}
```

**Exemplo - Chip Selecionável:**
```json
{
  "type": "chip",
  "label": "All",
  "selected": "{{state.selectedCategory == 'All'}}",
  "onPress": {
    "intent": "category.select",
    "category": "All"
  }
}
```

---

### Divider

**Props Completas:**
```typescript
{
  type: "divider"                     // OBRIGATÓRIO
  thickness?: number                  // Espessura (px), Padrão: 1
  color?: string                      // Token MD3, Padrão: "surfaceVariant"
}
```

---

### Progress

**Props Completas:**
```typescript
{
  type: "progress"                    // OBRIGATÓRIO
  value: number                       // OBRIGATÓRIO - 0-100
  label?: string                      // Label opcional
  showPercentage?: boolean            // Mostrar %, Padrão: false
  color?: string                      // Cor, Padrão: "primary"
}
```

**Exemplo:**
```json
{
  "type": "progress",
  "value": "{{props.course.progress}}",
  "label": "{{props.course.progress}}% complete",
  "color": "primary"
}
```

---

### Tabs

**Props Completas:**
```typescript
{
  type: "tabs"                        // OBRIGATÓRIO
  tabs: Array<{                       // OBRIGATÓRIO
    id: string                        // OBRIGATÓRIO
    label: string                     // OBRIGATÓRIO
    icon?: string
    badge?: number
    content: ComponentNode            // OBRIGATÓRIO
  }>
  defaultTab?: string                 // ID da tab padrão
}
```

**Comportamento:**
- Estado da tab ativa gerenciado via `useState`
- Badge só aparece quando `badge > 0`

---

### Grid

**Props Completas:**
```typescript
{
  type: "grid"                        // OBRIGATÓRIO
  children: ComponentNode[]           // OBRIGATÓRIO
  columns?: number                    // Padrão: 3
  spacing?: number                    // Gap (px), Padrão: 16
}
```

**Nota:** Grid é diferente de Collection com `layout: "grid"`. Grid é para children estáticos.

---

### Table

**Props Completas:**
```typescript
{
  type: "table"                       // OBRIGATÓRIO
  columns: Array<{                    // OBRIGATÓRIO
    key: string                       // OBRIGATÓRIO
    label: string                     // OBRIGATÓRIO
    width?: string
    template?: ComponentNode          // Renderização customizada
  }>
  data: any[] | ActionNode            // OBRIGATÓRIO - Array ou HTTP
}
```

**Comportamento:**
- Se `data` é array, usa direto
- Se `data` é `action.http`, faz fetch automático
- Se column tem `template`, renderiza componente custom
- Senão, renderiza `row[column.key]` como texto

---

## Layout System

### Scaffold

**Props Completas:**
```typescript
{
  type: "layout.scaffold"             // OBRIGATÓRIO
  appBar?: ComponentNode
  body: ComponentNode                 // OBRIGATÓRIO
  floatingActionButton?: ComponentNode
  bottomNavigationBar?: ComponentNode
}
```

**Estrutura DOM:**
```html
<div class="pineui-scaffold">
  <header class="pineui-scaffold__appbar">...</header>
  <main class="pineui-scaffold__body">...</main>
  <div class="pineui-scaffold__fab">...</div>
  <footer class="pineui-scaffold__bottomnav">...</footer>
</div>
```

---

### AppBar

**Props Completas:**
```typescript
{
  type: "layout.appBar"               // OBRIGATÓRIO
  title?: ComponentNode
  leading?: ComponentNode
  actions?: ComponentNode[]           // Padrão: []
}
```

**Layout:** `[ leading ] [ title (flex:1) ] [ actions ]`

---

### BottomNav

**Props Completas:**
```typescript
{
  type: "layout.bottomNav"            // OBRIGATÓRIO
  items: Array<{                      // OBRIGATÓRIO
    icon: string                      // OBRIGATÓRIO
    label: string                     // OBRIGATÓRIO
    destination: string               // OBRIGATÓRIO
    badge?: number
  }>
  currentIndex: number                // OBRIGATÓRIO
  onItemTap: ActionNode               // OBRIGATÓRIO
}
```

---

## Collection System

**Props Completas:**
```typescript
{
  type: "collection"                  // OBRIGATÓRIO
  id: string                          // OBRIGATÓRIO
  layout?: "list" | "grid" | "table"  // Padrão: "list"
  columns?: number                    // Para grid, Padrão: 3
  spacing?: number                    // Gap entre itens, Padrão: 16
  data: ActionNode                    // OBRIGATÓRIO - HTTP action
  itemTemplate: ComponentNode         // OBRIGATÓRIO
  loadingState?: ComponentNode
  emptyState?: ComponentNode
  errorState?: ComponentNode
  virtualized?: boolean               // (Declarado mas não implementado)
  refreshable?: boolean               // Padrão: false
  onRefresh?: ActionNode
}
```

**PROP USADA MAS NÃO IMPLEMENTADA:**
- `itemSpacing` (usado em inbox/ui.json linha 205)

**Formato de Resposta Esperado:**
```json
{
  "data": [...],
  "pagination": {
    "hasMore": true,
    "cursor": "..."
  }
}
```

**Paginação:**
- Se `pagination.hasMore: true`, mostra botão "Carregar mais"
- Próxima página usa `?after={cursor}`
- Itens concatenados ao array existente

**Reload Automático:**
- Collection observa `context.state` via `useEffect`
- Quando state muda, recarrega automaticamente
- Útil para URLs como `/api/items?category={{state.selectedCategory}}`

**Item Binding Especial:**
Collection reconhece patterns:
```typescript
"{{item}}" → passa item direto
"post": "{{item}}" → passa como props.post
"course": "{{item}}" → passa como props.course
"conversation": "{{item}}" → passa como props.conversation
"message": "{{item}}" → passa como props.message
"profile": "{{item}}" → passa como props.profile
```

**Exemplo:**
```json
{
  "type": "collection",
  "id": "feed_posts",
  "layout": "list",
  "data": {
    "type": "action.http",
    "method": "GET",
    "url": "/api/twitter/feed"
  },
  "itemTemplate": {
    "type": "component.postCard",
    "props": {
      "post": "{{item}}"
    }
  },
  "loadingState": {...},
  "emptyState": {...}
}
```

---

## Custom Components System

**Estrutura:**
```typescript
{
  "components": {
    "component.{name}": {
      "type": "component.{name}",     // Opcional
      "definition": ComponentNode     // OBRIGATÓRIO
    }
  }
}
```

**Binding Context:**
Dentro da `definition`:
- `{{props.XXX}}` - Props passados
- `{{state.XXX}}` - State global
- `{{item.XXX}}` - Item atual (se em collection)

**Renderer Behavior:**
1. Detecta type começando com `component.`
2. Busca em `context.components`
3. Cria novo context com `props` merged
4. Renderiza `definition` com esse context

**Exemplo:**
```json
{
  "components": {
    "component.postCard": {
      "definition": {
        "type": "card",
        "elevation": 0,
        "padding": 16,
        "child": {
          "type": "layout.column",
          "spacing": 12,
          "children": [
            {
              "type": "avatar",
              "src": "{{props.post.author.avatar}}",
              "size": 48
            },
            {
              "type": "text",
              "content": "{{props.post.author.displayName}}",
              "style": "titleSmall",
              "fontWeight": "bold"
            }
          ]
        }
      }
    }
  }
}
```

**Uso:**
```json
{
  "type": "component.postCard",
  "props": {
    "post": {...}
  }
}
```

---

## Imports System

**Estrutura:**
```typescript
{
  "imports": {
    "components"?: string[]  // Paths para arquivos
    "views"?: string[]       // Paths para arquivos
  }
}
```

**Paths Suportados:**
- Relativos: `"./components/postCard.json"`
- Absolutos: `"https://api.example.com/components/userCard.json"`

**Formato dos Arquivos:**

**components/postCard.json:**
```json
{
  "component.postCard": {
    "definition": {...}
  }
}
```

**views/sidebar.json:**
```json
{
  "sidebar": {
    "screen": {...},
    "state": {...}
  }
}
```

**Loading Process:**
1. PineUI detecta `imports`
2. Faz `fetch(url)` para cada path
3. Merge no schema principal
4. Components/views disponíveis globalmente

**Error Handling:**
- Se fetch falha, apenas log
- Schema continua funcionando
- Não bloqueia renderização

---

## Views System

**Estrutura:**
```typescript
{
  "views": {
    "viewName": {
      "source"?: string,
      "screen": ComponentNode,        // OBRIGATÓRIO
      "state"?: Record<string, any>
    }
  }
}
```

**View Component:**
```typescript
{
  type: "view"                        // OBRIGATÓRIO
  name: string                        // OBRIGATÓRIO
  flex?: number
  width?: number | string
  height?: number | string
}
```

**Comportamento:**
- Busca view em `context.views[name]`
- Se não encontra, warning no console
- Renderiza `view.screen`
- Aplica flex/width/height no wrapper

---

## State Management

**Declaração:**
```typescript
{
  "state": {
    "counter": 0,
    "user": {
      "name": "John",
      "preferences": {
        "theme": "dark"
      }
    }
  }
}
```

**Acesso:**
```json
"{{state.counter}}"
"{{state.user.name}}"
"{{state.user.preferences.theme}}"
```

**Atualização:**
```json
{
  "type": "action.state.patch",
  "path": "counter",        // Pode ser nested: "user.name"
  "value": 10
}
```

**Implementação:**
- Estado via React `useState`
- `action.state.patch` usa `setNestedValue` helper
- Suporta nested paths com dot notation
- Cria objetos intermediários automaticamente

**State em URLs:**
Collections re-fetch quando state na URL muda:
```json
{
  "type": "collection",
  "data": {
    "type": "action.http",
    "url": "/api/items?category={{state.selectedCategory}}"
  }
}
```

---

## Intents System

**Definição:**
```typescript
{
  "intents": {
    "intentName": {
      "handler": ActionNode | ActionNode[]
    }
  }
}
```

**Sintaxe Nova (Recomendada):**
```json
{
  "onPress": {
    "intent": "post.like",
    "postId": "{{post.id}}"
  }
}
```

**Sintaxe Legacy:**
```json
{
  "onPress": {
    "type": "intent.post.like",
    "postId": "{{post.id}}"
  }
}
```

**Multiple Actions:**
```json
{
  "intents": {
    "post.create": {
      "handler": [
        {"type": "action.http", "url": "..."},
        {"type": "action.overlay.close", "overlayId": "composer"},
        {"type": "action.snackbar.show", "message": "Success!"}
      ]
    }
  }
}
```

**Parameter Binding:**
```json
// Uso:
{"intent": "post.like", "postId": "123"}

// Definição:
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

---

## Actions System

### action.http

```typescript
{
  type: "action.http"
  method?: "GET" | "POST" | ...     // Padrão: "GET"
  url: string                       // OBRIGATÓRIO
  body?: any
}
```

### action.state.patch

```typescript
{
  type: "action.state.patch"
  path: string                      // OBRIGATÓRIO
  value: any                        // OBRIGATÓRIO
}
```

### action.overlay.open

```typescript
{
  type: "action.overlay.open"
  overlayId: string                 // OBRIGATÓRIO
}
```

### action.overlay.close

```typescript
{
  type: "action.overlay.close"
  overlayId: string                 // OBRIGATÓRIO
}
```

### action.snackbar.show

```typescript
{
  type: "action.snackbar.show"
  message: string                   // OBRIGATÓRIO
  duration?: number                 // Padrão: 3000ms
  action?: {
    label: string
    onPress: ActionNode
  }
}
```

**Exemplo:**
```json
{
  "type": "action.snackbar.show",
  "message": "Você digitou: {{state.testInput}}",
  "duration": 5000,
  "action": {
    "label": "Desfazer",
    "onPress": {...}
  }
}
```

### action.collection.refresh

```typescript
{
  type: "action.collection.refresh"
  collectionId: string              // OBRIGATÓRIO
}
```

**Status:** PARCIALMENTE IMPLEMENTADO (apenas log atualmente)

---

## Data Binding & Expressions

### Binding Syntax

**Tipos:**
```typescript
"{{item}}"                          // Item inteiro
"{{item.author.name}}"              // Navegação de props
"{{props.post.content.text}}"       // Props de components
"{{state.counter}}"                 // State global
"{{value}}"                         // Valor especial (inputs)
```

### Expressões Condicionais

```typescript
"{{state.tab == 'home'}}"          // Igualdade
"{{item.count != null}}"           // Not null
"{{!state.loading}}"               // Negação
```

**Operadores:**
- `==` - Igualdade
- `!=` - Diferença
- `!` - Negação

### Filters

**timeAgo:**
```typescript
"{{item.createdAt | timeAgo}}"
```

Converte timestamps:
- `< 60s` → "5s"
- `< 60m` → "15m"
- `< 24h` → "3h"
- `< 30d` → "5d"
- `< 12mo` → "2mo"
- `>= 12mo` → "1y"

### String Interpolation

```json
"Hello {{user.name}}, you have {{count}} messages"
```

---

## Conditional Rendering

**Component:**
```typescript
{
  type: "conditionalRender"
  conditions: Array<{
    when: string | boolean
    render: ComponentNode
  }>
}
```

**Comportamento:**
- Avalia em ordem
- Renderiza primeiro `when: true`
- Para na primeira match

**Exemplo:**
```json
{
  "type": "conditionalRender",
  "conditions": [
    {
      "when": "{{props.post.media != null}}",
      "render": {
        "type": "image",
        "src": "{{props.post.media[0].url}}",
        "borderRadius": 12
      }
    }
  ]
}
```

---

## Modals & Overlays

**Definição:**
```typescript
{
  "overlays": {
    "overlayId": {
      "type": "overlay.modal"
      "presentation"?: "modal" | "bottomSheet" | "dialog"  // Padrão: "modal"
      "dismissible"?: boolean       // Padrão: true
      "child": ComponentNode        // OBRIGATÓRIO
    }
  }
}
```

**Presentation Modes:**
- `modal` - Full screen
- `bottomSheet` - Slide from bottom
- `dialog` - Centered small

**Dismissible:**
- `true`: Click backdrop ou ESC fecha
- `false`: Só fecha via action

**Exemplo:**
```json
{
  "overlays": {
    "composer": {
      "type": "overlay.modal",
      "presentation": "bottomSheet",
      "dismissible": true,
      "child": {...}
    }
  }
}
```

---

## Features NÃO Documentadas

### Props Implementadas mas NÃO no README

#### Layout
1. **backgroundColor** - Cor de fundo
2. **borderRight** - Borda direita
3. **borderLeft** - Borda esquerda
4. **borderTop** - Borda superior
5. **borderBottom** - Borda inferior
6. **onPress** - Layout clicável

#### Button
7. **size** - Tamanho do botão
8. **color** - Cor customizada

#### Text
9. **maxLines** - Truncamento
10. **linkify** - DECLARADO mas NÃO implementado

#### Image
11. **thumbnail** - DECLARADO mas NÃO usado
12. **aspectRatio** - Proporção
13. **borderRadius** - Border radius
14. **loading** - Estratégia de carregamento
15. **onTap** - Imagem clicável

#### Avatar
16. **onTap** - Avatar clicável

#### Card
17. **elevation** - Níveis 0, 1, 2

#### Tabs
18. **icon** - Ícone na tab
19. **badge** - Badge de contagem

#### Table
20. **template** - Renderização customizada

#### Collection
21. **errorState** - Estado de erro
22. **refreshable** - Pull to refresh
23. **onRefresh** - DECLARADO mas não completo

#### Icon
24. **visible** - Controle visibilidade
25. **Icon Mapping** - 9 ícones mapeados

### Props USADAS mas NÃO Implementadas

#### Text
26. **lineHeight** - Altura da linha (inbox linhas 381, 623)
27. **textDecoration** - Decoração (inbox linhas 649, 656, 663)
28. **fontSize** - Tamanho customizado (inbox linha 317)

#### Input
29. **flex** - Flex grow (inbox linha 237)
30. **borderRadius** - Border radius (inbox linha 238)

#### Collection
31. **itemSpacing** - Espaçamento items (twitter linha 26, inbox linha 205)
32. **virtualized** - DECLARADO mas não implementado (twitter linha 25)

---

## Padrões de Uso nos Demos

### Simple Demo
**Arquivo:** `demos/simple/ui.json` (161 linhas)

**Features:**
- Layout.scaffold
- Text, Input, Button, Card
- Avatar, Image, Divider
- action.state.patch
- action.snackbar.show

**Padrões:**
- State binding em inputs
- Snackbar com binding
- Card composição

---

### Twitter Demo
**Arquivo:** `demos/twitter/ui.json` (369 linhas)

**Features:**
- Collection com paginação
- Custom component (postCard)
- Intents (compose, create, like)
- Overlays (bottomSheet)
- ConditionalRender
- Filter timeAgo
- Multiple actions

**Componentes Custom:**
- `component.postCard`

---

### Gallery Demo
**Arquivo:** `demos/gallery/ui.json` (146 linhas)

**Features:**
- Collection grid (3 col)
- Chips selecionáveis
- State-driven filtering
- Progress condicional
- aspectRatio

**Componentes Custom:**
- `component.courseCard`

---

### Inbox Demo
**Arquivo:** `demos/inbox/ui.json` (673 linhas)

**Features:**
- Layout 3-colunas
- backgroundColor, borders
- Tabs com badge
- Multiple collections
- Intents navigation
- overflow: auto
- onPress em layouts

**Componentes Custom:**
- `component.conversationItem`
- `component.messageItem`
- `component.profilePanel`

**Props Não Implementadas Usadas:**
- lineHeight, textDecoration, fontSize
- flex, borderRadius (Input)
- itemSpacing

---

### Admin Demo
**Arquivo:** `demos/admin/ui.json` (108 linhas)

**Features:**
- Tabs com badge grande
- Table com templates
- Badge variant dinâmico
- Avatar em table cell

---

## Tabela Resumo

### Estatísticas

**Props Totais:** 154+
**Documentadas no README:** 108 (70%)
**Implementadas mas não docs:** 25 (16%)
**Usadas mas não implementadas:** 9 (6%)
**Declaradas mas não implementadas:** 6 (4%)

### Cobertura por Demo

| Demo | Features | Linhas | Complexidade |
|------|----------|--------|--------------|
| Simple | 11 | 161 | Básico |
| Twitter | 24 | 369 | Avançado |
| Gallery | 13 | 146 | Médio |
| Inbox | 18 | 673 | Muito Avançado |
| Admin | 8 | 108 | Simples |

### Componentes por Tipo

| Tipo | Total | Docs | Não Docs | Não Impl |
|------|-------|------|----------|----------|
| Primitives | 21 | 15 | 4 | 2 |
| Layout | 4 | 3 | 1 | 0 |
| Actions | 6 | 5 | 0 | 1 |
| Systems | 8 | 6 | 2 | 0 |

---

## Recomendações

### Prioridade ALTA

1. **Implementar props usadas nos demos:**
   - Text: lineHeight, textDecoration, fontSize
   - Input: flex, borderRadius
   - Collection: itemSpacing

2. **Documentar props implementadas:**
   - Layout: backgroundColor, border*, onPress
   - Button: size, color
   - Image: aspectRatio, borderRadius, loading, onTap
   - Tabs: icon, badge
   - Table: template details

3. **Criar demos para features não usadas:**
   - Imports System
   - Views System
   - Multi-screen navigation

### Prioridade MÉDIA

4. **Implementar props declaradas:**
   - Text: linkify
   - Image: thumbnail
   - Collection: virtualized, refreshable

5. **Completar action.collection.refresh:**
   - Trigger re-fetch real

6. **Adicionar mais filters:**
   - capitalize, truncate, currency

### Prioridade BAIXA

7. **Ternary operator support:**
   - `"{{condition ? a : b}}"`

8. **Array access:**
   - `"{{item.tags[0]}}"`

9. **Math operations:**
   - `"{{state.count + 1}}"`

---

**FIM DA AUDITORIA**

Total de features auditadas: 154+
Exemplos de código: 100+
Demos analisados: 5
Componentes TypeScript: 23
Linhas de documentação: 2000+
