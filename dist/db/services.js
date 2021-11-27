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
exports.UserService = void 0;
const User_1 = __importDefault(require("../models/User"));
exports.UserService = {
    createUser: function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = args;
                const createdUser = yield User_1.default.create({
                    username,
                    email,
                    password,
                });
                return {
                    username: createdUser.username,
                    email: createdUser.email,
                    _id: createdUser._id,
                    createdAt: createdUser.createdAt,
                    updatedAt: createdUser.updatedAt,
                };
            }
            catch (error) {
                switch (true) {
                    case error.errors.email: {
                        throw {
                            email: error.errors.email,
                        };
                    }
                    case error.errors.username: {
                        throw {
                            username: error.errors.username,
                        };
                    }
                    case error.errors.password: {
                        throw {
                            password: error.errors.password,
                        };
                    }
                    default:
                        throw error;
                }
            }
        });
    },
};
//# sourceMappingURL=services.js.map