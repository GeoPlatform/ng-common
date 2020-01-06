import * as tslib_1 from "tslib";
import { Inject, Component } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KGQuery } from "@geoplatform/client";
var SemanticFilterDialog = /** @class */ (function () {
    function SemanticFilterDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        //pagination
        this.currentPage = 0;
        this.totalSuggested = 0;
        this.kgQuery = new KGQuery().page(this.currentPage).pageSize(12);
    }
    SemanticFilterDialog.prototype.onNoClick = function () {
        this.dialogRef.close();
    };
    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    SemanticFilterDialog.prototype.filterValues = function (value) {
        var _this = this;
        if (!value) { //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }
        this.kgQuery.q(value);
        this.data.service.suggest(this.kgQuery)
            .then(function (response) {
            var hits = response.results;
            // if(current && current.length) {
            //     hits = hits.filter(o => { return current.indexOf(o.uri)<0; });
            // }
            _this.suggested = hits;
            _this.totalSuggested = response.totalResults;
        })
            .catch(function (e) {
            //display error message indicating an issue searching...
        });
    };
    SemanticFilterDialog.prototype.addValue = function (arg) {
        this.data.selected.push(arg);
    };
    SemanticFilterDialog.prototype.removeValue = function (value) {
        var index = -1;
        this.data.selected.forEach(function (p, i) { if (p.uri === value.uri) {
            index = i;
        } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    };
    SemanticFilterDialog.prototype.isSelected = function (arg) {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find(function (s) { return s.uri === arg.uri; });
    };
    /**
     * @param pageNo - new page number being requested
     */
    SemanticFilterDialog.prototype.onPageChange = function (pageNo) {
        if (this.currentPage !== pageNo - 1) {
            this.kgQuery.page(pageNo - 1);
            this.filterValues(this.termQuery);
        }
    };
    SemanticFilterDialog.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    SemanticFilterDialog = tslib_1.__decorate([
        Component({
            selector: 'gp-semantic-filter-dialog',
            template: "<h5 mat-dialog-title>Search for Concepts to Constraining Search Results</h5>\n<div mat-dialog-content>\n    <mat-form-field appearance=\"outline\">\n        <mat-label>\n            <mat-icon><span class=\"fas fa-search\"></span></mat-icon>\n            Search\n        </mat-label>\n        <input matInput [(ngModel)]=\"termQuery\" (ngModelChange)=\"filterValues($event)\"\n            placeholder=\"Enter keywords to find recommended concepts\">\n        <span matSuffix *ngIf=\"termQuery?.length\" (click)=\"termQuery=null\"\n            class=\"fas fa-times t-fg--gray-md\">\n        </span>\n    </mat-form-field>\n\n    <div class=\"a-heading d-flex flex-justify-between flex-align-center u-mg-bottom--md\">\n        Recommendations ({{totalSuggested||0}})\n        <div class=\"u-text--sm\" *ngIf=\"totalSuggested>0\">\n            <ngb-pagination [collectionSize]=\"totalSuggested\"\n                [pageSize]=\"12\" [maxSize]=\"2\" [size]=\"'sm'\"\n                [rotate]=\"true\" [(page)]=\"currentPage\"\n                (pageChange)=\"onPageChange($event)\">\n            </ngb-pagination>\n        </div>\n    </div>\n\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!suggested?.length\">Enter keywords above to receive suggested concepts to use.</em>\n            <div *ngFor=\"let concept of suggested\" class=\"list-group-item\"\n                (click)=\"addValue(concept)\" [ngClass]=\"{'active':isSelected(concept)}\">\n                <div><a class=\"is-linkless\">{{concept.prefLabel||concept.label}}</a></div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n    <hr>\n    <div class=\"a-heading\">Selected ({{data?.selected?.length||0}})</div>\n    <div class=\"m-list-section\">\n        <div class=\"list-group\">\n            <em *ngIf=\"!data.selected?.length\">No concepts selected.</em>\n            <div *ngFor=\"let concept of data?.selected\" class=\"list-group-item\">\n                <div>\n                    <span class=\"fas fa-times t-fg--danger\" (click)=\"removeValue(concept)\"></span>\n                    {{concept.prefLabel||concept.label}}\n                </div>\n                <small class=\"t-fg--gray-md\">{{concept.uri}}</small>\n            </div>\n        </div>\n    </div>\n\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"onNoClick()\">Cancel</button>\n    <button type=\"button\" mat-flat-button color=\"primary\" [mat-dialog-close]=\"data.selected\" cdkFocusInitial>Ok</button>\n</div>\n",
            styles: [":host .mat-form-field{width:100%}"]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
    ], SemanticFilterDialog);
    return SemanticFilterDialog;
}());
export { SemanticFilterDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtYW50aWMuZGlhbG9nLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3NlbWFudGljL3NlbWFudGljLmRpYWxvZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILE1BQU0sRUFBRSxTQUFTLEVBQ3BCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFDSCxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFDM0MsTUFBTSwwQkFBMEIsQ0FBQztBQUNsQyxPQUFPLEVBQ2MsT0FBTyxFQUMzQixNQUFNLHFCQUFxQixDQUFDO0FBZ0I3QjtJQVVJLDhCQUNXLFNBQTZDLEVBQ3BCLElBQXdCO1FBRGpELGNBQVMsR0FBVCxTQUFTLENBQW9DO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQW9CO1FBTjVELFlBQVk7UUFDSixnQkFBVyxHQUFlLENBQUMsQ0FBQztRQUM1QixtQkFBYyxHQUFZLENBQUMsQ0FBQztRQU1oQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHdDQUFTLEdBQVQ7UUFDSSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFHRDs7O09BR0c7SUFDSCwyQ0FBWSxHQUFaLFVBQWUsS0FBYTtRQUE1QixpQkFzQkM7UUFwQkcsSUFBRyxDQUFDLEtBQUssRUFBRSxFQUFLLGdEQUFnRDtZQUM1RCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsY0FBYyxHQUFHLENBQUMsQ0FBQztZQUN4QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUN0QyxJQUFJLENBQUUsVUFBRSxRQUF3QjtZQUM3QixJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1lBQzVCLGtDQUFrQztZQUNsQyxxRUFBcUU7WUFDckUsSUFBSTtZQUNKLEtBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3RCLEtBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQztRQUNoRCxDQUFDLENBQUM7YUFDRCxLQUFLLENBQUMsVUFBQSxDQUFDO1lBQ0osd0RBQXdEO1FBQzVELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVDQUFRLEdBQVIsVUFBVyxHQUFVO1FBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsMENBQVcsR0FBWCxVQUFjLEtBQVc7UUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUUsVUFBQyxDQUFDLEVBQUMsQ0FBQyxJQUFPLElBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxLQUFLLENBQUMsR0FBRyxFQUFFO1lBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDakYsSUFBSSxLQUFLLElBQUksQ0FBQyxFQUFFO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUN2QztJQUNMLENBQUM7SUFFRCx5Q0FBVSxHQUFWLFVBQWEsR0FBVTtRQUNuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2hDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUUsVUFBQyxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEVBQWpCLENBQWlCLENBQUMsQ0FBQztJQUM3RCxDQUFDO0lBR0Q7O09BRUc7SUFDSCwyQ0FBWSxHQUFaLFVBQWMsTUFBZTtRQUN6QixJQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxHQUFDLENBQUMsRUFBRztZQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBRSxNQUFNLEdBQUMsQ0FBQyxDQUFFLENBQUM7WUFDOUIsSUFBSSxDQUFDLFlBQVksQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLENBQUM7U0FDdkM7SUFDTCxDQUFDOztnQkFqRXFCLFlBQVk7Z0RBQzdCLE1BQU0sU0FBQyxlQUFlOztJQVpsQixvQkFBb0I7UUFMaEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLDJCQUEyQjtZQUNyQyxzbkZBQW1DOztTQUVwQyxDQUFDO1FBYU8sbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO09BWm5CLG9CQUFvQixDQTZFaEM7SUFBRCwyQkFBQztDQUFBLEFBN0VELElBNkVDO1NBN0VZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgSW5qZWN0LCBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3lcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIE1hdERpYWxvZywgTWF0RGlhbG9nUmVmLCBNQVRfRElBTE9HX0RBVEFcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7XG4gICAgSXRlbSwgS0dTZXJ2aWNlLCBLR1F1ZXJ5LCBTZWFyY2hSZXN1bHRzXG59IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VtYW50aWNEaWFsb2dEYXRhIHtcbiAgICBzZWxlY3RlZCA6IEl0ZW1bXTtcbiAgICBzZXJ2aWNlICA6IEtHU2VydmljZTtcbn1cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1zZW1hbnRpYy1maWx0ZXItZGlhbG9nJyxcbiAgdGVtcGxhdGVVcmw6ICdzZW1hbnRpYy5kaWFsb2cuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NlbWFudGljLmRpYWxvZy5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2VtYW50aWNGaWx0ZXJEaWFsb2cge1xuXG4gICAgcHVibGljICBzdWdnZXN0ZWQgOiBhbnlbXTtcbiAgICBwdWJsaWMgIHRlcm1RdWVyeSA6IHN0cmluZztcbiAgICBwcml2YXRlIGtnUXVlcnkgICA6IEtHUXVlcnk7XG5cbiAgICAvL3BhZ2luYXRpb25cbiAgICBwdWJsaWMgIGN1cnJlbnRQYWdlICAgIDogbnVtYmVyID0gMDtcbiAgICBwdWJsaWMgIHRvdGFsU3VnZ2VzdGVkIDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPFNlbWFudGljRmlsdGVyRGlhbG9nPixcbiAgICAgICAgQEluamVjdChNQVRfRElBTE9HX0RBVEEpIHB1YmxpYyBkYXRhOiBTZW1hbnRpY0RpYWxvZ0RhdGFcbiAgICApIHtcbiAgICAgICAgdGhpcy5rZ1F1ZXJ5ID0gbmV3IEtHUXVlcnkoKS5wYWdlKHRoaXMuY3VycmVudFBhZ2UpLnBhZ2VTaXplKDEyKTtcbiAgICB9XG5cbiAgICBvbk5vQ2xpY2sgKCkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5kaWFsb2dSZWYuY2xvc2UoKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZSAtIHVzZXIgaW5wdXQgdG8gZmlsdGVyIG9wdGlvbnMgd2l0aFxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IHJlc29sdmluZyBhcnJheSBvZiBzdHJpbmcgb3B0aW9uc1xuICAgICAqL1xuICAgIGZpbHRlclZhbHVlcyAoIHZhbHVlOiBzdHJpbmcgKSA6IHZvaWQge1xuXG4gICAgICAgIGlmKCF2YWx1ZSkgeyAgICAvL3JlcXVpcmUgdXNlciB0byBwcm92aWRlIGlucHV0IGJlZm9yZSBzZWFyY2hpbmdcbiAgICAgICAgICAgIHRoaXMuc3VnZ2VzdGVkID0gW107XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3VnZ2VzdGVkID0gMDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMua2dRdWVyeS5xKHZhbHVlKTtcblxuICAgICAgICB0aGlzLmRhdGEuc2VydmljZS5zdWdnZXN0KHRoaXMua2dRdWVyeSlcbiAgICAgICAgLnRoZW4oICggcmVzcG9uc2UgOiBTZWFyY2hSZXN1bHRzICkgPT4ge1xuICAgICAgICAgICAgbGV0IGhpdHMgPSByZXNwb25zZS5yZXN1bHRzO1xuICAgICAgICAgICAgLy8gaWYoY3VycmVudCAmJiBjdXJyZW50Lmxlbmd0aCkge1xuICAgICAgICAgICAgLy8gICAgIGhpdHMgPSBoaXRzLmZpbHRlcihvID0+IHsgcmV0dXJuIGN1cnJlbnQuaW5kZXhPZihvLnVyaSk8MDsgfSk7XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB0aGlzLnN1Z2dlc3RlZCA9IGhpdHM7XG4gICAgICAgICAgICB0aGlzLnRvdGFsU3VnZ2VzdGVkID0gcmVzcG9uc2UudG90YWxSZXN1bHRzO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICAvL2Rpc3BsYXkgZXJyb3IgbWVzc2FnZSBpbmRpY2F0aW5nIGFuIGlzc3VlIHNlYXJjaGluZy4uLlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRWYWx1ZSAoIGFyZyA6IEl0ZW0pIDogdm9pZCB7XG4gICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZC5wdXNoKCBhcmcgKTtcbiAgICB9XG5cbiAgICByZW1vdmVWYWx1ZSAoIHZhbHVlOiBJdGVtICkgOiB2b2lkIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIHRoaXMuZGF0YS5zZWxlY3RlZC5mb3JFYWNoKCAocCxpKSA9PiB7IGlmKHAudXJpID09PSB2YWx1ZS51cmkpIHsgaW5kZXggPSBpOyB9IH0pO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhLnNlbGVjdGVkLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkICggYXJnIDogSXRlbSApIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEuc2VsZWN0ZWQubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgISF0aGlzLmRhdGEuc2VsZWN0ZWQuZmluZCggKHMpID0+IHMudXJpID09PSBhcmcudXJpKTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBwYWdlTm8gLSBuZXcgcGFnZSBudW1iZXIgYmVpbmcgcmVxdWVzdGVkXG4gICAgICovXG4gICAgb25QYWdlQ2hhbmdlKCBwYWdlTm8gOiBudW1iZXIgKSB7XG4gICAgICAgIGlmKHRoaXMuY3VycmVudFBhZ2UgIT09IHBhZ2VOby0xICkge1xuICAgICAgICAgICAgdGhpcy5rZ1F1ZXJ5LnBhZ2UoIHBhZ2VOby0xICk7XG4gICAgICAgICAgICB0aGlzLmZpbHRlclZhbHVlcyggdGhpcy50ZXJtUXVlcnkgKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==