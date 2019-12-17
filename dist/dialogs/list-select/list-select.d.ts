import { MatDialogRef } from '@angular/material/dialog';
import { Item, ItemService, Query } from "@geoplatform/client";
export interface ListSelectDialogData {
    selected: Item[];
    service: ItemService;
    query: Query;
    subHeading?: string;
}
export declare class ListSelectDialog {
    dialogRef: MatDialogRef<ListSelectDialog>;
    data: ListSelectDialogData;
    suggested: any[];
    termQuery: string;
    isLoading: boolean;
    currentPage: number;
    totalSuggested: number;
    private query;
    private subject;
    constructor(dialogRef: MatDialogRef<ListSelectDialog>, data: ListSelectDialogData);
    onNoClick(): void;
    onTermChange(term: string, immediate?: boolean): void;
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    filterValues(value: string): void;
    addValue(arg: Item): void;
    removeValue(value: Item): void;
    isSelected(arg: Item): boolean;
    /**
     * @param pageNo - new page number being requested
     */
    onPageChange(pageNo: number): void;
    getSubHeading(item: Item): string;
    getLabelFrom(value: any): string;
}
