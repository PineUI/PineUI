# PineUI - Instruções para Desenvolvimento

## 📋 Visão Geral do Projeto

PineUI é um protocolo e SDK para Server-Driven UI focado em aplicações AI-native. Interfaces declarativas renderizadas a partir de JSON, com governança centralizada no servidor.

**Objetivos principais:**
- Escalar para milhões de usuários
- Multi-plataforma (Web + Flutter)
- AI-friendly (LLMs podem gerar telas válidas)
- Consistência de produto
- Separação entre intenção e implementação

---

## 🗂️ Mapa de Arquivos Chave

```
packages/react/src/
  renderer/
    Renderer.tsx      ← COMPONENT_MAP: fonte da verdade para tipos registrados
    bindings.ts       ← Motor de binding {{expression}}
  components/         ← Implementação de cada componente
  PineUI.tsx          ← executeAction: fonte da verdade para actions implementadas

docs/
  PROMPT.md           ← Guia para LLMs (DEVE ser idêntico a /PROMPT.md)
  pineui.standalone.js ← Bundle buildado (copiar de dist/ após build)
  pineui.css          ← CSS buildado (copiar de dist/style.css após build)
  demos/
    simple/           ← Demo básica
    twitter/          ← Feed social
    gallery/          ← Grid com filtros e modal de navegação
    inbox/            ← Messenger multi-coluna
    admin/            ← Dashboard com tabela
    catalog/          ← Catálogo de componentes
    components-showcase/ ← Showcase de todos os componentes

PROMPT.md             ← Idêntico a docs/PROMPT.md (fonte original)
README.md             ← Documentação pública completa
simple-example.json   ← Exemplo funcional simples
case-example.json     ← Exemplo funcional complexo (social feed)
CLAUDE.md             ← Este arquivo
```

---

## 🔌 API Atual — Fonte da Verdade

### Componentes Registrados (`Renderer.tsx` COMPONENT_MAP)

Estes são os únicos tipos válidos. Qualquer outro tipo é ignorado silenciosamente:

```
text
button.filled | button.text | button.outlined | button.icon | button.fab
layout.column | layout.row | layout.scaffold | layout.appBar | layout.bottomNav
card
image | avatar | icon
collection | collection.map
input.text | input.email | input.password | input.number | input.search
divider
conditionalRender | conditional.render
tabs | badge | chip
grid | progress | table | view
```

Também aceita `component.*` (custom components definidos em `"components": {}` no schema).

### Actions Implementadas (`PineUI.tsx` executeAction)

```
action.http
action.state.patch
action.overlay.open
action.overlay.close
action.collection.refresh
action.snackbar.show
action.delay
action.sequence
```

Qualquer outra action cai no `default: console.warn(...)` e é ignorada.

### Contextos de Binding (`bindings.ts`)

| Binding | Contexto | Notas |
|---------|---------|-------|
| `{{state.x}}` | Em qualquer lugar | State global |
| `{{item}}` / `{{item.x}}` | Dentro de `itemTemplate` de collection | Preservado fora do contexto |
| `{{index}}` | Dentro de `itemTemplate` de collection | 0-based |
| `{{props.x}}` | Dentro de `components.*.definition` | Preservado fora do contexto |
| `{{response}}` | Dentro de `collection.data.onSuccess` apenas | Preservado fora do contexto |
| `{{event.value}}` | Dentro de `onChange`/`onChanged` de inputs | Valor digitado |

### Nomes Corretos — Consulte Antes de Escrever Qualquer JSON

| ✅ Correto | ❌ Errado |
|-----------|---------|
| `onPress` | `onTap`, `onClick` |
| `action.http` | `action.http.request` |
| `action.overlay.open` | `action.overlay.show` |
| `action.overlay.close` | `action.overlay.hide` |
| `progress` | `progress.circular`, `progress.linear` |
| `grid` | `layout.grid` |
| `input.text` + `multiline: true` | `input.textarea` |
| `component.*` (custom) | `pattern.*` |
| `"path": "fieldName"` | `"path": "state.fieldName"` |
| `"value": "{{event.value}}"` | `"value": "{{value}}"` |
| `{ "intent": "name", "param": "val" }` | `{ "type": "intent.name" }` |
| `{{response}}` (sem `.data`) | `{{response.data}}` |
| `"overlays": {}` no schema | modal inline como componente |

