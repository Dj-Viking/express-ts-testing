"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("@typegoose/typegoose");
const User_1 = __importDefault(require("./User"));
class CardClass {
}
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CardClass.prototype, "frontsideText", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CardClass.prototype, "frontsideLanguage", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CardClass.prototype, "frontsidePicture", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CardClass.prototype, "backsideText", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CardClass.prototype, "backsideLanguage", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], CardClass.prototype, "backsidePicture", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => typeof User_1.default }),
    __metadata("design:type", Object)
], CardClass.prototype, "creator", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], CardClass.prototype, "createdAt", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Date)
], CardClass.prototype, "updatedAt", void 0);
const Card = (0, typegoose_1.getModelForClass)(CardClass, {
    schemaOptions: {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    },
});
exports.default = Card;
//# sourceMappingURL=Card.js.map