import { UserSessionEntity } from "../../users/objects";
import { UserSessionRepository } from "../../users/user-session-repository";
import DatabaseConnection from "../database";

export class UserSessionPostgresRepository implements UserSessionRepository {
  constructor(private db: DatabaseConnection) {}

  async save(entity: UserSessionEntity): Promise<UserSessionEntity> {
    const result = await this.db.query<UserSessionEntity>(
      `INSERT INTO user_sessions ("session_id", "username", "token", "created_at") values ($1, $2, $3, $4) returning *`,
      [entity.session_id, entity.username, entity.token, entity.created_at]
    );

    return result[0];
  }
}
