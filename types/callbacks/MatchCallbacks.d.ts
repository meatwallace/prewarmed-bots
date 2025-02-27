import { MatchController } from "@spt-aki/controllers/MatchController";
import { IEmptyRequestData } from "@spt-aki/models/eft/common/IEmptyRequestData";
import { IGetBodyResponseData } from "@spt-aki/models/eft/httpResponse/IGetBodyResponseData";
import { INullResponseData } from "@spt-aki/models/eft/httpResponse/INullResponseData";
import { IEndOfflineRaidRequestData } from "@spt-aki/models/eft/match/IEndOfflineRaidRequestData";
import { IGetRaidConfigurationRequestData } from "@spt-aki/models/eft/match/IGetRaidConfigurationRequestData";
import { IGroupCharacter } from "@spt-aki/models/eft/match/IGroupCharacter";
import { IMatchGroupCurrentResponse } from "@spt-aki/models/eft/match/IMatchGroupCurrentResponse";
import { IMatchGroupInviteSendRequest } from "@spt-aki/models/eft/match/IMatchGroupInviteSendRequest";
import { IMatchGroupPlayerRemoveRequest } from "@spt-aki/models/eft/match/IMatchGroupPlayerRemoveRequest";
import { IMatchGroupStartGameRequest } from "@spt-aki/models/eft/match/IMatchGroupStartGameRequest";
import { IMatchGroupStatusRequest } from "@spt-aki/models/eft/match/IMatchGroupStatusRequest";
import { IMatchGroupStatusResponse } from "@spt-aki/models/eft/match/IMatchGroupStatusResponse";
import { IMatchGroupTransferRequest } from "@spt-aki/models/eft/match/IMatchGroupTransferRequest";
import { IProfileStatusResponse } from "@spt-aki/models/eft/match/IProfileStatusResponse";
import { IPutMetricsRequestData } from "@spt-aki/models/eft/match/IPutMetricsRequestData";
import { IRequestIdRequest } from "@spt-aki/models/eft/match/IRequestIdRequest";
import { IUpdatePingRequestData } from "@spt-aki/models/eft/match/IUpdatePingRequestData";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { HttpResponseUtil } from "@spt-aki/utils/HttpResponseUtil";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
export declare class MatchCallbacks {
    protected httpResponse: HttpResponseUtil;
    protected jsonUtil: JsonUtil;
    protected matchController: MatchController;
    protected databaseServer: DatabaseServer;
    constructor(httpResponse: HttpResponseUtil, jsonUtil: JsonUtil, matchController: MatchController, databaseServer: DatabaseServer);
    /** Handle client/match/updatePing */
    updatePing(url: string, info: IUpdatePingRequestData, sessionID: string): INullResponseData;
    exitMatch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/exit_from_menu */
    exitToMenu(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    groupCurrent(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<IMatchGroupCurrentResponse>;
    startGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    stopGroupSearch(url: string, info: IEmptyRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/invite/send */
    sendGroupInvite(url: string, info: IMatchGroupInviteSendRequest, sessionID: string): IGetBodyResponseData<string>;
    /** Handle client/match/group/invite/accept */
    acceptGroupInvite(url: string, info: IRequestIdRequest, sessionId: string): IGetBodyResponseData<IGroupCharacter[]>;
    /** Handle client/match/group/invite/decline */
    declineGroupInvite(url: string, info: IRequestIdRequest, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/invite/cancel */
    cancelGroupInvite(url: string, info: IRequestIdRequest, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/transfer */
    transferGroup(url: string, info: IMatchGroupTransferRequest, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/invite/cancel-all */
    cancelAllGroupInvite(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
    /** @deprecated - not called on raid start/end or game start/exit */
    putMetrics(url: string, info: IPutMetricsRequestData, sessionId: string): INullResponseData;
    serverAvailable(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle match/group/start_game */
    joinMatch(url: string, info: IMatchGroupStartGameRequest, sessionID: string): IGetBodyResponseData<IProfileStatusResponse>;
    /** Handle client/getMetricsConfig */
    getMetrics(url: string, info: any, sessionID: string): IGetBodyResponseData<string>;
    /**
     * Called periodically while in a group
     * Handle client/match/group/status
     * @returns
     */
    getGroupStatus(url: string, info: IMatchGroupStatusRequest, sessionID: string): IGetBodyResponseData<IMatchGroupStatusResponse>;
    /** Handle client/match/group/delete */
    deleteGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    leaveGroup(url: string, info: IEmptyRequestData, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/player/remove */
    removePlayerFromGroup(url: string, info: IMatchGroupPlayerRemoveRequest, sessionID: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/offline/end */
    endOfflineRaid(url: string, info: IEndOfflineRaidRequestData, sessionID: string): INullResponseData;
    /** Handle client/raid/configuration */
    getRaidConfiguration(url: string, info: IGetRaidConfigurationRequestData, sessionID: string): INullResponseData;
    /** Handle client/raid/configuration-by-profile */
    getConfigurationByProfile(url: string, info: IGetRaidConfigurationRequestData, sessionID: string): INullResponseData;
    /** Handle client/match/group/raid/ready */
    raidReady(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
    /** Handle client/match/group/raid/not-ready */
    notRaidReady(url: string, info: IEmptyRequestData, sessionId: string): IGetBodyResponseData<boolean>;
}
