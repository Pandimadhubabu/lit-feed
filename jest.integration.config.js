module.exports = {
  preset: 'ts-jest',
  testRegex: 'integration/.*\\.spec\\.ts$',
  setupFiles: ['dotenv/config'],
  watchPathIgnorePatterns: ['<rootDir>/.next/'],
  testTimeout: 30000,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};