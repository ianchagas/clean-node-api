module.exports = {
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/main/*.ts",
    "!<rootDir>/src/data/usecases/add-account/db-add-account-protocols.ts",
    "!<rootDir>/src/presentation/controllers/singup/singup-protocols.ts",
    "!<rootDir>/src/presentation/protocols/index.ts",
    "!<rootDir>/src/main/config/env.ts",
    "!<rootDir>/src/main/adapters/express-route-adapter.ts"
  ],
  coverageDirectory: "coverage",
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb",
  transform: {
    ".+\\.ts$": "ts-jest",
  },
  testTimeout: 10000
};
