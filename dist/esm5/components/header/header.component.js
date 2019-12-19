import * as tslib_1 from "tslib";
import { Component, Input, HostBinding } from '@angular/core';
import { Config } from '@geoplatform/client';
var HeaderComponent = /** @class */ (function () {
    function HeaderComponent() {
        this.appName = "Application";
        this.class = 'o-header';
        this.portalUrl = Config.portalUrl || 'https://www.geoplatform.gov';
    }
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
    return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJjb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBTzdDO0lBTEE7UUFPYSxZQUFPLEdBQVksYUFBYSxDQUFDO1FBQ3BCLFVBQUssR0FBRyxVQUFVLENBQUE7UUFFakMsY0FBUyxHQUFZLE1BQU0sQ0FBQyxTQUFTLElBQUksNkJBQTZCLENBQUM7SUFHbEYsQ0FBQztJQU5ZO1FBQVIsS0FBSyxFQUFFO29EQUFrQztJQUNwQjtRQUFyQixXQUFXLENBQUMsT0FBTyxDQUFDO2tEQUFtQjtJQUgvQixlQUFlO1FBTDNCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLCtnQkFBc0M7O1NBRXpDLENBQUM7T0FDVyxlQUFlLENBUTNCO0lBQUQsc0JBQUM7Q0FBQSxBQVJELElBUUM7U0FSWSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSG9zdEJpbmRpbmcgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2dwLWFwcC1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL2hlYWRlci5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIEhlYWRlckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBhcHBOYW1lIDogc3RyaW5nID0gXCJBcHBsaWNhdGlvblwiO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzcyA9ICdvLWhlYWRlcidcblxuICAgIHB1YmxpYyBwb3J0YWxVcmwgOiBzdHJpbmcgPSBDb25maWcucG9ydGFsVXJsIHx8ICdodHRwczovL3d3dy5nZW9wbGF0Zm9ybS5nb3YnO1xuXG5cbn1cbiJdfQ==