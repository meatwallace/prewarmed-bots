import { HealthCallbacks } from "@spt-aki/callbacks/HealthCallbacks";
import { HandledRoute, ItemEventRouterDefinition } from "@spt-aki/di/Router";
import { IPmcData } from "@spt-aki/models/eft/common/IPmcData";
import { IItemEventRouterResponse } from "@spt-aki/models/eft/itemEvent/IItemEventRouterResponse";
export declare class HealthItemEventRouter extends ItemEventRouterDefinition {
    protected healthCallbacks: HealthCallbacks;
    constructor(healthCallbacks: HealthCallbacks);
    getHandledRoutes(): HandledRoute[];
    handleItemEvent(url: string, pmcData: IPmcData, body: any, sessionID: string): Promise<IItemEventRouterResponse>;
}