### Apresentações de Modal

```
presentation: "modal"       ← modal centralizado (default)
presentation: "bottomSheet" ← slide up do bottom
presentation: "dialog"      ← diálogo pequeno 400px
presentation: "fullscreen"  ← 95vw × 95vh (funciona em runtime, CSS existe)
```

---

## 🎯 Filosofia do Projeto

### 1. Contrato acima de framework
- O JSON é agnóstico de tecnologia
- React, Flutter e outros são apenas renderers
- Não incluir JSX, Widgets Flutter ou código específico de plataforma no contrato

### 2. Material Design 3 como base
- Usar MD3 como sistema visual padrão
- Garantir consistência cross-platform
- Tokens previsíveis e mobile-first

### 3. Primitives + Custom Components
**Primitives (blocos básicos):**
- `layout.row`, `layout.column`, `layout.scaffold`
- `text`, `button.filled`, `input.text`
- `collection`, `card`

**Custom Components (blocos compostos reutilizáveis):**
- Definidos em `"components": {}` no schema
- Prefixo obrigatório: `component.*`
- Exemplo: `component.postCard`, `component.courseCard`

### 4. Actions vs Intents

**Action** responde "Como fazer?" — operação técnica:
```json
{ "type": "action.http", "method": "POST", "url": "/api/posts" }
```

**Intent** responde "O que o usuário quer?" — intenção de produto:
```json
{ "intent": "post.like", "postId": "123" }
```

---

## 🧪 Workflow de Desenvolvimento

**SEMPRE execute todos os passos abaixo antes de dizer que algo está pronto:**

> ⚠️ **Minificação desabilitada** — `vite.config.standalone.ts` está com `minify: false`.
> Só reabilitar (`minify: 'esbuild'`) quando o usuário declarar explicitamente que a versão é **"stable"**.

```bash
# 1. Build do pacote (do root do projeto)
cd packages/react && npm run build

# 2. Copiar para docs
cp packages/react/dist/pineui.standalone.js docs/
cp packages/react/dist/style.css docs/pineui.css

# 3. Servidor local
cd docs && python3 -m http.server 8080
```

**4. Testar TODAS as demos no browser:**

| Demo | URL | O que testar |
|------|-----|-------------|
| Simple | `http://localhost:8080/?demo=simple` | Input, botões, snackbar |
| Twitter | `http://localhost:8080/?demo=twitter` | Feed, like, compose modal |
| Gallery | `http://localhost:8080/?demo=gallery` | Filtros, grid, modal de navegação ← → |
| Inbox | `http://localhost:8080/?demo=inbox` | 3 colunas, click em conversa |
| Admin | `http://localhost:8080/?demo=admin` | Tabs, tabela |
| Catalog | `http://localhost:8080/?demo=catalog` | Catálogo de componentes |

- Verificar console do browser — zero erros
- Testar interações (cliques, mudanças de estado, navegação)
- Confirmar que os dados carregam corretamente

### 🚀 Deploy para Produção (somente quando declarado "stable")

Quando o usuário declarar que a versão está **"stable"**, executar **todos** os passos abaixo na ordem:

```bash
# 1. Reabilitar minificação
# Em packages/react/vite.config.standalone.ts:
#   minify: false  →  minify: 'esbuild'

# 2. Build minificado
cd packages/react && npm run build

# 3. Copiar para docs (GitHub Pages)
cp packages/react/dist/pineui.standalone.js docs/
cp packages/react/dist/style.css docs/pineui.css

# 4. Bump de versão (patch, minor ou major conforme o escopo)
npm version patch   # ou minor / major
# Isso atualiza o package.json automaticamente

# 5. Publicar no npm (atualiza o unpkg.com automaticamente)
npm publish --access public

# 6. Commit e push (inclui o tag de versão)
git add -A
git commit -m "release: vX.Y.Z"
git push origin main --tags
```

