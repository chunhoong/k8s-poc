import pg from "pg"

export interface Config {
  databaseName: string;
  host: string;
  port: number;
  user: string;
  password: string;
}

export default interface DatabaseConnection {
  init(config: Config): void;
  query<T>(sql: string, params?: unknown[]): Promise<T[]>;
  disconnect(): Promise<void>;
}

export class PostgressDatabaseConnection implements DatabaseConnection {
  private pool: pg.Pool | undefined;
  private static readonly ERROR_MSG_DB_NOT_CONNECTED = "Database not connected"
  
  async init(config: Config) {
    this.pool = new pg.Pool({
      database: config.databaseName,
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      max: 20,
    });
  }
  
  async query<T>(sql: string, params?: unknown[] | undefined): Promise<T[]> {
    if (this.pool === undefined) {
      throw new Error(PostgressDatabaseConnection.ERROR_MSG_DB_NOT_CONNECTED);
    }

    const result = await this.pool.query(sql, params);

    return result.rows;
  }
  
  async disconnect(): Promise<void> {
    if (this.pool === undefined) {
      throw new Error(PostgressDatabaseConnection.ERROR_MSG_DB_NOT_CONNECTED);
    }

    this.pool.end();
  }
  
}
