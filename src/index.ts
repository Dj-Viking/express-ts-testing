import { IS_PROD } from "./constants";
import app from "./app";
import db from "./db";
const PORT = process.env.PORT || 4000;

console.log("what is node env", process.env.NODE_ENV);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(
      "\x1b[44m",
      `✨🔮 ${
        !IS_PROD
          ? `dev server started on http://localhost:${PORT}`
          : `server started on port ${PORT}`
      }`,
      "\x1b[00m"
    );
  });
});
