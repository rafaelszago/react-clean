module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/main/tests/cypress'
  ],
  testEnvironment: 'jsdom',
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  setupFilesAfterEnv: ['./src/main/config/jest.setup.js'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}
