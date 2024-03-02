import { UserEntity } from "../../users/objects";
import UserRepository from "../../users/user-repository";
import DatabaseConnection from "../database";

export default class UserPostgresRepository implements UserRepository {
  
  constructor(private db: DatabaseConnection) {}

  async findByUsername(username: string): Promise<UserEntity | undefined> {
    const result = await this.db.query<UserEntity>("SELECT * FROM users where username = $1", [username]);
    return result[0];
  }

}