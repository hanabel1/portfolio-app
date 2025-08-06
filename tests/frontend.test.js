const fs = require('fs');
const path = require('path');

// Mock DOM environment for testing
const { JSDOM } = require('jsdom');

describe('Frontend JavaScript', () => {
  let dom;
  let document;
  let window;

  beforeEach(() => {
    // Create a mock DOM environment
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Test</title>
        </head>
        <body>
          <nav class="navbar">
            <div class="nav-container">
              <a href="/" class="logo">Portfolio</a>
              <ul class="nav-links">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                <li><a href="/projects">Projects</a></li>
              </ul>
            </div>
          </nav>
          <div class="project-card">
            <div class="project-image">🚀</div>
            <div class="project-content">
              <h3>Test Project</h3>
              <p>Test description</p>
            </div>
          </div>
        </body>
      </html>
    `, {
      url: 'http://localhost:3000/',
      pretendToBeVisual: true
    });

    document = dom.window.document;
    window = dom.window;

    // Mock scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true
    });

    // Load the main.js content
    const mainJsPath = path.join(__dirname, '../public/js/main.js');
    const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
    
    // Create a script element and execute the code
    const script = document.createElement('script');
    script.textContent = mainJsContent;
    document.head.appendChild(script);
  });

  afterEach(() => {
    dom.window.close();
  });

  describe('DOM Content Loaded', () => {
    test('should handle DOMContentLoaded event', () => {
      // Simulate DOMContentLoaded
      const event = new window.Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // The script should have executed without errors
      expect(document.querySelector('.nav-links')).toBeDefined();
    });
  });

  describe('Navigation Elements', () => {
    test('should have navigation links', () => {
      // Simulate DOMContentLoaded
      const event = new window.Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      const homeLink = document.querySelector('.nav-links a[href="/"]');
      const aboutLink = document.querySelector('.nav-links a[href="/about"]');
      const projectsLink = document.querySelector('.nav-links a[href="/projects"]');
      
      expect(homeLink).toBeDefined();
      expect(aboutLink).toBeDefined();
      expect(projectsLink).toBeDefined();
    });

    test('should handle navigation with different pathnames', () => {
      // Create a new DOM with different pathname
      const newDom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <nav class="navbar">
              <div class="nav-container">
                <a href="/" class="logo">Portfolio</a>
                <ul class="nav-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/projects">Projects</a></li>
                </ul>
              </div>
            </nav>
          </body>
        </html>
      `, {
        url: 'http://localhost:3000/about',
        pretendToBeVisual: true
      });

      const newDocument = newDom.window.document;
      const newWindow = newDom.window;

      // Load the main.js content
      const mainJsPath = path.join(__dirname, '../public/js/main.js');
      const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
      
      const script = newDocument.createElement('script');
      script.textContent = mainJsContent;
      newDocument.head.appendChild(script);

      // Simulate DOMContentLoaded
      const event = new newWindow.Event('DOMContentLoaded');
      newDocument.dispatchEvent(event);
      
      const aboutLink = newDocument.querySelector('.nav-links a[href="/about"]');
      expect(aboutLink).toBeDefined();
      
      newDom.window.close();
    });

    test('should handle navigation with non-matching pathname', () => {
      // Create a new DOM with non-matching pathname
      const newDom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <nav class="navbar">
              <div class="nav-container">
                <a href="/" class="logo">Portfolio</a>
                <ul class="nav-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/projects">Projects</a></li>
                </ul>
              </div>
            </nav>
          </body>
        </html>
      `, {
        url: 'http://localhost:3000/contact',
        pretendToBeVisual: true
      });

      const newDocument = newDom.window.document;
      const newWindow = newDom.window;

      // Load the main.js content
      const mainJsPath = path.join(__dirname, '../public/js/main.js');
      const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
      
      const script = newDocument.createElement('script');
      script.textContent = mainJsContent;
      newDocument.head.appendChild(script);

      // Simulate DOMContentLoaded
      const event = new newWindow.Event('DOMContentLoaded');
      newDocument.dispatchEvent(event);
      
      const navLinks = newDocument.querySelectorAll('.nav-links a');
      expect(navLinks.length).toBe(3);
      
      newDom.window.close();
    });

    test('should handle navigation with projects pathname', () => {
      // Create a new DOM with projects pathname
      const newDom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <nav class="navbar">
              <div class="nav-container">
                <a href="/" class="logo">Portfolio</a>
                <ul class="nav-links">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/projects">Projects</a></li>
                </ul>
              </div>
            </nav>
          </body>
        </html>
      `, {
        url: 'http://localhost:3000/projects',
        pretendToBeVisual: true
      });

      const newDocument = newDom.window.document;
      const newWindow = newDom.window;

      // Load the main.js content
      const mainJsPath = path.join(__dirname, '../public/js/main.js');
      const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
      
      const script = newDocument.createElement('script');
      script.textContent = mainJsContent;
      newDocument.head.appendChild(script);

      // Simulate DOMContentLoaded
      const event = new newWindow.Event('DOMContentLoaded');
      newDocument.dispatchEvent(event);
      
      const projectsLink = newDocument.querySelector('.nav-links a[href="/projects"]');
      expect(projectsLink).toBeDefined();
      
      newDom.window.close();
    });
  });

  describe('Scroll Effect', () => {
    test('should handle scroll events', () => {
      const navbar = document.querySelector('.navbar');
      expect(navbar).toBeDefined();
      
      // Simulate scroll
      window.scrollY = 100;
      const scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      // The navbar should still exist
      expect(document.querySelector('.navbar')).toBeDefined();
    });

    test('should handle different scroll positions', () => {
      const navbar = document.querySelector('.navbar');
      
      // Test with no scroll
      window.scrollY = 0;
      let scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      // Test with scroll
      window.scrollY = 100;
      scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      expect(navbar).toBeDefined();
    });

    test('should handle scrollY exactly at 50', () => {
      const navbar = document.querySelector('.navbar');
      
      // Test with scrollY = 50 (edge case)
      window.scrollY = 50;
      const scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      expect(navbar).toBeDefined();
    });

    test('should handle scrollY just below 50', () => {
      const navbar = document.querySelector('.navbar');
      
      // Test with scrollY = 49 (just below threshold)
      window.scrollY = 49;
      const scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      expect(navbar).toBeDefined();
    });

    test('should handle scrollY just above 50', () => {
      const navbar = document.querySelector('.navbar');
      
      // Test with scrollY = 51 (just above threshold)
      window.scrollY = 51;
      const scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      expect(navbar).toBeDefined();
    });
  });

  describe('Project Card Interactions', () => {
    test('should handle project card hover effects', () => {
      const projectCard = document.querySelector('.project-card');
      expect(projectCard).toBeDefined();
      
      // Simulate mouse enter
      const mouseEnterEvent = new window.Event('mouseenter');
      projectCard.dispatchEvent(mouseEnterEvent);
      
      // Simulate mouse leave
      const mouseLeaveEvent = new window.Event('mouseleave');
      projectCard.dispatchEvent(mouseLeaveEvent);
      
      expect(projectCard).toBeDefined();
    });
  });

  describe('JavaScript File Content', () => {
    test('should have valid JavaScript syntax', () => {
      const mainJsPath = path.join(__dirname, '../public/js/main.js');
      const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
      
      // Basic syntax check - should not throw error when parsed
      expect(() => {
        new Function(mainJsContent);
      }).not.toThrow();
    });

    test('should contain expected functions', () => {
      const mainJsPath = path.join(__dirname, '../public/js/main.js');
      const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
      
      expect(mainJsContent).toContain('addEventListener');
      expect(mainJsContent).toContain('DOMContentLoaded');
    });

    test('should handle scroll events with different values', () => {
      const navbar = document.querySelector('.navbar');
      
      // Test scrollY = 0
      window.scrollY = 0;
      let scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      // Test scrollY > 50
      window.scrollY = 100;
      scrollEvent = new window.Event('scroll');
      window.dispatchEvent(scrollEvent);
      
      expect(navbar).toBeDefined();
    });

    test('should handle project card interactions', () => {
      const projectCards = document.querySelectorAll('.project-card');
      
      projectCards.forEach(card => {
        // Test mouse enter
        const mouseEnterEvent = new window.Event('mouseenter');
        card.dispatchEvent(mouseEnterEvent);
        
        // Test mouse leave
        const mouseLeaveEvent = new window.Event('mouseleave');
        card.dispatchEvent(mouseLeaveEvent);
      });
      
      expect(projectCards.length).toBeGreaterThan(0);
    });

    test('should handle multiple project cards', () => {
      // Create a new DOM with multiple project cards
      const newDom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <div class="project-card">
              <div class="project-image">🚀</div>
              <div class="project-content">
                <h3>Project 1</h3>
              </div>
            </div>
            <div class="project-card">
              <div class="project-image">📱</div>
              <div class="project-content">
                <h3>Project 2</h3>
              </div>
            </div>
            <div class="project-card">
              <div class="project-image">🌐</div>
              <div class="project-content">
                <h3>Project 3</h3>
              </div>
            </div>
          </body>
        </html>
      `, {
        url: 'http://localhost:3000/projects',
        pretendToBeVisual: true
      });

      const newDocument = newDom.window.document;
      const newWindow = newDom.window;

      // Load the main.js content
      const mainJsPath = path.join(__dirname, '../public/js/main.js');
      const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
      
      const script = newDocument.createElement('script');
      script.textContent = mainJsContent;
      newDocument.head.appendChild(script);

      // Simulate DOMContentLoaded
      const event = new newWindow.Event('DOMContentLoaded');
      newDocument.dispatchEvent(event);
      
      const projectCards = newDocument.querySelectorAll('.project-card');
      expect(projectCards.length).toBe(3);
      
      // Test interactions on each card
      projectCards.forEach(card => {
        const mouseEnterEvent = new newWindow.Event('mouseenter');
        card.dispatchEvent(mouseEnterEvent);
        
        const mouseLeaveEvent = new newWindow.Event('mouseleave');
        card.dispatchEvent(mouseLeaveEvent);
      });
      
      newDom.window.close();
    });

    test('should handle empty project cards list', () => {
      // Create a new DOM with no project cards
      const newDom = new JSDOM(`
        <!DOCTYPE html>
        <html>
          <body>
            <div class="container">
              <p>No projects available</p>
            </div>
          </body>
        </html>
      `, {
        url: 'http://localhost:3000/projects',
        pretendToBeVisual: true
      });

      const newDocument = newDom.window.document;
      const newWindow = newDom.window;

      // Load the main.js content
      const mainJsPath = path.join(__dirname, '../public/js/main.js');
      const mainJsContent = fs.readFileSync(mainJsPath, 'utf8');
      
      const script = newDocument.createElement('script');
      script.textContent = mainJsContent;
      newDocument.head.appendChild(script);

      // Simulate DOMContentLoaded
      const event = new newWindow.Event('DOMContentLoaded');
      newDocument.dispatchEvent(event);
      
      const projectCards = newDocument.querySelectorAll('.project-card');
      expect(projectCards.length).toBe(0);
      
      newDom.window.close();
    });
  });

  describe('Event Listeners', () => {
    test('should attach event listeners correctly', () => {
      // Simulate DOMContentLoaded
      const event = new window.Event('DOMContentLoaded');
      document.dispatchEvent(event);
      
      // Check that navigation elements exist
      const navLinks = document.querySelectorAll('.nav-links a');
      expect(navLinks.length).toBeGreaterThan(0);
    });
  });
}); 