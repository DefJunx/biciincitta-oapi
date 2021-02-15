import monk from "monk";
import Logger from "../lib/logger";

const connectionURL = process.env.DB_URL || "bici:duro@localhost/biciapi";
const db = monk(connectionURL, { authSource: "admin" });

db.then(() => {
   Logger.info("DB connected");
});

export default db;
