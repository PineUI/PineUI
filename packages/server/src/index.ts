/**
 * PineUI - Server-Driven UI for AI-Native Applications
 * Demo Server
 *
 * Copyright (c) 2026 Luma Ventures Ltda
 * CNPJ: 21.951.820/0001-39
 *
 * Licensed under the Apache License 2.0 with Commons Clause
 * See LICENSE file for details
 */

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files (SDK bundle)
app.use('/sdk', express.static(join(__dirname, '../../../packages/react/dist')));
app.use('/public', express.static(join(__dirname, '../../../public')));

// Serve the example JSONs
app.get('/api/schema/twitter-feed', (req, res) => {
  try {
    const schema = JSON.parse(
      readFileSync(join(__dirname, '../../../case-example.json'), 'utf-8')
    );
    res.json(schema);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load schema' });
  }
});

app.get('/api/schema/simple', (req, res) => {
  try {
    const schema = JSON.parse(
      readFileSync(join(__dirname, '../../../simple-example.json'), 'utf-8')
    );
    res.json(schema);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load schema' });
  }
});

app.get('/api/schema/twitter', (req, res) => {
  try {
    const schema = JSON.parse(
      readFileSync(join(__dirname, '../../../twitter-demo.json'), 'utf-8')
    );
    res.json(schema);
  } catch (error) {
    res.status(500).json({ error: 'Failed to load schema' });
  }
});

// Mock API endpoints for the Twitter-like app
app.get('/api/feed', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const after = req.query.after as string;

  // Mock posts data
  const posts = Array.from({ length: limit }, (_, i) => {
    const id = after ? parseInt(after) + i + 1 : i + 1;
    return {
      id: `post_${id}`,
      author: {
        id: `user_${(id % 10) + 1}`,
        username: `user${(id % 10) + 1}`,
        displayName: `User ${(id % 10) + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
        verified: id % 5 === 0
      },
      createdAt: new Date(Date.now() - id * 3600000).toISOString(),
      content: {
        text: `Este é o post número ${id}! 🍍 Testando o PineUI com Server-Driven UI. #PineUI #ServerDrivenUI`,
        mentions: [],
        hashtags: ['#PineUI', '#ServerDrivenUI']
      },
      media: id % 3 === 0 ? [{
        type: 'image',
        url: `https://picsum.photos/800/600?random=${id}`,
        thumbnail: `https://picsum.photos/200/150?random=${id}`,
        width: 800,
        height: 600,
        alt: `Image for post ${id}`
      }] : null,
      metrics: {
        likes: Math.floor(Math.random() * 1000),
        comments: Math.floor(Math.random() * 100),
        retweets: Math.floor(Math.random() * 50),
        views: Math.floor(Math.random() * 10000)
      },
      userActions: {
        liked: false,
        retweeted: false,
        bookmarked: false
      }
    };
  });

  res.json({
    data: posts,
    pagination: {
      hasMore: true,
      cursor: `post_${posts[posts.length - 1].id}`
    }
  });
});

// Like endpoint
app.post('/api/posts/:postId/like', (req, res) => {
  const { postId } = req.params;

  // Mock response
  res.json({
    success: true,
    postId,
    liked: true,
    newLikeCount: Math.floor(Math.random() * 1000) + 1
  });
});

// Create post endpoint
app.post('/api/posts', (req, res) => {
  const { content } = req.body;

  // Mock response
  res.json({
    success: true,
    post: {
      id: `post_${Date.now()}`,
      author: {
        id: 'user_current',
        username: 'currentuser',
        displayName: 'Current User',
        avatar: 'https://i.pravatar.cc/150?img=1',
        verified: false
      },
      createdAt: new Date().toISOString(),
      content,
      media: null,
      metrics: {
        likes: 0,
        comments: 0,
        retweets: 0,
        views: 0
      },
      userActions: {
        liked: false,
        retweeted: false,
        bookmarked: false
      }
    }
  });
});

// Serve demo page
app.get('/', (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>PineUI Demo - Twitter-like App</title>
  <!-- PineUI Standalone - sem dependências externas! -->
  <link rel="stylesheet" href="/sdk/style.css">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .header {
      color: white;
      padding: 2rem;
      text-align: center;
    }

    .header h1 {
      font-size: 3rem;
      margin-bottom: 0.5rem;
    }

    .header p {
      font-size: 1.2rem;
      opacity: 0.95;
      margin-bottom: 0.5rem;
    }

    .header .links {
      margin-top: 1rem;
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .header .links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      background: rgba(255,255,255,0.2);
      border-radius: 8px;
      font-size: 0.9rem;
      transition: background 0.2s;
    }

    .header .links a:hover {
      background: rgba(255,255,255,0.3);
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem 2rem;
    }

    .demo-container {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      min-height: 600px;
    }

    #pineui-root {
      width: 100%;
      height: 100%;
      min-height: 600px;
    }

    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 600px;
      color: #666;
      gap: 16px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #667eea;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .footer {
      text-align: center;
      color: white;
      padding: 2rem;
      opacity: 0.9;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🍍 PineUI</h1>
    <p>Server-Driven UI for AI-Native Applications</p>
    <p style="font-size: 0.95rem; opacity: 0.85;">Exemplo renderizado a partir de JSON</p>
    <div class="links">
      <a href="/?demo=simple">🎨 Demo Simple</a>
      <a href="/?demo=twitter">🐦 Demo Twitter</a>
      <a href="/api/feed" target="_blank">🔌 API Feed</a>
    </div>
  </div>

  <div class="container">
    <div class="demo-container">
      <div id="pineui-root">
        <div class="loading">
          <div class="spinner"></div>
          <p>Carregando PineUI...</p>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    <p>✨ Tudo declarativo, multi-plataforma e AI-friendly</p>
  </div>

  <script src="/sdk/pineui.standalone.js"></script>
  <script>
    console.log('🍍 Initializing PineUI...');
    console.log('PineUI SDK:', typeof window.PineUI);

    // Wait for everything to load
    window.addEventListener('load', function() {
      console.log('✅ Page loaded');

      if (window.PineUI && window.PineUI.render) {
        console.log('✅ PineUI SDK found, starting render...');

        // Get demo from URL params
        const urlParams = new URLSearchParams(window.location.search);
        const demo = urlParams.get('demo') || 'twitter';
        const schemaUrl = demo === 'twitter' ? '/api/schema/twitter' : '/api/schema/simple';

        console.log('Loading demo:', demo, schemaUrl);

        window.PineUI.render({
          target: '#pineui-root',
          schemaUrl: schemaUrl,
          baseUrl: '',
          onReady: () => {
            console.log('✅ PineUI is ready!');
          },
          onError: (error) => {
            console.error('❌ PineUI error:', error);
            document.getElementById('pineui-root').innerHTML = \`
              <div class="loading">
                <p style="color: red;">Erro ao carregar: \${error.message}</p>
                <button onclick="location.reload()">Tentar novamente</button>
              </div>
            \`;
          }
        });
      } else {
        console.error('❌ PineUI SDK not loaded');
        console.error('window.PineUI:', window.PineUI);
        document.getElementById('pineui-root').innerHTML = \`
          <div class="loading">
            <p style="color: red;">SDK não carregado. Verifique o console.</p>
          </div>
        \`;
      }
    });
  </script>
</body>
</html>
  `);
});

app.listen(PORT, () => {
  console.log(`🍍 PineUI Server running on http://localhost:${PORT}`);
  console.log(`📦 SDK available at http://localhost:${PORT}/sdk/pineui.umd.js`);
  console.log(`📋 Schema available at http://localhost:${PORT}/api/schema/twitter-feed`);
});
