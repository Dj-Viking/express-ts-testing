import { prop, getModelForClass, plugin } from "@typegoose/typegoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

@plugin(mongooseUniqueValidator)
class UserClass {
  @prop({ required: true, unique: true })
  public username!: string;

  @prop({ required: true, unique: true })
  public email!: string;

  @prop({ required: true, select: false })
  public password!: string;

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;
}

const User = getModelForClass(UserClass);

export default User;
