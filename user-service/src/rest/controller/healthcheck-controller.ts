import express from "express";
import DatabaseConnection from "../../infrastructure/database";
import { handleError } from "../../infrastructure/express";

export class HealthCheckcController {
  constructor(private db: DatabaseConnection) {}

  getRouter() {
    const router = express.Router();
    router.get("/", handleError(this.performHealthCheck.bind(this)));
    return router;
  }

  async performHealthCheck(req: express.Request, res: express.Response) {
    await this.db.query("SELECT 1");
    res.status(200).json({ status: "OK" });
  }
}
