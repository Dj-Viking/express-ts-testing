"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const constants_1 = require("./constants");
const express_1 = __importDefault(require("express"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
console.log("what is node env", process.env.NODE_ENV);
app.use(router_1.default);
typegoose_1.mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/rest-cats");
typegoose_1.mongoose.set("debug", constants_1.IS_PROD);
app.listen(PORT, () => {
    console.log("\x1b[44m", `✨🔮 ${!constants_1.IS_PROD && `dev server started on http://localhost:${PORT}`}`, "\x1b[00m");
});
//# sourceMappingURL=index.js.map