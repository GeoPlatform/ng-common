export declare class ItemHelper {
    constructor();
    /**
     * @param {any} item - either GP item or string type
     * @return {boolean}
     */
    static isAsset(item: any): boolean;
    /**
     * @param {any} item - either GP item or string type
     * @return {string} url of icon for the type
     */
    static getIcon(item: any): string;
    /**
     * @param {any} item - either GP item
     * @return {string} label for the item
     */
    static getLabel(item: any): any;
    /**
     * @param {any} item - either GP item or string type
     * @return {string} label for the item's type
     */
    static getTypeLabel(item: any): string;
    /**
     * @param {any} item - either GP item or string type
     * @return {string} key (plural) for the item's type
     */
    static getTypeKey(item: any): string;
    /**
     * @param {string} type - item type
     * @return {string} string path to the type's icon
     */
    static determineIconType(type: string): string;
    static getItemDetailsUrl(item: any): string;
}
