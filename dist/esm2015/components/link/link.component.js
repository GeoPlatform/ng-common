import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { ItemHelper } from '../../item-helper';
let ResourceLinkComponent = class ResourceLinkComponent {
    constructor() {
        this.external = false; //open link in new window/tab
    }
    ngOnInit() {
    }
    hasIcon() {
        // return this.icon !== null && this.icon !== undefined;
        return true;
    }
    getIcon() {
        return ItemHelper.getIcon(this.item);
    }
    getLabel() {
        return ItemHelper.getLabel(this.item);
    }
    getType() {
        return ItemHelper.getTypeKey(this.item);
    }
    getIconClass() {
        let type = ItemHelper.getTypeLabel(this.item);
        if ("Contact" === type)
            type = 'vcard';
        if ("Product" === type)
            type = 'imageproduct';
        return 'icon-' + type.toLowerCase();
    }
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
export { ResourceLinkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9saW5rL2xpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUd6RCxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFPL0MsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7SUFNOUI7UUFGUyxhQUFRLEdBQWEsS0FBSyxDQUFDLENBQUksNkJBQTZCO0lBRXJELENBQUM7SUFFakIsUUFBUTtJQUNSLENBQUM7SUFFRCxPQUFPO1FBQ0gsd0RBQXdEO1FBQ3hELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELE9BQU87UUFDSCxPQUFPLFVBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxZQUFZO1FBQ1IsSUFBSSxJQUFJLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsSUFBRyxTQUFTLEtBQUssSUFBSTtZQUFFLElBQUksR0FBRyxPQUFPLENBQUM7UUFDdEMsSUFBRyxTQUFTLEtBQUssSUFBSTtZQUFFLElBQUksR0FBRyxjQUFjLENBQUM7UUFDN0MsT0FBTyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hDLENBQUM7Q0FFSixDQUFBO0FBakNZO0lBQVIsS0FBSyxFQUFFO21EQUFZO0FBQ1g7SUFBUixLQUFLLEVBQUU7bURBQVk7QUFDWDtJQUFSLEtBQUssRUFBRTt1REFBNEI7QUFKM0IscUJBQXFCO0lBTGpDLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxrQkFBa0I7UUFDNUIsd0pBQW9DOztLQUVyQyxDQUFDO0dBQ1cscUJBQXFCLENBbUNqQztTQW5DWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW1UeXBlcyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IEl0ZW1IZWxwZXIgfSBmcm9tICcuLi8uLi9pdGVtLWhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXJlc291cmNlLWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpbmsuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUxpbmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgaXRlbSA6IGFueTtcbiAgICBASW5wdXQoKSBpY29uIDogYW55O1xuICAgIEBJbnB1dCgpIGV4dGVybmFsIDogYm9vbGVhbiA9IGZhbHNlOyAgICAvL29wZW4gbGluayBpbiBuZXcgd2luZG93L3RhYlxuXG4gICAgY29uc3RydWN0b3IoKSB7IH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgIH1cblxuICAgIGhhc0ljb24oKSA6IGJvb2xlYW4ge1xuICAgICAgICAvLyByZXR1cm4gdGhpcy5pY29uICE9PSBudWxsICYmIHRoaXMuaWNvbiAhPT0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXRJY29uKCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSXRlbUhlbHBlci5nZXRJY29uKHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWwoKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBJdGVtSGVscGVyLmdldExhYmVsKHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0VHlwZSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIEl0ZW1IZWxwZXIuZ2V0VHlwZUtleSh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgIGdldEljb25DbGFzcygpIDogc3RyaW5nIHtcbiAgICAgICAgbGV0IHR5cGUgPSBJdGVtSGVscGVyLmdldFR5cGVMYWJlbCh0aGlzLml0ZW0pO1xuICAgICAgICBpZihcIkNvbnRhY3RcIiA9PT0gdHlwZSkgdHlwZSA9ICd2Y2FyZCc7XG4gICAgICAgIGlmKFwiUHJvZHVjdFwiID09PSB0eXBlKSB0eXBlID0gJ2ltYWdlcHJvZHVjdCc7XG4gICAgICAgIHJldHVybiAnaWNvbi0nICsgdHlwZS50b0xvd2VyQ2FzZSgpO1xuICAgIH1cblxufVxuIl19