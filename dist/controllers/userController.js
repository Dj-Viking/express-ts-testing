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
const services_1 = require("../db/services");
const formatError_1 = require("../utils/formatError");
const { createUser } = services_1.UserService;
exports.UserController = {
    createUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            try {
                const user = yield createUser({
                    username,
                    email,
                    password,
                });
                return res.status(201).json({ user });
            }
            catch (error) {
                const { username, email, password } = error.errors;
                if (Boolean(username || email || password)) {
                    return res.status(400).json({
                        error: `${(0, formatError_1.formatCreateUserError)({
                            username,
                            email,
                            password,
                        })}`,
                    });
                }
                return res.status(500).json({
                    error: `error when creating a user:\n ${error}`,
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
                    error: `error when getting all users ${error}`,
                });
            }
        });
    },
};
//# sourceMappingURL=userController.js.map