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
        this.query = data.query.clone().page(this.currentPage);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiZGlhbG9ncy9saXN0LXNlbGVjdC9saXN0LXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxQnBFLElBQWEsZ0JBQWdCLEdBQTdCLE1BQWEsZ0JBQWdCO0lBY3pCLFlBQ1csU0FBeUMsRUFDaEIsSUFBMEI7UUFEbkQsY0FBUyxHQUFULFNBQVMsQ0FBZ0M7UUFDaEIsU0FBSSxHQUFKLElBQUksQ0FBc0I7UUFWOUQsWUFBWTtRQUNKLGdCQUFXLEdBQWUsQ0FBQyxDQUFDO1FBQzVCLG1CQUFjLEdBQVksQ0FBQyxDQUFDO1FBRzVCLFlBQU8sR0FBdUIsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQU94RCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUV2RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDYixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLG9CQUFvQixFQUFFLENBQ3pCO2FBQ0EsU0FBUyxDQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxTQUFTO1FBQ0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVB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LENBQUMsZUFBZSxDQUFDLENBQUE7R0FoQm5CLGdCQUFnQixDQXdINUI7U0F4SFksZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE1hdERpYWxvZywgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEEgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZGVib3VuY2VUaW1lLCBkaXN0aW5jdFVudGlsQ2hhbmdlZCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEl0ZW0sIEl0ZW1TZXJ2aWNlLCBRdWVyeSwgU2VhcmNoUmVzdWx0cyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTGlzdFNlbGVjdERpYWxvZ0RhdGEge1xuICAgIHNlbGVjdGVkICAgIDogSXRlbVtdOyAgICAgICAvL2FycmF5IG9mIHByZS1zZWxlY3RlZCB2YWx1ZXNcbiAgICBzZXJ2aWNlICAgICA6IEl0ZW1TZXJ2aWNlOyAgLy9zZXJ2aWNlIHRvIHF1ZXJ5IGZvciBuZXcgdmFsdWVzXG4gICAgcXVlcnkgICAgICAgOiBRdWVyeTsgICAgICAgIC8vcXVlcnkgZGVmaW5pbmcgaG93IHRvIHNlYXJjaCBmb3IgbmV3IHZhbHVlc1xuICAgIHN1YkhlYWRpbmcgPzogc3RyaW5nOyAgICAgICAvL29wdGlvbmFsIGRhdGEgdG8gZGlzcGxheSB1bmRlciB0aXRsZVxufVxuXG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1saXN0LXNlbGVjdC1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ2xpc3Qtc2VsZWN0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9saXN0LXNlbGVjdC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgTGlzdFNlbGVjdERpYWxvZyB7XG5cbiAgICBwdWJsaWMgIHN1Z2dlc3RlZCA6IGFueVtdO1xuICAgIHB1YmxpYyAgdGVybVF1ZXJ5IDogc3RyaW5nO1xuICAgIHB1YmxpYyAgaXNMb2FkaW5nIDogYm9vbGVhbjtcblxuICAgIC8vcGFnaW5hdGlvblxuICAgIHB1YmxpYyAgY3VycmVudFBhZ2UgICAgOiBudW1iZXIgPSAwO1xuICAgIHB1YmxpYyAgdG90YWxTdWdnZXN0ZWQgOiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBxdWVyeSAgICAgOiBRdWVyeTtcbiAgICBwcml2YXRlIHN1YmplY3QgICA6IFN1YmplY3Q8c3RyaW5nPiA9IG5ldyBTdWJqZWN0PHN0cmluZz4oKTtcblxuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8TGlzdFNlbGVjdERpYWxvZz4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogTGlzdFNlbGVjdERpYWxvZ0RhdGFcbiAgICApIHtcbiAgICAgICAgdGhpcy5xdWVyeSA9IGRhdGEucXVlcnkuY2xvbmUoKS5wYWdlKHRoaXMuY3VycmVudFBhZ2UpO1xuXG4gICAgICAgIHRoaXMuc3ViamVjdC5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSggdGVybSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyh0ZXJtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ob0NsaWNrICgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgb25UZXJtQ2hhbmdlKCB0ZXJtIDogc3RyaW5nLCBpbW1lZGlhdGUgPzogYm9vbGVhbikge1xuICAgICAgICBpZih0cnVlID09PSBpbW1lZGlhdGUpIHsgICAgICAgIC8vaWYgbmVlZGluZyB0byB1cGRhdGUgd2l0aG91dCBkZWJvdW5jZVxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZXModGVybSk7XG4gICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgLy9vdGhlcndpc2UsIGRlYm91bmNlIGNoYW5nZVxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQodGVybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB1c2VyIGlucHV0IHRvIGZpbHRlciBvcHRpb25zIHdpdGhcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSByZXNvbHZpbmcgYXJyYXkgb2Ygc3RyaW5nIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmaWx0ZXJWYWx1ZXMgKCB2YWx1ZTogc3RyaW5nICkgOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnRlcm1RdWVyeSA9IHZhbHVlO1xuXG4gICAgICAgIGlmKCF2YWx1ZSkgeyAgICAvL3JlcXVpcmUgdXNlciB0byBwcm92aWRlIGlucHV0IGJlZm9yZSBzZWFyY2hpbmdcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkID0gW107XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3VnZ2VzdGVkID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVlcnkucSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZGF0YS5zZXJ2aWNlLnNlYXJjaCh0aGlzLnF1ZXJ5KVxuICAgICAgICAudGhlbiggKCByZXNwb25zZSA6IFNlYXJjaFJlc3VsdHMgKSA9PiB7XG4gICAgICAgICAgICBsZXQgaGl0cyA9IHJlc3BvbnNlLnJlc3VsdHM7XG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3RlZCA9IGhpdHM7XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3VnZ2VzdGVkID0gcmVzcG9uc2UudG90YWxSZXN1bHRzO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgZXJyb3IgbWVzc2FnZSBpbmRpY2F0aW5nIGFuIGlzc3VlIHNlYXJjaGluZy4uLlxuICAgICAgICB9KS5maW5hbGx5KCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRWYWx1ZSAoIGFyZyA6IEl0ZW0pIDogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuaXNTZWxlY3RlZChhcmcpKSB7ICAvL2lmIGFscmVhZHkgc2VsZWN0ZWQsIHJlbW92ZSBpdFxuICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZShhcmcpOyAgLy8uLi5cbiAgICAgICAgICAgIHJldHVybjsgICAgICAgICAgICAgICAgIC8vLi4uXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkLnB1c2goIGFyZyApO1xuICAgIH1cblxuICAgIHJlbW92ZVZhbHVlICggdmFsdWU6IEl0ZW0gKSA6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkLmZvckVhY2goIChwLGkpID0+IHsgaWYocC5pZCA9PT0gdmFsdWUuaWQpIHsgaW5kZXggPSBpOyB9IH0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkICggYXJnIDogSXRlbSApIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc2VsZWN0ZWQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgISF0aGlzLmRhdGEuc2VsZWN0ZWQuZmluZCggKHMpID0+IHMuaWQgPT09IGFyZy5pZCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZU5vIC0gbmV3IHBhZ2UgbnVtYmVyIGJlaW5nIHJlcXVlc3RlZFxuICAgICAqL1xuICAgIG9uUGFnZUNoYW5nZSggcGFnZU5vIDogbnVtYmVyICkge1xuICAgICAgICBpZih0aGlzLmN1cnJlbnRQYWdlICE9PSBwYWdlTm8tMSApIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnkucGFnZSggcGFnZU5vLTEgKTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWVzKCB0aGlzLnRlcm1RdWVyeSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3ViSGVhZGluZyhpdGVtIDogSXRlbSkgOiBzdHJpbmcge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmRhdGEuc3ViSGVhZGluZztcbiAgICAgICAgbGV0IHZhbHVlID0gaXRlbVtwcm9wZXJ0eV07XG4gICAgICAgIHJldHVybiB0aGlzLmdldExhYmVsRnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWxGcm9tKCB2YWx1ZSA6IGFueSApIDogc3RyaW5nIHtcbiAgICAgICAgaWYodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgYXMgW10pLm1hcCggdiA9PiB0aGlzLmdldExhYmVsRnJvbSh2KSApLmpvaW4oJywgJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCcgJiYgKHZhbHVlLmxhYmVsIHx8IHZhbHVlLnRpdGxlIHx8IHZhbHVlLnByZWZMYWJlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sYWJlbCB8fCB2YWx1ZS50aXRsZSB8fCB2YWx1ZS5wcmVmTGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn1cbiJdfQ==