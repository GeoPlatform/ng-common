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
    KeywordFilterComponent.prototype.clear = function () {
        this.searchString = null;
        this.onValueChange(null);
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
            template: "\n<div class=\"input-group-slick flex-1\">\n    <span class=\"fas fa-search\"></span>\n    <input type=\"text\" class=\"form-control\"\n        placeholder=\"{{placeholder}}\"\n        [(ngModel)]=\"searchString\" (keyup.enter)=\"onKeyUp($event)\">\n    <button type=\"button\" class=\"btn btn-light\" title=\"Clear keywords\"\n        *ngIf=\"searchString?.length\" (click)=\"clear()\">\n        <span class=\"fas fa-times\"></span>\n    </button>\n</div>\n\n<button type=\"button\" class=\"btn btn-secondary\"\n    [disabled]=\"!searchString||!searchString.length\"\n    (click)=\"onValueChange(searchString)\"\n    title=\"Search the GeoPlatform\">\n    Search\n</button>\n",
            styles: [":host{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}:host>:last-child{margin-left:1em}"]
        })
    ], KeywordFilterComponent);
    return KeywordFilterComponent;
}());
export { KeywordFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5d29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMva2V5d29yZC9rZXl3b3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDakQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPekQ7SUFPSTtRQUxTLFFBQUcsR0FBdUIsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUVoRCxnQkFBVyxHQUFlLG9CQUFvQixDQUFDO1FBQzlDLFlBQU8sR0FBNkIsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUV0RCxDQUFDO0lBRWpCLHlDQUFRLEdBQVIsY0FBYSxDQUFDO0lBRWQsd0NBQU8sR0FBUCxVQUFRLE1BQU07UUFDVixJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7SUFFRCw4Q0FBYSxHQUFiLFVBQWUsS0FBSztRQUNoQixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsc0NBQUssR0FBTDtRQUNJLElBQUksQ0FBQyxZQUFZLEdBQUMsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQXhCUTtRQUFSLEtBQUssRUFBRTt1REFBaUQ7SUFDaEQ7UUFBUixLQUFLLEVBQUU7Z0VBQXlCO0lBQ3hCO1FBQVIsS0FBSyxFQUFFOytEQUFnRDtJQUM5QztRQUFULE1BQU0sRUFBRTsyREFBNkQ7SUFMN0Qsc0JBQXNCO1FBTGxDLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxvQkFBb0I7WUFDOUIsZ3JCQUF1Qzs7U0FFeEMsQ0FBQztPQUNXLHNCQUFzQixDQTJCbEM7SUFBRCw2QkFBQztDQUFBLEFBM0JELElBMkJDO1NBM0JZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFF1ZXJ5UGFyYW1ldGVycyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1rZXl3b3Jkcy1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4va2V5d29yZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2tleXdvcmQuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBLZXl3b3JkRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGtleSAgICAgICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlFVRVJZO1xuICAgIEBJbnB1dCgpIHNlYXJjaFN0cmluZyAgIDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyICAgIDogc3RyaW5nID0gXCJTZWFyY2ggR2VvUGxhdGZvcm1cIjtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIG9uS2V5VXAoJGV2ZW50KSB7XG4gICAgICAgIGxldCB0ZXh0ID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRleHQpO1xuICAgIH1cblxuICAgIG9uVmFsdWVDaGFuZ2UoIHZhbHVlICkge1xuICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgIGNoYW5nZVt0aGlzLmtleV0gPSB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPyB2YWx1ZSA6IG51bGw7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoU3RyaW5nPW51bGw7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZShudWxsKTtcbiAgICB9XG59XG4iXX0=