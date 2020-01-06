import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { QueryParameters, ItemService } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
let SimilarityFilterComponent = class SimilarityFilterComponent {
    constructor(service) {
        this.service = service;
        this.key = QueryParameters.SIMILAR_TO;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
    }
    ngOnInit() { }
    ngOnChanges(changes) {
        if (changes.selected) {
            let id = changes.selected.currentValue;
            if (!id)
                this.item = null;
            else {
                this.service.get(id)
                    .then((result) => { this.item = result; })
                    .catch((err) => {
                    console.log("SimilarityFilter.OnChange('selected') : ", err);
                });
            }
        }
    }
    clear() {
        let change = {};
        change[this.key] = null;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
};
SimilarityFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
tslib_1.__decorate([
    Input()
], SimilarityFilterComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Input()
], SimilarityFilterComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    Output()
], SimilarityFilterComponent.prototype, "onEvent", void 0);
SimilarityFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-similarity-filter',
        template: "<div class=\"m-article o-query-filter\" *ngIf=\"item\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Find Similar\n    </div>\n    <div class=\"u-text--sm\" *ngIf=\"!isCollapsed\">\n        Searching for items similar to:\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a  class=\"m-facet active\" (click)=\"clear()\">\n            <span class=\"fas fa-times-circle t-fg--danger\"></span>\n            <span gpIcon [item]=\"item\"></span> {{item.label}}\n        </a>\n    </div>\n</div>\n",
        styles: [""]
    }),
    tslib_1.__param(0, Inject(ItemService))
], SimilarityFilterComponent);
export { SimilarityFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltaWxhcml0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvc2ltaWxhcml0eS9zaW1pbGFyaXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQ3RDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBUSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF6RCxJQUFhLHlCQUF5QixHQUF0QyxNQUFhLHlCQUF5QjtJQVNsQyxZQUEwQyxPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBUHJELFFBQUcsR0FBZ0IsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUU5QyxZQUFPLEdBQStCLElBQUksWUFBWSxFQUFlLENBQUM7UUFFeEUsZ0JBQVcsR0FBYSxJQUFJLENBQUM7SUFHK0IsQ0FBQztJQUVyRSxRQUFRLEtBQUssQ0FBQztJQUVkLFdBQVcsQ0FBRSxPQUF1QjtRQUNoQyxJQUFHLE9BQU8sQ0FBQyxRQUFRLEVBQUU7WUFDakIsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7WUFDdkMsSUFBRyxDQUFDLEVBQUU7Z0JBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7aUJBQ3BCO2dCQUNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztxQkFDbkIsSUFBSSxDQUFFLENBQUMsTUFBYSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDakQsS0FBSyxDQUFFLENBQUMsR0FBVyxFQUFFLEVBQUU7b0JBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFHRCxLQUFLO1FBQ0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKLENBQUE7OzRDQXpCaUIsTUFBTSxTQUFDLFdBQVc7O0FBUHRCO0lBQVQsS0FBSyxFQUFFO3NEQUFnRDtBQUM5QztJQUFULEtBQUssRUFBRTsyREFBbUI7QUFDakI7SUFBVCxNQUFNLEVBQUU7MERBQXVFO0FBSnZFLHlCQUF5QjtJQUxyQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsc0JBQXNCO1FBQ2hDLDg0QkFBMEM7O0tBRTNDLENBQUM7SUFVZ0IsbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0dBVHhCLHlCQUF5QixDQWtDckM7U0FsQ1kseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLFxuICAgIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSXRlbSwgUXVlcnlQYXJhbWV0ZXJzLCBJdGVtU2VydmljZSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vZXZlbnQnO1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXNpbWlsYXJpdHktZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NpbWlsYXJpdHkuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9zaW1pbGFyaXR5LmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgU2ltaWxhcml0eUZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpICBrZXkgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlNJTUlMQVJfVE87XG4gICAgQElucHV0KCkgIHNlbGVjdGVkOiBzdHJpbmc7XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgOiBFdmVudEVtaXR0ZXI8U2VhcmNoRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4oKTtcblxuICAgIHB1YmxpYyAgaXNDb2xsYXBzZWQgOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgICAgaXRlbSA6IEl0ZW07XG5cbiAgICBjb25zdHJ1Y3RvciggQEluamVjdChJdGVtU2VydmljZSkgcHJpdmF0ZSBzZXJ2aWNlIDogSXRlbVNlcnZpY2UgKSB7IH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICBuZ09uQ2hhbmdlcyggY2hhbmdlcyA6IFNpbXBsZUNoYW5nZXMgKSB7XG4gICAgICAgIGlmKGNoYW5nZXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGxldCBpZCA9IGNoYW5nZXMuc2VsZWN0ZWQuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgaWYoIWlkKSB0aGlzLml0ZW0gPSBudWxsO1xuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXJ2aWNlLmdldChpZClcbiAgICAgICAgICAgICAgICAudGhlbiggKHJlc3VsdCA6IEl0ZW0pID0+IHsgdGhpcy5pdGVtID0gcmVzdWx0OyB9KVxuICAgICAgICAgICAgICAgIC5jYXRjaCggKGVyciA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiU2ltaWxhcml0eUZpbHRlci5PbkNoYW5nZSgnc2VsZWN0ZWQnKSA6IFwiLCBlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBjbGVhcigpIHtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICBjaGFuZ2VbdGhpcy5rZXldID0gbnVsbDtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG4iXX0=