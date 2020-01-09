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
    clear() {
        this.searchString = null;
        this.onValueChange(null);
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
        template: "\n<div class=\"input-group-slick flex-1\">\n    <span class=\"fas fa-search\"></span>\n    <input type=\"text\" class=\"form-control\"\n        placeholder=\"{{placeholder}}\"\n        [(ngModel)]=\"searchString\" (keyup.enter)=\"onKeyUp($event)\">\n    <button type=\"button\" class=\"btn btn-light\" title=\"Clear keywords\"\n        *ngIf=\"searchString?.length\" (click)=\"clear()\">\n        <span class=\"fas fa-times\"></span>\n    </button>\n</div>\n\n<button type=\"button\" class=\"btn btn-secondary\"\n    [disabled]=\"!searchString||!searchString.length\"\n    (click)=\"onValueChange(searchString)\"\n    title=\"Search the GeoPlatform\">\n    Search\n</button>\n",
        styles: [":host{display:-webkit-box;display:flex;-webkit-box-pack:justify;justify-content:space-between}:host>:last-child{margin-left:1em}"]
    })
], KeywordFilterComponent);
export { KeywordFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia2V5d29yZC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMva2V5d29yZC9rZXl3b3JkLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFBVSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDakQsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELE9BQU8sRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFPekQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFPL0I7UUFMUyxRQUFHLEdBQXVCLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFFaEQsZ0JBQVcsR0FBZSxvQkFBb0IsQ0FBQztRQUM5QyxZQUFPLEdBQTZCLElBQUksWUFBWSxFQUFPLENBQUM7SUFFdEQsQ0FBQztJQUVqQixRQUFRLEtBQUssQ0FBQztJQUVkLE9BQU8sQ0FBQyxNQUFNO1FBQ1YsSUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsYUFBYSxDQUFFLEtBQUs7UUFDaEIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3hELElBQUksS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsWUFBWSxHQUFDLElBQUksQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLENBQUM7Q0FDSixDQUFBO0FBekJZO0lBQVIsS0FBSyxFQUFFO21EQUFpRDtBQUNoRDtJQUFSLEtBQUssRUFBRTs0REFBeUI7QUFDeEI7SUFBUixLQUFLLEVBQUU7MkRBQWdEO0FBQzlDO0lBQVQsTUFBTSxFQUFFO3VEQUE2RDtBQUw3RCxzQkFBc0I7SUFMbEMsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG9CQUFvQjtRQUM5QixnckJBQXVDOztLQUV4QyxDQUFDO0dBQ1csc0JBQXNCLENBMkJsQztTQTNCWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBRdWVyeVBhcmFtZXRlcnMgfSBmcm9tIFwiQGdlb3BsYXRmb3JtL2NsaWVudFwiO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uLy4uL2V2ZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3Ata2V5d29yZHMtZmlsdGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2tleXdvcmQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9rZXl3b3JkLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgS2V5d29yZEZpbHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBrZXkgICAgICAgICAgICA6IHN0cmluZyA9IFF1ZXJ5UGFyYW1ldGVycy5RVUVSWTtcbiAgICBASW5wdXQoKSBzZWFyY2hTdHJpbmcgICA6IHN0cmluZztcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlciAgICA6IHN0cmluZyA9IFwiU2VhcmNoIEdlb1BsYXRmb3JtXCI7XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICAgICAgOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkgeyB9XG5cbiAgICBvbktleVVwKCRldmVudCkge1xuICAgICAgICBsZXQgdGV4dCA9ICRldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZSh0ZXh0KTtcbiAgICB9XG5cbiAgICBvblZhbHVlQ2hhbmdlKCB2YWx1ZSApIHtcbiAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICBjaGFuZ2VbdGhpcy5rZXldID0gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID8gdmFsdWUgOiBudWxsO1xuICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICB0aGlzLnNlYXJjaFN0cmluZz1udWxsO1xuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2UobnVsbCk7XG4gICAgfVxufVxuIl19