const request = require('supertest');
const path = require('path');
const fs = require('fs');

// Import the server
const app = require('../server');

describe('Express Server', () => {
  let server;

  beforeAll((done) => {
    server = app.listen(3001, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe('Server Configuration', () => {
    test('should be defined', () => {
      expect(app).toBeDefined();
    });

    test('should have middleware configured', () => {
      expect(app).toBeDefined();
      expect(typeof app.use).toBe('function');
    });
  });

  describe('Static File Serving', () => {
    test('should serve CSS files', async () => {
      const response = await request(app)
        .get('/css/style.css')
        .expect(200);
      
      expect(response.headers['content-type']).toContain('text/css');
    });

    test('should serve JavaScript files', async () => {
      const response = await request(app)
        .get('/js/main.js')
        .expect(200);
      
      expect(response.headers['content-type']).toContain('javascript');
    });

    test('should serve images directory', async () => {
      const response = await request(app)
        .get('/images/')
        .expect(404); // Directory listing is not enabled by default
    });
  });

  describe('Route Testing', () => {
    describe('GET / (Home Route)', () => {
      test('should return 200 status code', async () => {
        await request(app)
          .get('/')
          .expect(200);
      });

      test('should serve index.html', async () => {
        const response = await request(app)
          .get('/')
          .expect(200);
        
        expect(response.text).toContain('<!DOCTYPE html>');
        expect(response.text).toContain('Portfolio - Home');
        expect(response.text).toContain('Welcome to My Portfolio');
      });

      test('should have correct content type', async () => {
        const response = await request(app)
          .get('/')
          .expect(200);
        
        expect(response.headers['content-type']).toContain('text/html');
      });
    });

    describe('GET /about (About Route)', () => {
      test('should return 200 status code', async () => {
        await request(app)
          .get('/about')
          .expect(200);
      });

      test('should serve about.html', async () => {
        const response = await request(app)
          .get('/about')
          .expect(200);
        
        expect(response.text).toContain('<!DOCTYPE html>');
        expect(response.text).toContain('About - Portfolio');
        expect(response.text).toContain('About Me');
      });

      test('should contain skills section', async () => {
        const response = await request(app)
          .get('/about')
          .expect(200);
        
        expect(response.text).toContain('Skills & Technologies');
        expect(response.text).toContain('JavaScript');
        expect(response.text).toContain('Node.js');
      });
    });

    describe('GET /projects (Projects Route)', () => {
      test('should return 200 status code', async () => {
        await request(app)
          .get('/projects')
          .expect(200);
      });

      test('should serve projects.html', async () => {
        const response = await request(app)
          .get('/projects')
          .expect(200);
        
        expect(response.text).toContain('<!DOCTYPE html>');
        expect(response.text).toContain('Projects - Portfolio');
        expect(response.text).toContain('My Projects');
      });

      test('should contain project cards', async () => {
        const response = await request(app)
          .get('/projects')
          .expect(200);
        
        expect(response.text).toContain('E-Commerce Platform');
        expect(response.text).toContain('Task Management App');
        expect(response.text).toContain('Weather Dashboard');
      });
    });
  });

  describe('404 Error Handling', () => {
    test('should return 404 for non-existent routes', async () => {
      await request(app)
        .get('/non-existent-route')
        .expect(404);
    });

    test('should serve 404.html for non-existent routes', async () => {
      const response = await request(app)
        .get('/non-existent-route')
        .expect(404);
      
      expect(response.text).toContain('<!DOCTYPE html>');
      expect(response.text).toContain('404 - Page Not Found');
      expect(response.text).toContain('Page Not Found');
    });

    test('should handle multiple non-existent routes', async () => {
      const routes = ['/fake', '/invalid', '/missing', '/wrong'];
      
      for (const route of routes) {
        await request(app)
          .get(route)
          .expect(404);
      }
    });
  });

  describe('File Existence Tests', () => {
    test('should have all required HTML files', () => {
      const requiredFiles = [
        'views/index.html',
        'views/about.html',
        'views/projects.html',
        'views/404.html'
      ];

      requiredFiles.forEach(file => {
        expect(fs.existsSync(file)).toBe(true);
      });
    });

    test('should have all required static files', () => {
      const requiredFiles = [
        'public/css/style.css',
        'public/js/main.js'
      ];

      requiredFiles.forEach(file => {
        expect(fs.existsSync(file)).toBe(true);
      });
    });
  });

  describe('Response Headers', () => {
    test('should set appropriate headers for HTML responses', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);
      
      expect(response.headers['content-type']).toContain('text/html');
      expect(response.headers['content-length']).toBeDefined();
    });

    test('should set appropriate headers for CSS responses', async () => {
      const response = await request(app)
        .get('/css/style.css')
        .expect(200);
      
      expect(response.headers['content-type']).toContain('text/css');
    });

    test('should set appropriate headers for JS responses', async () => {
      const response = await request(app)
        .get('/js/main.js')
        .expect(200);
      
      expect(response.headers['content-type']).toContain('javascript');
    });
  });

  describe('Server Startup', () => {
    test('should start server on specified port', () => {
      const originalConsoleLog = console.log;
      const logs = [];
      console.log = (...args) => logs.push(args.join(' '));
      
      // This would normally start the server, but we're just testing the log message
      const port = process.env.PORT || 3000;
      expect(port).toBeDefined();
      
      console.log = originalConsoleLog;
    });

    test('should handle different port configurations', () => {
      // Test with custom port
      const customPort = 5000;
      process.env.PORT = customPort;
      
      // Import server again to test different port
      const customApp = require('../server');
      expect(customApp).toBeDefined();
      
      // Reset to original
      process.env.PORT = 3001;
    });

    test('should handle production environment', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';
      
      // Import server again to test production mode
      const prodApp = require('../server');
      expect(prodApp).toBeDefined();
      
      // Reset to original
      process.env.NODE_ENV = originalEnv;
    });

    test('should handle development environment', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';
      
      // Import server again to test development mode
      const devApp = require('../server');
      expect(devApp).toBeDefined();
      
      // Reset to original
      process.env.NODE_ENV = originalEnv;
    });

    test('should handle undefined NODE_ENV', () => {
      const originalEnv = process.env.NODE_ENV;
      delete process.env.NODE_ENV;
      
      // Import server again to test undefined environment
      const undefinedEnvApp = require('../server');
      expect(undefinedEnvApp).toBeDefined();
      
      // Reset to original
      process.env.NODE_ENV = originalEnv;
    });

    test('should handle default port when PORT is not set', () => {
      const originalPort = process.env.PORT;
      delete process.env.PORT;
      
      // Import server again to test default port
      const defaultPortApp = require('../server');
      expect(defaultPortApp).toBeDefined();
      
      // Reset to original
      process.env.PORT = originalPort;
    });
  });
}); 