import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
let ThemeFilterComponent = class ThemeFilterComponent extends ItemFilterComponent {
    constructor(service, dialog) {
        super(service, ItemTypes.CONCEPT, "Themes", dialog);
        this.key = QueryParameters.THEMES_ID;
        this.onEvent = new EventEmitter();
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    initQuery() {
        super.initQuery();
        this.query.fields(['scheme']);
    }
    getDialogOptions() {
        let opts = super.getDialogOptions();
        opts.data.subHeading = "scheme";
        return opts;
    }
};
ThemeFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] },
    { type: MatDialog }
];
tslib_1.__decorate([
    Input()
], ThemeFilterComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Output()
], ThemeFilterComponent.prototype, "onEvent", void 0);
ThemeFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-theme-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by {{filterLabel}}\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a *ngIf=\"dialog\" class=\"m-facet is-linkless\" (click)=\"openDialog()\">\n            <span class=\"fas fa-search\"></span> Find {{filterLabel}}...\n        </a>\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">No values selected</a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selected</a>\n        <div class=\"m-facet active\" *ngFor=\"let item of selected\" (click)=\"toggle(item)\">\n            <span class=\"fas fa-check\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span>\n            {{item.label||\"Untitled option\"}}\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    }),
    tslib_1.__param(0, Inject(ItemService))
], ThemeFilterComponent);
export { ThemeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL3RoZW1lL3RoZW1lLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxTQUFTLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQzlFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBUS9ELElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsbUJBQW1CO0lBS3pELFlBQ3lCLE9BQXFCLEVBQzFDLE1BQWtCO1FBRWxCLEtBQUssQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFQOUMsUUFBRyxHQUFrQixlQUFlLENBQUMsU0FBUyxDQUFDO1FBQy9DLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQU9sRSxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFFLEtBQW1CO1FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCxTQUFTO1FBQ0wsS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsZ0JBQWdCO1FBQ1osSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQ2hDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7Q0FFSixDQUFBOzs0Q0F6QlEsTUFBTSxTQUFDLFdBQVc7WUFDVixTQUFTOztBQUxaO0lBQVQsS0FBSyxFQUFFO2lEQUFpRDtBQUMvQztJQUFULE1BQU0sRUFBRTtxREFBeUQ7QUFIekQsb0JBQW9CO0lBTGhDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxpQkFBaUI7UUFDM0IsNHVDQUE0Qzs7S0FFN0MsQ0FBQztJQU9PLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQU5mLG9CQUFvQixDQStCaEM7U0EvQlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE1hdERpYWxvZyB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBJdGVtVHlwZXMsIFF1ZXJ5UGFyYW1ldGVycywgSXRlbVNlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCB7IEl0ZW1GaWx0ZXJDb21wb25lbnQgfSBmcm9tICcuLi9pdGVtLWZpbHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXRoZW1lLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi4vaXRlbS1maWx0ZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi90aGVtZS5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRoZW1lRmlsdGVyQ29tcG9uZW50IGV4dGVuZHMgSXRlbUZpbHRlckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSAga2V5ICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlRIRU1FU19JRDtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBzZXJ2aWNlIDogSXRlbVNlcnZpY2UsXG4gICAgICAgIGRpYWxvZyA6IE1hdERpYWxvZ1xuICAgICkge1xuICAgICAgICBzdXBlcihzZXJ2aWNlLCBJdGVtVHlwZXMuQ09OQ0VQVCwgXCJUaGVtZXNcIiwgZGlhbG9nKTtcbiAgICB9XG5cbiAgICBnZXRLZXkoKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleTtcbiAgICB9XG5cbiAgICBub3RpZnkoIGV2ZW50IDogU2VhcmNoRXZlbnQgKSB7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBpbml0UXVlcnkoKSB7XG4gICAgICAgIHN1cGVyLmluaXRRdWVyeSgpO1xuICAgICAgICB0aGlzLnF1ZXJ5LmZpZWxkcyhbJ3NjaGVtZSddKTtcbiAgICB9XG5cbiAgICBnZXREaWFsb2dPcHRpb25zKCkgOiBhbnkge1xuICAgICAgICBsZXQgb3B0cyA9IHN1cGVyLmdldERpYWxvZ09wdGlvbnMoKTtcbiAgICAgICAgb3B0cy5kYXRhLnN1YkhlYWRpbmcgPSBcInNjaGVtZVwiO1xuICAgICAgICByZXR1cm4gb3B0cztcbiAgICB9XG5cbn1cbiJdfQ==