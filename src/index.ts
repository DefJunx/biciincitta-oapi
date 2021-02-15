/* eslint-disable import/first */

import dotenv from "dotenv";

dotenv.config();

import "express-async-errors";

import app from "./app";
import Logger from "./lib/logger";

const port = +process.env.PORT || 3000;

app.listen(port, () => {
   Logger.info(`Listening on port ${port}`);
});

export default app;
