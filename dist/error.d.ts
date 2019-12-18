import { Item } from "@geoplatform/client";
/**
 *
 */
export declare class GeoPlatformError extends Error {
    private _label;
    private _code;
    private _item;
    label: string;
    code: number;
    item: Item;
    constructor(message: string, label?: string, code?: number, item?: Item);
    static from(error: Error): GeoPlatformError;
}
