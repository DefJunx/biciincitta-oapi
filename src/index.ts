import app from "./app";
import Logger from "./lib/logger";

const port = +process.env.PORT || 3000;

// TODO: Rate limiting
// TODO: Authentication

app.listen(port, () => {
   Logger.info(`Listening on port ${port}`);
});

export default app