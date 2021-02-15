import db from "./connection";
import { City } from "../lib/utils";

const cities = db.get<City>("cities");

export async function getCities(): Promise<City[]> {
   return (await cities.find()).map(({ _id, ...rest }) => rest);
}
export async function getCity(id: number): Promise<City> {
   const { _id, ...rest } = await cities.findOne({ id });
   return rest;
}
export async function saveCities(payload: City[]): Promise<void> {
   await cities.insert(payload);
}
