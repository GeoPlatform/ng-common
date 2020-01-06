import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueryParameters, KGService } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
import { SemanticFilterDialog } from "./semantic.dialog";
var SemanticFilterComponent = /** @class */ (function () {
    function SemanticFilterComponent(service, dialog) {
        this.service = service;
        this.dialog = dialog;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.visibleAmount = 10;
    }
    SemanticFilterComponent.prototype.ngOnInit = function () {
        this.selected = [];
    };
    SemanticFilterComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(SemanticFilterDialog, {
            width: '50%',
            data: { service: this.service, selected: [] }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result && result.length) {
                _this.selected = _this.selected.concat(result);
                _this.notify();
            }
        });
    };
    SemanticFilterComponent.prototype.getKey = function () {
        return this.key;
    };
    SemanticFilterComponent.prototype.notify = function () {
        var key = this.key;
        var change = {};
        change[key] = this.selected.map(function (s) { return s.uri; });
        change[QueryParameters.PAGE] = 0;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    SemanticFilterComponent.prototype.hasSelections = function () {
        return this.selected && this.selected.length > 0;
    };
    SemanticFilterComponent.prototype.isSelected = function (arg) {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    };
    SemanticFilterComponent.prototype.getIndexOf = function (arg) {
        if (!this.selected || !this.selected.length)
            return -1;
        return this.selected.findIndex(function (s) { return s.uri === arg.uri; });
    };
    /**
     * @param arg - item or identifier
     */
    SemanticFilterComponent.prototype.toggle = function (arg) {
        var idx = this.getIndexOf(arg);
        if (idx >= 0)
            this.selected.splice(idx, 1); //found, remove it
        else
            this.selected.push(arg); //not found, add it
        this.notify();
    };
    SemanticFilterComponent.prototype.clear = function () {
        if (this.hasSelections()) {
            this.selected = [];
            this.notify();
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    };
    SemanticFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [KGService,] }] },
        { type: MatDialog, decorators: [{ type: Inject, args: [MatDialog,] }] }
    ]; };
    tslib_1.__decorate([
        Input()
    ], SemanticFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Output()
    ], SemanticFilterComponent.prototype, "onEvent", void 0);
    SemanticFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-semantic-filter',
            template: "\n<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Semantic Concepts\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find Concepts...\n        </a>\n\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span *ngIf=\"!hasSelections()\">No concepts selected</span>\n            <span *ngIf=\"hasSelections()\">Clear Selections</span>\n        </a>\n\n        <div class=\"m-facet\" *ngFor=\"let concept of selected; let $index = index\" (click)=\"toggle(concept)\"\n            [ngClass]=\"{active:isSelected(concept),'is-hidden':$index>visibleAmount}\">\n            <span class=\"fas fa-check\" *ngIf=\"isSelected(concept)\"></span>\n            <span class=\"fas fa-square t-fg--gray-xlt\" *ngIf=\"!isSelected(concept)\"></span>\n            {{concept.prefLabel}}\n            <div class=\"u-break--all u-text--sm\">{{concept.uri}}</div>\n        </div>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(0, Inject(KGService)),
        tslib_1.__param(1, Inject(MatDialog))
    ], SemanticFilterComponent);
    return SemanticFilterComponent;
}());
export { SemanticFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtYW50aWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3NlbWFudGljL3NlbWFudGljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNILFNBQVMsRUFBcUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUNwRSxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHckQsT0FBTyxFQUFnQixlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxPQUFPLEVBQXNCLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTN0U7SUFTSSxpQ0FDK0IsT0FBbUIsRUFDcEIsTUFBaUI7UUFEaEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBUnJDLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxnQkFBVyxHQUFhLElBQUksQ0FBQztRQUU3QixrQkFBYSxHQUFZLEVBQUUsQ0FBQztJQU9uQyxDQUFDO0lBRUQsMENBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCw0Q0FBVSxHQUFWO1FBQUEsaUJBYUM7UUFYRyxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsRUFBRTtZQUNyRCxLQUFLLEVBQUUsS0FBSztZQUNaLElBQUksRUFBRSxFQUFFLE9BQU8sRUFBRyxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxFQUFFLEVBQUU7U0FDakQsQ0FBQyxDQUFDO1FBRUgs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QzlCLG0rQ0FBd0M7O1NBRXpDLENBQUM7UUFXTyxtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDakIsbUJBQUEsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFBO09BWGIsdUJBQXVCLENBa0ZuQztJQUFELDhCQUFDO0NBQUEsQUFsRkQsSUFrRkM7U0FsRlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGZsYXRNYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEl0ZW0sIENvbmZpZywgUXVlcnlQYXJhbWV0ZXJzLCBLR1NlcnZpY2UgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuaW1wb3J0IHsgU2VtYW50aWNEaWFsb2dEYXRhLCBTZW1hbnRpY0ZpbHRlckRpYWxvZyB9IGZyb20gXCIuL3NlbWFudGljLmRpYWxvZ1wiO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2VtYW50aWMtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbWFudGljLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VtYW50aWMuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1hbnRpY0ZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSAga2V5ICAgICAgIDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgcHVibGljIGlzQ29sbGFwc2VkIDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHNlbGVjdGVkICA6IEl0ZW1bXTtcbiAgICBwdWJsaWMgdmlzaWJsZUFtb3VudCA6IG51bWJlciA9IDEwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoS0dTZXJ2aWNlKSBwcml2YXRlIHNlcnZpY2UgOiBLR1NlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoTWF0RGlhbG9nKSBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgICApIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgfVxuXG4gICAgb3BlbkRpYWxvZygpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFNlbWFudGljRmlsdGVyRGlhbG9nLCB7XG4gICAgICAgICAgICB3aWR0aDogJzUwJScsXG4gICAgICAgICAgICBkYXRhOiB7IHNlcnZpY2UgOiB0aGlzLnNlcnZpY2UsIHNlbGVjdGVkOiBbXSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSggKCByZXN1bHQgOiBJdGVtW10gKSA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEtleSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5O1xuICAgIH1cblxuICAgIG5vdGlmeSggKSB7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLmtleTtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICBjaGFuZ2Vba2V5XSA9IHRoaXMuc2VsZWN0ZWQubWFwKHM9PnMudXJpKTtcbiAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5QQUdFXSA9IDA7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaGFzU2VsZWN0aW9ucygpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKCBhcmcgOiBJdGVtICkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2VsZWN0aW9ucygpICYmIHRoaXMuZ2V0SW5kZXhPZihhcmcpID49IDA7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXhPZiggYXJnIDogSXRlbSApIDogbnVtYmVyIHtcbiAgICAgICAgaWYoIXRoaXMuc2VsZWN0ZWQgfHwgIXRoaXMuc2VsZWN0ZWQubGVuZ3RoKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkLmZpbmRJbmRleCggcz0+IHMudXJpID09PSBhcmcudXJpICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gaXRlbSBvciBpZGVudGlmaWVyXG4gICAgICovXG4gICAgdG9nZ2xlKCBhcmcgOiBJdGVtICkge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5nZXRJbmRleE9mKGFyZyk7XG4gICAgICAgIGlmKCBpZHggPj0gMCApIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKGlkeCwgMSk7ICAgIC8vZm91bmQsIHJlbW92ZSBpdFxuICAgICAgICBlbHNlIHRoaXMuc2VsZWN0ZWQucHVzaChhcmcpOyAgICAgICAgICAgICAgICAgICAvL25vdCBmb3VuZCwgYWRkIGl0XG4gICAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICBpZih0aGlzLmhhc1NlbGVjdGlvbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoKTtcblxuICAgICAgICB9IGVsc2UgaWYoIHRoaXMuaXNDb2xsYXBzZWQgKXtcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19