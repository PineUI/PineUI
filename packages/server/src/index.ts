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

// Serve static files from docs/ (same as GitHub Pages)
app.use(express.static(join(__dirname, '../../../docs')));

// Demos are now served as static files from docs/demos/

// Mock API endpoints for the Twitter-like app
app.get('/api/feed', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const after = req.query.after as string;

  console.log('Feed request:', { limit, after });

  // Mock posts data
  const posts = Array.from({ length: limit }, (_, i) => {
    // Parse the cursor properly (format: "post_X")
    const afterId = after ? parseInt(after.replace('post_', '')) : 0;
    const id = afterId + i + 1;

    console.log(`Generating post ${id}, afterId=${afterId}`);
    return {
      id: `post_${id}`,
      author: {
        id: `user_${(id % 10) + 1}`,
        username: `user${(id % 10) + 1}`,
        displayName: `User ${(id % 10) + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
        verified: id % 5 === 0
      },
      // Limit the time offset to avoid invalid dates (max 30 days old)
      createdAt: new Date(Date.now() - (Math.min(id, 720) * 3600000)).toISOString(),
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
      cursor: posts[posts.length - 1].id // Already has "post_" prefix
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

// Main page is now served as static index.html from docs/
// Mock API endpoints remain for backwards compatibility
app.get('/api/twitter/feed', (req, res) => {
  const limit = parseInt(req.query.limit as string) || 20;
  const after = req.query.after as string;

  console.log('Twitter feed request:', { limit, after });

  const afterId = after ? parseInt(after.replace('post_', '')) : 0;
  const posts = Array.from({ length: limit }, (_, i) => {
    const id = afterId + i + 1;
    return {
      id: `post_${id}`,
      author: {
        id: `user_${(id % 10) + 1}`,
        username: `user${(id % 10) + 1}`,
        displayName: `User ${(id % 10) + 1}`,
        avatar: `https://i.pravatar.cc/150?img=${(id % 70) + 1}`,
        verified: id % 5 === 0
      },
      createdAt: new Date(Date.now() - (Math.min(id, 720) * 3600000)).toISOString(),
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
      cursor: posts[posts.length - 1].id
    }
  });
});

// Index.html is now served as static file from docs/

app.listen(PORT, () => {
  console.log(`🍍 PineUI Server running on http://localhost:${PORT}`);
  console.log(`📦 SDK available at http://localhost:${PORT}/sdk/pineui.umd.js`);
  console.log(`📋 Schema available at http://localhost:${PORT}/api/schema/twitter-feed`);
});
