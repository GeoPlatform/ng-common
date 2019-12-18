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
        this.query = data.query.clone().page(this.currentPage).pageSize(12);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC1zZWxlY3QuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiZGlhbG9ncy9saXN0LXNlbGVjdC9saXN0LXNlbGVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDbEQsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDcEYsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUMvQixPQUFPLEVBQUUsWUFBWSxFQUFFLG9CQUFvQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFxQnBFO0lBY0ksMEJBQ1csU0FBeUMsRUFDaEIsSUFBMEI7UUFGOUQsaUJBYUM7UUFaVSxjQUFTLEdBQVQsU0FBUyxDQUFnQztRQUNoQixTQUFJLEdBQUosSUFBSSxDQUFzQjtRQVY5RCxZQUFZO1FBQ0osZ0JBQVcsR0FBZSxDQUFDLENBQUM7UUFDNUIsbUJBQWMsR0FBWSxDQUFDLENBQUM7UUFHNUIsWUFBTyxHQUF1QixJQUFJLE9BQU8sRUFBVSxDQUFDO1FBT3hELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDYixZQUFZLENBQUMsR0FBRyxDQUFDLEVBQ2pCLG9CQUFvQixFQUFFLENBQ3pCO2FBQ0EsU0FBUyxDQUFFLFVBQUEsSUFBSTtZQUNaLEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsb0NBQVMsR0FBVDtRQUNJLElBQUksQ0FBQyxTQUFTLENBQUMs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QUUsdUJBQXVCO1lBQ2pDLDI1R0FBK0I7O1NBRWhDLENBQUM7UUFpQk8sbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO09BaEJuQixnQkFBZ0IsQ0F3SDVCO0lBQUQsdUJBQUM7Q0FBQSxBQXhIRCxJQXdIQztTQXhIWSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIENvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgSXRlbSwgSXRlbVNlcnZpY2UsIFF1ZXJ5LCBTZWFyY2hSZXN1bHRzIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuXG5cblxuZXhwb3J0IGludGVyZmFjZSBMaXN0U2VsZWN0RGlhbG9nRGF0YSB7XG4gICAgc2VsZWN0ZWQgICAgOiBJdGVtW107ICAgICAgIC8vYXJyYXkgb2YgcHJlLXNlbGVjdGVkIHZhbHVlc1xuICAgIHNlcnZpY2UgICAgIDogSXRlbVNlcnZpY2U7ICAvL3NlcnZpY2UgdG8gcXVlcnkgZm9yIG5ldyB2YWx1ZXNcbiAgICBxdWVyeSAgICAgICA6IFF1ZXJ5OyAgICAgICAgLy9xdWVyeSBkZWZpbmluZyBob3cgdG8gc2VhcmNoIGZvciBuZXcgdmFsdWVzXG4gICAgc3ViSGVhZGluZyA/OiBzdHJpbmc7ICAgICAgIC8vb3B0aW9uYWwgZGF0YSB0byBkaXNwbGF5IHVuZGVyIHRpdGxlXG59XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLWxpc3Qtc2VsZWN0LWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnbGlzdC1zZWxlY3QuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpc3Qtc2VsZWN0Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBMaXN0U2VsZWN0RGlhbG9nIHtcblxuICAgIHB1YmxpYyAgc3VnZ2VzdGVkIDogYW55W107XG4gICAgcHVibGljICB0ZXJtUXVlcnkgOiBzdHJpbmc7XG4gICAgcHVibGljICBpc0xvYWRpbmcgOiBib29sZWFuO1xuXG4gICAgLy9wYWdpbmF0aW9uXG4gICAgcHVibGljICBjdXJyZW50UGFnZSAgICA6IG51bWJlciA9IDA7XG4gICAgcHVibGljICB0b3RhbFN1Z2dlc3RlZCA6IG51bWJlciA9IDA7XG5cbiAgICBwcml2YXRlIHF1ZXJ5ICAgICA6IFF1ZXJ5O1xuICAgIHByaXZhdGUgc3ViamVjdCAgIDogU3ViamVjdDxzdHJpbmc+ID0gbmV3IFN1YmplY3Q8c3RyaW5nPigpO1xuXG5cbiAgICBjb25zdHJ1Y3RvciAoXG4gICAgICAgIHB1YmxpYyBkaWFsb2dSZWY6IE1hdERpYWxvZ1JlZjxMaXN0U2VsZWN0RGlhbG9nPixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBMaXN0U2VsZWN0RGlhbG9nRGF0YVxuICAgICkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gZGF0YS5xdWVyeS5jbG9uZSgpLnBhZ2UodGhpcy5jdXJyZW50UGFnZSkucGFnZVNpemUoMTIpO1xuXG4gICAgICAgIHRoaXMuc3ViamVjdC5waXBlKFxuICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICAgICAgICBkaXN0aW5jdFVudGlsQ2hhbmdlZCgpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSggdGVybSA9PiB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyh0ZXJtKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25Ob0NsaWNrICgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgb25UZXJtQ2hhbmdlKCB0ZXJtIDogc3RyaW5nLCBpbW1lZGlhdGUgPzogYm9vbGVhbikge1xuICAgICAgICBpZih0cnVlID09PSBpbW1lZGlhdGUpIHsgICAgICAgIC8vaWYgbmVlZGluZyB0byB1cGRhdGUgd2l0aG91dCBkZWJvdW5jZVxuICAgICAgICAgICAgdGhpcy5maWx0ZXJWYWx1ZXModGVybSk7XG4gICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgLy9vdGhlcndpc2UsIGRlYm91bmNlIGNoYW5nZVxuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQodGVybSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWUgLSB1c2VyIGlucHV0IHRvIGZpbHRlciBvcHRpb25zIHdpdGhcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSByZXNvbHZpbmcgYXJyYXkgb2Ygc3RyaW5nIG9wdGlvbnNcbiAgICAgKi9cbiAgICBmaWx0ZXJWYWx1ZXMgKCB2YWx1ZTogc3RyaW5nICkgOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnRlcm1RdWVyeSA9IHZhbHVlO1xuXG4gICAgICAgIGlmKCF2YWx1ZSkgeyAgICAvL3JlcXVpcmUgdXNlciB0byBwcm92aWRlIGlucHV0IGJlZm9yZSBzZWFyY2hpbmdcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkID0gW107XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3VnZ2VzdGVkID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucXVlcnkucSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgICAgIHRoaXMuZGF0YS5zZXJ2aWNlLnNlYXJjaCh0aGlzLnF1ZXJ5KVxuICAgICAgICAudGhlbiggKCByZXNwb25zZSA6IFNlYXJjaFJlc3VsdHMgKSA9PiB7XG4gICAgICAgICAgICBsZXQgaGl0cyA9IHJlc3BvbnNlLnJlc3VsdHM7XG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3RlZCA9IGhpdHM7XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3VnZ2VzdGVkID0gcmVzcG9uc2UudG90YWxSZXN1bHRzO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgZXJyb3IgbWVzc2FnZSBpbmRpY2F0aW5nIGFuIGlzc3VlIHNlYXJjaGluZy4uLlxuICAgICAgICB9KS5maW5hbGx5KCAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmlzTG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRWYWx1ZSAoIGFyZyA6IEl0ZW0pIDogdm9pZCB7XG4gICAgICAgIGlmKHRoaXMuaXNTZWxlY3RlZChhcmcpKSB7ICAvL2lmIGFscmVhZHkgc2VsZWN0ZWQsIHJlbW92ZSBpdFxuICAgICAgICAgICAgdGhpcy5yZW1vdmVWYWx1ZShhcmcpOyAgLy8uLi5cbiAgICAgICAgICAgIHJldHVybjsgICAgICAgICAgICAgICAgIC8vLi4uXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkLnB1c2goIGFyZyApO1xuICAgIH1cblxuICAgIHJlbW92ZVZhbHVlICggdmFsdWU6IEl0ZW0gKSA6IHZvaWQge1xuICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkLmZvckVhY2goIChwLGkpID0+IHsgaWYocC5pZCA9PT0gdmFsdWUuaWQpIHsgaW5kZXggPSBpOyB9IH0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkICggYXJnIDogSXRlbSApIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc2VsZWN0ZWQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgISF0aGlzLmRhdGEuc2VsZWN0ZWQuZmluZCggKHMpID0+IHMuaWQgPT09IGFyZy5pZCk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gcGFnZU5vIC0gbmV3IHBhZ2UgbnVtYmVyIGJlaW5nIHJlcXVlc3RlZFxuICAgICAqL1xuICAgIG9uUGFnZUNoYW5nZSggcGFnZU5vIDogbnVtYmVyICkge1xuICAgICAgICBpZih0aGlzLmN1cnJlbnRQYWdlICE9PSBwYWdlTm8tMSApIHtcbiAgICAgICAgICAgIHRoaXMucXVlcnkucGFnZSggcGFnZU5vLTEgKTtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyVmFsdWVzKCB0aGlzLnRlcm1RdWVyeSApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U3ViSGVhZGluZyhpdGVtIDogSXRlbSkgOiBzdHJpbmcge1xuICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLmRhdGEuc3ViSGVhZGluZztcbiAgICAgICAgbGV0IHZhbHVlID0gaXRlbVtwcm9wZXJ0eV07XG4gICAgICAgIHJldHVybiB0aGlzLmdldExhYmVsRnJvbSh2YWx1ZSk7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWxGcm9tKCB2YWx1ZSA6IGFueSApIDogc3RyaW5nIHtcbiAgICAgICAgaWYodmFsdWUgPT09IG51bGwgfHwgdHlwZW9mKHZhbHVlKSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiAnJztcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIHJldHVybiAodmFsdWUgYXMgW10pLm1hcCggdiA9PiB0aGlzLmdldExhYmVsRnJvbSh2KSApLmpvaW4oJywgJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodHlwZW9mKHZhbHVlKSA9PT0gJ29iamVjdCcgJiYgKHZhbHVlLmxhYmVsIHx8IHZhbHVlLnRpdGxlIHx8IHZhbHVlLnByZWZMYWJlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZS5sYWJlbCB8fCB2YWx1ZS50aXRsZSB8fCB2YWx1ZS5wcmVmTGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn1cbiJdfQ==