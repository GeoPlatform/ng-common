import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Query, QueryParameters, ItemTypes, ItemService } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../../event';
let ServiceTypeFilterComponent = class ServiceTypeFilterComponent {
    constructor(service) {
        this.service = service;
        //the key associated with this filter's selections
        this.key = QueryParameters.SERVICE_TYPES;
        //the current set of values
        this.selected = [];
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.types = [];
    }
    ngOnInit() {
        let query = new Query({
            type: 'dct:Standard',
            resourceType: 'ServiceType',
            fields: "availableVersions",
            size: 50,
            sort: 'label,asc'
        });
        this.service.search(query)
            .then((response) => {
            this.types = response.results;
        })
            .catch((error) => {
            console.log("Error loading supported service types");
        });
    }
    ngOnDestroy() {
        this.types = null;
        // this.svcQuery = null;
        // this.serviceSvc = null;
        // this.serviceTypes = null;
        // this.serviceTypesError = null;
        // this.byType = null;
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(value) {
        return this.hasSelections() && this.selected.indexOf(value) >= 0;
    }
    getIndexOf(value) {
        return this.hasSelections() ? this.selected.indexOf(value) : -1;
    }
    isSupported() {
        if (this.query) {
            let types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.SERVICE) >= 0;
        }
        return false;
    }
    toggle(value) {
        let result = this.selected.slice(0);
        let idx = this.getIndexOf(value);
        if (idx >= 0) {
            result = result.splice(idx, 1);
        }
        else {
            result.push(value);
        }
        let change = {};
        change[this.key] = result;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
    clear() {
        if (!this.hasSelections())
            this.isCollapsed = !this.isCollapsed; //toggle collapsed state
        else {
            let change = {};
            change[this.key] = null;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event);
        }
    }
    getCount(value) {
        // var facet = this.service.getFacet("serviceTypes");
        // if(!facet) return '';
        // var valObj = facet.buckets.find(function(v) { return v.label===value; });
        // if(!valObj) return '';
        // return valObj.count;
        return 0;
    }
};
ServiceTypeFilterComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
tslib_1.__decorate([
    Input()
], ServiceTypeFilterComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Input()
], ServiceTypeFilterComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    Input()
], ServiceTypeFilterComponent.prototype, "query", void 0);
tslib_1.__decorate([
    Output()
], ServiceTypeFilterComponent.prototype, "onEvent", void 0);
ServiceTypeFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-service-type-filter',
        template: "<div class=\"card o-query-filter\" *ngIf=\"isSupported()\">\n    <div class=\"a-heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\" [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\"></span>\n        </button>\n        Filter by Service Types\n    </div>\n    <div class=\"o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n\n        <a class=\"m-facet active\" (click)=\"clear()\" *ngIf=\"!hasSelections()\">\n            <span *ngIf=\"isCollapsed\">No values selected</span>\n            <span *ngIf=\"!isCollapsed\">Any Service Type</span>\n        </a>\n        <a class=\"m-facet\" (click)=\"clear()\" *ngIf=\"hasSelections()\">Clear selections</a>\n        <a *ngFor=\"let type of types\" class=\"m-facet\"\n            (click)=\"toggle(type.id)\" [ngClass]=\"{active:isSelected(type.id)}\">\n            <span class=\"fas fa-check\" *ngIf=\"isSelected(type.id)\"></span>\n            <span class=\"fas fa-square t-fg--gray-lt\" *ngIf=\"!isSelected(type.id)\"></span>\n            <span class=\"badge badge-secondary\">{{getCount(type.id)}}</span>\n            {{type.label}}\n        </a>\n    </div>\n</div>\n\n\n<!-- <div class=\"o-query-filter card\">\n    <div class=\"a-heading l-flex-container flex-justify-between flex-align-center\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\" [ngClass]=\"{'fa-minus':!isCollapsed,'fa-plus':isCollapsed}\"></span>\n        </button>\n        <span class=\"flex-1\">Filter by Service</span>\n    </div>\n    <div class=\"card-content\">\n        <div class=\"o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n            <div class=\"m-facet\">\n                <div class=\"input-group-slick\">\n                    <input name=\"scheme-typeahead\" type=\"text\" class=\"form-control\"\n                        ng-model=\"typeaheadValue\"\n                        ng-change=\"updateValues(typeaheadValue)\"\n                        ng-model-options=\"{debounce:200}\"\n                        placeholder=\"Search Services\">\n                    <span class=\"fas fa-times\"\n                        title=\"Clear query\"\n                        ng-if=\"typeaheadValue.length\"\n                        (click)=\"updateValues(typeaheadValue=null)\">\n                    </span>\n                </div>\n            </div>\n            <a class=\"m-facet\" (click)=\"clear()\"\n                [ngClass]=\"{active:!hasSelections()}\">\n                <span class=\"fas\"\n                    [ngClass]=\"{'fa-check':!hasSelections(), 'fa-square t-fg--gray-lt':hasSelections()}\">\n                </span>\n                Any Service\n            </a>\n            <a  *ngFor=\"let value of values\"\n                class=\"m-facet\"\n                (click)=\"toggle(value)\"\n                [ngClass]=\"{active:isSelected(value)}\">\n                <span class=\"fas\"\n                    [ngClass]=\"{'fa-check':isSelected(value),'fa-square t-fg--gray-lt':!isSelected(value)}\"></span>\n                {{value.label}}\n            </a>\n        </div>\n    </div>\n</div> -->\n",
        styles: [""]
    }),
    tslib_1.__param(0, Inject(ItemService))
], ServiceTypeFilterComponent);
export { ServiceTypeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS10eXBlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvc2VydmljZS10eXBlcy9zZXJ2aWNlLXR5cGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFDSCxLQUFLLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBUSxXQUFXLEVBQ3ZELE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU96RCxJQUFhLDBCQUEwQixHQUF2QyxNQUFhLDBCQUEwQjtJQWNuQyxZQUNpQyxPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBYnRELGtEQUFrRDtRQUN4QyxRQUFHLEdBQWtCLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDN0QsMkJBQTJCO1FBQ2pCLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFJMUIsWUFBTyxHQUFpQyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBRTFFLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLFVBQUssR0FBa0IsRUFBRSxDQUFDO0lBSTlCLENBQUM7SUFFTCxRQUFRO1FBQ0osSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUM7WUFDbEIsSUFBSSxFQUFZLGNBQWM7WUFDOUIsWUFBWSxFQUFJLGFBQWE7WUFDN0IsTUFBTSxFQUFVLG1CQUFtQjtZQUNuQyxJQUFJLEVBQVksRUFBRTtZQUNsQixJQUFJLEVBQVksV0FBVztTQUM5QixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDekIsSUFBSSxDQUFFLENBQUMsUUFB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O1FBQ3pCLHVCQUF1QjtRQUN2QixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7Q0ErRkosQ0FBQTs7NENBakxRLE1BQU0sU0FBQyxXQUFXOztBQVpiO0lBQVQsS0FBSyxFQUFFO3VEQUFxRDtBQUVuRDtJQUFULEtBQUssRUFBRTs0REFBNEI7QUFHMUI7SUFBVCxLQUFLLEVBQUU7eURBQW9CO0FBQ2xCO0lBQVQsTUFBTSxFQUFFOzJEQUF5RTtBQVR6RSwwQkFBMEI7SUFMdEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLHdCQUF3QjtRQUNsQyx3MUdBQTZDOztLQUVoRCxDQUFDO0lBZ0JPLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQWZmLDBCQUEwQixDQWdNdEM7U0FoTVksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIE9uSW5pdCwgT25EZXN0cm95LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgUXVlcnksIFF1ZXJ5UGFyYW1ldGVycywgSXRlbVR5cGVzLCBJdGVtLCBJdGVtU2VydmljZSwgU2VhcmNoUmVzdWx0c1xufSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZ3Atc2VydmljZS10eXBlLWZpbHRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3NlcnZpY2UtdHlwZXMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL3NlcnZpY2UtdHlwZXMuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBTZXJ2aWNlVHlwZUZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIC8vdGhlIGtleSBhc3NvY2lhdGVkIHdpdGggdGhpcyBmaWx0ZXIncyBzZWxlY3Rpb25zXG4gICAgQElucHV0KCkgIGtleSAgICAgICA6IHN0cmluZyA9IFF1ZXJ5UGFyYW1ldGVycy5TRVJWSUNFX1RZUEVTO1xuICAgIC8vdGhlIGN1cnJlbnQgc2V0IG9mIHZhbHVlc1xuICAgIEBJbnB1dCgpICBzZWxlY3RlZCAgOiBzdHJpbmdbXSA9IFtdO1xuICAgIC8vdGhlIHF1ZXJ5IGJlaW5nIGFmZmVjdGVkIGJ5IHRoaXMgZmlsdGVyJ3Mgc2VsZWN0aW9uc1xuICAgIC8vIHVzZWQgdG8gZGV0ZXJtaW5lIGlmIHRoaXMgZmlsdGVyIHNob3VsZCBiZSBzaG93biBvciBub3RcbiAgICBASW5wdXQoKSAgcXVlcnkgICAgIDogUXVlcnk7XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICA6IEV2ZW50RW1pdHRlcjxTZWFyY2hFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PigpO1xuXG4gICAgcHVibGljICBpc0NvbGxhcHNlZCA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyAgdHlwZXMgICAgICAgOiBJdGVtW10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBwcml2YXRlIHNlcnZpY2UgOiBJdGVtU2VydmljZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgbGV0IHF1ZXJ5ID0gbmV3IFF1ZXJ5KHtcbiAgICAgICAgICAgIHR5cGU6ICAgICAgICAgICAnZGN0OlN0YW5kYXJkJyxcbiAgICAgICAgICAgIHJlc291cmNlVHlwZTogICAnU2VydmljZVR5cGUnLFxuICAgICAgICAgICAgZmllbGRzOiAgICAgICAgIFwiYXZhaWxhYmxlVmVyc2lvbnNcIixcbiAgICAgICAgICAgIHNpemU6ICAgICAgICAgICA1MCxcbiAgICAgICAgICAgIHNvcnQ6ICAgICAgICAgICAnbGFiZWwsYXNjJ1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLnNlYXJjaChxdWVyeSlcbiAgICAgICAgLnRoZW4oIChyZXNwb25zZSA6IFNlYXJjaFJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgIHRoaXMudHlwZXMgPSByZXNwb25zZS5yZXN1bHRzO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIChlcnJvciA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGxvYWRpbmcgc3VwcG9ydGVkIHNlcnZpY2UgdHlwZXNcIik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95ICgpIHtcbiAgICAgICAgdGhpcy50eXBlcyA9IG51bGw7XG4gICAgICAgIC8vIHRoaXMuc3ZjUXVlcnkgPSBudWxsO1xuICAgICAgICAvLyB0aGlzLnNlcnZpY2VTdmMgPSBudWxsO1xuICAgICAgICAvLyB0aGlzLnNlcnZpY2VUeXBlcyA9IG51bGw7XG4gICAgICAgIC8vIHRoaXMuc2VydmljZVR5cGVzRXJyb3IgPSBudWxsO1xuICAgICAgICAvLyB0aGlzLmJ5VHlwZSA9IG51bGw7XG4gICAgfVxuXG4gICAgaGFzU2VsZWN0aW9ucyAoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgaXNTZWxlY3RlZCAodmFsdWUgOiBhbnkpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdGlvbnMoKSAmJiB0aGlzLnNlbGVjdGVkLmluZGV4T2YodmFsdWUpID49IDA7XG4gICAgfVxuXG4gICAgZ2V0SW5kZXhPZih2YWx1ZSA6IGFueSkgOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNTZWxlY3Rpb25zKCkgPyB0aGlzLnNlbGVjdGVkLmluZGV4T2YodmFsdWUpIDogLTE7XG4gICAgfVxuXG4gICAgaXNTdXBwb3J0ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICBpZih0aGlzLnF1ZXJ5KSB7XG4gICAgICAgICAgICBsZXQgdHlwZXMgPSB0aGlzLnF1ZXJ5LmdldFR5cGVzKCk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZXMgJiYgdHlwZXMubGVuZ3RoICYmIHR5cGVzLmluZGV4T2YoSXRlbVR5cGVzLlNFUlZJQ0UpPj0wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0b2dnbGUgKHZhbHVlIDogYW55KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnNlbGVjdGVkLnNsaWNlKDApO1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5nZXRJbmRleE9mKHZhbHVlKTtcbiAgICAgICAgaWYoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcbiAgICAgICAgY2hhbmdlW3RoaXMua2V5XSA9IHJlc3VsdDtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIGlmKCF0aGlzLmhhc1NlbGVjdGlvbnMoKSlcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSAhdGhpcy5pc0NvbGxhcHNlZDsgLy90b2dnbGUgY29sbGFwc2VkIHN0YXRlXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICAgICAgY2hhbmdlW3RoaXMua2V5XSA9IG51bGw7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvdW50ICh2YWx1ZSA6IGFueSkgOiBudW1iZXIge1xuICAgICAgICAvLyB2YXIgZmFjZXQgPSB0aGlzLnNlcnZpY2UuZ2V0RmFjZXQoXCJzZXJ2aWNlVHlwZXNcIik7XG4gICAgICAgIC8vIGlmKCFmYWNldCkgcmV0dXJuICcnO1xuICAgICAgICAvLyB2YXIgdmFsT2JqID0gZmFjZXQuYnVja2V0cy5maW5kKGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHYubGFiZWw9PT12YWx1ZTsgfSk7XG4gICAgICAgIC8vIGlmKCF2YWxPYmopIHJldHVybiAnJztcbiAgICAgICAgLy8gcmV0dXJuIHZhbE9iai5jb3VudDtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG5cblxuXG4vKlxuICAgIC8vIGlzU3VwcG9ydGVkICgpIHtcbiAgICAvLyAgICAgbGV0IG9ialR5cGVzID0gdGhpcy5zZXJ2aWNlLmdldFR5cGVzKCk7XG4gICAgLy8gICAgIHJldHVybiBvYmpUeXBlcyAmJiAoXG4gICAgLy8gICAgICAgICB+b2JqVHlwZXMuaW5kZXhPZiggQVBJQ2xpZW50Lkl0ZW1UeXBlcy5EQVRBU0VUICkgfHxcbiAgICAvLyAgICAgICAgIH5vYmpUeXBlcy5pbmRleE9mKCBBUElDbGllbnQuSXRlbVR5cGVzLkxBWUVSIClcbiAgICAvLyAgICAgKTtcbiAgICAvLyB9XG5cbiAgICBnZXRWYWx1ZSgpIDogYW55IHtcbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZS5nZXRTZXJ2aWNlKCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHNldFZhbHVlKCB2YWx1ZSA6IGFueSApIHtcbiAgICAgICAgLy8gdGhpcy5zZXJ2aWNlLnNldFNlcnZpY2UodmFsdWUpO1xuICAgICAgICAvLyB0aGlzLnN2Y0luc3RWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAvL1xuICAgICAgICAvLyBpZighdGhpcy5oYXNTZWxlY3Rpb25zKCkpXG4gICAgICAgIC8vIHRoaXMudmFsdWVzID0gW107XG4gICAgfVxuXG4gICAgaGFzU2VsZWN0aW9ucyAoKSA6IGJvb2xlYW4ge1xuICAgICAgICAvLyByZXR1cm4gISF0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkICggdmFsdWUgOiBhbnkgKSB7XG4gICAgICAgIC8vIGxldCBjdXJyZW50ID0gdGhpcy5nZXRWYWx1ZSgpO1xuICAgICAgICAvLyBpZighY3VycmVudCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyByZXR1cm4gY3VycmVudCA9PT0gdmFsdWUuaWQ7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB0b2dnbGUgKCB2YWx1ZSA6IGFueSApIHtcbiAgICAgICAgLy8gbGV0IHZhbCA9IHZhbHVlO1xuICAgICAgICAvLyBpZih0aGlzLmlzU2VsZWN0ZWQodmFsdWUpKSB7XG4gICAgICAgIC8vICAgICB2YWwgPSBudWxsO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIHRoaXMuc2V0VmFsdWUodmFsKTtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIGlmKCF0aGlzLmhhc1NlbGVjdGlvbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9ICF0aGlzLmlzQ29sbGFwc2VkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvdW50ICggdmFsdWUgOiBhbnkgKSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cblxuXG4gICAgdXBkYXRlVmFsdWVzIChxdWVyeSA6IFF1ZXJ5KSB7XG5cbiAgICAgICAgLy8gaWYoIXF1ZXJ5IHx8ICFxdWVyeS5sZW5ndGgpIHtcbiAgICAgICAgLy8gICAgIHRoaXMudmFsdWVzID0gdGhpcy52YWx1ZXMuZmlsdGVyKCB2ID0+IHRoaXMuaXNTZWxlY3RlZCh2KSApO1xuICAgICAgICAvLyAgICAgcmV0dXJuO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHRoaXMuc3ZjUXVlcnkucShxdWVyeSk7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIHJldHVybiB0aGlzLnNlcnZpY2VTdmMuc2VhcmNoKHRoaXMuc3ZjUXVlcnkpXG4gICAgICAgIC8vIC50aGVuKCAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgLy8gICAgIHRoaXMuJHRpbWVvdXQoICgpID0+IHtcbiAgICAgICAgLy8gICAgICAgICBsZXQgbmV3VmFsdWVzID0gcmVzcG9uc2UucmVzdWx0cztcbiAgICAgICAgLy8gICAgICAgICBpZih0aGlzLmhhc1NlbGVjdGlvbnMoKSAmJiB0aGlzLnZhbHVlcyAmJiB0aGlzLnZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gICAgICAgICAgICAgbGV0IGV4aXN0aW5nID0gdGhpcy52YWx1ZXMuZmlsdGVyKCB2ID0+IHtcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vZmluZCBleGlzdGluZyB2YWx1ZXMgdGhhdCBhcmUgc2VsZWN0ZWRcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzU2VsZWN0ZWQodikgJiZcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIGJ1dCBub3QgaW4gbmV3IHNldCBvZiB2YWx1ZXNcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICFuZXdWYWx1ZXMuZmlsdGVyKCBudiA9PiBudi5pZCA9PT0gdi5pZCkubGVuZ3RoO1xuICAgICAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAgICAgLy8gICAgICAgICAgICAgbmV3VmFsdWVzID0gZXhpc3RpbmcuY29uY2F0KG5ld1ZhbHVlcyk7XG4gICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAvLyAgICAgICAgIHRoaXMudmFsdWVzID0gbmV3VmFsdWVzO1xuICAgICAgICAvLyAgICAgfSk7XG4gICAgICAgIC8vIH0pXG4gICAgICAgIC8vIC5jYXRjaCggKGVycm9yKSA9PiB7XG4gICAgICAgIC8vICAgICBsZXQgZXJyID0gKGVycm9yICYmIGVycm9yLm1lc3NhZ2UpID8gZXJyb3IgOlxuICAgICAgICAvLyAgICAgKGVycm9yICYmIGVycm9yLmRhdGEpID8gZXJyb3IuZGF0YSA6IHtcbiAgICAgICAgLy8gICAgICAgICBtZXNzYWdlOiBcInNvbWV0aGluZyB1bmV4cGVjdGVkIGNhbWUgYmFjayBmcm9tIEdlb1BsYXRmb3JtIEFQSVwiXG4gICAgICAgIC8vICAgICB9O1xuICAgICAgICAvLyAgICAgY29uc29sZS5sb2coXCJBbiBlcnJvciBvY2N1cnJlZCBzZWFyY2hpbmcgU2VydmljZXMuLi5cIik7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhlcnIubWVzc2FnZSk7XG4gICAgICAgIC8vIH0pO1xuICAgIH1cbiovXG59XG4iXX0=