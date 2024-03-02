import { createRestApp } from "./app";
import { getInstances } from "./container";

const { config, logger, db, userCtrl, healthCheckCtrl } = getInstances();

db.init({
  databaseName: config.dbName,
  host: config.dbHostname,
  port: config.dbPort,
  user: config.dbUser,
  password: config.dbPassword,
});

const restApp = createRestApp(logger, userCtrl, healthCheckCtrl);

const server = restApp.listen(config.port, () => {
  logger.info(`Application started successfully on port ${config.port}`);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received");
  handleTermination();
});

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  handleTermination();
});

process.on("unhandledRejection", (reason: string, p: Promise<unknown>) => {
  logger.error(reason, "Unhandled rejection");
  throw reason;
});

process.on("uncaughtException", (error: Error) => {
  logger.error(error, "Uncaught exception");
});

const handleTermination = async () => {
  logger.info("Stop accepting new http connection");
  await new Promise<void>((resolve) => {
    server.close(async () => {
      logger.info("All http connections are ended");
      resolve();
    });
  });
  await db.disconnect();
  logger.info(`Application shutdown successfully`);
  process.exit(0);
};
