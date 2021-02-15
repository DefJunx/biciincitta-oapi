import { Router } from "express";
import getCitiesRoutes from "./cities";

function getMainRoutes() {
   const apiRouter = Router();

   apiRouter.use("/cities", getCitiesRoutes());

   return apiRouter;
}

export default getMainRoutes;
