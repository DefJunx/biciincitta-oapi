import { Router } from "express";
import { fetchCities, fetchStations } from "../lib/utils";

const citiesRouter = Router();

citiesRouter.get("/", async (req, res) => res.json(await fetchCities()));
citiesRouter.get("/:id", async (req, res) => res.json(await fetchStations(req.params.id)));

export default citiesRouter;
