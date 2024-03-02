import DatabaseConnection, { PostgressDatabaseConnection } from "../infrastructure/database";
import { JwtHelper, JoseJwtHelper } from "../infrastructure/jwt";
import Logger from "../infrastructure/logger";
import { PasswordHelper, Argon2PasswordHelper } from "../infrastructure/password";
import UserPostgresRepository from "../infrastructure/persistence/user-postgres-repository";
import { UserSessionPostgresRepository } from "../infrastructure/persistence/user-session-postgres-repository";
import UserRepository from "../users/user-repository";
import UserService from "../users/user-service";
import { UserSessionRepository } from "../users/user-session-repository";
import readConfig from "./config";
import { HealthCheckcController } from "./controller/healthcheck-controller";
import UserController from "./controller/user-controller";

export function getInstances() {
  const config = readConfig();

  const logger = new Logger();

  const db: DatabaseConnection = new PostgressDatabaseConnection();

  const userRepo: UserRepository = new UserPostgresRepository(db);
  const userSessionRepo: UserSessionRepository =
    new UserSessionPostgresRepository(db);

  const passwordHelper: PasswordHelper = new Argon2PasswordHelper();
  const jwtHelper: JwtHelper = new JoseJwtHelper(logger, "USER_SERVICE", config.jwtSecret, "HS256");

  const userSvc = new UserService(
    userRepo,
    userSessionRepo,
    passwordHelper,
    jwtHelper,
    config.userTokenValiditySeconds
  );

  const userCtrl = new UserController(userSvc, logger);
  const healthCheckCtrl = new HealthCheckcController(db);
  
  return {
    config,
    logger,
    db,
    userRepo,
    userSessionRepo,
    userSvc,
    userCtrl,
    healthCheckCtrl,
  };
}
