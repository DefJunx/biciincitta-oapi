import rfdc from "rfdc";

import { Station } from "../lib/utils";
import db from "./connection";

const stations = db.get<Station>("stations");

export async function getStations(): Promise<Station[]> {
   const result = await stations.find();

   return result.map(({ _id, ...rest }) => rest);
}

export async function saveStations(payload: Station[]): Promise<void> {
   const toInsert = rfdc()(payload);
   await stations.insert(toInsert);
}
