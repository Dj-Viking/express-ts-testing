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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const signToken_1 = require("../utils/signToken");
const models_1 = require("../models");
const uuid = require("uuid");
exports.UserService = {
    createUser: function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password } = args;
                const createdUser = yield models_1.User.create({
                    username,
                    role: "user",
                    email,
                    password,
                });
                const token = (0, signToken_1.signToken)({
                    _id: createdUser._id,
                    role: "user",
                    username,
                    email,
                    uuid: uuid.v4(),
                });
                return {
                    user: {
                        username: createdUser.username,
                        email: createdUser.email,
                        _id: createdUser._id,
                        token,
                        role: createdUser.role,
                        createdAt: createdUser.createdAt,
                        updatedAt: createdUser.updatedAt,
                    },
                };
            }
            catch (error) {
                if (error.errors) {
                    throw error;
                }
            }
        });
    },
    updateUserById: function (args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { _id, username, email } = args;
            const updateObj = {
                username,
                email,
            };
            const updatedUser = yield models_1.User.findByIdAndUpdate(_id, updateObj, {
                new: true,
                runValidators: true,
            });
            return {
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
            };
        });
    },
};
//# sourceMappingURL=services.js.map