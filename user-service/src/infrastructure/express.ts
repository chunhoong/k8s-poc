import express from "express";
import Logger from "./logger";

export function handleError(
  handler: (req: express.Request, res: express.Response) => void
): express.Handler {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
}

export function createErrorHandler(logger: Logger) {
  return (error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(error, "Unexpected error");
    res.json({errorCode: "UNEXPECTED_ERROR", errorMessage: "Something is wrong at our side"});
  }
}
