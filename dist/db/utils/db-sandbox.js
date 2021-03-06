"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { SUPER_SECRET } = process.env;
mongoose_1.default
    .connect(process.env.MONGODB_URI || "mongodb://localhost/rest-cats", {
    autoIndex: true,
})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    if (!SUPER_SECRET)
        process.exit(1);
    mongoose_1.default.connection.close();
    process.exit(0);
}))
    .catch((e) => {
    console.error(e);
    mongoose_1.default.connection.close();
    process.exit(1);
});
//# sourceMappingURL=db-sandbox.js.map