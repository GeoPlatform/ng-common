import { MatDialogRef } from '@angular/material/dialog';
import { Item, KGService } from "@geoplatform/client";
export interface SemanticDialogData {
    selected: Item[];
    service: KGService;
}
export declare class SemanticFilterDialog {
    dialogRef: MatDialogRef<SemanticFilterDialog>;
    data: SemanticDialogData;
    suggested: any[];
    termQuery: string;
    private kgQuery;
    currentPage: number;
    totalSuggested: number;
    constructor(dialogRef: MatDialogRef<SemanticFilterDialog>, data: SemanticDialogData);
    onNoClick(): void;
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
}
