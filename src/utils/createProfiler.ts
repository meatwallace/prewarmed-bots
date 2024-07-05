import { ScopedLogger } from "./createScopedLogger";

type ProfilerConfig = {
  logger: ScopedLogger;
  label: string;
  enabled: boolean;
};

export function createProfiler(config: ProfilerConfig) {
  return (callback: Function) => {
    if (!config.enabled) {
      return callback();
    }

    config.logger.startProfiling(config.label);

    const result = callback();

    config.logger.stopProfiling(config.label);

    return result;
  };
}
