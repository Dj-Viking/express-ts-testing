import fs from "fs";
// const dir = fs.readdirSync(".");
// console.log("dir", dir);
export function readEnv(): void {
  let entries = {} as Record<string, string>;
  let env;
  try {
    env = fs.readFileSync("./env.txt", { encoding: "utf-8" });
    env = env.split("\n");
    for (let i = 0; i < env.length; i++) {
      entries = {
        ...entries,
        [env[i].split("=")[0]]: env[i].split("=")[1].replace(/'/g, ""),
      };
    }
    process.env = {
      ...process.env,
      ...entries,
    };
  } catch (error) {
    env = process.env.ENV_TXT?.split("\n") as string[];
    for (let i = 0; i < env?.length; i++) {
      entries = {
        ...entries,
        [env[i].split("=")[0]]: env[i].split("=")[1].replace(/'/g, ""),
      };
    }
    process.env = {
      ...process.env,
      ...entries,
    };
  }
}
readEnv();
