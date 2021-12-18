import fs from "fs";
// const dir = fs.readdirSync(".");
// console.log("dir", dir);
export function readEnv(): void {
  const env = fs.readFileSync("./env.txt", { encoding: "utf-8" }).split("\n");
  // console.log("env found", env);
  let entries = {} as Record<string, string>;
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
}
