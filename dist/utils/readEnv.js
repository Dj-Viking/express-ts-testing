"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readEnv = void 0;
const fs_1 = __importDefault(require("fs"));
function readEnv() {
    const env = fs_1.default.readFileSync("./env.txt", { encoding: "utf-8" }).split("\n");
    let entries = {};
    for (let i = 0; i < env.length; i++) {
        entries = Object.assign(Object.assign({}, entries), { [env[i].split("=")[0]]: env[i].split("=")[1].replace(/'/g, "") });
    }
    process.env = Object.assign(Object.assign({}, process.env), entries);
}
exports.readEnv = readEnv;
//# sourceMappingURL=readEnv.js.map