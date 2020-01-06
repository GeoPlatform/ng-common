import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { QueryParameters, ItemService } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
var SimilarityFilterComponent = /** @class */ (function () {
    function SimilarityFilterComponent(service) {
        this.service = service;
        this.key = QueryParameters.SIMILAR_TO;
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
    }
    SimilarityFilterComponent.prototype.ngOnInit = function () { };
    SimilarityFilterComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.selected) {
            var id = changes.selected.currentValue;
            if (!id)
                this.item = null;
            else {
                this.service.get(id)
                    .then(function (result) { _this.item = result; })
                    .catch(function (err) {
                    console.log("SimilarityFilter.OnChange('selected') : ", err);
                });
            }
        }
    };
    SimilarityFilterComponent.prototype.clear = function () {
        var change = {};
        change[this.key] = null;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    SimilarityFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
    ]; };
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
            template: "<div class=\"m-article o-query-filter\" *ngIf=\"item\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Find Similar\n    </div>\n    <div class=\"u-text--sm\" *ngIf=\"!isCollapsed\">\n        Searching for items similar to:\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a  class=\"m-facet active\" (click)=\"clear()\">\n            <span class=\"fas fa-times-circle t-fg--danger\"></span>&nbsp;\n            <span gpIcon [item]=\"item\"></span> {{item.label}}\n        </a>\n    </div>\n</div>\n",
            styles: [""]
        }),
        tslib_1.__param(0, Inject(ItemService))
    ], SimilarityFilterComponent);
    return SimilarityFilterComponent;
}());
export { SimilarityFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltaWxhcml0eS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvc2ltaWxhcml0eS9zaW1pbGFyaXR5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQ3RDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBUSxlQUFlLEVBQUUsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFekUsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVF6RDtJQVNJLG1DQUEwQyxPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBUHJELFFBQUcsR0FBZ0IsZUFBZSxDQUFDLFVBQVUsQ0FBQztRQUU5QyxZQUFPLEdBQStCLElBQUksWUFBWSxFQUFlLENBQUM7UUFFeEUsZ0JBQVcsR0FBYSxJQUFJLENBQUM7SUFHK0IsQ0FBQztJQUVyRSw0Q0FBUSxHQUFSLGNBQWEsQ0FBQztJQUVkLCtDQUFXLEdBQVgsVUFBYSxPQUF1QjtRQUFwQyxpQkFZQztRQVhHLElBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRTtZQUNqQixJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUN2QyxJQUFHLENBQUMsRUFBRTtnQkFBRSxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztpQkFDcEI7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO3FCQUNuQixJQUFJLENBQUUsVUFBQyxNQUFhLElBQU8sS0FBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ2pELEtBQUssQ0FBRSxVQUFDLEdBQVc7b0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsMENBQTBDLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2pFLENBQUMsQ0FBQyxDQUFDO2FBQ047U0FDSjtJQUNMLENBQUM7SUFHRCx5Q0FBSyxHQUFMO1FBQ0ksSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQzs7Z0RBeEJhLE1BQU0sU0FBQyxXQUFXOztJQVB0QjtRQUFULEtBQUssRUFBRTswREFBZ0Q7SUFDOUM7UUFBVCxLQUFLLEVBQUU7K0RBQW1CO0lBQ2pCO1FBQVQsTUFBTSxFQUFFOzhEQUF1RTtJQUp2RSx5QkFBeUI7UUFMckMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLHNCQUFzQjtZQUNoQyxvNUJBQTBDOztTQUUzQyxDQUFDO1FBVWdCLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtPQVR4Qix5QkFBeUIsQ0FrQ3JDO0lBQUQsZ0NBQUM7Q0FBQSxBQWxDRCxJQWtDQztTQWxDWSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsXG4gICAgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbmplY3Rcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJdGVtLCBRdWVyeVBhcmFtZXRlcnMsIEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Atc2ltaWxhcml0eS1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4vc2ltaWxhcml0eS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NpbWlsYXJpdHkuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTaW1pbGFyaXR5RmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuXG4gICAgQElucHV0KCkgIGtleSAgICAgOiBzdHJpbmcgPSBRdWVyeVBhcmFtZXRlcnMuU0lNSUxBUl9UTztcbiAgICBASW5wdXQoKSAgc2VsZWN0ZWQ6IHN0cmluZztcbiAgICBAT3V0cHV0KCkgb25FdmVudCA6IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PigpO1xuXG4gICAgcHVibGljICBpc0NvbGxhcHNlZCA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyAgICBpdGVtIDogSXRlbTtcblxuICAgIGNvbnN0cnVjdG9yKCBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBwcml2YXRlIHNlcnZpY2UgOiBJdGVtU2VydmljZSApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIG5nT25DaGFuZ2VzKCBjaGFuZ2VzIDogU2ltcGxlQ2hhbmdlcyApIHtcbiAgICAgICAgaWYoY2hhbmdlcy5zZWxlY3RlZCkge1xuICAgICAgICAgICAgbGV0IGlkID0gY2hhbmdlcy5zZWxlY3RlZC5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICBpZighaWQpIHRoaXMuaXRlbSA9IG51bGw7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlcnZpY2UuZ2V0KGlkKVxuICAgICAgICAgICAgICAgIC50aGVuKCAocmVzdWx0IDogSXRlbSkgPT4geyB0aGlzLml0ZW0gPSByZXN1bHQ7IH0pXG4gICAgICAgICAgICAgICAgLmNhdGNoKCAoZXJyIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJTaW1pbGFyaXR5RmlsdGVyLk9uQ2hhbmdlKCdzZWxlY3RlZCcpIDogXCIsIGVycik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGNsZWFyKCkge1xuICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgIGNoYW5nZVt0aGlzLmtleV0gPSBudWxsO1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cbn1cbiJdfQ==