import db from "./connection";
import { City } from "../lib/utils";

const cities = db.get<DbCity>("cities");

export async function getCities(): Promise<DbCity[]> {
   return cities.find();
}
export async function saveCities(payload: DbCity[]): Promise<void> {
   await cities.insert(payload);
}

export type DbCity = City & { url: string };
