import { prop, getModelForClass } from "@typegoose/typegoose";

class UserClass {
  @prop()
  public username!: string;

  @prop()
  public email!: string;
}

const User = getModelForClass(UserClass);

export default User;
