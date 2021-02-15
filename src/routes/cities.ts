import { Router } from "express";
import Logger from "../lib/logger";
import { fetchCities, fetchStations } from "../lib/utils";

function getCitiesRoutes() {
   const citiesRouter = Router();

   citiesRouter.get("/", async (req, res) => {
      const cities = await fetchCities();
      res.json(cities);
   });
   // citiesRouter.get("/:id", async (req, res) => res.json(await fetchStations(req.params.id)));

   return citiesRouter;
}

export default getCitiesRoutes;
