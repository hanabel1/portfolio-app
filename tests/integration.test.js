const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Import the server
const app = require('../server');

describe('Portfolio Application Integration Tests', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3002, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Complete User Journey', () => {
    test('should allow user to navigate through all pages', async () => {
      // Start at home page
      let response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.text).toContain('Welcome to My Portfolio');
      
      // Navigate to about page
      response = await request(app)
        .get('/about')
        .expect(200);
      
      expect(response.text).toContain('About Me');
      expect(response.text).toContain('Skills & Technologies');
      
      // Navigate to projects page
      response = await request(app)
        .get('/projects')
        .expect(200);
      
      expect(response.text).toContain('My Projects');
      expect(response.text).toContain('E-Commerce Platform');
    });

    test('should maintain consistent navigation across all pages', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app)
          .get(page)
          .expect(200);
        
        // Check for consistent navigation elements
        expect(response.text).toContain('class="navbar"');
        expect(response.text).toContain('class="nav-links"');
        expect(response.text).toContain('href="/"');
        expect(response.text).toContain('href="/about"');
        expect(response.text).toContain('href="/projects"');
      }
    });
  });

  describe('Static Asset Integration', () => {
    test('should serve all required static assets', async () => {
      const assets = [
        { path: '/css/style.css', type: 'text/css' },
        { path: '/js/main.js', type: 'javascript' }
      ];

      for (const asset of assets) {
        const response = await request(app)
          .get(asset.path)
          .expect(200);
        
        expect(response.headers['content-type']).toContain(asset.type);
        expect(response.text.length).toBeGreaterThan(0);
      }
    });

    test('should have proper asset references in HTML', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app)
          .get(page)
          .expect(200);
        
        // Check for CSS and JS references
        expect(response.text).toContain('href="/css/style.css"');
        expect(response.text).toContain('src="/js/main.js"');
      }
    });
  });

  describe('Error Handling Integration', () => {
    test('should handle 404 errors gracefully', async () => {
      const invalidRoutes = [
        '/fake-page',
        '/invalid/route',
        '/projects/non-existent',
        '/about/extra'
      ];

      for (const route of invalidRoutes) {
        const response = await request(app)
          .get(route)
          .expect(404);
        
        expect(response.text).toContain('404 - Page Not Found');
        expect(response.text).toContain('Go Home');
      }
    });

    test('should maintain navigation in error pages', async () => {
      const response = await request(app)
        .get('/non-existent')
        .expect(404);
      
      // Should still have navigation
      expect(response.text).toContain('class="navbar"');
      expect(response.text).toContain('href="/"');
    });
  });

  describe('Content Consistency', () => {
    test('should have consistent page titles', async () => {
      const expectedTitles = {
        '/': 'Portfolio - Home',
        '/about': 'About - Portfolio',
        '/projects': 'Projects - Portfolio'
      };

      for (const [route, expectedTitle] of Object.entries(expectedTitles)) {
        const response = await request(app)
          .get(route)
          .expect(200);
        
        expect(response.text).toContain(`<title>${expectedTitle}</title>`);
      }
    });

    test('should have consistent meta tags', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app)
          .get(page)
          .expect(200);
        
        expect(response.text).toContain('<meta charset="UTF-8">');
        expect(response.text).toContain('<meta name="viewport"');
      }
    });
  });

  describe('Performance Integration', () => {
    test('should respond quickly to requests', async () => {
      const startTime = Date.now();
      
      await request(app)
        .get('/')
        .expect(200);
      
      const responseTime = Date.now() - startTime;
      expect(responseTime).toBeLessThan(1000); // Should respond within 1 second
    });

    test('should handle concurrent requests', async () => {
      const requests = [
        request(app).get('/'),
        request(app).get('/about'),
        request(app).get('/projects'),
        request(app).get('/css/style.css'),
        request(app).get('/js/main.js')
      ];

      const responses = await Promise.all(requests);
      
      responses.forEach(response => {
        expect(response.status).toBe(200);
      });
    });
  });

  describe('File System Integration', () => {
    test('should have all required files in correct locations', () => {
      const requiredFiles = [
        'server.js',
        'package.json',
        'views/index.html',
        'views/about.html',
        'views/projects.html',
        'views/404.html',
        'public/css/style.css',
        'public/js/main.js'
      ];

      requiredFiles.forEach(file => {
        const filePath = path.join(__dirname, '..', file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('should have proper file permissions', () => {
      const files = [
        'server.js',
        'views/index.html',
        'public/css/style.css',
        'public/js/main.js'
      ];

      files.forEach(file => {
        const filePath = path.join(__dirname, '..', file);
        const stats = fs.statSync(filePath);
        expect(stats.isFile()).toBe(true);
        expect(stats.size).toBeGreaterThan(0);
      });
    });
  });

  describe('Cross-Page Navigation', () => {
    test('should have working internal links', async () => {
      // Get all pages and check for internal links
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app)
          .get(page)
          .expect(200);
        
        // Check for navigation links
        expect(response.text).toContain('href="/"');
        expect(response.text).toContain('href="/about"');
        expect(response.text).toContain('href="/projects"');
      }
    });

    test('should have consistent branding across pages', async () => {
      const pages = ['/', '/about', '/projects'];
      
      for (const page of pages) {
        const response = await request(app)
          .get(page)
          .expect(200);
        
        // Check for consistent branding
        expect(response.text).toContain('Portfolio');
        expect(response.text).toContain('class="logo"');
      }
    });
  });
}); 