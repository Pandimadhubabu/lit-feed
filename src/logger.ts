import Logger from "pino";
import { logLevel } from "./config";

const logger = Logger({
  level: logLevel,
});

export function debug(data: Record<string, unknown>, message?: string) {
  logger.debug({ data }, message);
}

export function info(data: Record<string, unknown>, message?: string) {
  logger.info({ data }, message);
}

export function warn(data: Record<string, unknown>, message?: string) {
  logger.warn({ data }, message);
}

export function error(data: Record<string, unknown>, message?: string) {
  logger.error({ data }, message);
}
