import app from "./app";
import Logger from "./lib/logger";

const port = +process.env.PORT;

// TODO: Rate limiting
// TODO: Authentication

app.listen(port, () => {
   Logger.info(`Listening on port ${port}`);
});
