import { UserClass } from "./User";
import { CardClass } from "./Card";
import { getModelForClass } from "@typegoose/typegoose";

export const Card = getModelForClass(CardClass, {
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
});

export const User = getModelForClass(UserClass, {
  schemaOptions: {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  },
});
