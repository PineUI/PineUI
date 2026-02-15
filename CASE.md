# 🐦 CASE: Twitter-Like App

## 📋 Visão Geral

Este é o caso de referência para validar que o PineUI funciona para aplicações complexas e reais. Uma rede social estilo Twitter com todas as funcionalidades principais.

**Objetivo:** Se o PineUI consegue expressar este caso de forma clara, declarativa e escalável, então o protocolo está bem desenhado.

---

## 🎯 Funcionalidades Principais

### 1. Feed Principal
- **Lista infinita de posts** com scroll virtualizado
- Cada post contém:
  - Avatar e nome do autor
  - Timestamp relativo ("2h atrás")
  - Texto do post (suporta markdown básico, mentions, hashtags)
  - Mídia opcional: foto única, múltiplas fotos, ou vídeo
  - Contadores: likes, comments, retweets, views
  - Ações: like, comment, retweet, share, bookmark, menu
- **Pull-to-refresh** para atualizar feed
- **Lazy loading** ao chegar no fim da lista
- **Estados:**
  - Loading inicial (skeleton)
  - Empty state (quando não há posts)
  - Error state (quando falha carregar)

### 2. Composer (Modal para Criar Post)
- **Trigger:** Botão floating "+" no canto inferior direito
- **Modal contém:**
  - Avatar do usuário logado
  - Campo de texto multilinha (placeholder: "O que está acontecendo?")
  - Contador de caracteres (limite 280)
  - Toolbar com botões:
    - 📷 Adicionar foto (abre galeria)
    - 🎥 Adicionar vídeo (abre galeria)
    - 🌍 Visibilidade (público/privado)
  - Preview de mídia selecionada (com botão X para remover)
  - Botão "Postar" (disabled se vazio ou > 280 chars)
  - Botão "Cancelar"
- **Ações:**
  - Upload de mídia
  - Post com texto + mídia
  - Feedback de sucesso/erro

### 3. Post Individual (Detalhe)
- Mesmo layout do post no feed, mas expandido
- **Seção de comentários abaixo:**
  - Lista de comentários (mesmo formato de post)
  - Campo para adicionar novo comentário
  - Comentários também têm likes e respostas
- **Navegação:** Ao clicar em um post do feed, abre tela de detalhe

### 4. Interações em Tempo Real
- **Like:**
  - Ícone coração (outline quando não curtido, filled vermelho quando curtido)
  - Animação ao curtir
  - Contador atualiza imediatamente (optimistic update)
  - Se falhar, reverte o estado
- **Comment:**
  - Abre modal ou navega para tela de detalhe
  - Mostra contador de comentários
- **Retweet:**
  - Abre menu: "Retweet" ou "Quote Tweet"
  - Atualiza contador
- **Bookmark:**
  - Toggle para salvar post
  - Feedback visual

### 5. Perfil de Usuário
- **Header:**
  - Foto de capa
  - Avatar (sobreposto)
  - Nome e @username
  - Bio
  - Localização, website, data de entrada
  - Contadores: following, followers
  - Botão "Follow/Following"
- **Tabs:**
  - Posts (lista de posts do usuário)
  - Replies (respostas)
  - Media (posts com foto/vídeo)
  - Likes (posts curtidos)

### 6. Navegação
- **Bottom Navigation (Mobile):**
  - Home (feed)
  - Search (busca)
  - Notifications (notificações)
  - Messages (mensagens diretas)
  - Profile (perfil)
- **Top Bar:**
  - Logo (voltando ao topo do feed)
  - Avatar do usuário (menu dropdown)

### 7. Estados e Edge Cases
- **Loading states:**
  - Skeleton screens para feed
  - Spinners para ações
  - Progress para upload de mídia
- **Empty states:**
  - "Nenhum post ainda" com ilustração
  - "Você não segue ninguém" com botão para descobrir pessoas
- **Error states:**
  - "Erro ao carregar feed" com botão retry
  - "Erro ao postar" com opções de tentar novamente ou descartar

### 8. Experiências Personalizadas
- **Recomendações no feed:**
  - "Você pode gostar deste post" (card diferenciado)
  - "Siga @usuario" (card de sugestão)
- **Anúncios:**
  - Posts promovidos (marcados como "Promovido")
  - Mesmo formato de post normal

---

## 🎨 Requisitos de Design

### Material Design 3
- Usar tokens MD3 para cores, tipografia, espaçamentos
- Surface levels para cards
- Motion MD3 para transições
- Bottom sheets para modais mobile
- FAB (Floating Action Button) para composer

