import { pre, prop, getModelForClass, plugin, Ref } from "@typegoose/typegoose";
import Card from "./Card";
import argon2 from "argon2";
import mongooseUniqueValidator from "mongoose-unique-validator";

@pre<UserClass>("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    this.password = await argon2.hash(this.password);
  }
  next();
})
@plugin(mongooseUniqueValidator)
class UserClass {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, select: false })
  private password!: string;

  @prop()
  public token?: string;

  @prop({ ref: () => typeof Card })
  public cards?: Ref<typeof Card>[]; // This is a Reference Array

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;
}

const User = getModelForClass(UserClass, {
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
});

export default User;
