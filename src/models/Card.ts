import { prop, getModelForClass, Ref } from "@typegoose/typegoose";
import User from "./User";

class CardClass {
  @prop()
  public frontSideText?: string;

  @prop()
  public frontSideLanguage?: string;

  @prop()
  public frontSidePicture?: string;

  @prop()
  public backSideText?: string;

  @prop()
  public backSideLanguage?: string;

  @prop()
  public backSidePicture?: string;

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
