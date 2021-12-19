"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readEnv = void 0;
const fs_1 = __importDefault(require("fs"));
function readEnv() {
    var _a;
    let entries = {};
    let env;
    try {
        env = fs_1.default.readFileSync("./env.txt", { encoding: "utf-8" });
        env = env.split("\n");
        for (let i = 0; i < env.length; i++) {
            entries = Object.assign(Object.assign({}, entries), { [env[i].split("=")[0]]: env[i].split("=")[1].replace(/'/g, "") });
        }
        process.env = Object.assign(Object.assign({}, process.env), entries);
    }
    catch (error) {
        env = (_a = process.env.TEST_ENV) === null || _a === void 0 ? void 0 : _a.split("\n");
        for (let i = 0; i < (env === null || env === void 0 ? void 0 : env.length); i++) {
            entries = Object.assign(Object.assign({}, entries), { [env[i].split("=")[0]]: env[i].split("=")[1].replace(/'/g, "") });
            process.env = Object.assign(Object.assign({}, process.env), entries);
        }
    }
}
exports.readEnv = readEnv;
readEnv();
//# sourceMappingURL=readEnv.js.map