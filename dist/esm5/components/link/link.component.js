import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ItemHelper } from '../../item-helper';
var ResourceLinkComponent = /** @class */ (function () {
    function ResourceLinkComponent() {
        this.external = false; //open link in new window/tab
    }
    ResourceLinkComponent.prototype.ngOnInit = function () {
    };
    ResourceLinkComponent.prototype.hasIcon = function () {
        // return this.icon !== null && this.icon !== undefined;
        return true;
    };
    ResourceLinkComponent.prototype.getIcon = function () {
        return ItemHelper.getIcon(this.item);
    };
    ResourceLinkComponent.prototype.getLabel = function () {
        return ItemHelper.getLabel(this.item);
    };
    ResourceLinkComponent.prototype.getType = function () {
        return ItemHelper.getTypeKey(this.item);
    };
    ResourceLinkComponent.prototype.getIconClass = function () {
        var type = ItemHelper.getTypeLabel(this.item);
        if ("Contact" === type)
            type = 'vcard';
        if ("Product" === type)
            type = 'imageproduct';
        return 'icon-' + type.toLowerCase();
    };
    tslib_1.__decorate([
        Input()
    ], ResourceLinkComponent.prototype, "item", void 0);
    tslib_1.__decorate([
        Input()
    ], ResourceLinkComponent.prototype, "icon", void 0);
    tslib_1.__decorate([
        Input()
    ], ResourceLinkComponent.prototype, "external", void 0);
    ResourceLinkComponent = tslib_1.__decorate([
        Component({
            selector: 'gp-resource-link',
            template: "<a routerLink=\"/view/{{item?.id}}\">\n    <span *ngIf=\"hasIcon()\" class=\"a-icon {{getIconClass()}}\"></span>\n    {{getLabel()}}\n</a>\n",
            styles: [""]
        })
    ], ResourceLinkComponent);
    return ResourceLinkComponent;
}());
export { ResourceLinkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9saW5rL2xpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPL0M7SUFNSTtRQUZTLGFBQVEsR0FBYSxLQUFLLENBQUMsQ0FBSSw2QkFBNkI7SUFFckQsQ0FBQztJQUVqQix3Q0FBUSxHQUFSO0lBQ0EsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDSSx3REFBd0Q7UUFDeEQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDSSxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksT0FBTyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsdUNBQU8sR0FBUDtRQUNJLE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELDRDQUFZLEdBQVo7UUFDSSxJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFHLFNBQVMsS0FBSyxJQUFJO1lBQUUsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUN0QyxJQUFHLFNBQVMsS0FBSyxJQUFJO1lBQUUsSUFBSSxHQUFHLGNBQWMsQ0FBQztRQUM3QyxPQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztJQS9CUTtRQUFSLEtBQUssRUFBRTt1REFBWTtJQUNYO1FBQVIsS0FBSyxFQUFFO3VEQUFZO0lBQ1g7UUFBUixLQUFLLEVBQUU7MkRBQTRCO0lBSjNCLHFCQUFxQjtRQUxqQyxTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLHdKQUFvQzs7U0FFckMsQ0FBQztPQUNXLHFCQUFxQixDQW1DakM7SUFBRCw0QkFBQztDQUFBLEFBbkNELElBbUNDO1NBbkNZLHFCQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSXRlbVR5cGVzIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHsgSXRlbUhlbHBlciB9IGZyb20gJy4uLy4uL2l0ZW0taGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtcmVzb3VyY2UtbGluaycsXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5rLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGluay5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlTGlua0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBpdGVtIDogYW55O1xuICAgIEBJbnB1dCgpIGljb24gOiBhbnk7XG4gICAgQElucHV0KCkgZXh0ZXJuYWwgOiBib29sZWFuID0gZmFsc2U7ICAgIC8vb3BlbiBsaW5rIGluIG5ldyB3aW5kb3cvdGFiXG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgaGFzSWNvbigpIDogYm9vbGVhbiB7XG4gICAgICAgIC8vIHJldHVybiB0aGlzLmljb24gIT09IG51bGwgJiYgdGhpcy5pY29uICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGdldEljb24oKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBJdGVtSGVscGVyLmdldEljb24odGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBnZXRMYWJlbCgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEl0ZW1IZWxwZXIuZ2V0TGFiZWwodGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBnZXRUeXBlKCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSXRlbUhlbHBlci5nZXRUeXBlS2V5KHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0SWNvbkNsYXNzKCkgOiBzdHJpbmcge1xuICAgICAgICBsZXQgdHlwZSA9IEl0ZW1IZWxwZXIuZ2V0VHlwZUxhYmVsKHRoaXMuaXRlbSk7XG4gICAgICAgIGlmKFwiQ29udGFjdFwiID09PSB0eXBlKSB0eXBlID0gJ3ZjYXJkJztcbiAgICAgICAgaWYoXCJQcm9kdWN0XCIgPT09IHR5cGUpIHR5cGUgPSAnaW1hZ2Vwcm9kdWN0JztcbiAgICAgICAgcmV0dXJuICdpY29uLScgKyB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG59XG4iXX0=