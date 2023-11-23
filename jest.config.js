module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/node_modules/', '/integration/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};