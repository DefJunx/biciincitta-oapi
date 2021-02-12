import path from "path";
import winston from "winston";

const logPath = path.resolve(__dirname, "../logs");

const Logger = winston.createLogger({
   levels: winston.config.syslog.levels,
   level: "info",
   handleExceptions: true,
   transports: [
      new winston.transports.File({
         filename: path.resolve(logPath, "error.log"),
         level: "error",
      }),
      new winston.transports.File({
         filename: path.resolve(logPath, "combined.log"),
      }),
   ],
});

if (process.env.NODE_ENV !== "production" || process.env.FORCE_CONSOLE === "true") {
   Logger.add(
      new winston.transports.Console({
         format: winston.format.simple(),
      })
   );

   Logger.level = "debug";
}

export default Logger;
