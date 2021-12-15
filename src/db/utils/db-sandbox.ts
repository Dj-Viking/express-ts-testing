import { User } from "../../models";
import mongoose from "mongoose";
const { SUPER_SECRET } = process.env;

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/rest-cats", {
    autoIndex: true,
  })
  .then(async () => {
    if (!SUPER_SECRET) process.exit(1);
    mongoose.connection.close();
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
