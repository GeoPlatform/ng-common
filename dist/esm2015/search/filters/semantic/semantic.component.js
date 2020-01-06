import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueryParameters, KGService } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
import { SemanticFilterDialog } from "./semantic.dialog";
let SemanticFilterComponent = class SemanticFilterComponent {
    constructor(service, dialog) {
        this.service = service;
        this.dialog = dialog;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.visibleAmount = 10;
    }
    ngOnInit() {
        this.selected = [];
    }
    openDialog() {
        const dialogRef = this.dialog.open(SemanticFilterDialog, {
            width: '50%',
            data: { service: this.service, selected: [] }
        });
        dialogRef.afterClosed().subscribe((result) => {
            if (result && result.length) {
                this.selected = this.selected.concat(result);
                this.notify();
            }
        });
    }
    getKey() {
        return this.key;
    }
    notify() {
        let key = this.key;
        let change = {};
        change[key] = this.selected.map(s => s.uri);
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(arg) {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    }
    getIndexOf(arg) {
        if (!this.selected || !this.selected.length)
            return -1;
        return this.selected.findIndex(s => s.uri === arg.uri);
    }
    /**
     * @param arg - item or identifier
     */
    toggle(arg) {
        let idx = this.getIndexOf(arg);
        if (idx >= 0)
            this.selected.splice(idx, 1); //found, remove it
        else
            this.selected.push(arg); //not found, add it
        this.notify();
    }
    clear() {
        if (this.hasSelections()) {
            this.selected = [];
            this.notify();
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    }
};
SemanticFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [KGService,] }] },
    { type: MatDialog, decorators: [{ type: Inject, args: [MatDialog,] }] }
];
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
export { SemanticFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VtYW50aWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3NlbWFudGljL3NlbWFudGljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUNILFNBQVMsRUFBcUIsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUNwRSxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHckQsT0FBTyxFQUFnQixlQUFlLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFL0UsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RCxPQUFPLEVBQXNCLG9CQUFvQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFTN0UsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7SUFTaEMsWUFDK0IsT0FBbUIsRUFDcEIsTUFBaUI7UUFEaEIsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUNwQixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBUnJDLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxnQkFBVyxHQUFhLElBQUksQ0FBQztRQUU3QixrQkFBYSxHQUFZLEVBQUUsQ0FBQztJQU9uQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxVQUFVO1FBRU4sTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDckQsS0FBSyxFQUFFLEtBQUs7WUFDWixJQUFJLEVBQUUsRUFBRSxPQUFPLEVBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFO1NBQ2pELENBQUMsQ0FB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TSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ2pCLG1CQUFBLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQTtHQVhiLHVCQUF1QixDQWtGbkM7U0FsRlksdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBPbkRlc3Ryb3ksIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QsIG9mLCBmcm9tIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIGZsYXRNYXAsIHN0YXJ0V2l0aCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEl0ZW0sIENvbmZpZywgUXVlcnlQYXJhbWV0ZXJzLCBLR1NlcnZpY2UgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuaW1wb3J0IHsgU2VtYW50aWNEaWFsb2dEYXRhLCBTZW1hbnRpY0ZpbHRlckRpYWxvZyB9IGZyb20gXCIuL3NlbWFudGljLmRpYWxvZ1wiO1xuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2VtYW50aWMtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NlbWFudGljLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2VtYW50aWMuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZW1hbnRpY0ZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSAga2V5ICAgICAgIDogc3RyaW5nO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgcHVibGljIGlzQ29sbGFwc2VkIDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljIHNlbGVjdGVkICA6IEl0ZW1bXTtcbiAgICBwdWJsaWMgdmlzaWJsZUFtb3VudCA6IG51bWJlciA9IDEwO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoS0dTZXJ2aWNlKSBwcml2YXRlIHNlcnZpY2UgOiBLR1NlcnZpY2UsXG4gICAgICAgIEBJbmplY3QoTWF0RGlhbG9nKSBwdWJsaWMgZGlhbG9nOiBNYXREaWFsb2dcbiAgICApIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgfVxuXG4gICAgb3BlbkRpYWxvZygpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBkaWFsb2dSZWYgPSB0aGlzLmRpYWxvZy5vcGVuKFNlbWFudGljRmlsdGVyRGlhbG9nLCB7XG4gICAgICAgICAgICB3aWR0aDogJzUwJScsXG4gICAgICAgICAgICBkYXRhOiB7IHNlcnZpY2UgOiB0aGlzLnNlcnZpY2UsIHNlbGVjdGVkOiBbXSB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGRpYWxvZ1JlZi5hZnRlckNsb3NlZCgpLnN1YnNjcmliZSggKCByZXN1bHQgOiBJdGVtW10gKSA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHQgJiYgcmVzdWx0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLnNlbGVjdGVkLmNvbmNhdChyZXN1bHQpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEtleSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5O1xuICAgIH1cblxuICAgIG5vdGlmeSggKSB7XG4gICAgICAgIGxldCBrZXkgPSB0aGlzLmtleTtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICBjaGFuZ2Vba2V5XSA9IHRoaXMuc2VsZWN0ZWQubWFwKHM9PnMudXJpKTtcbiAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5QQUdFXSA9IDA7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgaGFzU2VsZWN0aW9ucygpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKCBhcmcgOiBJdGVtICkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2VsZWN0aW9ucygpICYmIHRoaXMuZ2V0SW5kZXhPZihhcmcpID49IDA7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXhPZiggYXJnIDogSXRlbSApIDogbnVtYmVyIHtcbiAgICAgICAgaWYoIXRoaXMuc2VsZWN0ZWQgfHwgIXRoaXMuc2VsZWN0ZWQubGVuZ3RoKSByZXR1cm4gLTE7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkLmZpbmRJbmRleCggcz0+IHMudXJpID09PSBhcmcudXJpICk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gYXJnIC0gaXRlbSBvciBpZGVudGlmaWVyXG4gICAgICovXG4gICAgdG9nZ2xlKCBhcmcgOiBJdGVtICkge1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5nZXRJbmRleE9mKGFyZyk7XG4gICAgICAgIGlmKCBpZHggPj0gMCApIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKGlkeCwgMSk7ICAgIC8vZm91bmQsIHJlbW92ZSBpdFxuICAgICAgICBlbHNlIHRoaXMuc2VsZWN0ZWQucHVzaChhcmcpOyAgICAgICAgICAgICAgICAgICAvL25vdCBmb3VuZCwgYWRkIGl0XG4gICAgICAgIHRoaXMubm90aWZ5KCk7XG4gICAgfVxuXG4gICAgY2xlYXIgKCkge1xuICAgICAgICBpZih0aGlzLmhhc1NlbGVjdGlvbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoKTtcblxuICAgICAgICB9IGVsc2UgaWYoIHRoaXMuaXNDb2xsYXBzZWQgKXtcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuIl19