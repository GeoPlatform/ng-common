import * as tslib_1 from "tslib";
import { Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KGQuery } from "@geoplatform/client";
let SemanticFilterDialog = class SemanticFilterDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        //pagination
        this.currentPage = 0;
        this.totalSuggested = 0;
        this.kgQuery = new KGQuery().page(this.currentPage).pageSize(12);
    }
    onNoClick() {
        this.dialogRef.close();
    }
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    filterValues(value) {
        if (!value) { //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }
        this.kgQuery.q(value);
        this.data.service.suggest(this.kgQuery)
            .then((response) => {
            let hits = response.results;
            // if(current && current.length) {
            //     hits = hits.filter(o => { return current.indexOf(o.uri)<0; });
            // }
            this.suggested = hits;
            this.totalSuggested = response.totalResults;
        })
            .catch(e => {
            //display error message indicating an issue searching...
        });
    }
    addValue(arg) {
        this.data.selected.push(arg);
    }
    removeValue(value) {
        let index = -1;
        this.data.selected.forEach((p, i) => { if (p.uri === value.uri) {
            index = i;
        } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    }
    isSelected(arg) {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find((s) => s.uri === arg.uri);
    }
    /**
     * @param pageNo - new page number being requested
     */
    onPageChange(pageNo) {
        if (this.currentPage !== pageNo - 1) {
            this.kgQuery.page(pageNo - 1);
            this.filterValues(this.termQuery);
        }
    }
};
SemanticFilterDialog.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
SemanticFilterDialog = tslib_1.__decorate([
    Component({
        selector: 'gp-semantic-filter-dialog',
        template: "<h5 mat-dialog-title>Search for Concepts to Constraining Search Results</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput [(ngModel)]=\"termQuery\" (ngModelChange)=\"filterValues($event)\"\n            placeholder=\"Enter keywords to find recommended concepts\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"termQuery=null\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"a-heading d-flex flex-justify-between flex-align-center u-mg-bottom--md\">\n        Recommendations ({{totalSuggested||0}})\n        <div class=\"u-text--sm\" *ngIf=\"totalSuggested>0\">\n            <ngb-pagination [collectionSize]=\"totalSuggested\"\n                [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                [rotate]=\"true\" [(page)]=\"currentPage\"\n                (pageChange)=\"onPageChange($event)\">\n            </ngb-pagination>\n        </div>\n    </div>\n\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested concepts to use.</em>\n            <div *ngFor=\"let concept of suggested\" class=\"list-group-item\"\n                (click)=\"addValue(concept)\" [ngClass]=\"{'active':isSelected(concept)}\">\n                <div><a class=\"is-linkless\">{{concept.prefLabel||concept.label}}</a></div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n    <hr>\n    <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!data.selected?.length\">No concepts selected.</em>\n            <div *ngFor=\"let concept of data?.selected\" class=\"list-group-item\">\n                <div>\n                    <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(concept)\"></span>\n                    {{concept.prefLabel||concept.label}}\n                </div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\" cdkFocusInitial>Ok</button>\n</div>\n",
        styles: [":host .mat-form-field{width:100%}"]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], SemanticFilterDialog);
export { SemanticFilterDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtYW50aWMuZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3NlbWFudGljL3NlbWFudGljLmRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILE1BQU0sRUFBRSxTQUFTLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFDM0MsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQ2MsT0FBTyxFQUMzQixNQUFNLHFCQUFxQixDQUFDO0FBZ0I3QixJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFvQjtJQVU3QixZQUNXLFNBQTZDLEVBQ3BCLElBQXdCO1FBRGpELGNBQVMsR0FBVCxTQUFTLENBQW9DO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQW9CO1FBTjVELFlBQVk7UUFDSixnQkFBVyxHQUFlLENBQUMsQ0FBQztRQUM1QixtQkFBYyxHQUFZLENBQUMsQ0FBQztRQU1oQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELFNBQVM7UUFDTCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFHRDs7O09BR0c7SUFDSCxZQUFZLENBQUcsS0FBYTtRQUV4QixJQUFHLENBQUMsS0FBSyxFQUFFLEVBQUssZ0RBQWdEO1lBQzVELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDO1lBQ3hCLE9BQU87U0FDVjtRQUVELElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2FBQ3RDLElBQUksQ0FBRSxDQUFFLFFBQXdCLEVBQUcsRUFBRTtZQUNsQyxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQzVCLGtDQUFrQztZQUNsQyxxRUFBcUU7WUFDckUsSUFBSTtZQUNKLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUNoRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDUCx3REFBd0Q7UUFDNUQsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUSxDQUFHLEdBQVU7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXLENBQUcsS0FBVztRQUNyQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUcsR0FBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFHRDs7T0FFRztJQUNILFlBQVksQ0FBRSxNQUFlO1FBQ3pCLElBQUcsSUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLEdBQUMsQ0FBQyxFQUFHO1lBQy9CLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLE1BQU0sR0FBQyxDQUFDLENBQUUsQ0FBQztZQUM5QixJQUFJLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQztTQUN2QztJQUNMLENBQUM7Q0FDSixDQUFBOztZQWxFeUIsWUFBWTs0Q0FDN0IsTUFBTSxTQUFDLGVBQWU7O0FBWmxCLG9CQUFvQjtJQUxoQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsMkJBQTJCO1FBQ3JDLHNuRkFBbUM7O0tBRXBDLENBQUM7SUFhTyxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7R0FabkIsb0JBQW9CLENBNkVoQztTQTdFWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIEluamVjdCwgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQge1xuICAgIEl0ZW0sIEtHU2VydmljZSwgS0dRdWVyeSwgU2VhcmNoUmVzdWx0c1xufSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIFNlbWFudGljRGlhbG9nRGF0YSB7XG4gICAgc2VsZWN0ZWQgOiBJdGVtW107XG4gICAgc2VydmljZSAgOiBLR1NlcnZpY2U7XG59XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2VtYW50aWMtZmlsdGVyLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnc2VtYW50aWMuZGlhbG9nLmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zZW1hbnRpYy5kaWFsb2cubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlbWFudGljRmlsdGVyRGlhbG9nIHtcblxuICAgIHB1YmxpYyAgc3VnZ2VzdGVkIDogYW55W107XG4gICAgcHVibGljICB0ZXJtUXVlcnkgOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBrZ1F1ZXJ5ICAgOiBLR1F1ZXJ5O1xuXG4gICAgLy9wYWdpbmF0aW9uXG4gICAgcHVibGljICBjdXJyZW50UGFnZSAgICA6IG51bWJlciA9IDA7XG4gICAgcHVibGljICB0b3RhbFN1Z2dlc3RlZCA6IG51bWJlciA9IDA7XG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxTZW1hbnRpY0ZpbHRlckRpYWxvZz4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogU2VtYW50aWNEaWFsb2dEYXRhXG4gICAgKSB7XG4gICAgICAgIHRoaXMua2dRdWVyeSA9IG5ldyBLR1F1ZXJ5KCkucGFnZSh0aGlzLmN1cnJlbnRQYWdlKS5wYWdlU2l6ZSgxMik7XG4gICAgfVxuXG4gICAgb25Ob0NsaWNrICgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB1c2VyIGlucHV0IHRvIGZpbHRlciBvcHRpb25zIHdpdGhcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSByZXNvbHZpbmcgYXJyYXkgb2Ygc3RyaW5nIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmaWx0ZXJWYWx1ZXMgKCB2YWx1ZTogc3RyaW5nICkgOiB2b2lkIHtcblxuICAgICAgICBpZighdmFsdWUpIHsgICAgLy9yZXF1aXJlIHVzZXIgdG8gcHJvdmlkZSBpbnB1dCBiZWZvcmUgc2VhcmNoaW5nXG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3RlZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy50b3RhbFN1Z2dlc3RlZCA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmtnUXVlcnkucSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5kYXRhLnNlcnZpY2Uuc3VnZ2VzdCh0aGlzLmtnUXVlcnkpXG4gICAgICAgIC50aGVuKCAoIHJlc3BvbnNlIDogU2VhcmNoUmVzdWx0cyApID0+IHtcbiAgICAgICAgICAgIGxldCBoaXRzID0gcmVzcG9uc2UucmVzdWx0cztcbiAgICAgICAgICAgIC8vIGlmKGN1cnJlbnQgJiYgY3VycmVudC5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vICAgICBoaXRzID0gaGl0cy5maWx0ZXIobyA9PiB7IHJldHVybiBjdXJyZW50LmluZGV4T2Yoby51cmkpPDA7IH0pO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgdGhpcy5zdWdnZXN0ZWQgPSBoaXRzO1xuICAgICAgICAgICAgdGhpcy50b3RhbFN1Z2dlc3RlZCA9IHJlc3BvbnNlLnRvdGFsUmVzdWx0cztcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgLy9kaXNwbGF5IGVycm9yIG1lc3NhZ2UgaW5kaWNhdGluZyBhbiBpc3N1ZSBzZWFyY2hpbmcuLi5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVmFsdWUgKCBhcmcgOiBJdGVtKSA6IHZvaWQge1xuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQucHVzaCggYXJnICk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVmFsdWUgKCB2YWx1ZTogSXRlbSApIDogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQuZm9yRWFjaCggKHAsaSkgPT4geyBpZihwLnVyaSA9PT0gdmFsdWUudXJpKSB7IGluZGV4ID0gaTsgfSB9KTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZCAoIGFyZyA6IEl0ZW0gKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNlbGVjdGVkLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICEhdGhpcy5kYXRhLnNlbGVjdGVkLmZpbmQoIChzKSA9PiBzLnVyaSA9PT0gYXJnLnVyaSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZU5vIC0gbmV3IHBhZ2UgbnVtYmVyIGJlaW5nIHJlcXVlc3RlZFxuICAgICAqL1xuICAgIG9uUGFnZUNoYW5nZSggcGFnZU5vIDogbnVtYmVyICkge1xuICAgICAgICBpZih0aGlzLmN1cnJlbnRQYWdlICE9PSBwYWdlTm8tMSApIHtcbiAgICAgICAgICAgIHRoaXMua2dRdWVyeS5wYWdlKCBwYWdlTm8tMSApO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZXMoIHRoaXMudGVybVF1ZXJ5ICk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=