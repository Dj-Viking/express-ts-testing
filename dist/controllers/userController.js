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
exports.UserController = void 0;
const User_1 = __importDefault(require("../models/User"));
exports.UserController = {
    createUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("user create request");
            try {
                const createdUser = yield User_1.default.create(req.body);
                return res.status(201).json({ user: createdUser });
            }
            catch (error) {
                return res.status(500).json({
                    error: `error when creating a user ${error.message}`,
                });
            }
        });
    },
    getAllUsers: function (_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("get all users query");
            try {
                const allUsers = yield User_1.default.find({}).select("-__v");
                return res.status(200).json({ users: allUsers });
            }
            catch (error) {
                return res.status(500).json({
                    error: `error when getting all users ${error.message}`,
                });
            }
        });
    },
};
//# sourceMappingURL=userController.js.map