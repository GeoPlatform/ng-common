import { Item } from '@geoplatform/client';
export interface SearchResultsItemAdapter<T> {
    getId(item: T): string;
    getLabel(item: T): string;
    getDescription(item: T): string;
    getAuthorName(item: T): string;
    getEditorName(item: T): string;
    getCreatedDate(item: T): string;
    getModifiedDate(item: T): string;
    getIconClass(item: T): string;
    getTypeLabel(item: T): string;
}
export declare class GeoPlatformResultsItemAdapter implements SearchResultsItemAdapter<Item> {
    constructor();
    getId(item: Item): string;
    getLabel(item: Item): string;
    getDescription(item: Item): string;
    getAuthorName(item: Item): string;
    getEditorName(item: Item): string;
    getCreatedDate(item: Item): string;
    getModifiedDate(item: Item): string;
    getIconClass(item: Item): string;
    getTypeLabel(item: Item): any;
}
