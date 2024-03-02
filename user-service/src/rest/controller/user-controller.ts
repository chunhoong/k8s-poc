import express from "express";
import { handleError } from "../../infrastructure/express";
import Logger from "../../infrastructure/logger";
import {
  CredentialNotMatchException,
  UserNotFoundException,
} from "../../users/objects";
import UserService from "../../users/user-service";
import { LoginRequest } from "../schema/user-schema";

export default class UserController {
  constructor(private userSvc: UserService, private logger: Logger) {}

  getRouter() {
    const router = express.Router();
    router.post("/login", handleError(this.login.bind(this)));
    return router;
  }

  async login(req: express.Request, res: express.Response) {
    const requestBody = req.body as LoginRequest;
    try {
      const tokenPayload = await this.userSvc.login({
        username: requestBody.username,
        password: requestBody.password,
      });

      res.status(200).json({ token: tokenPayload.token });
    } catch (error) {
      if (
        error instanceof UserNotFoundException ||
        error instanceof CredentialNotMatchException
      ) {
        this.logger.error(error);
        
        res
          .status(401)
          .send({
            errorCode: "UNAUTHORISED",
            errorMessage: `Credential not match for ${requestBody.username}`,
          });
      } else {
        throw error;
      }
    }
  }
}
