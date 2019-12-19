import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { Config } from '@geoplatform/client';
let HeaderComponent = class HeaderComponent {
    constructor() {
        this.appName = "Application";
        this.class = 'o-header';
        this.portalUrl = Config.portalUrl || 'https://www.geoplatform.gov';
    }
};
tslib_1.__decorate([
    Input()
], HeaderComponent.prototype, "appName", void 0);
tslib_1.__decorate([
    HostBinding('class')
], HeaderComponent.prototype, "class", void 0);
HeaderComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-app-header',
        template: "<div class=\"o-header__primary\" role=\"banner\">\n    <h1 class=\"a-brand\">\n        <a href=\"{{portalUrl}}\">\n            <img src=\"/assets/favicon.png\" style=\"vertical-align:top;\">\n            GeoPlatform.gov\n        </a>\n        &nbsp;\n        {{appName}}\n    </h1>\n    <nav class=\"a-nav\" role=\"navigation\" aria-label=\"top-level navigation links\">\n        <ng-content select=\"[menu]\"></ng-content>\n        <gp-login-button role=\"menuitem\">Sign In</gp-login-button>\n    </nav>\n</div>\n",
        styles: [".o-header .o-header__primary{padding:1em 1.5em}.o-header .o-header__primary .a-nav a{font-weight:700;border-right:none;padding:.375em .75em}.o-header .o-header__primary .a-nav a.active{border-bottom:1px solid #185b8a}"]
    })
], HeaderComponent);
export { HeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJjb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTzdDLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWU7SUFMNUI7UUFPYSxZQUFPLEdBQVksYUFBYSxDQUFDO1FBQ3BCLFVBQUssR0FBRyxVQUFVLENBQUE7UUFFakMsY0FBUyxHQUFZLE1BQU0sQ0FBQyxTQUFTLElBQUksNkJBQTZCLENBQUM7SUFHbEYsQ0FBQztDQUFBLENBQUE7QUFOWTtJQUFSLEtBQUssRUFBRTtnREFBa0M7QUFDcEI7SUFBckIsV0FBVyxDQUFDLE9BQU8sQ0FBQzs4Q0FBbUI7QUFIL0IsZUFBZTtJQUwzQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsZUFBZTtRQUN6QiwrZ0JBQXNDOztLQUV6QyxDQUFDO0dBQ1csZUFBZSxDQVEzQjtTQVJZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZ3AtYXBwLWhlYWRlcicsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2hlYWRlci5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vaGVhZGVyLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgSGVhZGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGFwcE5hbWUgOiBzdHJpbmcgPSBcIkFwcGxpY2F0aW9uXCI7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzID0gJ28taGVhZGVyJ1xuXG4gICAgcHVibGljIHBvcnRhbFVybCA6IHN0cmluZyA9IENvbmZpZy5wb3J0YWxVcmwgfHwgJ2h0dHBzOi8vd3d3Lmdlb3BsYXRmb3JtLmdvdic7XG5cblxufVxuIl19