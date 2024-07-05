import { DependencyContainer } from "tsyringe";
import { createScopedLogger } from "./createScopedLogger";

export function addResolutionProfiler<T>(
  container: DependencyContainer,
  token: string,
  methods: Array<keyof T>,
) {
  container.afterResolution(
    token,
    (_t, _result: T) => {
      const logger = createScopedLogger(container, token);

      for (const method of methods) {
        const originalProp = _result[method];

        if (typeof method !== "string") {
          logger.warn(`${method.toString()} is not a valid method name`);

          continue;
        }

        if (typeof originalProp !== "function") {
          logger.warn(`${method} is not a function`);

          continue;
        }

        let callID = 0;

        const originalMethod = originalProp.bind(_result);

        // @ts-ignore - typing this would be a low value PITA
        _result[method] = (...args: any[]) => {
          callID++;

          logger.startProfiling(`${method}#${callID}`);
          const result = originalMethod(...args);

          logger.stopProfiling(`${method}#${callID}`);

          return result;
        };
      }
    },
    { frequency: "Always" },
  );
}
