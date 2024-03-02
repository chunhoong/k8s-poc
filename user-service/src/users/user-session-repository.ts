import { UserSessionEntity } from "./objects";

export interface UserSessionRepository {
  save(entity: UserSessionEntity): Promise<UserSessionEntity>;
}