> O unpkg (`unpkg.com/@pineui/react@latest/dist/...`) serve direto do npm.
> Só é atualizado após o `npm publish`. Sem publish, só o GitHub Pages é atualizado.

Após o deploy, **desabilitar minificação novamente** (`minify: false`) para continuar o desenvolvimento.

---

## ⚠️ Regra Crítica: Consistência de Exemplos e Documentação

**Toda vez que adicionar, remover ou renomear um componente, action ou binding:**

### Arquivos que DEVEM ser verificados e corrigidos:

| Arquivo | O que verificar |
|---------|----------------|
| `PROMPT.md` | Tipos, exemplos, dos/don'ts — é o guia do builder de LLMs |
| `docs/PROMPT.md` | Sempre idêntico ao `PROMPT.md` raiz — copiar após editar |
| `README.md` | Seção de primitives, examples, API reference |
| `simple-example.json` | Deve funcionar sem erros no runtime |
| `case-example.json` | Deve funcionar sem erros no runtime |
| `docs/demos/*/ui.json` | Todas as demos |
| `docs/demos/*/components/*.json` | Componentes importados pelas demos |
| `CLAUDE.md` | Tabela de API correta e COMPONENT_MAP |

### Como sincronizar PROMPT.md:
```bash
cp PROMPT.md docs/PROMPT.md
```

### Verificação rápida de consistência:
```bash
# Busca por nomes de API errados em todos os JSONs
grep -r "action\.http\.request\|action\.overlay\.show\|action\.overlay\.hide\|progress\.circular\|progress\.linear\|layout\.grid\|input\.textarea\|\"onTap\"\|\"onClick\"\|\"type\": \"intent\." docs/demos/ *.json
```

Se retornar resultados, corrija antes de commitar.

---

## ✅ Checklist ao Criar Novos Componentes

**Implementação:**
- [ ] É declarativo e pode ser expresso em JSON?
- [ ] Segue Material Design 3?
- [ ] É agnóstico de plataforma?
- [ ] Registrado no `COMPONENT_MAP` do `Renderer.tsx`?
- [ ] Props recebidas via spread e passadas corretamente?
- [ ] Usa `onPress` (não `onTap`, não `onClick`)?

**Documentação (obrigatória antes do commit):**
- [ ] Adicionado na tabela de `COMPONENT_MAP` deste CLAUDE.md?
- [ ] Documentado no `README.md` (seção Primitives)?
- [ ] Documentado no `PROMPT.md` (e copiado para `docs/PROMPT.md`)?
- [ ] Exemplo real adicionado em alguma demo ou nos arquivos de exemplo?
- [ ] Dos/Don'ts atualizados no `PROMPT.md` se relevante?

---

## 🔐 Convenções de Código

### Nomenclatura
- **Actions**: operações técnicas → `action.http`, `action.overlay.open`, `action.state.patch`
- **Intents**: intenções de produto → `post.like`, `category.select`, `form.submit`
- **Primitives**: componentes básicos → `layout.*`, `button.*`, `input.*`
- **Custom Components**: compostos definidos no schema → `component.*`

### Estrutura de JSON
- Sempre incluir `"schemaVersion": "1.0.0"` obrigatório
- `"state"`: estado inicial
- `"intents"`: handlers nomeados
- `"overlays"`: modals e sheets (nunca inline)
- `"components"`: custom components
- `"screen"`: componente raiz (obrigatório)

---

## 🚫 Evitar

- Lógica de negócio no cliente
- Código específico de framework no contrato JSON
- Actions não implementadas no runtime (verificar lista acima)
- Tipos de componentes não registrados no COMPONENT_MAP
- Exemplos no repositório que não funcionam no runtime
- `PROMPT.md` desatualizado em relação ao runtime

---

## 🎨 Referências

- [Material Design 3](https://m3.material.io/)
- [Server-Driven UI Best Practices](https://www.judo.app/blog/server-driven-ui/)

---

**Mantra:** Interfaces devem ser declaradas como dados. Renderers devem ser intercambiáveis.

🍍 Grow interfaces from structured data.
