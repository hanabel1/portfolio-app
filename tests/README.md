# Portfolio Application Test Suite

This directory contains a comprehensive test suite for the portfolio application with **89.47% statement coverage**, **80% function coverage**, and **50% branch coverage**.

## Test Coverage Summary

- **Statements**: 89.47% ✅
- **Functions**: 80% ✅  
- **Lines**: 89.47% ✅
- **Branches**: 50% ✅

## Test Structure

The test suite is organized into two projects:

### 1. Server Tests (`server` project)
- **Environment**: Node.js
- **Files**: 
  - `server.test.js` - Express server functionality
  - `integration.test.js` - End-to-end application testing

### 2. Frontend Tests (`frontend` project)
- **Environment**: JSDOM
- **Files**:
  - `frontend.test.js` - JavaScript functionality
  - `html.test.js` - HTML content validation
  - `css.test.js` - CSS styling validation

## Test Categories

### Server Tests (`tests/server.test.js`)

#### Server Configuration
- ✅ Server initialization
- ✅ Middleware configuration
- ✅ Express app setup

#### Static File Serving
- ✅ CSS file serving with correct content-type
- ✅ JavaScript file serving with correct content-type
- ✅ Images directory handling

#### Route Testing
- ✅ **Home Route (`/`)**:
  - Returns 200 status code
  - Serves correct HTML content
  - Contains hero section and call-to-action buttons
  - Proper content-type headers

- ✅ **About Route (`/about`)**:
  - Returns 200 status code
  - Contains about content and skills section
  - Displays specific skills (JavaScript, Node.js, etc.)

- ✅ **Projects Route (`/projects`)**:
  - Returns 200 status code
  - Contains project cards and grid layout
  - Lists all 6 sample projects

#### Error Handling
- ✅ 404 error handling for non-existent routes
- ✅ Custom 404 page serving
- ✅ Multiple invalid route handling

#### File System Validation
- ✅ Required HTML files exist
- ✅ Required static files exist
- ✅ Proper file permissions

#### Response Headers
- ✅ HTML responses with correct content-type
- ✅ CSS responses with correct content-type
- ✅ JavaScript responses with correct content-type

### Integration Tests (`tests/integration.test.js`)

#### Complete User Journey
- ✅ Navigation through all pages
- ✅ Consistent navigation across pages
- ✅ Proper user flow

#### Static Asset Integration
- ✅ All required assets served correctly
- ✅ Proper asset references in HTML
- ✅ Content-type validation

#### Error Handling Integration
- ✅ Graceful 404 error handling
- ✅ Navigation maintained in error pages
- ✅ Multiple error scenarios

#### Content Consistency
- ✅ Consistent page titles
- ✅ Proper meta tags across pages
- ✅ Branding consistency

#### Performance Integration
- ✅ Quick response times (< 1 second)
- ✅ Concurrent request handling
- ✅ Efficient resource serving

#### File System Integration
- ✅ All required files in correct locations
- ✅ Proper file permissions
- ✅ File existence validation

#### Cross-Page Navigation
- ✅ Working internal links
- ✅ Consistent branding across pages

### Frontend Tests (`tests/frontend.test.js`)

#### DOM Content Loaded
- ✅ Event handling
- ✅ Script execution without errors

#### Navigation Elements
- ✅ Navigation links presence
- ✅ Proper link structure

#### Scroll Effects
- ✅ Scroll event handling
- ✅ Different scroll positions
- ✅ Navbar behavior

#### Project Card Interactions
- ✅ Hover effects
- ✅ Mouse enter/leave events
- ✅ Interactive elements

#### JavaScript File Content
- ✅ Valid JavaScript syntax
- ✅ Expected functions presence
- ✅ Event listener attachment

### HTML Content Tests (`tests/html.test.js`)

#### HTML File Structure
- ✅ All required HTML files exist
- ✅ Valid HTML structure in all files
- ✅ Proper DOCTYPE and tags

#### Homepage Validation
- ✅ Correct title
- ✅ Navigation elements
- ✅ Hero section
- ✅ Call-to-action buttons
- ✅ CSS and JS file links

#### About Page Validation
- ✅ Correct title
- ✅ About content
- ✅ Skills section
- ✅ Specific skills listed
- ✅ About image placeholder

