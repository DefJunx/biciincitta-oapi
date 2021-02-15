import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

import Logger from "./lib/logger";
import getMainRoutes from "./routes";

function errorMiddleware(error: any, req: Request, res: Response, next: NextFunction) {
   if (res.headersSent) {
      next(error);
   } else {
      Logger.error(error);
      res.status(500);
      res.json({
         message: error.message,
         // we only add a `stack` property in non-production environments
         ...(process.env.NODE_ENV === "production" ? null : { stack: error.stack }),
      });
   }
}

const app = express();

// TODO: Rate limiting
// TODO: Authentication

app.use(cors());
app.use(helmet());

app.use("/api/v1", getMainRoutes());

app.get("/", async (req: Request, res: Response) => {
   res.json("Hello");
});

app.use(errorMiddleware);

export default app;
