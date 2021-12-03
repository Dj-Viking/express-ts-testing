import { pre, prop, plugin, Ref } from "@typegoose/typegoose";
import { CardClass } from "./Card";
import argon2 from "argon2";
import mongooseUniqueValidator from "mongoose-unique-validator";

// interface QueryHelpers {
//   isCorrectPassword: Promise<boolean>;
// }

// async function isCorrectPassword(
//   this: ReturnModelType<typeof UserClass, QueryHelpers>,
//   str: string
// ) {
//   return argon2.verify(this.password, str);
// }

@pre<UserClass>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await argon2.hash(this.password);
  }
  next();
})
@plugin(mongooseUniqueValidator)
export class UserClass {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true })
  public password!: string;

  @prop()
  public token?: string;

  @prop({ ref: () => CardClass })
  public cards?: Ref<CardClass>[]; // This is a Reference Array

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;
}
