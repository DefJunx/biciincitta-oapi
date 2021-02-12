import app from "./app";
import Logger from "./lib/logger";

const port = +process.env.PORT;

app.listen(port, () => {
   Logger.info(`Listening on port ${port}`);
});