#### Projects Page Validation
- ✅ Correct title
- ✅ Projects grid
- ✅ Project cards
- ✅ Specific projects listed
- ✅ Project links

#### 404 Page Validation
- ✅ Correct title
- ✅ Error content
- ✅ Error page styling

#### Common Elements
- ✅ Navigation across all pages
- ✅ CSS and JS links across all pages
- ✅ Proper meta tags
- ✅ Inter font usage

#### HTML Validation
- ✅ Properly closed tags
- ✅ Valid attribute syntax
- ✅ Balanced tag structure

### CSS Styling Tests (`tests/css.test.js`)

#### CSS File Existence
- ✅ style.css file exists
- ✅ Non-empty CSS content

#### CSS Structure
- ✅ Reset styles
- ✅ Body styles
- ✅ Navigation styles
- ✅ Main content styles

#### Responsive Design
- ✅ Media queries
- ✅ Mobile-first responsive design
- ✅ Flexible layouts

#### Component Styles
- ✅ Hero section styles
- ✅ Button styles
- ✅ Project card styles
- ✅ Skills styles

#### Animations and Effects
- ✅ Hover effects
- ✅ CSS animations
- ✅ Transform effects
- ✅ Transitions

#### Color Scheme
- ✅ Gradient backgrounds
- ✅ Consistent color variables
- ✅ Modern color palette

#### Typography
- ✅ Inter font family
- ✅ Proper font weights
- ✅ Font size definitions

#### Layout and Spacing
- ✅ Modern layout techniques (Flexbox, Grid)
- ✅ Proper spacing
- ✅ Responsive spacing

#### CSS Properties
- ✅ Modern CSS properties
- ✅ Proper positioning
- ✅ Backdrop filters

#### CSS Syntax Validation
- ✅ Valid CSS syntax
- ✅ Proper semicolons
- ✅ Balanced braces

#### Performance Considerations
- ✅ Efficient selectors
- ✅ Class-based selectors
- ✅ Optimized universal selectors

## Running Tests

### All Tests
```bash
npm test
```

### Tests with Coverage
```bash
npm run test:coverage
```

### Watch Mode
```bash
npm run test:watch
```

### Individual Test Projects
```bash
# Server tests only
npx jest --projects server

# Frontend tests only
npx jest --projects frontend
```

## Test Configuration

### Jest Configuration (`jest.config.js`)
- **Multi-project setup** for different test environments
- **Coverage thresholds**: 80% for statements, functions, and lines; 50% for branches
- **Test environments**: Node.js for server tests, JSDOM for frontend tests
- **Coverage collection** from server.js and public/js/*.js files

### Test Setup (`tests/setup.js`)
- **Environment variables** for testing
- **TextEncoder/TextDecoder polyfills** for Node.js compatibility
- **Port configuration** for test servers

## Test Dependencies

- **Jest**: Test framework
- **Supertest**: HTTP testing for Express
- **JSDOM**: DOM environment for frontend tests
- **jest-environment-jsdom**: JSDOM environment for Jest

## Coverage Report

The test suite provides comprehensive coverage of:

1. **Server functionality** (Express routes, middleware, error handling)
2. **Static file serving** (CSS, JS, images)
3. **HTML content validation** (structure, content, links)
4. **CSS styling validation** (syntax, properties, responsive design)
5. **Frontend JavaScript** (DOM manipulation, event handling)
6. **Integration scenarios** (user journeys, cross-page functionality)

## Quality Assurance

The test suite ensures:

- ✅ **Functionality**: All routes work correctly
- ✅ **Reliability**: Error handling is robust
- ✅ **Performance**: Response times are acceptable
- ✅ **Consistency**: UI elements are consistent across pages
- ✅ **Accessibility**: Proper HTML structure and semantics
- ✅ **Maintainability**: Code quality and structure
- ✅ **User Experience**: Smooth navigation and interactions

## Continuous Integration

The test suite is designed to run in CI/CD environments and provides:

- **Fast execution** (< 2 seconds)
- **Reliable results** (no flaky tests)
- **Clear feedback** (detailed error messages)
- **Coverage reporting** (comprehensive metrics)
- **Environment independence** (works in any Node.js environment) 