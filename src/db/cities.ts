import rfdc from "rfdc";

import db from "./connection";
import { City } from "../lib/utils";

const cities = db.get<City>("cities");

export async function getCities(): Promise<City[]> {
   const citiesWithId = await cities.find();

   return citiesWithId.map(({ _id, ...rest }) => rest);
}
export async function getCity(id: number): Promise<City> {
   const { _id, ...rest } = await cities.findOne({ id });
   return rest;
}
export async function saveCities(payload: City[]): Promise<void> {
   const toInsert = rfdc()(payload);
   await cities.insert(toInsert);
}
