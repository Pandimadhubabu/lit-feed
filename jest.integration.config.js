module.exports = {
  preset: 'ts-jest',
  testRegex: 'integration/.*\\.spec\\.ts$',
  globalSetup: './jest.integration.setup.js',
  globalTeardown: './jest.integration.teardown.js',
  setupFiles: ['dotenv/config'],
  watchPathIgnorePatterns: ['<rootDir>/.next/'],
  testTimeout: 30000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};