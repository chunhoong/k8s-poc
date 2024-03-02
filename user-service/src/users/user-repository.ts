import { UserEntity } from "./objects";

export default interface UserRepository {
  findByUsername(username: string): Promise<UserEntity | undefined>;
}