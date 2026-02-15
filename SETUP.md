# 🚀 Setup do PineUI

## Instalação

```bash
# Instalar dependências de todos os workspaces
npm install
```

## Desenvolvimento

### 1. Iniciar o servidor de desenvolvimento

```bash
# Terminal 1: Build do SDK em watch mode
cd packages/react
npm run dev
```

```bash
# Terminal 2: Iniciar servidor Express
npm run dev
```

### 2. Acessar a demo

Abra o navegador em: http://localhost:3000

## Estrutura do Projeto

```
PineUI/
├── packages/
│   ├── server/           # Express server
│   │   └── src/
│   │       └── index.ts  # API + Demo page
│   │
│   └── react/            # React SDK
│       └── src/
│           ├── components/    # PineUI components
│           ├── renderer/      # JSON interpreter
│           ├── PineUI.tsx    # Main component
│           ├── index.ts      # Entry point
│           └── styles.css    # MD3 styles
│
├── case-example.json     # Twitter-like demo schema
├── CASE.md              # Case documentation
├── CLAUDE.md            # Development guidelines
└── README.md            # Project overview
```

## Como Embedar

### Opção 1: Script Tag (UMD)

```html
<div id="my-app"></div>
<script src="http://localhost:3000/sdk/pineui.umd.js"></script>
<script>
  PineUI.render({
    target: '#my-app',
    schemaUrl: 'http://localhost:3000/api/schema/twitter-feed'
  });
</script>
```

### Opção 2: NPM Package

```bash
npm install @pineui/react
```

```tsx
import { PineUI } from '@pineui/react';

function App() {
  return (
    <PineUI schemaUrl="https://api.example.com/schema" />
  );
}
```

## Build para Produção

```bash
# Build todos os workspaces
npm run build

# Build apenas o SDK
npm run build:sdk
```

## API Endpoints

- `GET /api/schema/twitter-feed` - Schema JSON do caso Twitter
- `GET /api/feed` - Posts do feed (mock data)
- `POST /api/posts/:postId/like` - Like em post
- `POST /api/posts` - Criar novo post

## Próximos Passos

1. ✅ SDK React básico funcionando
2. ✅ Servidor Express servindo schema
3. ⏳ Implementar componentes restantes
4. ⏳ Sistema de overlays/modals
5. ⏳ Virtualização de listas
6. ⏳ SDK Flutter
7. ⏳ Documentação completa

## Troubleshooting

### Porta 3000 já está em uso

```bash
PORT=3001 npm run dev
```

### Erro ao instalar dependências

```bash
rm -rf node_modules package-lock.json
npm install
```
