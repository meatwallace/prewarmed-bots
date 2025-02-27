import { IParseOptions, IStringifyOptions, Reviver } from "jsonc/lib/interfaces";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { HashUtil } from "@spt-aki/utils/HashUtil";
import { VFS } from "@spt-aki/utils/VFS";
export declare class JsonUtil {
    protected vfs: VFS;
    protected hashUtil: HashUtil;
    protected logger: ILogger;
    protected fileHashes: any;
    protected jsonCacheExists: boolean;
    protected jsonCachePath: string;
    constructor(vfs: VFS, hashUtil: HashUtil, logger: ILogger);
    /**
     * From object to string
     * @param data object to turn into JSON
     * @param prettify Should output be prettified
     * @returns string
     */
    serialize(data: any, prettify?: boolean): string;
    /**
     * From object to string
     * @param data object to turn into JSON
     * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
     * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
     * @returns string
     */
    serializeAdvanced(data: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
    /**
     * From object to string
     * @param data object to turn into JSON
     * @param filename Name of file being serialized
     * @param options Stringify options or a replacer.
     * @returns The string converted from the JavaScript value
     */
    serializeJsonC(data: any, filename?: string | null, options?: IStringifyOptions | Reviver): string;
    serializeJson5(data: any, filename?: string | null, prettify?: boolean): string;
    /**
     * From string to object
     * @param jsonString json string to turn into object
     * @param filename Name of file being deserialized
     * @returns object
     */
    deserialize<T>(jsonString: string, filename?: string): T;
    /**
     * From string to object
     * @param jsonString json string to turn into object
     * @param filename Name of file being deserialized
     * @param options Parsing options
     * @returns object
     */
    deserializeJsonC<T>(jsonString: string, filename?: string, options?: IParseOptions): T;
    deserializeJson5<T>(jsonString: string, filename?: string): T;
    deserializeWithCacheCheckAsync<T>(jsonString: string, filePath: string): Promise<T>;
    /**
     * From json string to object
     * @param jsonString String to turn into object
     * @param filePath Path to json file being processed
     * @returns Object
     */
    deserializeWithCacheCheck<T>(jsonString: string, filePath: string): T;
    /**
     * Create file if nothing found
     * @param jsonCachePath path to cache
     */
    protected ensureJsonCacheExists(jsonCachePath: string): void;
    /**
     * Read contents of json cache and add to class field
     * @param jsonCachePath Path to cache
     */
    protected hydrateJsonCache(jsonCachePath: string): void;
    /**
     * Convert into string and back into object to clone object
     * @param objectToClone Item to clone
     * @returns Cloned parameter
     * @deprecated Use ICloner implementations, such as RecursiveCloner or StructuredCloner
     */
    clone<T>(objectToClone: T): T;
}
