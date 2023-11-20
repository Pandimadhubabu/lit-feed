import Logger from "pino";
import { logLevel } from "./loggerConfig";

const logger = Logger({
  level: logLevel,
});

export function logDebug(data: Record<string, unknown>, message?: string) {
  logger.debug({ data }, message);
}

export function logInfo(data: Record<string, unknown>, message?: string) {
  logger.info({ data }, message);
}

export function logWarn(data: Record<string, unknown>, message?: string) {
  logger.warn({ data }, message);
}

export function logError(data: Record<string, unknown>, message?: string) {
  logger.error({ data }, message);
}
