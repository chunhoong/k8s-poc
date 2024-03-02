import express from "express";
import { HealthCheckcController } from "./controller/healthcheck-controller";
import UserController from "./controller/user-controller";
import Logger from "../infrastructure/logger";
import { createErrorHandler } from "../infrastructure/express";

export function createRestApp(logger: Logger, userCtrl: UserController, healthCheckCtrl: HealthCheckcController) {
  const app = express();
  app.use("/users", userCtrl.getRouter());
  app.use("/health", healthCheckCtrl.getRouter());
  app.use(createErrorHandler(logger));
  return app;
}
