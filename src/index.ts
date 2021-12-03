import { IS_PROD } from "./constants";
import createServer from "./app";
import connection from "./db/connection";
const PORT = process.env.PORT || 4000;

connection.then(() => {
  const app = createServer();
  app.listen(Number(PORT), () => {
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
