module.exports = {
  projects: [
    {
      displayName: 'server',
      testEnvironment: 'node',
      testMatch: [
        '<rootDir>/tests/server.test.js',
        '<rootDir>/tests/integration.test.js'
      ],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
      collectCoverageFrom: [
        'server.js',
        '!**/node_modules/**',
        '!**/coverage/**'
      ]
    },
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      testMatch: [
        '<rootDir>/tests/frontend.test.js',
        '<rootDir>/tests/html.test.js',
        '<rootDir>/tests/css.test.js'
      ],
      setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
      collectCoverageFrom: [
        'public/js/*.js',
        '!**/node_modules/**',
        '!**/coverage/**'
      ],
      testEnvironmentOptions: {
        url: 'http://localhost:3000'
      }
    }
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
}; 