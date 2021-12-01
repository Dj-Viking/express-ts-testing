import { prop } from "@typegoose/typegoose";

export class CardClass {
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

  @prop()
  public creator?: string; // This is a single Reference

  @prop()
  public createdAt: Date;

  @prop()
  public updatedAt: Date;
}
