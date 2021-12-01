"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Card = void 0;
const User_1 = require("./User");
const Card_1 = require("./Card");
const typegoose_1 = require("@typegoose/typegoose");
exports.Card = (0, typegoose_1.getModelForClass)(Card_1.CardClass, {
    schemaOptions: {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    },
});
exports.User = (0, typegoose_1.getModelForClass)(User_1.UserClass, {
    schemaOptions: {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    },
});
//# sourceMappingURL=index.js.map