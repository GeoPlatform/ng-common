import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { QueryParameters } from "@geoplatform/client";
import { SearchEvent, EventTypes } from '../../../event';
let KeywordFilterComponent = class KeywordFilterComponent {
    constructor() {
        this.key = QueryParameters.QUERY;
        this.placeholder = "Search GeoPlatform";
        this.onEvent = new EventEmitter();
    }
    ngOnInit() { }
    onKeyUp($event) {
        let text = $event.target.value;
        this.onValueChange(text);
    }
    onValueChange(value) {
        let change = {};
        change[this.key] = value && value.length ? value : null;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }
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
export { KeywordFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5d29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMva2V5d29yZC9rZXl3b3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDakQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPekQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFPL0I7UUFMUyxRQUFHLEdBQXVCLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFFaEQsZ0JBQVcsR0FBZSxvQkFBb0IsQ0FBQztRQUM5QyxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFPLENBQUM7SUFFdEQsQ0FBQztJQUVqQixRQUFRLEtBQUssQ0FBQztJQUVkLE9BQU8sQ0FBQyxNQUFNO1FBQ1YsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsYUFBYSxDQUFFLEtBQUs7UUFDaEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hELElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNKLENBQUE7QUFwQlk7SUFBUixLQUFLLEVBQUU7bURBQWlEO0FBQ2hEO0lBQVIsS0FBSyxFQUFFOzREQUF5QjtBQUN4QjtJQUFSLEtBQUssRUFBRTsyREFBZ0Q7QUFDOUM7SUFBVCxNQUFNLEVBQUU7dURBQTZEO0FBTDdELHNCQUFzQjtJQUxsQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsb0JBQW9CO1FBQzlCLDByQkFBdUM7O0tBRXhDLENBQUM7R0FDVyxzQkFBc0IsQ0FzQmxDO1NBdEJZLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gICAgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFF1ZXJ5UGFyYW1ldGVycyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IFNlYXJjaEV2ZW50LCBFdmVudFR5cGVzIH0gZnJvbSAnLi4vLi4vLi4vZXZlbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC1rZXl3b3Jkcy1maWx0ZXInLFxuICB0ZW1wbGF0ZVVybDogJy4va2V5d29yZC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2tleXdvcmQuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBLZXl3b3JkRmlsdGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGtleSAgICAgICAgICAgIDogc3RyaW5nID0gUXVlcnlQYXJhbWV0ZXJzLlFVRVJZO1xuICAgIEBJbnB1dCgpIHNlYXJjaFN0cmluZyAgIDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyICAgIDogc3RyaW5nID0gXCJTZWFyY2ggR2VvUGxhdGZvcm1cIjtcbiAgICBAT3V0cHV0KCkgb25FdmVudCAgICAgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7IH1cblxuICAgIG9uS2V5VXAoJGV2ZW50KSB7XG4gICAgICAgIGxldCB0ZXh0ID0gJGV2ZW50LnRhcmdldC52YWx1ZTtcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlKHRleHQpO1xuICAgIH1cblxuICAgIG9uVmFsdWVDaGFuZ2UoIHZhbHVlICkge1xuICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgIGNoYW5nZVt0aGlzLmtleV0gPSB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPyB2YWx1ZSA6IG51bGw7XG4gICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICB0aGlzLm9uRXZlbnQuZW1pdChldmVudCk7XG4gICAgfVxufVxuIl19