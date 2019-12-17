import * as tslib_1 from "tslib";
import { Component, Input, Directive, HostBinding } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Config } from "@geoplatform/client";
let ImageFallbackDirective = class ImageFallbackDirective {
    constructor() {
        this.fallback = `/assets/img-404.png`;
    }
    onImgError() { this.src = this.fallback; }
    onImgLoad() { this.className = 'is-image-loaded'; }
};
tslib_1.__decorate([
    Input()
], ImageFallbackDirective.prototype, "src", void 0);
tslib_1.__decorate([
    Input()
], ImageFallbackDirective.prototype, "fallback", void 0);
tslib_1.__decorate([
    HostBinding('class')
], ImageFallbackDirective.prototype, "className", void 0);
ImageFallbackDirective = tslib_1.__decorate([
    Directive({
        selector: 'img[fallback]',
        host: {
            '(error)': 'onImgError()',
            '(load)': 'onImgLoad()',
            '[src]': 'src'
        }
    })
], ImageFallbackDirective);
export { ImageFallbackDirective };
let ThumbnailComponent = class ThumbnailComponent {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ngOnInit() {
    }
    getThumbnailUrl() {
        if (this.item.thumbnail && this.item.thumbnail.url)
            return this.item.thumbnail.url;
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    }
    getBackgroundImage() {
        if (!this.item || !this.item.thumbnail) {
            return this.getFallbackBackgroundImage();
        }
        let thumbnail = this.item.thumbnail;
        let type = thumbnail.mediaType || 'image/png';
        if (thumbnail.contentData) {
            let content = thumbnail.contentData;
            return this.sanitizer.bypassSecurityTrustStyle(`url(data:${type};base64,${content})`);
        }
    }
    getFallbackBackgroundImage() {
        let url = this.getFallbackUrl();
        return `url(${url})`;
    }
    isEmpty() {
        return !this.item || !this.item.thumbnail ||
            (!this.item.thumbnail.url && !this.item.thumbnail.contentData);
    }
    hasURL() {
        return this.item.thumbnail && !!this.item.thumbnail.url;
    }
    hasContentData() {
        return this.item.thumbnail && !!this.item.thumbnail.contentData && !this.item.thumbnail.url;
    }
    getFallbackUrl() {
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    }
};
ThumbnailComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
tslib_1.__decorate([
    Input()
], ThumbnailComponent.prototype, "item", void 0);
ThumbnailComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-item-thumbnail',
        template: "<div class=\"m-thumbnail\" style=\"position:relative\">\n\n    <!-- fallback is to use SVG for item type as its thumbnail -->\n    <div *ngIf=\"isEmpty()\" class=\"is-16x9 is-fallback\">\n        <div\n            [style.background-size]=\"'contain'\"\n            [style.background-repeat]=\"'no-repeat'\"\n            [style.background-position]=\"'50% 0'\"\n            [style.background-image]=\"getFallbackBackgroundImage()\">\n        </div>\n    </div>\n\n    <!-- if there is a thumbnail with URL -->\n    <img *ngIf=\"hasURL()\" src=\"{{item.thumbnail.url}}\" fallback=\"{{getFallbackUrl()}}\">\n\n    <!-- if there is a thumbnail with base64 data -->\n    <div *ngIf=\"hasContentData()\" class=\"is-16x9\">\n        <img\n            [style.background-size]=\"'contain'\"\n            [style.background-repeat]=\"'no-repeat'\"\n            [style.background-image]=\"getBackgroundImage()\">\n    </div>\n\n</div>\n",
        styles: [".m-thumbnail img{max-width:100%}"]
    })
], ThumbnailComponent);
export { ThumbnailComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGh1bWJuYWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RodW1ibmFpbC90aHVtYm5haWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUNuRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQ3pDLE1BQU0sMkJBQTJCLENBQUM7QUFFbkMsT0FBTyxFQUFFLE1BQU0sRUFBbUIsTUFBTSxxQkFBcUIsQ0FBQztBQXdCOUQsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBc0I7SUFSbkM7UUFVYSxhQUFRLEdBQVkscUJBQXFCLENBQUM7SUFJdkQsQ0FBQztJQUZHLFVBQVUsS0FBSyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzFDLFNBQVMsS0FBSyxJQUFJLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDLENBQUMsQ0FBQztDQUN0RCxDQUFBO0FBTFk7SUFBUixLQUFLLEVBQUU7bURBQWM7QUFDYjtJQUFSLEtBQUssRUFBRTt3REFBMkM7QUFDN0I7SUFBckIsV0FBVyxDQUFDLE9BQU8sQ0FBQzt5REFBVTtBQUh0QixzQkFBc0I7SUFSbEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGVBQWU7UUFDekIsSUFBSSxFQUFFO1lBQ0YsU0FBUyxFQUFDLGNBQWM7WUFDeEIsUUFBUSxFQUFFLGFBQWE7WUFDdkIsT0FBTyxFQUFDLEtBQUs7U0FDZjtLQUNMLENBQUM7R0FDVyxzQkFBc0IsQ0FNbEM7U0FOWSxzQkFBc0I7QUFlbkMsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBa0I7SUFJM0IsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFJLENBQUM7SUFFaEQsUUFBUTtJQUNSLENBQUM7SUFFRCxlQUFlO1FBQ1gsSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHO1lBQzdDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ25DLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7U0FDNUM7UUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNwQyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQztRQUU5QyxJQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUNwQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsWUFBWSxJQUFJLFdBQVcsT0FBTyxHQUFHLENBQUMsQ0FBQztTQUN6RjtJQUNMLENBQUM7SUFFRCwwQkFBMEI7UUFDdEIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sT0FBTyxHQUFHLEdBQUcsQ0FBQztJQUN6QixDQUFDO0lBRUQsT0FBTztRQUNILE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ3JDLENBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUUsQ0FBQztJQUN6RSxDQUFDO0lBRUQsTUFBTTtRQUNGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1RCxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUNoRyxDQUFDO0lBRUQsY0FBYztRQUNWLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDO0lBQ3ZFLENBQUM7Q0FDSixDQUFBOztZQTlDa0MsWUFBWTs7QUFGbEM7SUFBUixLQUFLLEVBQUU7Z0RBQWE7QUFGWixrQkFBa0I7SUFMOUIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLG1CQUFtQjtRQUM3Qix3NkJBQXlDOztLQUUxQyxDQUFDO0dBQ1csa0JBQWtCLENBa0Q5QjtTQWxEWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICAgIENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgRGlyZWN0aXZlLCBIb3N0QmluZGluZ1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gICAgRG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmwsIFNhZmVVcmxcbn0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IENvbmZpZywgSXRlbVR5cGVzLCBJdGVtIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuXG5cblxuXG5pbnRlcmZhY2UgVGh1bWJuYWlsIHtcbiAgICB1cmwgPzogc3RyaW5nO1xuICAgIGNvbnRlbnREYXRhID86IHN0cmluZztcbiAgICB3aWR0aCA/OiBudW1iZXI7XG4gICAgaGVpZ2h0ID86IG51bWJlcjtcbiAgICBtZWRpYVR5cGUgPzogc3RyaW5nO1xufVxuXG5cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdpbWdbZmFsbGJhY2tdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICcoZXJyb3IpJzonb25JbWdFcnJvcigpJyxcbiAgICAgICAgJyhsb2FkKSc6ICdvbkltZ0xvYWQoKScsXG4gICAgICAgICdbc3JjXSc6J3NyYydcbiAgICAgfVxufSlcbmV4cG9ydCBjbGFzcyBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlIHtcbiAgICBASW5wdXQoKSBzcmMgOiBzdHJpbmc7XG4gICAgQElucHV0KCkgZmFsbGJhY2sgOiBzdHJpbmcgPSBgL2Fzc2V0cy9pbWctNDA0LnBuZ2A7XG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzTmFtZVxuICAgIG9uSW1nRXJyb3IoKSB7IHRoaXMuc3JjID0gdGhpcy5mYWxsYmFjazsgfVxuICAgIG9uSW1nTG9hZCgpIHsgdGhpcy5jbGFzc05hbWUgPSAnaXMtaW1hZ2UtbG9hZGVkJzsgfVxufVxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3AtaXRlbS10aHVtYm5haWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGh1bWJuYWlsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdGh1bWJuYWlsLmNvbXBvbmVudC5sZXNzJ11cbn0pXG5leHBvcnQgY2xhc3MgVGh1bWJuYWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICAgIEBJbnB1dCgpIGl0ZW0gOiBJdGVtO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICB9XG5cbiAgICBnZXRUaHVtYm5haWxVcmwoKSB7XG4gICAgICAgIGlmKHRoaXMuaXRlbS50aHVtYm5haWwgJiYgdGhpcy5pdGVtLnRodW1ibmFpbC51cmwpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pdGVtLnRodW1ibmFpbC51cmw7XG4gICAgICAgIHJldHVybiBDb25maWcudWFsVXJsICsgJy9hcGkvaXRlbXMvJyArIHRoaXMuaXRlbS5pZCArICcvdGh1bWJuYWlsJztcbiAgICB9XG5cbiAgICBnZXRCYWNrZ3JvdW5kSW1hZ2UoKSB7XG4gICAgICAgIGlmKCF0aGlzLml0ZW0gfHwgIXRoaXMuaXRlbS50aHVtYm5haWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEZhbGxiYWNrQmFja2dyb3VuZEltYWdlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGh1bWJuYWlsID0gdGhpcy5pdGVtLnRodW1ibmFpbDtcbiAgICAgICAgbGV0IHR5cGUgPSB0aHVtYm5haWwubWVkaWFUeXBlIHx8ICdpbWFnZS9wbmcnO1xuXG4gICAgICAgIGlmKHRodW1ibmFpbC5jb250ZW50RGF0YSkge1xuICAgICAgICAgICAgbGV0IGNvbnRlbnQgPSB0aHVtYm5haWwuY29udGVudERhdGE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGB1cmwoZGF0YToke3R5cGV9O2Jhc2U2NCwke2NvbnRlbnR9KWApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RmFsbGJhY2tCYWNrZ3JvdW5kSW1hZ2UoKSB7XG4gICAgICAgIGxldCB1cmwgPSB0aGlzLmdldEZhbGxiYWNrVXJsKCk7XG4gICAgICAgIHJldHVybiBgdXJsKCR7dXJsfSlgO1xuICAgIH1cblxuICAgIGlzRW1wdHkoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5pdGVtIHx8ICF0aGlzLml0ZW0udGh1bWJuYWlsIHx8XG4gICAgICAgICAgICAoICF0aGlzLml0ZW0udGh1bWJuYWlsLnVybCAmJiAhdGhpcy5pdGVtLnRodW1ibmFpbC5jb250ZW50RGF0YSApO1xuICAgIH1cblxuICAgIGhhc1VSTCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbS50aHVtYm5haWwgJiYgISF0aGlzLml0ZW0udGh1bWJuYWlsLnVybDtcbiAgICB9XG5cbiAgICBoYXNDb250ZW50RGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbS50aHVtYm5haWwgJiYgISF0aGlzLml0ZW0udGh1bWJuYWlsLmNvbnRlbnREYXRhICYmICF0aGlzLml0ZW0udGh1bWJuYWlsLnVybDtcbiAgICB9XG5cbiAgICBnZXRGYWxsYmFja1VybCgpIHtcbiAgICAgICAgcmV0dXJuIENvbmZpZy51YWxVcmwgKyAnL2FwaS9pdGVtcy8nICsgdGhpcy5pdGVtLmlkICsgJy90aHVtYm5haWwnO1xuICAgIH1cbn1cbiJdfQ==