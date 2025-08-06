// Test setup file
process.env.NODE_ENV = 'test';
process.env.PORT = 3001; // Use different port for testing

// Polyfill for TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder; 