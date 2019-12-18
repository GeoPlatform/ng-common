import * as tslib_1 from "tslib";
import { Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
let ListSelectDialog = class ListSelectDialog {
    constructor(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        //pagination
        this.currentPage = 0;
        this.totalSuggested = 0;
        this.subject = new Subject();
        this.query = data.query.clone().page(this.currentPage).pageSize(12);
        this.subject.pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(term => {
            this.filterValues(term);
        });
    }
    onNoClick() {
        this.dialogRef.close();
    }
    onTermChange(term, immediate) {
        if (true === immediate) { //if needing to update without debounce
            this.filterValues(term);
        }
        else { //otherwise, debounce change
            this.subject.next(term);
        }
    }
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    filterValues(value) {
        this.termQuery = value;
        if (!value) { //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }
        this.query.q(value);
        this.isLoading = true;
        this.data.service.search(this.query)
            .then((response) => {
            let hits = response.results;
            this.suggested = hits;
            this.totalSuggested = response.totalResults;
        })
            .catch(e => {
            //display error message indicating an issue searching...
        }).finally(() => {
            this.isLoading = false;
        });
    }
    addValue(arg) {
        if (this.isSelected(arg)) { //if already selected, remove it
            this.removeValue(arg); //...
            return; //...
        }
        this.data.selected.push(arg);
    }
    removeValue(value) {
        let index = -1;
        this.data.selected.forEach((p, i) => { if (p.id === value.id) {
            index = i;
        } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    }
    isSelected(arg) {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find((s) => s.id === arg.id);
    }
    /**
     * @param pageNo - new page number being requested
     */
    onPageChange(pageNo) {
        if (this.currentPage !== pageNo - 1) {
            this.query.page(pageNo - 1);
            this.filterValues(this.termQuery);
        }
    }
    getSubHeading(item) {
        let property = this.data.subHeading;
        let value = item[property];
        return this.getLabelFrom(value);
    }
    getLabelFrom(value) {
        if (value === null || typeof (value) === 'undefined')
            return '';
        if (Array.isArray(value)) {
            return value.map(v => this.getLabelFrom(v)).join(', ');
        }
        if (typeof (value) === 'object' && (value.label || value.title || value.prefLabel)) {
            return value.label || value.title || value.prefLabel;
        }
        return '';
    }
};
ListSelectDialog.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
ListSelectDialog = tslib_1.__decorate([
    Component({
        selector: 'gp-list-select-dialog',
        template: "<h5 mat-dialog-title>Find Items to Select</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput\n            [(ngModel)]=\"termQuery\" (ngModelChange)=\"onTermChange($event)\"\n            placeholder=\"Enter keywords to find recommended values\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"onTermChange(null, true)\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"d-flex flex-justify-between flex-align-stretch\">\n\n        <div style=\"flex: 1 0 49%; margin-right: 1%;\">\n            <div class=\"a-heading\">\n                Recommendations ({{totalSuggested||0}})\n                <span *ngIf=\"isLoading\" class=\"fas fa-spinner fa-spin\"></span>\n            </div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested values to use.</em>\n                    <div *ngFor=\"let item of suggested\" class=\"list-group-item\"\n                        (click)=\"addValue(item)\" [ngClass]=\"{'active':isSelected(item)}\">\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"u-text--sm  u-mg-top--md\" *ngIf=\"totalSuggested>0\">\n                <ngb-pagination [collectionSize]=\"totalSuggested\"\n                    [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                    [rotate]=\"true\" [(page)]=\"currentPage\"\n                    (pageChange)=\"onPageChange($event)\">\n                </ngb-pagination>\n            </div>\n        </div>\n        <div style=\"flex: 1 0 50%\">\n            <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!data.selected?.length\">No values selected.</em>\n                    <div *ngFor=\"let item of data?.selected\" class=\"list-group-item\">\n                        <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(item)\"></span>&nbsp;\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel||\"Untitled Item\"}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\">Ok</button>\n</div>\n",
        styles: [":host .mat-form-field{width:100%}"]
    }),
    tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
], ListSelectDialog);
export { ListSelectDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiZGlhbG9ncy9saXN0LXNlbGVjdC9saXN0LXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxQnBFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBY3pCLFlBQ1csU0FBeUMsRUFDaEIsSUFBMEI7UUFEbkQsY0FBUyxHQUFULFNBQVMsQ0FBZ0M7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBc0I7UUFWOUQsWUFBWTtRQUNKLGdCQUFXLEdBQWUsQ0FBQyxDQUFDO1FBQzVCLG1CQUFjLEdBQVksQ0FBQyxDQUFDO1FBRzVCLFlBQU8sR0FBdUIsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQU94RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFcEUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ2IsWUFBWSxDQUFDLEdBQUcsQ0FBQyxFQUNqQixvQkFBb0IsRUFBRSxDQUN6QjthQUNBLFNBQVMsQ0FBRSxJQUFJLENBQUMsRUFBRTtZQUNmLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsU0FBUztRQUNMLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFlBQVksQ0FBRSxJQUFhLEVBQUUsU0FBb0I7UUFDN0MsSUFBRyxJQUFJLEtBQUssU0FBUyxFQUFFLEVBQVMsdUNBQXVDO1lBQ25FLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7YUFBTSxFQUF5Qiw0QkFBNEI7WUFDeEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsWUFBWSxDQUFHLEtBQWE7UUFFeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFFdkIsSUFBRyxDQUFDLEtBQUssRUFBRSxFQUFLLGdEQUFnRDtZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN4QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUVwQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNuQyxJQUFJLENBQUUsQ0FBRSxRQUF3QixFQUFHLEVBQUU7WUFDbEMsSUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztZQUM1QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxHQUFHLFFBQVEsQ0FBQyxZQUFZLENBQUM7UUFDaEQsQ0FBQyxDQUFDO2FBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1Asd0RBQXdEO1FBQzVELENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBRSxHQUFHLEVBQUU7WUFDYixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUMzQixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxRQUFRLENBQUcsR0FBVTtRQUNqQixJQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRyxnQ0FBZ0M7WUFDeEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFFLEtBQUs7WUFDN0IsT0FBTyxDQUFpQixLQUFLO1NBQ2hDO1FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFFLEdBQUcsQ0FBRSxDQUFDO0lBQ25DLENBQUM7SUFFRCxXQUFXLENBQUcsS0FBVztRQUNyQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLElBQUcsQ0FBQyxDQUFDLEVBQUUsS0FBSyxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxVQUFVLENBQUcsR0FBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFHRDs7T0FFRztJQUNILFlBQVksQ0FBRSxNQUFlO1FBQ3pCLElBQUcsSUFBSSxDQUFDLFdBQVcsS0FBSyxNQUFNLEdBQUMsQ0FBQyxFQUFHO1lBQy9CLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFFLE1BQU0sR0FBQyxDQUFDLENBQUUsQ0FBQztZQUM1QixJQUFJLENBQUMsWUFBWSxDQUFFLElBQUksQ0FBQyxTQUFTLENBQUUsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsSUFBVztRQUNyQixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNwQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0IsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFRCxZQUFZLENBQUUsS0FBVztRQUNyQixJQUFHLEtBQUssS0FBSyxJQUFJLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFdBQVc7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUM5RCxJQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBUSxLQUFZLENBQUMsR0FBRyxDQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNwRTtRQUNELElBQUcsT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDOUUsT0FBTyxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQztTQUN4RDtRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKLENBQUE7O1lBekd5QixZQUFZOzRDQUM3QixNQUFNLFNBQUMsZUFBZTs7QUFoQmxCLGdCQUFnQjtJQUw1QixTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLDI1R0FBK0I7O0tBRWhDLENBQUM7SUFpQk8sbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0dBaEJuQixnQkFBZ0IsQ0F3SDVCO1NBeEhZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJdGVtLCBJdGVtU2VydmljZSwgUXVlcnksIFNlYXJjaFJlc3VsdHMgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIExpc3RTZWxlY3REaWFsb2dEYXRhIHtcbiAgICBzZWxlY3RlZCAgICA6IEl0ZW1bXTsgICAgICAgLy9hcnJheSBvZiBwcmUtc2VsZWN0ZWQgdmFsdWVzXG4gICAgc2VydmljZSAgICAgOiBJdGVtU2VydmljZTsgIC8vc2VydmljZSB0byBxdWVyeSBmb3IgbmV3IHZhbHVlc1xuICAgIHF1ZXJ5ICAgICAgIDogUXVlcnk7ICAgICAgICAvL3F1ZXJ5IGRlZmluaW5nIGhvdyB0byBzZWFyY2ggZm9yIG5ldyB2YWx1ZXNcbiAgICBzdWJIZWFkaW5nID86IHN0cmluZzsgICAgICAgLy9vcHRpb25hbCBkYXRhIHRvIGRpc3BsYXkgdW5kZXIgdGl0bGVcbn1cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtbGlzdC1zZWxlY3QtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdsaXN0LXNlbGVjdC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGlzdC1zZWxlY3QubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpc3RTZWxlY3REaWFsb2cge1xuXG4gICAgcHVibGljICBzdWdnZXN0ZWQgOiBhbnlbXTtcbiAgICBwdWJsaWMgIHRlcm1RdWVyeSA6IHN0cmluZztcbiAgICBwdWJsaWMgIGlzTG9hZGluZyA6IGJvb2xlYW47XG5cbiAgICAvL3BhZ2luYXRpb25cbiAgICBwdWJsaWMgIGN1cnJlbnRQYWdlICAgIDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgIHRvdGFsU3VnZ2VzdGVkIDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgcXVlcnkgICAgIDogUXVlcnk7XG4gICAgcHJpdmF0ZSBzdWJqZWN0ICAgOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPExpc3RTZWxlY3REaWFsb2c+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IExpc3RTZWxlY3REaWFsb2dEYXRhXG4gICAgKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBkYXRhLnF1ZXJ5LmNsb25lKCkucGFnZSh0aGlzLmN1cnJlbnRQYWdlKS5wYWdlU2l6ZSgxMik7XG5cbiAgICAgICAgdGhpcy5zdWJqZWN0LnBpcGUoXG4gICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgICAgICAgIGRpc3RpbmN0VW50aWxDaGFuZ2VkKClcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKCB0ZXJtID0+IHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWVzKHRlcm0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk5vQ2xpY2sgKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBvblRlcm1DaGFuZ2UoIHRlcm0gOiBzdHJpbmcsIGltbWVkaWF0ZSA/OiBib29sZWFuKSB7XG4gICAgICAgIGlmKHRydWUgPT09IGltbWVkaWF0ZSkgeyAgICAgICAgLy9pZiBuZWVkaW5nIHRvIHVwZGF0ZSB3aXRob3V0IGRlYm91bmNlXG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyh0ZXJtKTtcbiAgICAgICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgICAgICAvL290aGVyd2lzZSwgZGVib3VuY2UgY2hhbmdlXG4gICAgICAgICAgICB0aGlzLnN1YmplY3QubmV4dCh0ZXJtKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHVzZXIgaW5wdXQgdG8gZmlsdGVyIG9wdGlvbnMgd2l0aFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IHJlc29sdmluZyBhcnJheSBvZiBzdHJpbmcgb3B0aW9uc1xuICAgICAqL1xuICAgIGZpbHRlclZhbHVlcyAoIHZhbHVlOiBzdHJpbmcgKSA6IHZvaWQge1xuXG4gICAgICAgIHRoaXMudGVybVF1ZXJ5ID0gdmFsdWU7XG5cbiAgICAgICAgaWYoIXZhbHVlKSB7ICAgIC8vcmVxdWlyZSB1c2VyIHRvIHByb3ZpZGUgaW5wdXQgYmVmb3JlIHNlYXJjaGluZ1xuICAgICAgICAgICAgdGhpcy5zdWdnZXN0ZWQgPSBbXTtcbiAgICAgICAgICAgIHRoaXMudG90YWxTdWdnZXN0ZWQgPSAwO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5xdWVyeS5xKHZhbHVlKTtcblxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5kYXRhLnNlcnZpY2Uuc2VhcmNoKHRoaXMucXVlcnkpXG4gICAgICAgIC50aGVuKCAoIHJlc3BvbnNlIDogU2VhcmNoUmVzdWx0cyApID0+IHtcbiAgICAgICAgICAgIGxldCBoaXRzID0gcmVzcG9uc2UucmVzdWx0cztcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkID0gaGl0cztcbiAgICAgICAgICAgIHRoaXMudG90YWxTdWdnZXN0ZWQgPSByZXNwb25zZS50b3RhbFJlc3VsdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIC8vZGlzcGxheSBlcnJvciBtZXNzYWdlIGluZGljYXRpbmcgYW4gaXNzdWUgc2VhcmNoaW5nLi4uXG4gICAgICAgIH0pLmZpbmFsbHkoICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuaXNMb2FkaW5nID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFkZFZhbHVlICggYXJnIDogSXRlbSkgOiB2b2lkIHtcbiAgICAgICAgaWYodGhpcy5pc1NlbGVjdGVkKGFyZykpIHsgIC8vaWYgYWxyZWFkeSBzZWxlY3RlZCwgcmVtb3ZlIGl0XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVZhbHVlKGFyZyk7ICAvLy4uLlxuICAgICAgICAgICAgcmV0dXJuOyAgICAgICAgICAgICAgICAgLy8uLi5cbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQucHVzaCggYXJnICk7XG4gICAgfVxuXG4gICAgcmVtb3ZlVmFsdWUgKCB2YWx1ZTogSXRlbSApIDogdm9pZCB7XG4gICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQuZm9yRWFjaCggKHAsaSkgPT4geyBpZihwLmlkID09PSB2YWx1ZS5pZCkgeyBpbmRleCA9IGk7IH0gfSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuc2VsZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQgKCBhcmcgOiBJdGVtICkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5zZWxlY3RlZC5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAhIXRoaXMuZGF0YS5zZWxlY3RlZC5maW5kKCAocykgPT4gcy5pZCA9PT0gYXJnLmlkKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlTm8gLSBuZXcgcGFnZSBudW1iZXIgYmVpbmcgcmVxdWVzdGVkXG4gICAgICovXG4gICAgb25QYWdlQ2hhbmdlKCBwYWdlTm8gOiBudW1iZXIgKSB7XG4gICAgICAgIGlmKHRoaXMuY3VycmVudFBhZ2UgIT09IHBhZ2VOby0xICkge1xuICAgICAgICAgICAgdGhpcy5xdWVyeS5wYWdlKCBwYWdlTm8tMSApO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZXMoIHRoaXMudGVybVF1ZXJ5ICk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRTdWJIZWFkaW5nKGl0ZW0gOiBJdGVtKSA6IHN0cmluZyB7XG4gICAgICAgIGxldCBwcm9wZXJ0eSA9IHRoaXMuZGF0YS5zdWJIZWFkaW5nO1xuICAgICAgICBsZXQgdmFsdWUgPSBpdGVtW3Byb3BlcnR5XTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGFiZWxGcm9tKHZhbHVlKTtcbiAgICB9XG5cbiAgICBnZXRMYWJlbEZyb20oIHZhbHVlIDogYW55ICkgOiBzdHJpbmcge1xuICAgICAgICBpZih2YWx1ZSA9PT0gbnVsbCB8fCB0eXBlb2YodmFsdWUpID09PSAndW5kZWZpbmVkJykgcmV0dXJuICcnO1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSBhcyBbXSkubWFwKCB2ID0+IHRoaXMuZ2V0TGFiZWxGcm9tKHYpICkuam9pbignLCAnKTtcbiAgICAgICAgfVxuICAgICAgICBpZih0eXBlb2YodmFsdWUpID09PSAnb2JqZWN0JyAmJiAodmFsdWUubGFiZWwgfHwgdmFsdWUudGl0bGUgfHwgdmFsdWUucHJlZkxhYmVsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLmxhYmVsIHx8IHZhbHVlLnRpdGxlIHx8IHZhbHVlLnByZWZMYWJlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxufVxuIl19