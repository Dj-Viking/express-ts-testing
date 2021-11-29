import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import User from "./User";

class CardClass {
  @prop()
  public frontsideText?: string;

  @prop()
  public frontsideLanguage?: string;

  @prop()
  public frontsidePicture?: string;

  @prop()
  public backsideText?: string;

  @prop()
  public backsideLanguage?: string;

  @prop()
  public backsidePicture?: string;

  @prop({ ref: () => typeof User })
  public creator?: Ref<typeof User>; // This is a single Reference

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;
}

// TODO get the model middleware set up when the user is created or updated to update the time of this action
const Card = getModelForClass(CardClass, {
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
});

export default Card;
