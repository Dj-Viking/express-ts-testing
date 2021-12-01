import type { Config } from "@jest/types";

export default async (): Promise<Config.InitialOptions> => {
  return {
    testEnvironment: "node",
    transform: {
      "^.+\\.tsx?$": "ts-jest",
    },
    moduleFileExtensions: ["ts", "js"],
    testMatch: ["**/?(*.)+(spec|test).ts"],
    //watchPathIgnorePatterns: [".+(spec|test).ts"]
  };
};
