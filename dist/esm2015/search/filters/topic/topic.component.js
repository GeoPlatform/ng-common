import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
let TopicFilterComponent = class TopicFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.TOPIC, "Topics", dialog);
        this.key = QueryParameters.TOPIC_ID;
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
};
TopicFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
tslib_1.__decorate([
    Input()
], TopicFilterComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Output()
], TopicFilterComponent.prototype, "onEvent", void 0);
TopicFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-topic-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    tslib_1.__param(0, Inject(ItemService))
], TopicFilterComponent);
export { TopicFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9waWMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3RvcGljL3RvcGljLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUy9ELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsbUJBQW1CO0lBS3pELFlBQ3lCLE9BQXFCLEVBQzFDLE1BQWtCO1FBRWxCLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFQNUMsUUFBRyxHQUFrQixlQUFlLENBQUMsUUFBUSxDQUFDO1FBQzlDLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQU9sRSxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFFLEtBQW1CO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FFSixDQUFBOzs0Q0FkUSxNQUFNLFNBQUMsV0FBVztZQUNWLFNBQVM7O0FBTFo7SUFBVCxLQUFLLEVBQUU7aURBQWdEO0FBQzlDO0lBQVQsTUFBTSxFQUFFO3FEQUF5RDtBQUh6RCxvQkFBb0I7SUFMaEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLGlCQUFpQjtRQUMzQiw0dUNBQTRDOztLQUU3QyxDQUFDO0lBT08sbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBTmYsb0JBQW9CLENBb0JoQztTQXBCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgTWF0RGlhbG9nIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IEl0ZW1UeXBlcywgUXVlcnlQYXJhbWV0ZXJzLCBJdGVtU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgSXRlbUZpbHRlckNvbXBvbmVudCB9IGZyb20gJy4uL2l0ZW0tZmlsdGVyLmNvbXBvbmVudCc7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC10b3BpYy1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4uL2l0ZW0tZmlsdGVyLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdG9waWMuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBUb3BpY0ZpbHRlckNvbXBvbmVudCBleHRlbmRzIEl0ZW1GaWx0ZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgIGtleSAgICAgICA6IHN0cmluZyA9IFF1ZXJ5UGFyYW1ldGVycy5UT1BJQ19JRDtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBzZXJ2aWNlIDogSXRlbVNlcnZpY2UsXG4gICAgICAgIGRpYWxvZyA6IE1hdERpYWxvZ1xuICAgICkge1xuICAgICAgICBzdXBlcihzZXJ2aWNlLCBJdGVtVHlwZXMuVE9QSUMsIFwiVG9waWNzXCIsIGRpYWxvZyk7XG4gICAgfVxuXG4gICAgZ2V0S2V5KCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXk7XG4gICAgfVxuXG4gICAgbm90aWZ5KCBldmVudCA6IFNlYXJjaEV2ZW50ICkge1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG59XG4iXX0=