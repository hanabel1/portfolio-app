const fs = require('fs');
const path = require('path');

describe('HTML Content Validation', () => {
  const viewsDir = path.join(__dirname, '../views');
  const htmlFiles = ['index.html', 'about.html', 'projects.html', '404.html'];

  describe('HTML File Structure', () => {
    test('should have all required HTML files', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(viewsDir, file);
        expect(fs.existsSync(filePath)).toBe(true);
      });
    });

    test('should have valid HTML structure in all files', () => {
      htmlFiles.forEach(file => {
        const filePath = path.join(viewsDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Basic HTML structure validation
        expect(content).toContain('<!DOCTYPE html>');
        expect(content).toContain('<html');
        expect(content).toContain('<head>');
        expect(content).toContain('<body>');
        expect(content).toContain('</html>');
      });
    });
  });

  describe('Homepage (index.html)', () => {
    let content;

    beforeEach(() => {
      content = fs.readFileSync(path.join(viewsDir, 'index.html'), 'utf8');
    });

    test('should have correct title', () => {
      expect(content).toContain('<title>Portfolio - Home</title>');
    });

    test('should have navigation', () => {
      expect(content).toContain('class="navbar"');
      expect(content).toContain('class="nav-links"');
    });

    test('should have hero section', () => {
      expect(content).toContain('Welcome to My Portfolio');
      expect(content).toContain('class="hero fade-in-up"');
    });

    test('should have call-to-action buttons', () => {
      expect(content).toContain('class="cta-button"');
      expect(content).toContain('Learn More');
      expect(content).toContain('View Projects');
    });

    test('should link to CSS and JS files', () => {
      expect(content).toContain('href="/css/style.css"');
      expect(content).toContain('src="/js/main.js"');
    });
  });

  describe('About Page (about.html)', () => {
    let content;

    beforeEach(() => {
      content = fs.readFileSync(path.join(viewsDir, 'about.html'), 'utf8');
    });

    test('should have correct title', () => {
      expect(content).toContain('<title>About - Portfolio</title>');
    });

    test('should have about content', () => {
      expect(content).toContain('About Me');
      expect(content).toContain('Skills & Technologies');
    });

    test('should have skills section', () => {
      expect(content).toContain('class="skills"');
      expect(content).toContain('class="skill-tag"');
    });

    test('should contain specific skills', () => {
      expect(content).toContain('JavaScript');
      expect(content).toContain('Node.js');
      expect(content).toContain('Express.js');
    });

    test('should have about image placeholder', () => {
      expect(content).toContain('👨‍💻');
    });
  });

  describe('Projects Page (projects.html)', () => {
    let content;

    beforeEach(() => {
      content = fs.readFileSync(path.join(viewsDir, 'projects.html'), 'utf8');
    });

    test('should have correct title', () => {
      expect(content).toContain('<title>Projects - Portfolio</title>');
    });

    test('should have projects grid', () => {
      expect(content).toContain('class="projects-grid"');
    });

    test('should have project cards', () => {
      expect(content).toContain('class="project-card"');
      expect(content).toContain('class="project-image"');
      expect(content).toContain('class="project-content"');
    });

    test('should contain specific projects', () => {
      expect(content).toContain('E-Commerce Platform');
      expect(content).toContain('Task Management App');
      expect(content).toContain('Weather Dashboard');
      expect(content).toContain('Memory Game');
      expect(content).toContain('Data Visualization Tool');
      expect(content).toContain('Password Manager');
    });

    test('should have project links', () => {
      expect(content).toContain('class="project-links"');
      expect(content).toContain('Live Demo');
      expect(content).toContain('View Code');
    });
  });

  describe('404 Page (404.html)', () => {
    let content;

    beforeEach(() => {
      content = fs.readFileSync(path.join(viewsDir, '404.html'), 'utf8');
    });

    test('should have correct title', () => {
      expect(content).toContain('<title>404 - Page Not Found</title>');
    });

    test('should have error content', () => {
      expect(content).toContain('404');
      expect(content).toContain('Page Not Found');
      expect(content).toContain('Go Home');
    });

    test('should have error page styling', () => {
      expect(content).toContain('class="error-page fade-in-up"');
    });
  });

  describe('Common Elements', () => {
    test('all pages should have navigation', () => {
      htmlFiles.forEach(file => {
        const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
        expect(content).toContain('class="navbar"');
        expect(content).toContain('class="nav-links"');
      });
    });

    test('all pages should link to CSS and JS', () => {
      htmlFiles.forEach(file => {
        const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
        expect(content).toContain('href="/css/style.css"');
        expect(content).toContain('src="/js/main.js"');
      });
    });

    test('all pages should have proper meta tags', () => {
      htmlFiles.forEach(file => {
        const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
        expect(content).toContain('<meta charset="UTF-8">');
        expect(content).toContain('<meta name="viewport"');
      });
    });

    test('all pages should use Inter font', () => {
      htmlFiles.forEach(file => {
        const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
        expect(content).toContain('Inter');
      });
    });
  });

  describe('HTML Validation', () => {
    test('should have properly closed tags', () => {
      htmlFiles.forEach(file => {
        const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
        
        // Check for balanced tags
        const openTags = (content.match(/<[^/][^>]*>/g) || []).length;
        const closeTags = (content.match(/<\/[^>]*>/g) || []).length;
        
        // Should have roughly equal number of open and close tags
        expect(Math.abs(openTags - closeTags)).toBeLessThan(15);
      });
    });

    test('should have valid attribute syntax', () => {
      htmlFiles.forEach(file => {
        const content = fs.readFileSync(path.join(viewsDir, file), 'utf8');
        
        // Check for proper attribute syntax - should have quotes around attributes
        expect(content).toMatch(/class="[^"]*"/);
        expect(content).toMatch(/href="[^"]*"/);
        expect(content).toMatch(/src="[^"]*"/);
      });
    });
  });
}); 