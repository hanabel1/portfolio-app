const fs = require('fs');
const path = require('path');

describe('CSS Styling Validation', () => {
  const cssPath = path.join(__dirname, '../public/css/style.css');
  let cssContent;

  beforeEach(() => {
    cssContent = fs.readFileSync(cssPath, 'utf8');
  });

  describe('CSS File Existence', () => {
    test('should have style.css file', () => {
      expect(fs.existsSync(cssPath)).toBe(true);
    });

    test('should have non-empty CSS content', () => {
      expect(cssContent.length).toBeGreaterThan(0);
    });
  });

  describe('CSS Structure', () => {
    test('should have reset styles', () => {
      expect(cssContent).toContain('* {');
      expect(cssContent).toContain('margin: 0;');
      expect(cssContent).toContain('padding: 0;');
      expect(cssContent).toContain('box-sizing: border-box;');
    });

    test('should have body styles', () => {
      expect(cssContent).toContain('body {');
      expect(cssContent).toContain('font-family:');
      expect(cssContent).toContain('line-height:');
    });

    test('should have navigation styles', () => {
      expect(cssContent).toContain('.navbar {');
      expect(cssContent).toContain('.nav-container {');
      expect(cssContent).toContain('.nav-links {');
    });

    test('should have main content styles', () => {
      expect(cssContent).toContain('.main-content {');
      expect(cssContent).toContain('.container {');
    });
  });

  describe('Responsive Design', () => {
    test('should have media queries', () => {
      expect(cssContent).toContain('@media');
      expect(cssContent).toContain('max-width: 768px');
    });

    test('should have mobile-first responsive design', () => {
      expect(cssContent).toContain('flex-direction: column');
      expect(cssContent).toContain('grid-template-columns: 1fr');
    });
  });

  describe('Component Styles', () => {
    test('should have hero section styles', () => {
      expect(cssContent).toContain('.hero {');
      expect(cssContent).toContain('.hero h1 {');
      expect(cssContent).toContain('.hero p {');
    });

    test('should have button styles', () => {
      expect(cssContent).toContain('.cta-button {');
      expect(cssContent).toContain('border-radius: 50px');
    });

    test('should have project card styles', () => {
      expect(cssContent).toContain('.project-card {');
      expect(cssContent).toContain('.project-image {');
      expect(cssContent).toContain('.project-content {');
    });

    test('should have skills styles', () => {
      expect(cssContent).toContain('.skills {');
      expect(cssContent).toContain('.skill-tag {');
    });
  });

  describe('Animations and Effects', () => {
    test('should have hover effects', () => {
      expect(cssContent).toContain(':hover');
      expect(cssContent).toContain('transition:');
    });

    test('should have animations', () => {
      expect(cssContent).toContain('@keyframes');
      expect(cssContent).toContain('fadeInUp');
    });

    test('should have transform effects', () => {
      expect(cssContent).toContain('transform:');
      expect(cssContent).toContain('translateY');
    });
  });

  describe('Color Scheme', () => {
    test('should use gradient backgrounds', () => {
      expect(cssContent).toContain('linear-gradient');
      expect(cssContent).toContain('#667eea');
      expect(cssContent).toContain('#764ba2');
    });

    test('should have consistent color variables', () => {
      expect(cssContent).toContain('#333');
      expect(cssContent).toContain('#666');
      expect(cssContent).toContain('white');
    });
  });

  describe('Typography', () => {
    test('should use Inter font family', () => {
      expect(cssContent).toContain('Inter');
      expect(cssContent).toContain('font-family:');
    });

    test('should have proper font weights', () => {
      expect(cssContent).toContain('font-weight:');
      expect(cssContent).toContain('font-size:');
    });
  });

  describe('Layout and Spacing', () => {
    test('should use modern layout techniques', () => {
      expect(cssContent).toContain('display: flex');
      expect(cssContent).toContain('display: grid');
      expect(cssContent).toContain('justify-content:');
      expect(cssContent).toContain('align-items:');
    });

    test('should have proper spacing', () => {
      expect(cssContent).toContain('margin:');
      expect(cssContent).toContain('padding:');
      expect(cssContent).toContain('gap:');
    });
  });

  describe('CSS Properties', () => {
    test('should use modern CSS properties', () => {
      expect(cssContent).toContain('backdrop-filter:');
      expect(cssContent).toContain('border-radius:');
      expect(cssContent).toContain('box-shadow:');
    });

    test('should have proper positioning', () => {
      expect(cssContent).toContain('position:');
      expect(cssContent).toContain('z-index:');
    });
  });

  describe('CSS Syntax Validation', () => {
    test('should have valid CSS syntax', () => {
      // Check for balanced braces
      const openBraces = (cssContent.match(/{/g) || []).length;
      const closeBraces = (cssContent.match(/}/g) || []).length;
      expect(openBraces).toBe(closeBraces);
    });

    test('should have proper semicolons', () => {
      // Check that properties end with semicolons
      const propertyLines = cssContent.split('\n').filter(line => 
        line.trim().includes(':') && !line.trim().includes('{') && !line.trim().includes('}')
      );
      
      propertyLines.forEach(line => {
        if (line.trim() && !line.trim().endsWith('{') && !line.trim().endsWith('}')) {
          expect(line.trim()).toMatch(/;$|^\/\//);
        }
      });
    });
  });

  describe('Performance Considerations', () => {
    test('should use efficient selectors', () => {
      // Check for class-based selectors rather than deep nesting
      const classSelectors = cssContent.match(/\.[a-zA-Z-]+/g) || [];
      expect(classSelectors.length).toBeGreaterThan(10);
    });

    test('should use universal selector only for reset', () => {
      // Should use * for reset and some other valid cases
      const universalSelectors = cssContent.match(/\*/g) || [];
      expect(universalSelectors.length).toBeGreaterThan(0);
      expect(universalSelectors.length).toBeLessThan(25);
    });
  });
}); 