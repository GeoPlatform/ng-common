import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Query, QueryParameters, ItemTypes, ItemService } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../../event';
var ServiceTypeFilterComponent = /** @class */ (function () {
    function ServiceTypeFilterComponent(service) {
        this.service = service;
        //the key associated with this filter's selections
        this.key = QueryParameters.SERVICE_TYPES;
        //the current set of values
        this.selected = [];
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.types = [];
    }
    ServiceTypeFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        var query = new Query({
            type: 'dct:Standard',
            resourceType: 'ServiceType',
            fields: "availableVersions",
            size: 50,
            sort: 'label,asc'
        });
        this.service.search(query)
            .then(function (response) {
            _this.types = response.results;
        })
            .catch(function (error) {
            console.log("Error loading supported service types");
        });
    };
    ServiceTypeFilterComponent.prototype.ngOnDestroy = function () {
        this.types = null;
        // this.svcQuery = null;
        // this.serviceSvc = null;
        // this.serviceTypes = null;
        // this.serviceTypesError = null;
        // this.byType = null;
    };
    ServiceTypeFilterComponent.prototype.hasSelections = function () {
        return this.selected && this.selected.length > 0;
    };
    ServiceTypeFilterComponent.prototype.isSelected = function (value) {
        return this.hasSelections() && this.selected.indexOf(value) >= 0;
    };
    ServiceTypeFilterComponent.prototype.getIndexOf = function (value) {
        return this.hasSelections() ? this.selected.indexOf(value) : -1;
    };
    ServiceTypeFilterComponent.prototype.isSupported = function () {
        if (this.query) {
            var types = this.query.getTypes();
            return types && types.length && types.indexOf(ItemTypes.SERVICE) >= 0;
        }
        return false;
    };
    ServiceTypeFilterComponent.prototype.toggle = function (value) {
        var result = this.selected.slice(0);
        var idx = this.getIndexOf(value);
        if (idx >= 0) {
            result = result.splice(idx, 1);
        }
        else {
            result.push(value);
        }
        var change = {};
        change[this.key] = result;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    ServiceTypeFilterComponent.prototype.clear = function () {
        if (!this.hasSelections())
            this.isCollapsed = !this.isCollapsed; //toggle collapsed state
        else {
            var change = {};
            change[this.key] = null;
            var event_1 = new SearchEvent(EventTypes.QUERY, change);
            this.onEvent.emit(event_1);
        }
    };
    ServiceTypeFilterComponent.prototype.getCount = function (value) {
        // var facet = this.service.getFacet("serviceTypes");
        // if(!facet) return '';
        // var valObj = facet.buckets.find(function(v) { return v.label===value; });
        // if(!valObj) return '';
        // return valObj.count;
        return 0;
    };
    ServiceTypeFilterComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
    ]; };
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
    return ServiceTypeFilterComponent;
}());
export { ServiceTypeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS10eXBlcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvc2VydmljZS10eXBlcy9zZXJ2aWNlLXR5cGVzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xHLE9BQU8sRUFDSCxLQUFLLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBUSxXQUFXLEVBQ3ZELE1BQU0scUJBQXFCLENBQUM7QUFFN0IsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQU96RDtJQWNJLG9DQUNpQyxPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBYnRELGtEQUFrRDtRQUN4QyxRQUFHLEdBQWtCLGVBQWUsQ0FBQyxhQUFhLENBQUM7UUFDN0QsMkJBQTJCO1FBQ2pCLGFBQVEsR0FBZSxFQUFFLENBQUM7UUFJMUIsWUFBTyxHQUFpQyxJQUFJLFlBQVksRUFBZSxDQUFDO1FBRTFFLGdCQUFXLEdBQWEsSUFBSSxDQUFDO1FBQzdCLFVBQUssR0FBa0IsRUFBRSxDQUFDO0lBSTlCLENBQUM7SUFFTCw2Q0FBUSxHQUFSO1FBQUEsaUJBZUM7UUFkRyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQztZQUNsQixJQUFJLEVBQVksY0FBYztZQUM5QixZQUFZLEVBQUksYUFBYTtZQUM3QixNQUFNLEVBQVUsbUJBQW1CO1lBQ25DLElBQUksRUFBWSxFQUFFO1lBQ2xCLElBQUksRUFBWSxXQUFXO1NBQzlCLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUN6QixJQUFJLENBQUUsVUFBQyxRQUF3QjtZQUM1QixLQUFJ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NEU7UUFDNUUseUJBQXlCO1FBQ3pCLHVCQUF1QjtRQUN2QixPQUFPLENBQUMsQ0FBQztJQUNiLENBQUM7O2dEQWxGSSxNQUFNLFNBQUMsV0FBVzs7SUFaYjtRQUFULEtBQUssRUFBRTsyREFBcUQ7SUFFbkQ7UUFBVCxLQUFLLEVBQUU7Z0VBQTRCO0lBRzFCO1FBQVQsS0FBSyxFQUFFOzZEQUFvQjtJQUNsQjtRQUFULE1BQU0sRUFBRTsrREFBeUU7SUFUekUsMEJBQTBCO1FBTHRDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSx3QkFBd0I7WUFDbEMsdzFHQUE2Qzs7U0FFaEQsQ0FBQztRQWdCTyxtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FmZiwwQkFBMEIsQ0FnTXRDO0lBQUQsaUNBQUM7Q0FBQSxBQWhNRCxJQWdNQztTQWhNWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25Jbml0LCBPbkRlc3Ryb3ksIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgICBRdWVyeSwgUXVlcnlQYXJhbWV0ZXJzLCBJdGVtVHlwZXMsIEl0ZW0sIEl0ZW1TZXJ2aWNlLCBTZWFyY2hSZXN1bHRzXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdncC1zZXJ2aWNlLXR5cGUtZmlsdGVyJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VydmljZS10eXBlcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vc2VydmljZS10eXBlcy5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIFNlcnZpY2VUeXBlRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLy90aGUga2V5IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGZpbHRlcidzIHNlbGVjdGlvbnNcbiAgICBASW5wdXQoKSAga2V5ICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlNFUlZJQ0VfVFlQRVM7XG4gICAgLy90aGUgY3VycmVudCBzZXQgb2YgdmFsdWVzXG4gICAgQElucHV0KCkgIHNlbGVjdGVkICA6IHN0cmluZ1tdID0gW107XG4gICAgLy90aGUgcXVlcnkgYmVpbmcgYWZmZWN0ZWQgYnkgdGhpcyBmaWx0ZXIncyBzZWxlY3Rpb25zXG4gICAgLy8gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhpcyBmaWx0ZXIgc2hvdWxkIGJlIHNob3duIG9yIG5vdFxuICAgIEBJbnB1dCgpICBxdWVyeSAgICAgOiBRdWVyeTtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgIDogRXZlbnRFbWl0dGVyPFNlYXJjaEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8U2VhcmNoRXZlbnQ+KCk7XG5cbiAgICBwdWJsaWMgIGlzQ29sbGFwc2VkIDogYm9vbGVhbiA9IHRydWU7XG4gICAgcHVibGljICB0eXBlcyAgICAgICA6IEl0ZW1bXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSXRlbVNlcnZpY2UpIHByaXZhdGUgc2VydmljZSA6IEl0ZW1TZXJ2aWNlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBsZXQgcXVlcnkgPSBuZXcgUXVlcnkoe1xuICAgICAgICAgICAgdHlwZTogICAgICAgICAgICdkY3Q6U3RhbmRhcmQnLFxuICAgICAgICAgICAgcmVzb3VyY2VUeXBlOiAgICdTZXJ2aWNlVHlwZScsXG4gICAgICAgICAgICBmaWVsZHM6ICAgICAgICAgXCJhdmFpbGFibGVWZXJzaW9uc1wiLFxuICAgICAgICAgICAgc2l6ZTogICAgICAgICAgIDUwLFxuICAgICAgICAgICAgc29ydDogICAgICAgICAgICdsYWJlbCxhc2MnXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VhcmNoKHF1ZXJ5KVxuICAgICAgICAudGhlbiggKHJlc3BvbnNlIDogU2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgdGhpcy50eXBlcyA9IHJlc3BvbnNlLnJlc3VsdHM7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggKGVycm9yIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgbG9hZGluZyBzdXBwb3J0ZWQgc2VydmljZSB0eXBlc1wiKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3kgKCkge1xuICAgICAgICB0aGlzLnR5cGVzID0gbnVsbDtcbiAgICAgICAgLy8gdGhpcy5zdmNRdWVyeSA9IG51bGw7XG4gICAgICAgIC8vIHRoaXMuc2VydmljZVN2YyA9IG51bGw7XG4gICAgICAgIC8vIHRoaXMuc2VydmljZVR5cGVzID0gbnVsbDtcbiAgICAgICAgLy8gdGhpcy5zZXJ2aWNlVHlwZXNFcnJvciA9IG51bGw7XG4gICAgICAgIC8vIHRoaXMuYnlUeXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICBoYXNTZWxlY3Rpb25zICgpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkICh2YWx1ZSA6IGFueSkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzU2VsZWN0aW9ucygpICYmIHRoaXMuc2VsZWN0ZWQuaW5kZXhPZih2YWx1ZSkgPj0gMDtcbiAgICB9XG5cbiAgICBnZXRJbmRleE9mKHZhbHVlIDogYW55KSA6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc1NlbGVjdGlvbnMoKSA/IHRoaXMuc2VsZWN0ZWQuaW5kZXhPZih2YWx1ZSkgOiAtMTtcbiAgICB9XG5cbiAgICBpc1N1cHBvcnRlZCgpIDogYm9vbGVhbiB7XG4gICAgICAgIGlmKHRoaXMucXVlcnkpIHtcbiAgICAgICAgICAgIGxldCB0eXBlcyA9IHRoaXMucXVlcnkuZ2V0VHlwZXMoKTtcbiAgICAgICAgICAgIHJldHVybiB0eXBlcyAmJiB0eXBlcy5sZW5ndGggJiYgdHlwZXMuaW5kZXhPZihJdGVtVHlwZXMuU0VSVklDRSk+PTA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRvZ2dsZSAodmFsdWUgOiBhbnkpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHRoaXMuc2VsZWN0ZWQuc2xpY2UoMCk7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLmdldEluZGV4T2YodmFsdWUpO1xuICAgICAgICBpZihpZHggPj0gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gcmVzdWx0LnNwbGljZShpZHgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2godmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICBjaGFuZ2VbdGhpcy5rZXldID0gcmVzdWx0O1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgaWYoIXRoaXMuaGFzU2VsZWN0aW9ucygpKVxuICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9ICF0aGlzLmlzQ29sbGFwc2VkOyAvL3RvZ2dsZSBjb2xsYXBzZWQgc3RhdGVcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgICAgICBjaGFuZ2VbdGhpcy5rZXldID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q291bnQgKHZhbHVlIDogYW55KSA6IG51bWJlciB7XG4gICAgICAgIC8vIHZhciBmYWNldCA9IHRoaXMuc2VydmljZS5nZXRGYWNldChcInNlcnZpY2VUeXBlc1wiKTtcbiAgICAgICAgLy8gaWYoIWZhY2V0KSByZXR1cm4gJyc7XG4gICAgICAgIC8vIHZhciB2YWxPYmogPSBmYWNldC5idWNrZXRzLmZpbmQoZnVuY3Rpb24odikgeyByZXR1cm4gdi5sYWJlbD09PXZhbHVlOyB9KTtcbiAgICAgICAgLy8gaWYoIXZhbE9iaikgcmV0dXJuICcnO1xuICAgICAgICAvLyByZXR1cm4gdmFsT2JqLmNvdW50O1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cblxuXG5cbi8qXG4gICAgLy8gaXNTdXBwb3J0ZWQgKCkge1xuICAgIC8vICAgICBsZXQgb2JqVHlwZXMgPSB0aGlzLnNlcnZpY2UuZ2V0VHlwZXMoKTtcbiAgICAvLyAgICAgcmV0dXJuIG9ialR5cGVzICYmIChcbiAgICAvLyAgICAgICAgIH5vYmpUeXBlcy5pbmRleE9mKCBBUElDbGllbnQuSXRlbVR5cGVzLkRBVEFTRVQgKSB8fFxuICAgIC8vICAgICAgICAgfm9ialR5cGVzLmluZGV4T2YoIEFQSUNsaWVudC5JdGVtVHlwZXMuTEFZRVIgKVxuICAgIC8vICAgICApO1xuICAgIC8vIH1cblxuICAgIGdldFZhbHVlKCkgOiBhbnkge1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5zZXJ2aWNlLmdldFNlcnZpY2UoKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgc2V0VmFsdWUoIHZhbHVlIDogYW55ICkge1xuICAgICAgICAvLyB0aGlzLnNlcnZpY2Uuc2V0U2VydmljZSh2YWx1ZSk7XG4gICAgICAgIC8vIHRoaXMuc3ZjSW5zdFZhbHVlID0gdmFsdWU7XG4gICAgICAgIC8vXG4gICAgICAgIC8vIGlmKCF0aGlzLmhhc1NlbGVjdGlvbnMoKSlcbiAgICAgICAgLy8gdGhpcy52YWx1ZXMgPSBbXTtcbiAgICB9XG5cbiAgICBoYXNTZWxlY3Rpb25zICgpIDogYm9vbGVhbiB7XG4gICAgICAgIC8vIHJldHVybiAhIXRoaXMuZ2V0VmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQgKCB2YWx1ZSA6IGFueSApIHtcbiAgICAgICAgLy8gbGV0IGN1cnJlbnQgPSB0aGlzLmdldFZhbHVlKCk7XG4gICAgICAgIC8vIGlmKCFjdXJyZW50KSByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIHJldHVybiBjdXJyZW50ID09PSB2YWx1ZS5pZDtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRvZ2dsZSAoIHZhbHVlIDogYW55ICkge1xuICAgICAgICAvLyBsZXQgdmFsID0gdmFsdWU7XG4gICAgICAgIC8vIGlmKHRoaXMuaXNTZWxlY3RlZCh2YWx1ZSkpIHtcbiAgICAgICAgLy8gICAgIHZhbCA9IG51bGw7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gdGhpcy5zZXRWYWx1ZSh2YWwpO1xuICAgIH1cblxuICAgIGNsZWFyICgpIHtcbiAgICAgICAgaWYoIXRoaXMuaGFzU2VsZWN0aW9ucygpKSB7XG4gICAgICAgICAgICB0aGlzLmlzQ29sbGFwc2VkID0gIXRoaXMuaXNDb2xsYXBzZWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKG51bGwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0Q291bnQgKCB2YWx1ZSA6IGFueSApIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuXG5cbiAgICB1cGRhdGVWYWx1ZXMgKHF1ZXJ5IDogUXVlcnkpIHtcblxuICAgICAgICAvLyBpZighcXVlcnkgfHwgIXF1ZXJ5Lmxlbmd0aCkge1xuICAgICAgICAvLyAgICAgdGhpcy52YWx1ZXMgPSB0aGlzLnZhbHVlcy5maWx0ZXIoIHYgPT4gdGhpcy5pc1NlbGVjdGVkKHYpICk7XG4gICAgICAgIC8vICAgICByZXR1cm47XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gdGhpcy5zdmNRdWVyeS5xKHF1ZXJ5KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gcmV0dXJuIHRoaXMuc2VydmljZVN2Yy5zZWFyY2godGhpcy5zdmNRdWVyeSlcbiAgICAgICAgLy8gLnRoZW4oIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAvLyAgICAgdGhpcy4kdGltZW91dCggKCkgPT4ge1xuICAgICAgICAvLyAgICAgICAgIGxldCBuZXdWYWx1ZXMgPSByZXNwb25zZS5yZXN1bHRzO1xuICAgICAgICAvLyAgICAgICAgIGlmKHRoaXMuaGFzU2VsZWN0aW9ucygpICYmIHRoaXMudmFsdWVzICYmIHRoaXMudmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgZXhpc3RpbmcgPSB0aGlzLnZhbHVlcy5maWx0ZXIoIHYgPT4ge1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy9maW5kIGV4aXN0aW5nIHZhbHVlcyB0aGF0IGFyZSBzZWxlY3RlZFxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNTZWxlY3RlZCh2KSAmJlxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLy8gYnV0IG5vdCBpbiBuZXcgc2V0IG9mIHZhbHVlc1xuICAgICAgICAvLyAgICAgICAgICAgICAgICAgIW5ld1ZhbHVlcy5maWx0ZXIoIG52ID0+IG52LmlkID09PSB2LmlkKS5sZW5ndGg7XG4gICAgICAgIC8vICAgICAgICAgICAgIH0pO1xuICAgICAgICAvLyAgICAgICAgICAgICBuZXdWYWx1ZXMgPSBleGlzdGluZy5jb25jYXQobmV3VmFsdWVzKTtcbiAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgIC8vICAgICAgICAgdGhpcy52YWx1ZXMgPSBuZXdWYWx1ZXM7XG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSlcbiAgICAgICAgLy8gLmNhdGNoKCAoZXJyb3IpID0+IHtcbiAgICAgICAgLy8gICAgIGxldCBlcnIgPSAoZXJyb3IgJiYgZXJyb3IubWVzc2FnZSkgPyBlcnJvciA6XG4gICAgICAgIC8vICAgICAoZXJyb3IgJiYgZXJyb3IuZGF0YSkgPyBlcnJvci5kYXRhIDoge1xuICAgICAgICAvLyAgICAgICAgIG1lc3NhZ2U6IFwic29tZXRoaW5nIHVuZXhwZWN0ZWQgY2FtZSBiYWNrIGZyb20gR2VvUGxhdGZvcm0gQVBJXCJcbiAgICAgICAgLy8gICAgIH07XG4gICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhcIkFuIGVycm9yIG9jY3VycmVkIHNlYXJjaGluZyBTZXJ2aWNlcy4uLlwiKTtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGVyci5tZXNzYWdlKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuKi9cbn1cbiJdfQ==