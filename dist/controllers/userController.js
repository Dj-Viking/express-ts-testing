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
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const services_1 = require("../db/services");
const formatError_1 = require("../utils/formatError");
const signToken_1 = require("../utils/signToken");
const uuid = require("uuid");
const { createUser, updateUserById } = services_1.UserService;
exports.UserController = {
    testNoRoleUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            const user = yield models_1.User.create({
                username,
                email,
                password,
            });
            const token = (0, signToken_1.signToken)({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: void 0,
                uuid: uuid.v4(),
            });
            const returnUser = {
                username: user.username,
                email: user.email,
                _id: user._id,
                role: user.role,
                token,
            };
            return res.status(201).json({ user: returnUser });
        });
    },
    createUser: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, email, password } = req.body;
            try {
                const user = yield createUser({
                    username,
                    email,
                    password,
                });
                return (res
                    .status(201)
                    .json({ user: user.user }));
            }
            catch (error) {
                let errorsObj = {};
                if (error.errors) {
                    errorsObj = Object.assign({}, error.errors);
                }
                return res
                    .status(400)
                    .json({ error: `${(0, formatError_1.formatCreateUserError)(errorsObj)}` });
            }
        });
    },
    login: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            if (!password || !email)
                return res.status(422).json({ error: "unprocessable entity" });
            const foundUser = yield models_1.User.findOne({ email });
            if (foundUser === null)
                return res.status(400).json({ error: "incorrect credentials" });
            const validPass = yield foundUser.isCorrectPassword(password);
            if (!validPass)
                return res.status(400).json({ error: "incorrect credentials" });
            const token = (0, signToken_1.signToken)({
                _id: foundUser._id,
                role: foundUser.role,
                username: foundUser.username,
                email: foundUser.email,
                uuid: uuid.v4(),
            });
            const ids = foundUser.cards.map((card) => {
                return new mongoose_1.default.Types.ObjectId(card._id);
            });
            const userCards = yield models_1.Card.find({
                _id: { $in: ids },
            }).select("-__v");
            const returnUser = {
                token,
                username: foundUser.username,
                role: foundUser.role,
                email: foundUser.email,
                _id: foundUser._id,
                cards: userCards,
            };
            return res.status(200).json({ user: returnUser });
        });
    },
    getAllUsers: function (_, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const allUsers = yield models_1.User.find({}).select("-__v").select("-password");
            return res.status(200).json({ users: allUsers });
        });
    },
    getUserById: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundUser = yield models_1.User.findOne({ _id: req.params.id }).select("-__v");
            if (foundUser === null) {
                return res.status(404).json({ message: "user not found" });
            }
            return res.status(200).json({ user: foundUser });
        });
    },
    updateUserById: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedUser = yield updateUserById({
                _id: req.params.id,
                username: req.body.username,
                email: req.body.email,
            });
            return res.status(200).json({ user: updatedUser });
        });
    },
};
//# sourceMappingURL=UserController.js.map