import DatabaseConnection, {
  PostgressDatabaseConnection,
} from "../infrastructure/database";
import { JoseJwtHelper } from "../infrastructure/jwt";
import Logger from "../infrastructure/logger";
import {
  Argon2PasswordHelper,
  PasswordHelper,
} from "../infrastructure/password";
import UserPostgresRepository from "../infrastructure/persistence/user-postgres-repository";
import { UserSessionPostgresRepository } from "../infrastructure/persistence/user-session-postgres-repository";
import readConfig from "../rest/config";
import { UserEntity } from "./objects";
import UserService from "./user-service";

jest.setTimeout(600000)

describe("UserService", () => {
  let db: DatabaseConnection;
  let passwordHelper: PasswordHelper;
  let userSvc: UserService;

  beforeAll(() => {
    const config = readConfig();
    const logger = new Logger();

    db = new PostgressDatabaseConnection();
    db.init({
      databaseName: config.dbName,
      host: config.dbHostname,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword,
    });

    const userRepo = new UserPostgresRepository(db);
    const userSessionRepo = new UserSessionPostgresRepository(db);

    passwordHelper = new Argon2PasswordHelper();

    const jwtHelper = new JoseJwtHelper(logger, "USER_SERVICE", "SUPER_SECRET", "HS256");

    userSvc = new UserService(
      userRepo,
      userSessionRepo,
      passwordHelper,
      jwtHelper,
      10000
    );
  });

  afterAll(async () => {
    await db.query("truncate table users");
    await db.query("truncate table user_sessions");
    await db.disconnect();
  });

  describe("login", () => {
    it("should return token payload", async () => {
      // Given: user is existing
      const username = "123456";
      const hashedPassword = await passwordHelper.hashPassword("password");
      await db.query<UserEntity>(
          `INSERT into users ("username", "password", "created_at", "updated_at") values ($1, $2, $3, $4) returning *`,
        ["123456", hashedPassword, new Date(), new Date()]
      );

      // When: login
      const tokenPayload = await userSvc.login({
        username,
        password: "password",
      });

      // Then:
      expect(tokenPayload.token).toBeDefined();
    });
  });
});
