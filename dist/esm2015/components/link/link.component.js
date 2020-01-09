import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Config } from "@geoplatform/client";
import { ItemHelper } from '../../item-helper';
let ResourceLinkComponent = class ResourceLinkComponent {
    constructor() {
        // @Input() icon : any;
        this.external = false; //open link in new window/tab
        this.showIcon = true;
    }
    ngOnInit() {
        if (Config.portalUrl)
            this.portalUrl = Config.portalUrl;
        else {
            this.portalUrl = Config.ualUrl.replace("sit-ual", 'sit')
                .replace("stg-ual", "stg").replace("ual", "www");
        }
    }
    hasIcon() {
        return this.showIcon;
    }
    getIcon() {
        return ItemHelper.getIcon(this.item);
    }
    getLabel() {
        return this.label || ItemHelper.getLabel(this.item);
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
], ResourceLinkComponent.prototype, "external", void 0);
tslib_1.__decorate([
    Input()
], ResourceLinkComponent.prototype, "label", void 0);
tslib_1.__decorate([
    Input()
], ResourceLinkComponent.prototype, "showIcon", void 0);
ResourceLinkComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-resource-link',
        template: "<a routerLink=\"{{portalUrl}}/resources/{{getType()}}/{{item?.id}}\">\n    <span *ngIf=\"hasIcon()\" class=\"a-icon {{getIconClass()}}\"></span>\n    {{getLabel()}}\n</a>\n",
        styles: [""]
    })
], ResourceLinkComponent);
export { ResourceLinkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9saW5rL2xpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFhLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTy9DLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXFCO0lBVzlCO1FBUkEsdUJBQXVCO1FBQ2QsYUFBUSxHQUFhLEtBQUssQ0FBQyxDQUFJLDZCQUE2QjtRQUU1RCxhQUFRLEdBQWEsSUFBSSxDQUFDO0lBS25CLENBQUM7SUFFakIsUUFBUTtRQUNKLElBQUcsTUFBTSxDQUFDLFNBQVM7WUFBRSxJQUFJLENBQUMsU0FBUyxHQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUM7YUFDakQ7WUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBQyxLQUFLLENBQUM7aUJBQ2xELE9BQU8sQ0FBQyxTQUFTLEVBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztTQUN0RDtJQUNMLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQsUUFBUTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVELFlBQVk7UUFDUixJQUFJLElBQUksR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFHLFNBQVMsS0FBSyxJQUFJO1lBQUUsSUFBSSxHQUFHLE9BQU8sQ0FBQztRQUN0QyxJQUFHLFNBQVMsS0FBSyxJQUFJO1lBQUUsSUFBSSxHQUFHLGNBQWMsQ0FBQztRQUM3QyxPQUFPLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEMsQ0FBQztDQUVKLENBQUE7QUExQ1k7SUFBUixLQUFLLEVBQUU7bURBQVk7QUFFWDtJQUFSLEtBQUssRUFBRTt1REFBNEI7QUFDM0I7SUFBUixLQUFLLEVBQUU7b0RBQWdCO0FBQ2Y7SUFBUixLQUFLLEVBQUU7dURBQTJCO0FBTjFCLHFCQUFxQjtJQUxqQyxTQUFTLENBQUM7UUFDVCxRQUFRLEVBQUUsa0JBQWtCO1FBQzVCLHdMQUFvQzs7S0FFckMsQ0FBQztHQUNXLHFCQUFxQixDQTRDakM7U0E1Q1kscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcsIEl0ZW1UeXBlcyB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cbmltcG9ydCB7IEl0ZW1IZWxwZXIgfSBmcm9tICcuLi8uLi9pdGVtLWhlbHBlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLXJlc291cmNlLWxpbmsnLFxuICB0ZW1wbGF0ZVVybDogJy4vbGluay5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2xpbmsuY29tcG9uZW50Lmxlc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBSZXNvdXJjZUxpbmtDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgaXRlbSA6IGFueTtcbiAgICAvLyBASW5wdXQoKSBpY29uIDogYW55O1xuICAgIEBJbnB1dCgpIGV4dGVybmFsIDogYm9vbGVhbiA9IGZhbHNlOyAgICAvL29wZW4gbGluayBpbiBuZXcgd2luZG93L3RhYlxuICAgIEBJbnB1dCgpIGxhYmVsIDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIHNob3dJY29uIDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBwdWJsaWMgcG9ydGFsVXJsIDogc3RyaW5nO1xuXG5cbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmKENvbmZpZy5wb3J0YWxVcmwpIHRoaXMucG9ydGFsVXJsPSBDb25maWcucG9ydGFsVXJsO1xuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucG9ydGFsVXJsID0gQ29uZmlnLnVhbFVybC5yZXBsYWNlKFwic2l0LXVhbFwiLCdzaXQnKVxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKFwic3RnLXVhbFwiLFwic3RnXCIpLnJlcGxhY2UoXCJ1YWxcIixcInd3d1wiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ljb24oKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zaG93SWNvbjtcbiAgICB9XG5cbiAgICBnZXRJY29uKCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSXRlbUhlbHBlci5nZXRJY29uKHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0TGFiZWwoKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmxhYmVsIHx8IEl0ZW1IZWxwZXIuZ2V0TGFiZWwodGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBnZXRUeXBlKCkgOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gSXRlbUhlbHBlci5nZXRUeXBlS2V5KHRoaXMuaXRlbSk7XG4gICAgfVxuXG4gICAgZ2V0SWNvbkNsYXNzKCkgOiBzdHJpbmcge1xuICAgICAgICBsZXQgdHlwZSA9IEl0ZW1IZWxwZXIuZ2V0VHlwZUxhYmVsKHRoaXMuaXRlbSk7XG4gICAgICAgIGlmKFwiQ29udGFjdFwiID09PSB0eXBlKSB0eXBlID0gJ3ZjYXJkJztcbiAgICAgICAgaWYoXCJQcm9kdWN0XCIgPT09IHR5cGUpIHR5cGUgPSAnaW1hZ2Vwcm9kdWN0JztcbiAgICAgICAgcmV0dXJuICdpY29uLScgKyB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxuXG59XG4iXX0=