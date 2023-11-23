module.exports = {
  preset: 'ts-jest',
  testPathIgnorePatterns: ['/integration/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};