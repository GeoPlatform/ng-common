import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Config } from "@geoplatform/client";
import { ItemHelper } from '../../item-helper';
var ResourceLinkComponent = /** @class */ (function () {
    function ResourceLinkComponent() {
        // @Input() icon : any;
        this.external = false; //open link in new window/tab
        this.showIcon = true;
    }
    ResourceLinkComponent.prototype.ngOnInit = function () {
        if (Config.portalUrl)
            this.portalUrl = Config.portalUrl;
        else {
            this.portalUrl = Config.ualUrl.replace("sit-ual", 'sit')
                .replace("stg-ual", "stg").replace("ual", "www");
        }
    };
    ResourceLinkComponent.prototype.hasIcon = function () {
        return this.showIcon;
    };
    ResourceLinkComponent.prototype.getIcon = function () {
        return ItemHelper.getIcon(this.item);
    };
    ResourceLinkComponent.prototype.getLabel = function () {
        return this.label || ItemHelper.getLabel(this.item);
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
    return ResourceLinkComponent;
}());
export { ResourceLinkComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluay5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9saW5rL2xpbmsuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RCxPQUFPLEVBQUUsTUFBTSxFQUFhLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBTy9DO0lBV0k7UUFSQSx1QkFBdUI7UUFDZCxhQUFRLEdBQWEsS0FBSyxDQUFDLENBQUksNkJBQTZCO1FBRTVELGFBQVEsR0FBYSxJQUFJLENBQUM7SUFLbkIsQ0FBQztJQUVqQix3Q0FBUSxHQUFSO1FBQ0ksSUFBRyxNQUFNLENBQUMsU0FBUztZQUFFLElBQUksQ0FBQyxTQUFTLEdBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQzthQUNqRDtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFDLEtBQUssQ0FBQztpQkFDbEQsT0FBTyxDQUFDLFNBQVMsRUFBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3REO0lBQ0wsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDSSxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDekIsQ0FBQztJQUVELHVDQUFPLEdBQVA7UUFDSSxPQUFPLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFFRCx3Q0FBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxJQUFJLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCx1Q0FBTyxHQUFQO1FBQ0ksT0FBTyxVQUFVLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBRUQsNENBQVksR0FBWjtRQUNJLElBQUksSUFBSSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUcsU0FBUyxLQUFLLElBQUk7WUFBRSxJQUFJLEdBQUcsT0FBTyxDQUFDO1FBQ3RDLElBQUcsU0FBUyxLQUFLLElBQUk7WUFBRSxJQUFJLEdBQUcsY0FBYyxDQUFDO1FBQzdDLE9BQU8sT0FBTyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBeENRO1FBQVIsS0FBSyxFQUFFO3VEQUFZO0lBRVg7UUFBUixLQUFLLEVBQUU7MkRBQTRCO0lBQzNCO1FBQVIsS0FBSyxFQUFFO3dEQUFnQjtJQUNmO1FBQVIsS0FBSyxFQUFFOzJEQUEyQjtJQU4xQixxQkFBcUI7UUFMakMsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLGtCQUFrQjtZQUM1Qix3TEFBb0M7O1NBRXJDLENBQUM7T0FDVyxxQkFBcUIsQ0E0Q2pDO0lBQUQsNEJBQUM7Q0FBQSxBQTVDRCxJQTRDQztTQTVDWSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZywgSXRlbVR5cGVzIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuaW1wb3J0IHsgSXRlbUhlbHBlciB9IGZyb20gJy4uLy4uL2l0ZW0taGVscGVyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtcmVzb3VyY2UtbGluaycsXG4gIHRlbXBsYXRlVXJsOiAnLi9saW5rLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbGluay5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFJlc291cmNlTGlua0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBpdGVtIDogYW55O1xuICAgIC8vIEBJbnB1dCgpIGljb24gOiBhbnk7XG4gICAgQElucHV0KCkgZXh0ZXJuYWwgOiBib29sZWFuID0gZmFsc2U7ICAgIC8vb3BlbiBsaW5rIGluIG5ldyB3aW5kb3cvdGFiXG4gICAgQElucHV0KCkgbGFiZWwgOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2hvd0ljb24gOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIHB1YmxpYyBwb3J0YWxVcmwgOiBzdHJpbmc7XG5cblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYoQ29uZmlnLnBvcnRhbFVybCkgdGhpcy5wb3J0YWxVcmw9IENvbmZpZy5wb3J0YWxVcmw7XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wb3J0YWxVcmwgPSBDb25maWcudWFsVXJsLnJlcGxhY2UoXCJzaXQtdWFsXCIsJ3NpdCcpXG4gICAgICAgICAgICAgICAgLnJlcGxhY2UoXCJzdGctdWFsXCIsXCJzdGdcIikucmVwbGFjZShcInVhbFwiLFwid3d3XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzSWNvbigpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNob3dJY29uO1xuICAgIH1cblxuICAgIGdldEljb24oKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBJdGVtSGVscGVyLmdldEljb24odGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBnZXRMYWJlbCgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubGFiZWwgfHwgSXRlbUhlbHBlci5nZXRMYWJlbCh0aGlzLml0ZW0pO1xuICAgIH1cblxuICAgIGdldFR5cGUoKSA6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBJdGVtSGVscGVyLmdldFR5cGVLZXkodGhpcy5pdGVtKTtcbiAgICB9XG5cbiAgICBnZXRJY29uQ2xhc3MoKSA6IHN0cmluZyB7XG4gICAgICAgIGxldCB0eXBlID0gSXRlbUhlbHBlci5nZXRUeXBlTGFiZWwodGhpcy5pdGVtKTtcbiAgICAgICAgaWYoXCJDb250YWN0XCIgPT09IHR5cGUpIHR5cGUgPSAndmNhcmQnO1xuICAgICAgICBpZihcIlByb2R1Y3RcIiA9PT0gdHlwZSkgdHlwZSA9ICdpbWFnZXByb2R1Y3QnO1xuICAgICAgICByZXR1cm4gJ2ljb24tJyArIHR5cGUudG9Mb3dlckNhc2UoKTtcbiAgICB9XG5cbn1cbiJdfQ==