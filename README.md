# 🍍 PineUI

[![License](https://img.shields.io/badge/License-Apache%202.0%20with%20Commons%20Clause-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.1.0-green.svg)](package.json)

**Server-Driven UI for AI-Native Applications**

PineUI é um protocolo e SDK para construir interfaces declarativas
renderizadas a partir de JSON, com governança centralizada no servidor.

> 🏢 Desenvolvido por [Luma Ventures](https://lumaventures.com) | CNPJ: 21.951.820/0001-39

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Acessar demo
open http://localhost:3000
```

Ele foi projetado para:

-   🚀 Escalar para milhões de usuários\
-   🌍 Ser multi-plataforma (Web + Flutter)\
-   🤖 Ser AI-friendly\
-   🧱 Manter consistência de produto\
-   🔐 Separar intenção de implementação

------------------------------------------------------------------------

# 🌱 Manifesto

Interfaces modernas não são estáticas.

Elas evoluem constantemente: - Novas features toda semana\
- Personalização por usuário\
- Experimentos A/B\
- IA criando experiências sob demanda

A maioria dos sistemas atuais mistura: - UI\
- Lógica\
- Regras de negócio\
- Código de renderização

Isso gera acoplamento, lentidão e inconsistência.

PineUI propõe algo diferente:

> Interfaces devem ser declaradas como dados.\
> Renderers devem ser intercambiáveis.\
> Intenções devem ser semânticas.\
> Implementações devem ser substituíveis.

PineUI não é apenas um renderer.\
É um protocolo declarativo para construir produtos complexos, com
governança central e preparado para a era da IA.

------------------------------------------------------------------------

# 🧠 Filosofia

## 1️⃣ Contrato acima de framework

O JSON do PineUI é agnóstico de tecnologia.

-   React é um renderer\
-   Flutter é outro renderer\
-   Web puro pode ser outro renderer

O contrato não contém JSX nem Widgets Flutter.

------------------------------------------------------------------------

## 2️⃣ Material Design 3 como base

PineUI adota **Material Design 3** como sistema visual padrão.

Isso garante:

-   Consistência cross-platform\
-   Tokens previsíveis\
-   Experiência mobile-first\
-   Compatibilidade direta com Flutter

------------------------------------------------------------------------

## 3️⃣ Primitives + Patterns

### 🔹 Primitives

Blocos básicos portáveis:

-   layout.row\
-   layout.column\
-   layout.scaffold\
-   text\
-   button.filled\
-   input.text\
-   collection\
-   card

------------------------------------------------------------------------

### 🔹 Patterns

Blocos compostos reutilizáveis:

-   pattern.postCard\
-   pattern.commentsPanel\
-   pattern.dataTable\
-   pattern.composerModal\
-   pattern.profilePanel

Reduzem verbosidade e garantem consistência.

------------------------------------------------------------------------

# ⚡ Actions vs Intents

## 🔹 Action

Executa uma operação técnica.

Exemplos:

``` json
{ "type": "action.http" }
{ "type": "action.overlay.open" }
{ "type": "action.state.patch" }
```

Action responde à pergunta:

> Como fazer?

------------------------------------------------------------------------

## 🔹 Intent

Representa uma intenção de produto.

``` json
{ "type": "intent.comments.open" }
{ "type": "intent.post.like" }
{ "type": "intent.form.submit" }
```

Intent responde à pergunta:

> O que o usuário quer?

------------------------------------------------------------------------

# 📦 Collections

O componente `collection` suporta:

-   list\
-   grid\
-   table\
-   paginação por cursor\
-   emptyState\
-   lazy loading

------------------------------------------------------------------------

# 🌍 Multi-Platform

## Web (React)

-   Pode usar shadcn/ui adaptado ao Material 3

## Flutter

-   Usa Material 3 nativo

------------------------------------------------------------------------

# 📈 Escalabilidade

Projetado para 10M+ MAU:

-   Virtualização\
-   Cache por entidade\
-   Lazy loading\
-   Patches parciais\
-   Telemetria por intent

------------------------------------------------------------------------

# 🤖 AI-First

PineUI permite que LLMs:

-   Gerem telas válidas\
-   Usem apenas patterns permitidos\
-   Disparem intents seguras

------------------------------------------------------------------------

# 🔐 Governança

-   schemaVersion obrigatório\
-   Allowlist de patterns\
-   Allowlist de intents\
-   Server valida actions críticas

------------------------------------------------------------------------

# 🎯 Objetivo

PineUI é um protocolo declarativo para construir produtos complexos,
multi-plataforma, e preparado para a era da IA.

🍍 Grow interfaces from structured data.

------------------------------------------------------------------------

# 📜 License

PineUI is licensed under **Apache 2.0 with Commons Clause**.

**What this means:**
- ✅ **Free to use** for internal applications
- ✅ **Free to use** for open source projects
- ✅ **Free to modify** and create derivative works
- ✅ **Free to distribute** the source code
- ❌ **Cannot sell** as a hosted service or product

**Commons Clause Restriction:**
You cannot sell the software or provide it as a paid service where the value derives substantially from PineUI's functionality.

**Need commercial licensing?**
📧 Email: **wupsbr@gmail.com**
📄 See [COMMERCIAL.md](./COMMERCIAL.md) for details

See [LICENSE](./LICENSE) for full terms.

------------------------------------------------------------------------

---

## 📞 Contact

**Commercial Licensing:**
📧 Email: wupsbr@gmail.com
🏢 Company: Luma Ventures Ltda
📋 CNPJ: 21.951.820/0001-39

---

© 2026 Luma Ventures Ltda. All rights reserved.

