import { prop, pre, plugin, Ref, DocumentType } from "@typegoose/typegoose";
import { CardClass } from "./Card";
import argon2 from "argon2";
import mongooseUniqueValidator from "mongoose-unique-validator";

@pre<UserClass>("save", async function (next) {
  if (this.isNew) this.password = await argon2.hash(this.password);
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
  public role: string;

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;

  //important note, this method is not a part of the Model but the returned Document from a Model query
  // e.g. const user = User.findOne({ _id })
  // user.isCorrectPassword("password") //now the method is attached to the document
  public async isCorrectPassword(
    this: DocumentType<UserClass>,
    plainPass: string
  ) {
    //returning the promise object unresolved and the await will happen when this method is called
    return argon2.verify(this.password, plainPass);
  }
}
