import monk from "monk";
import Logger from "../lib/logger";

const connectionURL = process.env.DB_URL || "localhost/biciapi";
const db = monk(connectionURL, { authSource: "admin" });

db.then((_) => {
   Logger.info("DB connected");
}).catch((e) => {
   Logger.error(e);
});

export default db;
