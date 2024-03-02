import { DateTime } from "luxon";
import { v4 as uuidv4 } from "uuid";
import { JwtHelper } from "../infrastructure/jwt";
import { PasswordHelper } from "../infrastructure/password";
import { CredentialNotMatchException, UserNotFoundException } from "./objects";
import UserRepository from "./user-repository";
import { UserSessionRepository } from "./user-session-repository";

export default class UserService {
  constructor(
    private userRepo: UserRepository,
    private userSessionRepo: UserSessionRepository,
    private passwordHelper: PasswordHelper,
    private jwtHelper: JwtHelper,
    private userTokenValiditySeconds: number
  ) {}

  async login(credential: {
    username: string;
    password: string;
  }): Promise<{ sessionId: string; token: string }> {
    const user = await this.userRepo.findByUsername(credential.username);

    if (user === undefined) {
      throw new UserNotFoundException(`${credential.username} not found`);
    }

    const passwordMatched = await this.passwordHelper.verifyPassword(
      user.password,
      credential.password
    );

    if (passwordMatched === false) {
      throw new CredentialNotMatchException(
        `Password not match for ${credential.username}`
      );
    }

    const sessionId = uuidv4();
    const jwtToken = await this.createJwtToken(sessionId, user.username);

    const savedSession = await this.userSessionRepo.save({
      session_id: sessionId,
      username: user.username,
      token: jwtToken,
      created_at: new Date(),
    });

    return { sessionId: sessionId, token: savedSession.token };
  }

  private createJwtToken(sessionId: string, username: string): Promise<string> {
    return this.jwtHelper.sign({
      jti: sessionId,
      sub: username,
      aud: "client",
      exp: DateTime.now()
        .plus({ second: this.userTokenValiditySeconds })
        .toJSDate(),
      payload: {},
    });
  }
}
