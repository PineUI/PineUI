# PineUI - Instruções para Desenvolvimento

## 📋 Visão Geral do Projeto

PineUI é um protocolo e SDK para Server-Driven UI focado em aplicações AI-native. O sistema permite construir interfaces declarativas renderizadas a partir de JSON, com governança centralizada no servidor.

**Objetivos principais:**
- Escalar para milhões de usuários
- Multi-plataforma (Web + Flutter)
- AI-friendly (LLMs podem gerar telas válidas)
- Consistência de produto
- Separação entre intenção e implementação

## 🎯 Filosofia do Projeto

### 1. Contrato acima de framework
- O JSON é agnóstico de tecnologia
- React, Flutter e outros são apenas renderers
- Não incluir JSX, Widgets Flutter ou código específico de plataforma no contrato

### 2. Material Design 3 como base
- Usar MD3 como sistema visual padrão
- Garantir consistência cross-platform
- Tokens previsíveis e mobile-first

### 3. Primitives + Patterns
**Primitives (blocos básicos):**
- layout.row, layout.column, layout.scaffold
- text, button.filled, input.text
- collection, card

**Patterns (blocos compostos reutilizáveis):**
- pattern.postCard, pattern.commentsPanel
- pattern.dataTable, pattern.composerModal
- pattern.profilePanel

## 🔧 Convenções de Código

### Nomenclatura
- **Actions**: operações técnicas → `action.http`, `action.overlay.open`, `action.state.patch`
- **Intents**: intenções de produto → `intent.comments.open`, `intent.post.like`, `intent.form.submit`
- **Primitives**: componentes básicos → `layout.*`, `button.*`, `input.*`
- **Patterns**: componentes compostos → `pattern.*`

### Estrutura de JSON
- Sempre incluir `schemaVersion` obrigatório
- Usar snake_case ou camelCase conforme padrão MD3
- Manter estrutura declarativa e semântica
- Priorizar legibilidade para IA

### Actions vs Intents
**Action responde:** "Como fazer?"
```json
{ "type": "action.http", "method": "POST" }
```

**Intent responde:** "O que o usuário quer?"
```json
{ "type": "intent.post.like", "postId": "123" }
```

## 🌍 Multi-Platform

### Web (React)
- Usar shadcn/ui adaptado ao Material 3
- Manter compatibilidade com tokens MD3
- Implementar virtualização para escalabilidade

### Flutter
- Usar Material 3 nativo
- Aproveitar widgets nativos quando possível
- Manter paridade visual com Web

## 📦 Collections

Suporte obrigatório para:
- list, grid, table
- Paginação por cursor
- emptyState
- Lazy loading
- Virtualização

## 🤖 AI-First Design

Ao criar schemas ou componentes:
- LLMs devem conseguir gerar telas válidas
- Usar apenas patterns permitidos (allowlist)
- Dispara apenas intents seguras
- Documentar claramente os contratos

## 🔐 Governança e Segurança

- `schemaVersion` é obrigatório em todo JSON
- Manter allowlist de patterns permitidos
- Manter allowlist de intents permitidos
- Servidor valida actions críticas
- Nunca expor lógica de negócio no cliente

## 📈 Escalabilidade

Implementar sempre:
- Virtualização de listas
- Cache por entidade
- Lazy loading de componentes
- Patches parciais de estado
- Telemetria por intent

## ✅ Checklist ao Criar Novos Componentes

- [ ] É declarativo e pode ser expresso em JSON?
- [ ] Segue Material Design 3?
- [ ] É agnóstico de plataforma?
- [ ] Pode ser renderizado por React e Flutter?
- [ ] Está na allowlist se for um pattern?
- [ ] Documenta intents vs actions claramente?
- [ ] Suporta cache e virtualização?
- [ ] É compreensível por LLMs?

## 🧪 Workflow de Desenvolvimento

**SEMPRE teste localmente antes de dizer que está pronto:**

1. Build do pacote:
```bash
cd packages/react && npm run build
```

2. Copiar para docs:
```bash
cp packages/react/dist/pineui.standalone.js docs/
cp packages/react/dist/style.css docs/pineui.css
```

3. Iniciar servidor local:
```bash
cd docs && python3 -m http.server 8080
```

4. Testar no browser:
- Abrir http://localhost:8080/?demo=inbox
- Testar interações (cliques, mudanças de estado)
- Verificar console do browser para erros
- Validar que JSON está sendo carregado corretamente

**NUNCA** diga que algo está pronto sem testar localmente primeiro.

## 🚫 Evitar

- Lógica de negócio no cliente
- Código específico de framework no contrato JSON
- Actions complexas sem governança
- Misturar intenção com implementação
- Componentes que não escalam
- Patterns sem documentação clara

## 📝 Notas de Desenvolvimento

- Priorize simplicidade e clareza
- Documente contratos de API em JSON Schema
- Teste multi-plataforma desde o início
- Mantenha exemplos para cada pattern
- Considere sempre a experiência do desenvolvedor IA

## 🎨 Referências

- [Material Design 3](https://m3.material.io/)
- [Server-Driven UI Best Practices](https://www.judo.app/blog/server-driven-ui/)

---

**Mantra:** Interfaces devem ser declaradas como dados. Renderers devem ser intercambiáveis.

🍍 Grow interfaces from structured data.
