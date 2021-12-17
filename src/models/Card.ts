import { prop } from "@typegoose/typegoose";
import mongoose from "mongoose";

export class CardClass {
  //so that i can cast the string id into the object when querying for a user's cards and return the card objects
  // instead of returning just the card's string ids
  @prop()
  public _id: mongoose.Types.ObjectId;

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
