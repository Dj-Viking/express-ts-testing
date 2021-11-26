"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("./constants");
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const PORT = process.env.PORT || 4000;
console.log("what is node env", process.env.NODE_ENV);
db_1.default.once("open", () => {
    app_1.default.listen(PORT, () => {
        console.log("\x1b[44m", `✨🔮 ${!constants_1.IS_PROD
            ? `dev server started on http://localhost:${PORT}`
            : `server started on port ${PORT}`}`, "\x1b[00m");
    });
});
//# sourceMappingURL=index.js.map