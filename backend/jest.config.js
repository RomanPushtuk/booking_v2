/** @type {import('ts-jest').JestConfigWithTsJest} **/
const config = {
  verbose: true,
  testEnvironment: "node",
  roots: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    "^.+\.ts": ["ts-jest",{}],
  },
};

module.exports = config;
