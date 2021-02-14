import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import mainRouter from "./routes";

const app = express();

// TODO: Rate limiting
// TODO: Authentication

app.use(cors());
app.use(helmet());

app.use("/api/v1", mainRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
   res.json("Hello");
});

export default app;
