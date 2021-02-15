import got from "got";
import cheerio from "cheerio";

import Logger from "./logger";
import { getCities, getCity, saveCities } from "../db/cities";

const CITIES_URL = "http://www.bicincitta.com/css/Portal_11/Pages/frmCercaComune.aspx";
const CITIES_LINK_PART = "frmLeStazioni";

const STATION_URL = "http://www.bicincitta.com/frmLeStazioni.aspx?ID=";
const STATION_SELECTOR = ".rrItem";
const STATION_NAME_SELECTOR = ".Stazione";
const STATION_OPERATIVITY_SELECTOR = "strong";

export type City = { city: string; id: number; url: string };
export type Station = { name: string; isActive: boolean; availableBikes: number; freeSpots: number }; // TODO: Type

let cachedCities: City[] = [];
const cachedStations: { [key: number]: Station[] } = {};

export async function fetchCities(): Promise<Partial<City>[]> {
   Logger.info("Fetching cities...");

   if (cachedCities.length > 0) {
      Logger.warning("Cached cities!");
      return cachedCities;
   }

   try {
      const cities = await getCities();
      if (cities.length > 0) {
         cachedCities = cities;
         return cachedCities.map(({ url, ...rest }) => rest);
      }
   } catch (error) {
      Logger.error(error);
      throw new Error("Error fetching cities");
   }

   const html = (await got(CITIES_URL)).body;
   const $ = cheerio.load(html);
   const $cities = $(`a[href*="${CITIES_LINK_PART}"]`);

   $cities.each((i, el) => {
      const href = cheerio(el).attr("href");
      const id = +[...href.matchAll(/(^.+=)(\d+$)/g)].map((m) => m[2])[0];
      const o = {
         city: cheerio(el).text(),
         id,
         url: href.indexOf("../") !== -1 ? `${STATION_URL}${id}` : href,
      };

      cachedCities.push(o);
   });

   Logger.info("Saving cities to DB...");
   await saveCities(cachedCities);
   Logger.info("...Success");

   return cachedCities.map(({ url, ...rest }) => rest);
}

export async function fetchStations(id: number): Promise<Station[]> {
   if (cachedStations[id]) {
      return cachedStations[id];
   }

   // TODO: Check in DB

   cachedStations[id] = [];

   const stations = cachedStations[id];

   const city = await getCity(id);
   const html = (await got(city.url)).body;
   const $ = cheerio.load(html);
   const stationsHtml = $(STATION_SELECTOR);

   stationsHtml.each((i, el) => {
      const label = cheerio(el).find(STATION_NAME_SELECTOR);
      const availability = cheerio(el).find(".Red");
      const station: Station = {
         name: "",
         isActive: label.find(STATION_OPERATIVITY_SELECTOR).length === 0,
         availableBikes: +availability.html().split("<br>")[0].split(" ")[0],
         freeSpots: +availability.html().split("<br>")[1].split(" ")[0],
      };

      label.find(STATION_OPERATIVITY_SELECTOR).remove();

      station.name = label.text();

      stations.push(station);
   });

   // TODO: Save to DB collection "stations"

   return stations;
}
