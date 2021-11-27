import mongoose from "mongoose";
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/rest-cats", {
  autoIndex: true,
});
export default mongoose.connection;
