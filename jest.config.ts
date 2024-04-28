/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from "jest";
const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: false,
  coverageProvider: "v8",
  rootDir: "./tests",
  transform: {
    "^._\\.(t|j)sx?$": "ts-jest",
  },
  extensionsToTreatAsEsm: [".ts"],
};

export default config;
