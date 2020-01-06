import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
let SchemeFilterComponent = class SchemeFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.CONCEPT_SCHEME, "Scheme", dialog);
        //the key associated with this filter's selections
        this.key = QueryParameters.SCHEMES_ID;
        //the current set of values
        this.selected = [];
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    isSupported() {
        if (this.query) {
            let types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.CONCEPT) >= 0;
        }
        return false;
    }
};
SchemeFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
tslib_1.__decorate([
    Input()
], SchemeFilterComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Input()
], SchemeFilterComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    Input()
], SchemeFilterComponent.prototype, "query", void 0);
tslib_1.__decorate([
    Output()
], SchemeFilterComponent.prototype, "onEvent", void 0);
SchemeFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-scheme-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    tslib_1.__param(0, Inject(ItemService))
], SchemeFilterComponent);
export { SchemeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1lLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJzZWFyY2gvZmlsdGVycy9zY2hlbWUvc2NoZW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBUyxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3JGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUy9ELElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsbUJBQW1CO0lBVzFELFlBQ3lCLE9BQXFCLEVBQzFDLE1BQWtCO1FBRWxCLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFiL0Qsa0RBQWtEO1FBQ3hDLFFBQUcsR0FBa0IsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUMxRCwyQkFBMkI7UUFDakIsYUFBUSxHQUFlLEVBQUUsQ0FBQztRQUkxQixZQUFPLEdBQXlCLElBQUksWUFBWSxFQUFPLENBQUM7SUFPbEUsQ0FBQztJQUVELE1BQU07UUFDRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztJQUVELE1BQU0sQ0FBRSxLQUFtQjtRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsV0FBVztRQUNQLElBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNYLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEMsT0FBTyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBRSxDQUFDLENBQUM7U0FDdkU7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0NBRUosQ0FBQTs7NENBdEJRLE1BQU0sU0FBQyxXQUFXO1lBQ1YsU0FBUzs7QUFWWjtJQUFULEtBQUssRUFBRTtrREFBa0Q7QUFFaEQ7SUFBVCxLQUFLLEVBQUU7dURBQTRCO0FBRzFCO0lBQVQsS0FBSyxFQUFFO29EQUFvQjtBQUNsQjtJQUFULE1BQU0sRUFBRTtzREFBeUQ7QUFUekQscUJBQXFCO0lBTGpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsNHVDQUE0Qzs7S0FFN0MsQ0FBQztJQWFPLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQVpmLHFCQUFxQixDQWtDakM7U0FsQ1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBRdWVyeSwgSXRlbVR5cGVzLCBRdWVyeVBhcmFtZXRlcnMsIEl0ZW1TZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBJdGVtRmlsdGVyQ29tcG9uZW50IH0gZnJvbSAnLi4vaXRlbS1maWx0ZXIuY29tcG9uZW50JztcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXNjaGVtZS1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4uL2l0ZW0tZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2NoZW1lLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2NoZW1lRmlsdGVyQ29tcG9uZW50IGV4dGVuZHMgSXRlbUZpbHRlckNvbXBvbmVudCB7XG5cbiAgICAvL3RoZSBrZXkgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZmlsdGVyJ3Mgc2VsZWN0aW9uc1xuICAgIEBJbnB1dCgpICBrZXkgICAgICAgOiBzdHJpbmcgPSBRdWVyeVBhcmFtZXRlcnMuU0NIRU1FU19JRDtcbiAgICAvL3RoZSBjdXJyZW50IHNldCBvZiB2YWx1ZXNcbiAgICBASW5wdXQoKSAgc2VsZWN0ZWQgIDogc3RyaW5nW10gPSBbXTtcbiAgICAvL3RoZSBxdWVyeSBiZWluZyBhZmZlY3RlZCBieSB0aGlzIGZpbHRlcidzIHNlbGVjdGlvbnNcbiAgICAvLyB1c2VkIHRvIGRldGVybWluZSBpZiB0aGlzIGZpbHRlciBzaG91bGQgYmUgc2hvd24gb3Igbm90XG4gICAgQElucHV0KCkgIHF1ZXJ5ICAgICA6IFF1ZXJ5O1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSXRlbVNlcnZpY2UpIHNlcnZpY2UgOiBJdGVtU2VydmljZSxcbiAgICAgICAgZGlhbG9nIDogTWF0RGlhbG9nXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKHNlcnZpY2UsIEl0ZW1UeXBlcy5DT05DRVBUX1NDSEVNRSwgXCJTY2hlbWVcIiwgZGlhbG9nKTtcbiAgICB9XG5cbiAgICBnZXRLZXkoKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleTtcbiAgICB9XG5cbiAgICBub3RpZnkoIGV2ZW50IDogU2VhcmNoRXZlbnQgKSB7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBpc1N1cHBvcnRlZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMucXVlcnkpIHtcbiAgICAgICAgICAgIGxldCB0eXBlcyA9IHRoaXMucXVlcnkuZ2V0VHlwZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlcyAmJiB0eXBlcy5sZW5ndGggJiYgdHlwZXMuaW5kZXhPZihJdGVtVHlwZXMuQ09OQ0VQVCk+PTA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxufVxuIl19