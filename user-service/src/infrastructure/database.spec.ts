import readConfig from "../rest/config";
import { PostgressDatabaseConnection } from "./database";

describe("PostgressDatabaseConnection", () => {
  
  it("should query", async () => {
    // Given:
    const config = readConfig();
    const db = new PostgressDatabaseConnection();
    db.init({
      databaseName: config.dbName,
      host: config.dbHostname,
      port: config.dbPort,
      user: config.dbUser,
      password: config.dbPassword
    });

    // When:
    const result = await db.query<{ one: number}>("select 1 as one");

    // Then:
    expect(result.length).toBe(1)
    expect(result[0].one).toBe(1);

    // Finally:
    await db.disconnect();
  });

})