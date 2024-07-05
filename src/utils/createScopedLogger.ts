import { DependencyContainer } from "tsyringe";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";

export type ScopedLogger = {
  startProfiling: (metric: string) => void;
  stopProfiling: (metric: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
  warn: (message: string) => void;
};

export function createScopedLogger(
  container: DependencyContainer,
  scope: string,
): ScopedLogger {
  const logger = container.resolve<ILogger>("WinstonLogger");
  const profilers = {};

  return {
    startProfiling: (metric: string) => {
      profilers[metric] = Date.now();

      logger.info(`[${Date.now()}][ALP][${scope}] ${metric}: started`);
    },
    stopProfiling: (metric: string) => {
      const endTime = Date.now();
      const duration = endTime - profilers[metric];

      logger.info(
        `[${Date.now()}][ALP][${scope}] ${metric}: finished in ${duration}ms`,
      );

      delete profilers[metric];
    },
    info: (message: string) => {
      logger.info(`[${Date.now()}][ALP][${scope}] ${message}`);
    },
    error: (message: string) => {
      logger.error(`[${Date.now()}][ALP][${scope}] ${message}`);
    },
    warn: (message: string) => {
      logger.warning(`[${Date.now()}][ALP][${scope}] ${message}`);
    },
  };
}
