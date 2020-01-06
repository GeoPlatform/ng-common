import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QueryParameters } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
var KeywordFilterComponent = /** @class */ (function () {
    function KeywordFilterComponent() {
        this.key = QueryParameters.QUERY;
        this.placeholder = "Search GeoPlatform";
        this.onEvent = new EventEmitter();
    }
    KeywordFilterComponent.prototype.ngOnInit = function () { };
    KeywordFilterComponent.prototype.onKeyUp = function ($event) {
        var text = $event.target.value;
        this.onValueChange(text);
    };
    KeywordFilterComponent.prototype.onValueChange = function (value) {
        var change = {};
        change[this.key] = value && value.length ? value : null;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    };
    tslib_1.__decorate([
        Input()
    ], KeywordFilterComponent.prototype, "key", void 0);
    tslib_1.__decorate([
        Input()
    ], KeywordFilterComponent.prototype, "searchString", void 0);
    tslib_1.__decorate([
        Input()
    ], KeywordFilterComponent.prototype, "placeholder", void 0);
    tslib_1.__decorate([
        Output()
    ], KeywordFilterComponent.prototype, "onEvent", void 0);
    KeywordFilterComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-keywords-filter',
            template: "\n<div class=\"input-group-slick flex-1\">\n    <span class=\"fas fa-search\"></span>\n    <input type=\"text\" class=\"form-control\"\n        placeholder=\"{{placeholder}}\"\n        [(ngModel)]=\"searchString\" (keyup.enter)=\"onKeyUp($event)\">\n    <button type=\"button\" class=\"btn btn-light\" title=\"Clear keywords\"\n        *ngIf=\"searchString?.length\" (click)=\"searchString=null\">\n        <span class=\"fas fa-times\"></span>\n    </button>\n</div>\n\n<button type=\"button\" class=\"btn btn-secondary\"\n    [disabled]=\"!searchString||!searchString.length\"\n    (click)=\"onValueChange(searchString)\"\n    title=\"Search the GeoPlatform\">\n    Search\n</button>\n",
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}:host>:last-child{margin-left:1em}"]
        })
    ], KeywordFilterComponent);
    return KeywordFilterComponent;
}());
export { KeywordFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5d29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMva2V5d29yZC9rZXl3b3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDakQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPekQ7SUFPSTtRQUxTLFFBQUcsR0FBdUIsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUVoRCxnQkFBVyxHQUFlLG9CQUFvQixDQUFDO1FBQzlDLFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUV0RCxDQUFDO0lBRWpCLHlDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsd0NBQU8sR0FBUCxVQUFRLE1BQU07UUFDVixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCw4Q0FBYSxHQUFiLFVBQWUsS0FBSztRQUNoQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBbkJRO1FBQVIsS0FBSyxFQUFFO3VEQUFpRDtJQUNoRDtRQUFSLEtBQUssRUFBRTtnRUFBeUI7SUFDeEI7UUFBUixLQUFLLEVBQUU7K0RBQWdEO0lBQzlDO1FBQVQsTUFBTSxFQUFFOzJEQUE2RDtJQUw3RCxzQkFBc0I7UUFMbEMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG9CQUFvQjtZQUM5QiwwckJBQXVDOztTQUV4QyxDQUFDO09BQ1csc0JBQXNCLENBc0JsQztJQUFELDZCQUFDO0NBQUEsQUF0QkQsSUFzQkM7U0F0Qlksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUXVlcnlQYXJhbWV0ZXJzIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLWtleXdvcmRzLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi9rZXl3b3JkLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4va2V5d29yZC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIEtleXdvcmRGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkga2V5ICAgICAgICAgICAgOiBzdHJpbmcgPSBRdWVyeVBhcmFtZXRlcnMuUVVFUlk7XG4gICAgQElucHV0KCkgc2VhcmNoU3RyaW5nICAgOiBzdHJpbmc7XG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXIgICAgOiBzdHJpbmcgPSBcIlNlYXJjaCBHZW9QbGF0Zm9ybVwiO1xuICAgIEBPdXRwdXQoKSBvbkV2ZW50ICAgICAgIDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHsgfVxuXG4gICAgb25LZXlVcCgkZXZlbnQpIHtcbiAgICAgICAgbGV0IHRleHQgPSAkZXZlbnQudGFyZ2V0LnZhbHVlO1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UodGV4dCk7XG4gICAgfVxuXG4gICAgb25WYWx1ZUNoYW5nZSggdmFsdWUgKSB7XG4gICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcbiAgICAgICAgY2hhbmdlW3RoaXMua2V5XSA9IHZhbHVlICYmIHZhbHVlLmxlbmd0aCA/IHZhbHVlIDogbnVsbDtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMub25FdmVudC5lbWl0KGV2ZW50KTtcbiAgICB9XG59XG4iXX0=