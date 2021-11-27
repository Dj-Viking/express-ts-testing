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
    updateUserById: function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, username, email } = args;
            try {
                const updateObj = {
                    _id,
                    username,
                    email,
                };
                console.log("update obj created", updateObj);
                switch (true) {
                    case !_id:
                        throw { id: `must provide an id to update a user` };
                    case !username:
                        delete updateObj.username;
                        break;
                    case !email:
                        delete updateObj.email;
                        break;
                    default:
                        break;
                }
                const updatedUser = yield User_1.default.findByIdAndUpdate(updateObj, {
                    new: true,
                    runValidators: true,
                });
                console.log("updated user db response", updatedUser);
                return {
                    _id: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser._id,
                    username: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.username,
                    email: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.email,
                    createdAt: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.createdAt,
                    updatedAt: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.updatedAt,
                };
            }
            catch (error) {
                console.log("error when updating user: ", error);
                return error;
            }
        });
    },
};
//# sourceMappingURL=services.js.map