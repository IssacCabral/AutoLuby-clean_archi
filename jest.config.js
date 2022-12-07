/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ["**/*{.test.ts,.spec.ts}"],
  // verbose: true,
  moduleNameMapper: {
    "@domain/(.*)$": '<rootDir>/./src/domain/$1',
    '@errors/(.*)$': '<rootDir>/./src/presentation/errors/$1',
    "@protocols/(.*)$": "<rootDir>/./src/presentation/protocols/$1",
    '@helpers/(.*)$': "<rootDir>/./src/presentation/helpers/$1",
    "@main/(.*)$": "<rootDir>/./src/main/$1",
    "@factories/(.*)$": "<rootDir>/./src/main/factories/$1",
    "@controllers/(.*)$": "<rootDir>/./src/presentation/controllers/$1",
    "@data/(.*)$": "<rootDir>/./src/data/$1",
    "@repositories/(.*)$": "<rootDir>/./src/infra/repositories/$1",
    "@validators/(.*)$": "<rootDir>/./src/infra/validators/$1",
  }
}