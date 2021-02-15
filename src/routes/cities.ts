import { Router } from "express";
import { fetchCities, fetchStations } from "../lib/utils";

function getCitiesRoutes() {
   const citiesRouter = Router();

   citiesRouter.get("/", async (req, res) => {
      const cities = await fetchCities();
      res.json(cities);
   });

   citiesRouter.get("/:id", async (req, res) => {
      const { id } = req.params;

      if (Number.isNaN(+id)) {
         res.status(500);
         res.json({ error: "Invalid Id Parameter" });
         return;
      }

      const stations = await fetchStations(+id);

      res.json(stations);
   });

   return citiesRouter;
}

export default getCitiesRoutes;
