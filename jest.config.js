/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/*{.test.ts,.spec.ts}"],
  verbose: true,
  moduleNameMapper: {
    "@domain/(.*)$": '<rootDir>/./src/domain/$1',
    '@errors/(.*)$': '<rootDir>/./src/presentation/errors/$1',
    "@protocols/(.*)$": "<rootDir>/./src/presentation/protocols/$1",
    '@helpers/(.*)$': "<rootDir>/./src/presentation/helpers/$1"
  }
}