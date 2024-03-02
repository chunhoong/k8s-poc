import pino from "pino"

export default class Logger {
  private logger = pino();

  info(param1: string, param2?: object) {
    this.logger.info(param1, param2);
  }

  warn(param1: unknown, param2?: string) {
    this.logger.warn(param1, param2);
  }

  error(error: unknown, message?: string) {
    this.logger.error(error, message);
  }
}