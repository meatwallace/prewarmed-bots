import { DependencyContainer } from "tsyringe";
import { BotGenerator } from "@spt-aki/generators/BotGenerator";
import { BotHelper } from "@spt-aki/helpers/BotHelper";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { IGenerateBotsRequestData } from "@spt-aki/models/eft/bot/IGenerateBotsRequestData";
import { IBotBase } from "@spt-aki/models/eft/common/tables/IBotBase";
import { BotGenerationDetails } from "@spt-aki/models/spt/bots/BotGenerationDetails";
import { IPmcConfig } from "@spt-aki/models/spt/config/IPmcConfig";
import { MatchBotDetailsCacheService } from "@spt-aki/services/MatchBotDetailsCacheService";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ScopedLogger, createScopedLogger } from "./utils/createScopedLogger";
import { BotGenerationCacheService } from "@spt-aki/services/BotGenerationCacheService";

export class OnDemandBotController {
  configServer: ConfigServer;
  logger: ScopedLogger;

  botHelper: BotHelper;
  botGenerationCacheService: BotGenerationCacheService;
  botGenerator: BotGenerator;
  matchBotDetailsCacheService: MatchBotDetailsCacheService;
  profileHelper: ProfileHelper;

  pmcConfig: IPmcConfig;

  constructor(container: DependencyContainer) {
    this.logger = createScopedLogger(container, "OnDemandBotController");
    this.configServer = container.resolve<ConfigServer>("ConfigServer");

    this.botHelper = container.resolve<BotHelper>("BotHelper");
    this.botGenerationCacheService =
      container.resolve<BotGenerationCacheService>("BotGenerationCacheService");
    this.botGenerator = container.resolve<BotGenerator>("BotGenerator");
    this.matchBotDetailsCacheService =
      container.resolve<MatchBotDetailsCacheService>(
        "MatchBotDetailsCacheService",
      );
    this.profileHelper = container.resolve<ProfileHelper>("ProfileHelper");

    this.pmcConfig = this.configServer.getConfig<IPmcConfig>(ConfigTypes.PMC);

    // clear our cache when we initialize
    this.botGenerationCacheService.clearStoredBots();
  }

  generateBot(sessionID: string, request: IGenerateBotsRequestData): IBotBase {
    const pmcProfile = this.profileHelper.getPmcProfile(sessionID);
    const requestedBot = request.conditions[0];

    const isRequestedBotPMC = this.botHelper.isBotPmc(requestedBot.Role);
    const botSide = isRequestedBotPMC
      ? this.botHelper.getPmcSideByRole(requestedBot.Role)
      : "Savage";

    const botGenerationDetails: BotGenerationDetails = {
      isPmc: isRequestedBotPMC,
      side: botSide,
      role: requestedBot.Role,
      playerLevel: pmcProfile.Info.Level,
      playerName: pmcProfile.Info.Nickname,
      botRelativeLevelDeltaMax: this.pmcConfig.botRelativeLevelDeltaMax,
      botRelativeLevelDeltaMin: this.pmcConfig.botRelativeLevelDeltaMin,
      botCountToGenerate: 1,
      botDifficulty: requestedBot.Difficulty,
      isPlayerScav: false,
    };

    // TODO: potentially restore event bot handling code. cache key is also different in original implementation.
    const cacheKey = `${botGenerationDetails.role}${botGenerationDetails.botDifficulty}`;

    const bot = this.botGenerator.prepareAndGenerateBot(
      sessionID,
      botGenerationDetails,
    );

    this.botGenerationCacheService.storeBots(cacheKey, [bot]);
    this.botGenerationCacheService.storeUsedBot(bot);

    // cache bot details for post raid - unused in 3.8.3
    this.matchBotDetailsCacheService.cacheBot(bot);

    return this.botGenerationCacheService.getBot(cacheKey);

    // return bot;
  }
}
