import dotenv from "dotenv";

dotenv.config();

import "express-async-errors";

import app from "./app";
import Logger from "./lib/logger";

const port = +process.env.PORT || 3000;

console.log("port", process.env.PORT);

app.listen(port, () => {
   Logger.info(`Listening on port ${port}`);
});

export default app;