### Responsividade
- **Mobile:** Bottom navigation, modals full-screen
- **Tablet:** Side navigation, modals em overlay
- **Desktop:** Rail navigation, modals centered, feed com largura máxima

### Acessibilidade
- Labels ARIA para screen readers
- Contraste adequado
- Tamanhos de toque mínimos (48dp)
- Suporte a navegação por teclado

---

## 🔧 Requisitos Técnicos

### Performance
- **Virtualização obrigatória** para feed (renderizar apenas posts visíveis)
- **Lazy loading** de imagens e vídeos
- **Prefetch** de próxima página
- **Cache** de posts já carregados
- **Optimistic updates** para ações (like, retweet)

### Offline
- Mostrar posts em cache quando offline
- Enfileirar ações para executar quando voltar online
- Feedback claro de estado offline

### Telemetria
- Rastrear eventos:
  - `feed.viewed`
  - `post.liked`
  - `post.commented`
  - `composer.opened`
  - `post.created`
  - `profile.viewed`

### Segurança
- Actions críticas validadas no servidor:
  - Criar post
  - Seguir usuário
  - Reportar conteúdo
- Intents são enviados como semânticos, servidor decide implementação

---

## 📊 Dados de Exemplo

### Post
```json
{
  "id": "post_123",
  "author": {
    "id": "user_456",
    "username": "mariasilva",
    "displayName": "Maria Silva",
    "avatar": "https://cdn.example.com/avatars/456.jpg",
    "verified": false
  },
  "createdAt": "2026-02-14T18:30:00Z",
  "content": {
    "text": "Adorando trabalhar com PineUI! 🍍 A separação entre intents e actions é genial. #PineUI #ServerDrivenUI",
    "mentions": ["@pineui"],
    "hashtags": ["#PineUI", "#ServerDrivenUI"]
  },
  "media": [
    {
      "type": "image",
      "url": "https://cdn.example.com/posts/123_1.jpg",
      "thumbnail": "https://cdn.example.com/posts/123_1_thumb.jpg",
      "width": 1200,
      "height": 800,
      "alt": "Screenshot do PineUI"
    }
  ],
  "metrics": {
    "likes": 142,
    "comments": 23,
    "retweets": 8,
    "views": 1543
  },
  "userActions": {
    "liked": false,
    "retweeted": false,
    "bookmarked": false
  }
}
```

### User Profile
```json
{
  "id": "user_456",
  "username": "mariasilva",
  "displayName": "Maria Silva",
  "avatar": "https://cdn.example.com/avatars/456.jpg",
  "coverImage": "https://cdn.example.com/covers/456.jpg",
  "bio": "Frontend Engineer | React & Flutter | Building @pineui",
  "location": "São Paulo, Brasil",
  "website": "https://mariasilva.dev",
  "joinedAt": "2024-03-15T10:00:00Z",
  "verified": false,
  "metrics": {
    "following": 234,
    "followers": 1567,
    "posts": 432
  },
  "userActions": {
    "following": false,
    "followedBy": false,
    "muted": false,
    "blocked": false
  }
}
```

---

## ✅ Critérios de Sucesso

O PineUI resolve este caso se conseguir:

1. ✅ **Expressar toda a UI em JSON declarativo**
   - Feed, posts, modal, perfil, navegação

2. ✅ **Separar intents de implementação**
   - `intent.post.like` não expõe detalhes de HTTP
   - Servidor decide como implementar cada intent

3. ✅ **Ser renderizável em React e Flutter**
   - Mesmo JSON gera UI equivalente em ambas plataformas

4. ✅ **Permitir personalização por usuário**
   - Recomendações, anúncios, experimentos A/B
   - Tudo controlado pelo servidor via JSON

5. ✅ **Escalar para milhões de usuários**
   - Virtualização, cache, lazy loading
   - Patches parciais de estado

6. ✅ **Ser gerado por IA**
   - LLM consegue gerar JSON válido para criar telas customizadas
   - Usa apenas patterns da allowlist

---

## 🚀 Fases de Implementação

### Fase 1: MVP (Core)
- Feed básico com posts de texto
- Modal composer
- Like/unlike
- Scroll infinito

### Fase 2: Mídia
- Posts com imagens
- Posts com vídeos
- Upload no composer

### Fase 3: Social
- Comentários
- Retweets
- Perfil de usuário
- Follow/unfollow

### Fase 4: Polish
- Animações
- Optimistic updates
- Offline support
- Telemetria completa

---

**Meta:** Este caso deve servir como prova de conceito definitiva de que PineUI é capaz de expressar aplicações modernas e complexas de forma elegante e escalável.

🍍 If it works for Twitter, it works for anything.
