/**
 * Mock API for GitHub Pages and Local Development
 * Loads API definitions from demos/{demo}/api.json
 */

const mockStore = {
  apiDefinitions: {},
  posts: [],
  nextId: 1,
};

// Load API definitions for a demo
async function loadAPIDefinitions(demo) {
  try {
    const response = await fetch(`./demos/${demo}/api.json`);
    const data = await response.json();
    mockStore.apiDefinitions[demo] = data.endpoints || {};
    console.log(`✅ Loaded API definitions for ${demo}:`, Object.keys(mockStore.apiDefinitions[demo]));
  } catch (error) {
    console.warn(`⚠️ No API definitions found for ${demo}:`, error);
    mockStore.apiDefinitions[demo] = {};
  }
}

// Generate dynamic mock data
function generateMockPosts(count = 20, startId = 1) {
  const posts = [];
  for (let i = 0; i < count; i++) {
    const id = startId + i;
    posts.push({
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
    });
  }
  return posts;
}

// Find matching API definition
function findMatchingEndpoint(path, method, demo) {
  const definitions = mockStore.apiDefinitions[demo];
  if (!definitions) return null;

  // Exact match
  if (definitions[path] && definitions[path].method === method) {
    return definitions[path];
  }

  // Pattern match (e.g., /api/posts/:id)
  for (const [pattern, config] of Object.entries(definitions)) {
    if (config.method !== method) continue;

    const regex = new RegExp('^' + pattern.replace(/:[^/]+/g, '([^/]+)') + '$');
    if (regex.test(path)) {
      return config;
    }
  }

  return null;
}

// Dynamic fallback handlers
const dynamicHandlers = {
  '/api/twitter/feed': (params) => {
    const limit = parseInt(params.limit) || 20;
    const after = params.after;

    let startId = 1;
    if (after) {
      const afterId = parseInt(after.replace('post_', ''));
      startId = afterId + 1;
    }

    const posts = generateMockPosts(limit, startId);

    return {
      data: posts,
      pagination: {
        hasMore: true,
        cursor: posts[posts.length - 1].id
      }
    };
  },

  '/api/twitter/posts/*/like': () => ({
    success: true,
    liked: true
  }),

  '/api/twitter/posts': (params, body) => {
    const newPost = {
      id: `post_${mockStore.nextId++}`,
      author: {
        id: 'user_current',
        username: 'currentuser',
        displayName: 'Current User',
        avatar: 'https://i.pravatar.cc/150?img=1',
        verified: false
      },
      createdAt: new Date().toISOString(),
      content: body.content,
      media: null,
      metrics: { likes: 0, comments: 0, retweets: 0, views: 0 },
      userActions: { liked: false, retweeted: false, bookmarked: false }
    };

    mockStore.posts.unshift(newPost);
    return { success: true, post: newPost };
  }
};

// Initialize mock store
mockStore.posts = generateMockPosts(20);
mockStore.nextId = 21;

// Intercept fetch calls
function initMockAPI(currentDemo = 'twitter') {
  const originalFetch = window.fetch;

  window.fetch = function(url, options = {}) {
    // For non-API calls, use original fetch
    if (typeof url !== 'string' || !url.startsWith('/api/')) {
      return originalFetch.apply(this, arguments);
    }

    console.log('🔧 Mock API intercepted:', url, options);

    // Parse URL
    const urlObj = new URL(url, window.location.origin);
    const path = urlObj.pathname;
    const params = Object.fromEntries(urlObj.searchParams);

    // Try to find endpoint definition
    const endpoint = findMatchingEndpoint(path, options.method || 'GET', currentDemo);

    if (endpoint) {
      console.log('✅ Found API definition:', path);
      let result = endpoint.response;

      // Simple template replacement for {{body.xxx}}
      if (options.body) {
        try {
          const body = JSON.parse(options.body);
          const resultStr = JSON.stringify(result);
          const replaced = resultStr.replace(/\{\{body\.([^}]+)\}\}/g, (_, key) => {
            const keys = key.split('.');
            let value = body;
            for (const k of keys) {
              value = value[k];
              if (value === undefined) return '';
            }
            return value;
          });
          result = JSON.parse(replaced);
        } catch (e) {
          console.warn('Failed to parse body:', e);
        }
      }

      // Handle query parameters for nested data (e.g., conversationId, userId, category)
      if (result.data && typeof result.data === 'object') {
        // Check if we have query params that match keys in data
        if (params.conversationId && result.data[params.conversationId]) {
          result = { data: result.data[params.conversationId] };
        } else if (params.userId && result.data[params.userId]) {
          result = { data: [result.data[params.userId]] };
        } else if (params.category && Array.isArray(result.data)) {
          // Filter array by category
          if (params.category !== 'All') {
            result = { data: result.data.filter(item => item.category === params.category) };
          }
          // If category is 'All', return everything as-is
        }
      }

      return Promise.resolve({
        ok: true,
        status: 200,
        json: () => Promise.resolve(result),
        text: () => Promise.resolve(JSON.stringify(result)),
      });
    }

    // Try dynamic handlers
    for (const [pattern, handler] of Object.entries(dynamicHandlers)) {
      if (pattern.includes('*')) {
        const regex = new RegExp('^' + pattern.replace('*', '([^/]+)') + '$');
        const match = path.match(regex);
        if (match) {
          let body = null;
          if (options.body) {
            try {
              body = JSON.parse(options.body);
            } catch (e) {}
          }

          const result = handler(params, match[1] || body);
          return Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(result),
            text: () => Promise.resolve(JSON.stringify(result)),
          });
        }
      } else if (path === pattern) {
        let body = null;
        if (options.body) {
          try {
            body = JSON.parse(options.body);
          } catch (e) {}
        }

        const result = handler(params, body);
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(result),
          text: () => Promise.resolve(JSON.stringify(result)),
        });
      }
    }

    console.warn('⚠️ No handler found for:', path);
    return Promise.reject(new Error('Mock API handler not found'));
  };

  console.log('✅ Mock API initialized for demo:', currentDemo);
}

// Export for use in index.html
window.initMockAPI = initMockAPI;
window.loadAPIDefinitions = loadAPIDefinitions;
