module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  collectCoverageFrom: ["<rootDir>/src/**"],
  coveragePathIgnorePatterns: ["__snapshots__"],
  coverageReporters: ["text", "text-summary"],
  coverageThreshold: {
    global: {
      statements: 96,
      branches: 100,
      functions: 92,
      lines: 98,
    },
  },
};
