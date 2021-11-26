import { mongoose } from "@typegoose/typegoose";
import { IS_PROD } from "./constants";
import app from "./app";
const PORT = process.env.PORT || 4000;

console.log("what is node env", process.env.NODE_ENV);

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost/rest-cats");

mongoose.set("debug", IS_PROD);

app.listen(PORT, () => {
  console.log(
    "\x1b[44m",
    `✨🔮 ${!IS_PROD && `dev server started on http://localhost:${PORT}`}`,
    "\x1b[00m"
  );
});
