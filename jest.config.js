/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  verbose: true,
  testEnvironment: "node",
  roots: ['<rootDir>/src/'],
  setupFiles: ['<rootDir>/jest.env.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    "^.+\.ts": ["ts-jest",{}],
  },
};

module.exports = config;
