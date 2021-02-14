import got from "got";
import cheerio from "cheerio";

import Logger from "./logger";
import { DbCity, getCities, saveCities } from "../db/cities";

const CITIES_URL = "http://www.bicincitta.com/css/Portal_11/Pages/frmCercaComune.aspx";
const CITIES_LINK_PART = "frmLeStazioni";

const STATION_URL = "http://www.bicincitta.com/frmLeStazioni.aspx?ID=";

export type City = { city: string; id: number };
export type Station = any; // TODO: Type

let cachedCities: City[] = [];
let cachedStations: { [key: number]: Station[] } = {};

export async function fetchCities(): Promise<City[]> {
   Logger.info("Fetching cities...");

   if (cachedCities.length > 0) {
      Logger.warning("Cached cities!");
      return cachedCities;
   }

   // TODO: Fetch db and check
   const cities = await getCities();

   if (cities.length > 0) {
      cachedCities = cities.map(({ url, ...rest }) => rest);
      return cachedCities;
   }

   const html = (await got(CITIES_URL)).body;
   const $ = cheerio.load(html);
   const $cities = $(`a[href*="${CITIES_LINK_PART}"]`);

   let citiesForDB: DbCity[] = [];

   $cities.each((i, el) => {
      const href = cheerio(el).attr("href");
      const id = +[...href.matchAll(/(^.+=)(\d+$)/g)].map((m) => m[2])[0];
      const o = {
         city: cheerio(el).text(),
         id,
      };

      cachedCities.push(o);
      citiesForDB.push({
         ...o,
         url: href.indexOf("../") !== -1 ? `${STATION_URL}${id}` : href,
      });
   });

   await saveCities(citiesForDB);

   return cachedCities;
}

export async function fetchStations(id: string): Promise<Station[]> {
   if (cachedStations[+id]) {
      return cachedStations[+id];
   }

   const html = (await got(STATION_URL + id)).body;

   Logger.info(html);

   return [];
}
