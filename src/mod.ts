import { DependencyContainer } from "tsyringe";
import { BotController } from "@spt-aki/controllers/BotController";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { createScopedLogger } from "./utils/createScopedLogger";
import { OnDemandBotController } from "./OnDemandBotController";
import { createProfiler } from "./utils/createProfiler";

type Config = {
  debug: boolean;
};

class PrewarmedBots implements IPreAkiLoadMod {
  preAkiLoad(container: DependencyContainer): void {
    const logger = createScopedLogger(container, "PrewarmedBots");

    // const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
    // const profiles = profileHelper.getProfiles();
    // const sessionIDs = Object.keys(profiles);
    // const pmcProfiles = sessionIDs.map((sessionID) =>
    //   profileHelper.getPmcProfile(sessionID),
    // );

    // TODO:
    // - set up a single task processing queue
    // - begin queue processing for each bot type, ordered by highest demand (i.e. scav -> pmc -> bosses + boss followers -> others)
    // - calc average pmc level (approximating the state of the servers wipe)
    // - expire old bots incase server is online for a long time

    // TODO: load from JSON
    const config: Config = {
      debug: false,
    };

    const botController = new OnDemandBotController(container);

    // TODO: extract our method override
    container.afterResolution<BotController>(
      "BotController",
      (_t, result: BotController) => {
        // @ts-expect-error - the generate method in 3.8.3 does NOT return a promise. i just cbf loading old types.
        result.generate = (sessionId, info) => {
          if (info.conditions.length > 1) {
            logger.info("received bot cache warming request - ignoring");

            return [];
          }

          const profile = createProfiler({
            logger,
            label: "generateBot",
            enabled: config.debug,
          });

          const bot = profile(() => botController.generateBot(sessionId, info));

          return [bot];
        };
      },
    );
  }
}

module.exports = { mod: new PrewarmedBots() };
