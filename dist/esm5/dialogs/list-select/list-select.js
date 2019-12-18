import * as tslib_1 from "tslib";
import { Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
var ListSelectDialog = /** @class */ (function () {
    function ListSelectDialog(dialogRef, data) {
        var _this = this;
        this.dialogRef = dialogRef;
        this.data = data;
        //pagination
        this.currentPage = 0;
        this.totalSuggested = 0;
        this.subject = new Subject();
        this.query = data.query.clone().page(this.currentPage);
        this.subject.pipe(debounceTime(300), distinctUntilChanged())
            .subscribe(function (term) {
            _this.filterValues(term);
        });
    }
    ListSelectDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    ListSelectDialog.prototype.onTermChange = function (term, immediate) {
        if (true === immediate) { //if needing to update without debounce
            this.filterValues(term);
        }
        else { //otherwise, debounce change
            this.subject.next(term);
        }
    };
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    ListSelectDialog.prototype.filterValues = function (value) {
        var _this = this;
        this.termQuery = value;
        if (!value) { //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }
        this.query.q(value);
        this.isLoading = true;
        this.data.service.search(this.query)
            .then(function (response) {
            var hits = response.results;
            _this.suggested = hits;
            _this.totalSuggested = response.totalResults;
        })
            .catch(function (e) {
            //display error message indicating an issue searching...
        }).finally(function () {
            _this.isLoading = false;
        });
    };
    ListSelectDialog.prototype.addValue = function (arg) {
        if (this.isSelected(arg)) { //if already selected, remove it
            this.removeValue(arg); //...
            return; //...
        }
        this.data.selected.push(arg);
    };
    ListSelectDialog.prototype.removeValue = function (value) {
        var index = -1;
        this.data.selected.forEach(function (p, i) { if (p.id === value.id) {
            index = i;
        } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    };
    ListSelectDialog.prototype.isSelected = function (arg) {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find(function (s) { return s.id === arg.id; });
    };
    /**
     * @param pageNo - new page number being requested
     */
    ListSelectDialog.prototype.onPageChange = function (pageNo) {
        if (this.currentPage !== pageNo - 1) {
            this.query.page(pageNo - 1);
            this.filterValues(this.termQuery);
        }
    };
    ListSelectDialog.prototype.getSubHeading = function (item) {
        var property = this.data.subHeading;
        var value = item[property];
        return this.getLabelFrom(value);
    };
    ListSelectDialog.prototype.getLabelFrom = function (value) {
        var _this = this;
        if (value === null || typeof (value) === 'undefined')
            return '';
        if (Array.isArray(value)) {
            return value.map(function (v) { return _this.getLabelFrom(v); }).join(', ');
        }
        if (typeof (value) === 'object' && (value.label || value.title || value.prefLabel)) {
            return value.label || value.title || value.prefLabel;
        }
        return '';
    };
    ListSelectDialog.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    ListSelectDialog = tslib_1.__decorate([
        Component({
            selector: 'gp-list-select-dialog',
            template: "<h5 mat-dialog-title>Find Items to Select</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput\n            [(ngModel)]=\"termQuery\" (ngModelChange)=\"onTermChange($event)\"\n            placeholder=\"Enter keywords to find recommended values\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"onTermChange(null, true)\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"d-flex flex-justify-between flex-align-stretch\">\n\n        <div style=\"flex: 1 0 49%; margin-right: 1%;\">\n            <div class=\"a-heading\">\n                Recommendations ({{totalSuggested||0}})\n                <span *ngIf=\"isLoading\" class=\"fas fa-spinner fa-spin\"></span>\n            </div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested values to use.</em>\n                    <div *ngFor=\"let item of suggested\" class=\"list-group-item\"\n                        (click)=\"addValue(item)\" [ngClass]=\"{'active':isSelected(item)}\">\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class=\"u-text--sm  u-mg-top--md\" *ngIf=\"totalSuggested>0\">\n                <ngb-pagination [collectionSize]=\"totalSuggested\"\n                    [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                    [rotate]=\"true\" [(page)]=\"currentPage\"\n                    (pageChange)=\"onPageChange($event)\">\n                </ngb-pagination>\n            </div>\n        </div>\n        <div style=\"flex: 1 0 50%\">\n            <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n            <div class=\"m-list-section\">\n                <div class=\"list-group\">\n                    <em *ngIf=\"!data.selected?.length\">No values selected.</em>\n                    <div *ngFor=\"let item of data?.selected\" class=\"list-group-item\">\n                        <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(item)\"></span>&nbsp;\n                        <a>\n                            <span gpIcon [item]=\"item\"></span>\n                            {{item.label||item.title||item.prefLabel||\"Untitled Item\"}}\n                        </a>\n                        <div *ngIf=\"data.subHeading\" class=\"u-text--sm t-fg--gray-md\">\n                            {{getSubHeading(item)}}\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\">Ok</button>\n</div>\n",
            styles: [":host .mat-form-field{width:100%}"]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
    ], ListSelectDialog);
    return ListSelectDialog;
}());
export { ListSelectDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiZGlhbG9ncy9saXN0LXNlbGVjdC9saXN0LXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxQnBFO0lBY0ksMEJBQ1csU0FBeUMsRUFDaEIsSUFBMEI7UUFGOUQsaUJBYUM7UUFaVSxjQUFTLEdBQVQsU0FBUyxDQUFnQztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFzQjtRQVY5RCxZQUFZO1FBQ0osZ0JBQVcsR0FBZSxDQUFDLENBQUM7UUFDNUIsbUJBQWMsR0FBWSxDQUFDLENBQUM7UUFHNUIsWUFBTyxHQUF1QixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBT3hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNiLFlBQVksQ0FBQyxHQUFHLENBQUMsRUFDakIsb0JBQW9CLEVBQUUsQ0FDekI7YUFDQSxTQUFTLENBQUUsVUFBQSxJQUFJO1lBQ1osS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvQ0FBUyxHQUFUO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFD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U0FFaEMsQ0FBQztRQWlCTyxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7T0FoQm5CLGdCQUFnQixDQXdINUI7SUFBRCx1QkFBQztDQUFBLEFBeEhELElBd0hDO1NBeEhZLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBJdGVtLCBJdGVtU2VydmljZSwgUXVlcnksIFNlYXJjaFJlc3VsdHMgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIExpc3RTZWxlY3REaWFsb2dEYXRhIHtcbiAgICBzZWxlY3RlZCAgICA6IEl0ZW1bXTsgICAgICAgLy9hcnJheSBvZiBwcmUtc2VsZWN0ZWQgdmFsdWVzXG4gICAgc2VydmljZSAgICAgOiBJdGVtU2VydmljZTsgIC8vc2VydmljZSB0byBxdWVyeSBmb3IgbmV3IHZhbHVlc1xuICAgIHF1ZXJ5ICAgICAgIDogUXVlcnk7ICAgICAgICAvL3F1ZXJ5IGRlZmluaW5nIGhvdyB0byBzZWFyY2ggZm9yIG5ldyB2YWx1ZXNcbiAgICBzdWJIZWFkaW5nID86IHN0cmluZzsgICAgICAgLy9vcHRpb25hbCBkYXRhIHRvIGRpc3BsYXkgdW5kZXIgdGl0bGVcbn1cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtbGlzdC1zZWxlY3QtZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdsaXN0LXNlbGVjdC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGlzdC1zZWxlY3QubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIExpc3RTZWxlY3REaWFsb2cge1xuXG4gICAgcHVibGljICBzdWdnZXN0ZWQgOiBhbnlbXTtcbiAgICBwdWJsaWMgIHRlcm1RdWVyeSA6IHN0cmluZztcbiAgICBwdWJsaWMgIGlzTG9hZGluZyA6IGJvb2xlYW47XG5cbiAgICAvL3BhZ2luYXRpb25cbiAgICBwdWJsaWMgIGN1cnJlbnRQYWdlICAgIDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgIHRvdGFsU3VnZ2VzdGVkIDogbnVtYmVyID0gMDtcblxuICAgIHByaXZhdGUgcXVlcnkgICAgIDogUXVlcnk7XG4gICAgcHJpdmF0ZSBzdWJqZWN0ICAgOiBTdWJqZWN0PHN0cmluZz4gPSBuZXcgU3ViamVjdDxzdHJpbmc+KCk7XG5cblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPExpc3RTZWxlY3REaWFsb2c+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IExpc3RTZWxlY3REaWFsb2dEYXRhXG4gICAgKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBkYXRhLnF1ZXJ5LmNsb25lKCkucGFnZSh0aGlzLmN1cnJlbnRQYWdlKTtcblxuICAgICAgICB0aGlzLnN1YmplY3QucGlwZShcbiAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoIHRlcm0gPT4ge1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZXModGVybSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTm9DbGljayAoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgIH1cblxuICAgIG9uVGVybUNoYW5nZSggdGVybSA6IHN0cmluZywgaW1tZWRpYXRlID86IGJvb2xlYW4pIHtcbiAgICAgICAgaWYodHJ1ZSA9PT0gaW1tZWRpYXRlKSB7ICAgICAgICAvL2lmIG5lZWRpbmcgdG8gdXBkYXRlIHdpdGhvdXQgZGVib3VuY2VcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWVzKHRlcm0pO1xuICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgIC8vb3RoZXJ3aXNlLCBkZWJvdW5jZSBjaGFuZ2VcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KHRlcm0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlIC0gdXNlciBpbnB1dCB0byBmaWx0ZXIgb3B0aW9ucyB3aXRoXG4gICAgICogQHJldHVybiB7UHJvbWlzZX0gcmVzb2x2aW5nIGFycmF5IG9mIHN0cmluZyBvcHRpb25zXG4gICAgICovXG4gICAgZmlsdGVyVmFsdWVzICggdmFsdWU6IHN0cmluZyApIDogdm9pZCB7XG5cbiAgICAgICAgdGhpcy50ZXJtUXVlcnkgPSB2YWx1ZTtcblxuICAgICAgICBpZighdmFsdWUpIHsgICAgLy9yZXF1aXJlIHVzZXIgdG8gcHJvdmlkZSBpbnB1dCBiZWZvcmUgc2VhcmNoaW5nXG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3RlZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy50b3RhbFN1Z2dlc3RlZCA9IDA7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnF1ZXJ5LnEodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLmRhdGEuc2VydmljZS5zZWFyY2godGhpcy5xdWVyeSlcbiAgICAgICAgLnRoZW4oICggcmVzcG9uc2UgOiBTZWFyY2hSZXN1bHRzICkgPT4ge1xuICAgICAgICAgICAgbGV0IGhpdHMgPSByZXNwb25zZS5yZXN1bHRzO1xuICAgICAgICAgICAgdGhpcy5zdWdnZXN0ZWQgPSBoaXRzO1xuICAgICAgICAgICAgdGhpcy50b3RhbFN1Z2dlc3RlZCA9IHJlc3BvbnNlLnRvdGFsUmVzdWx0cztcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgLy9kaXNwbGF5IGVycm9yIG1lc3NhZ2UgaW5kaWNhdGluZyBhbiBpc3N1ZSBzZWFyY2hpbmcuLi5cbiAgICAgICAgfSkuZmluYWxseSggKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYWRkVmFsdWUgKCBhcmcgOiBJdGVtKSA6IHZvaWQge1xuICAgICAgICBpZih0aGlzLmlzU2VsZWN0ZWQoYXJnKSkgeyAgLy9pZiBhbHJlYWR5IHNlbGVjdGVkLCByZW1vdmUgaXRcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVmFsdWUoYXJnKTsgIC8vLi4uXG4gICAgICAgICAgICByZXR1cm47ICAgICAgICAgICAgICAgICAvLy4uLlxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZC5wdXNoKCBhcmcgKTtcbiAgICB9XG5cbiAgICByZW1vdmVWYWx1ZSAoIHZhbHVlOiBJdGVtICkgOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZC5mb3JFYWNoKCAocCxpKSA9PiB7IGlmKHAuaWQgPT09IHZhbHVlLmlkKSB7IGluZGV4ID0gaTsgfSB9KTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZCAoIGFyZyA6IEl0ZW0gKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLnNlbGVjdGVkLmxlbmd0aCA+IDAgJiZcbiAgICAgICAgICAgICEhdGhpcy5kYXRhLnNlbGVjdGVkLmZpbmQoIChzKSA9PiBzLmlkID09PSBhcmcuaWQpO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHBhZ2VObyAtIG5ldyBwYWdlIG51bWJlciBiZWluZyByZXF1ZXN0ZWRcbiAgICAgKi9cbiAgICBvblBhZ2VDaGFuZ2UoIHBhZ2VObyA6IG51bWJlciApIHtcbiAgICAgICAgaWYodGhpcy5jdXJyZW50UGFnZSAhPT0gcGFnZU5vLTEgKSB7XG4gICAgICAgICAgICB0aGlzLnF1ZXJ5LnBhZ2UoIHBhZ2VOby0xICk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyggdGhpcy50ZXJtUXVlcnkgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFN1YkhlYWRpbmcoaXRlbSA6IEl0ZW0pIDogc3RyaW5nIHtcbiAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5kYXRhLnN1YkhlYWRpbmc7XG4gICAgICAgIGxldCB2YWx1ZSA9IGl0ZW1bcHJvcGVydHldO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRMYWJlbEZyb20odmFsdWUpO1xuICAgIH1cblxuICAgIGdldExhYmVsRnJvbSggdmFsdWUgOiBhbnkgKSA6IHN0cmluZyB7XG4gICAgICAgIGlmKHZhbHVlID09PSBudWxsIHx8IHR5cGVvZih2YWx1ZSkgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gJyc7XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgICAgICByZXR1cm4gKHZhbHVlIGFzIFtdKS5tYXAoIHYgPT4gdGhpcy5nZXRMYWJlbEZyb20odikgKS5qb2luKCcsICcpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHR5cGVvZih2YWx1ZSkgPT09ICdvYmplY3QnICYmICh2YWx1ZS5sYWJlbCB8fCB2YWx1ZS50aXRsZSB8fCB2YWx1ZS5wcmVmTGFiZWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUubGFiZWwgfHwgdmFsdWUudGl0bGUgfHwgdmFsdWUucHJlZkxhYmVsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG59XG4iXX0=