import { createLogger, format, transports } from "winston";

const logger = createLogger({
  level: "info",
  format: format.json(),
  transports: [
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.simple(),
    })
  );
}

process.on("uncaughtException", (error: Error) => {
  logger.error(error);
  process.exit(1);
});

process.on("unhandledRejection", (reason: Record<string, unknown>) => {
  logger.warn(reason);
});

export default logger;
