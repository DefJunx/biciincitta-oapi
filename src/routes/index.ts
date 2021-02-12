import { Router } from "express";
import citiesRouter from "./cities";

const apiRouter = Router();

apiRouter.use("/cities", citiesRouter);

export default apiRouter;
