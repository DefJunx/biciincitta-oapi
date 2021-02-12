import express, { NextFunction, Request, Response } from "express";
import mainRouter from "./routes";

const app = express();

app.use("/api/v1", mainRouter);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
   res.json("Hello");
});

export default app;
