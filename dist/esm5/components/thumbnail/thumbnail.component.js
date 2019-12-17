import * as tslib_1 from "tslib";
import { Component, Input, Directive, HostBinding } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { Config } from "@geoplatform/client";
var ImageFallbackDirective = /** @class */ (function () {
    function ImageFallbackDirective() {
        this.fallback = "/assets/img-404.png";
    }
    ImageFallbackDirective.prototype.onImgError = function () { this.src = this.fallback; };
    ImageFallbackDirective.prototype.onImgLoad = function () { this.className = 'is-image-loaded'; };
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
    return ImageFallbackDirective;
}());
export { ImageFallbackDirective };
var ThumbnailComponent = /** @class */ (function () {
    function ThumbnailComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ThumbnailComponent.prototype.ngOnInit = function () {
    };
    ThumbnailComponent.prototype.getThumbnailUrl = function () {
        if (this.item.thumbnail && this.item.thumbnail.url)
            return this.item.thumbnail.url;
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    };
    ThumbnailComponent.prototype.getBackgroundImage = function () {
        if (!this.item || !this.item.thumbnail) {
            return this.getFallbackBackgroundImage();
        }
        var thumbnail = this.item.thumbnail;
        var type = thumbnail.mediaType || 'image/png';
        if (thumbnail.contentData) {
            var content = thumbnail.contentData;
            return this.sanitizer.bypassSecurityTrustStyle("url(data:" + type + ";base64," + content + ")");
        }
    };
    ThumbnailComponent.prototype.getFallbackBackgroundImage = function () {
        var url = this.getFallbackUrl();
        return "url(" + url + ")";
    };
    ThumbnailComponent.prototype.isEmpty = function () {
        return !this.item || !this.item.thumbnail ||
            (!this.item.thumbnail.url && !this.item.thumbnail.contentData);
    };
    ThumbnailComponent.prototype.hasURL = function () {
        return this.item.thumbnail && !!this.item.thumbnail.url;
    };
    ThumbnailComponent.prototype.hasContentData = function () {
        return this.item.thumbnail && !!this.item.thumbnail.contentData && !this.item.thumbnail.url;
    };
    ThumbnailComponent.prototype.getFallbackUrl = function () {
        return Config.ualUrl + '/api/items/' + this.item.id + '/thumbnail';
    };
    ThumbnailComponent.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
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
    return ThumbnailComponent;
}());
export { ThumbnailComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGh1bWJuYWlsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RodW1ibmFpbC90aHVtYm5haWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQ0gsU0FBUyxFQUFVLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUNuRCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQ0gsWUFBWSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQ3pDLE1BQU0sMkJBQTJCLENBQUM7QUFFbkMsT0FBTyxFQUFFLE1BQU0sRUFBbUIsTUFBTSxxQkFBcUIsQ0FBQztBQXdCOUQ7SUFSQTtRQVVhLGFBQVEsR0FBWSxxQkFBcUIsQ0FBQztJQUl2RCxDQUFDO0lBRkcsMkNBQVUsR0FBVixjQUFlLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDMUMsMENBQVMsR0FBVCxjQUFjLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0lBSjFDO1FBQVIsS0FBSyxFQUFFO3VEQUFjO0lBQ2I7UUFBUixLQUFLLEVBQUU7NERBQTJDO0lBQzdCO1FBQXJCLFdBQVcsQ0FBQyxPQUFPLENBQUM7NkRBQVU7SUFIdEIsc0JBQXNCO1FBUmxDLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxlQUFlO1lBQ3pCLElBQUksRUFBRTtnQkFDRixTQUFTLEVBQUMsY0FBYztnQkFDeEIsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLE9BQU8sRUFBQyxLQUFLO2FBQ2Y7U0FDTCxDQUFDO09BQ1csc0JBQXNCLENBTWxDO0lBQUQsNkJBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSxzQkFBc0I7QUFlbkM7SUFJSSw0QkFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFJLENBQUM7SUFFaEQscUNBQVEsR0FBUjtJQUNBLENBQUM7SUFFRCw0Q0FBZSxHQUFmO1FBQ0ksSUFBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHO1lBQzdDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDO1FBQ25DLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDO0lBQ3ZFLENBQUM7SUFFRCwrQ0FBa0IsR0FBbEI7UUFDSSxJQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ25DLE9BQU8sSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7U0FDNUM7UUFFRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUNwQyxJQUFJLElBQUksR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQztRQUU5QyxJQUFHLFNBQVMsQ0FBQyxXQUFXLEVBQUU7WUFDdEIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQztZQUNwQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsd0JBQXdCLENBQUMsY0FBWSxJQUFJLGdCQUFXLE9BQU8sTUFBRyxDQUFDLENBQUM7U0FDekY7SUFDTCxDQUFDO0lBRUQsdURBQTBCLEdBQTFCO1FBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ2hDLE9BQU8sU0FBTyxHQUFHLE1BQUcsQ0FBQztJQUN6QixDQUFDO0lBRUQsb0NBQU8sR0FBUDtRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTO1lBQ3JDLENBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUUsQ0FBQztJQUN6RSxDQUFDO0lBRUQsbUNBQU0sR0FBTjtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUM1RCxDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNJLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQztJQUNoRyxDQUFDO0lBRUQsMkNBQWMsR0FBZDtRQUNJLE9BQU8sTUFBTSxDQUFDLE1BQU0sR0FBRyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsWUFBWSxDQUFDO0lBQ3ZFLENBQUM7O2dCQTdDOEIsWUFBWTs7SUFGbEM7UUFBUixLQUFLLEVBQUU7b0RBQWE7SUFGWixrQkFBa0I7UUFMOUIsU0FBUyxDQUFDO1lBQ1QsUUFBUSxFQUFFLG1CQUFtQjtZQUM3Qix3NkJBQXlDOztTQUUxQyxDQUFDO09BQ1csa0JBQWtCLENBa0Q5QjtJQUFELHlCQUFDO0NBQUEsQUFsREQsSUFrREM7U0FsRFksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIERpcmVjdGl2ZSwgSG9zdEJpbmRpbmdcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICAgIERvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsLCBTYWZlVXJsXG59IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5pbXBvcnQgeyBDb25maWcsIEl0ZW1UeXBlcywgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5cblxuaW50ZXJmYWNlIFRodW1ibmFpbCB7XG4gICAgdXJsID86IHN0cmluZztcbiAgICBjb250ZW50RGF0YSA/OiBzdHJpbmc7XG4gICAgd2lkdGggPzogbnVtYmVyO1xuICAgIGhlaWdodCA/OiBudW1iZXI7XG4gICAgbWVkaWFUeXBlID86IHN0cmluZztcbn1cblxuXG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnaW1nW2ZhbGxiYWNrXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnKGVycm9yKSc6J29uSW1nRXJyb3IoKScsXG4gICAgICAgICcobG9hZCknOiAnb25JbWdMb2FkKCknLFxuICAgICAgICAnW3NyY10nOidzcmMnXG4gICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSB7XG4gICAgQElucHV0KCkgc3JjIDogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGZhbGxiYWNrIDogc3RyaW5nID0gYC9hc3NldHMvaW1nLTQwNC5wbmdgO1xuICAgIEBIb3N0QmluZGluZygnY2xhc3MnKSBjbGFzc05hbWVcbiAgICBvbkltZ0Vycm9yKCkgeyB0aGlzLnNyYyA9IHRoaXMuZmFsbGJhY2s7IH1cbiAgICBvbkltZ0xvYWQoKSB7IHRoaXMuY2xhc3NOYW1lID0gJ2lzLWltYWdlLWxvYWRlZCc7IH1cbn1cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwLWl0ZW0tdGh1bWJuYWlsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL3RodW1ibmFpbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3RodW1ibmFpbC5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFRodW1ibmFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBpdGVtIDogSXRlbTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgfVxuXG4gICAgZ2V0VGh1bWJuYWlsVXJsKCkge1xuICAgICAgICBpZih0aGlzLml0ZW0udGh1bWJuYWlsICYmIHRoaXMuaXRlbS50aHVtYm5haWwudXJsKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXRlbS50aHVtYm5haWwudXJsO1xuICAgICAgICByZXR1cm4gQ29uZmlnLnVhbFVybCArICcvYXBpL2l0ZW1zLycgKyB0aGlzLml0ZW0uaWQgKyAnL3RodW1ibmFpbCc7XG4gICAgfVxuXG4gICAgZ2V0QmFja2dyb3VuZEltYWdlKCkge1xuICAgICAgICBpZighdGhpcy5pdGVtIHx8ICF0aGlzLml0ZW0udGh1bWJuYWlsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRGYWxsYmFja0JhY2tncm91bmRJbWFnZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHRodW1ibmFpbCA9IHRoaXMuaXRlbS50aHVtYm5haWw7XG4gICAgICAgIGxldCB0eXBlID0gdGh1bWJuYWlsLm1lZGlhVHlwZSB8fCAnaW1hZ2UvcG5nJztcblxuICAgICAgICBpZih0aHVtYm5haWwuY29udGVudERhdGEpIHtcbiAgICAgICAgICAgIGxldCBjb250ZW50ID0gdGh1bWJuYWlsLmNvbnRlbnREYXRhO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgdXJsKGRhdGE6JHt0eXBlfTtiYXNlNjQsJHtjb250ZW50fSlgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEZhbGxiYWNrQmFja2dyb3VuZEltYWdlKCkge1xuICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRGYWxsYmFja1VybCgpO1xuICAgICAgICByZXR1cm4gYHVybCgke3VybH0pYDtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICByZXR1cm4gIXRoaXMuaXRlbSB8fCAhdGhpcy5pdGVtLnRodW1ibmFpbCB8fFxuICAgICAgICAgICAgKCAhdGhpcy5pdGVtLnRodW1ibmFpbC51cmwgJiYgIXRoaXMuaXRlbS50aHVtYm5haWwuY29udGVudERhdGEgKTtcbiAgICB9XG5cbiAgICBoYXNVUkwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0udGh1bWJuYWlsICYmICEhdGhpcy5pdGVtLnRodW1ibmFpbC51cmw7XG4gICAgfVxuXG4gICAgaGFzQ29udGVudERhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW0udGh1bWJuYWlsICYmICEhdGhpcy5pdGVtLnRodW1ibmFpbC5jb250ZW50RGF0YSAmJiAhdGhpcy5pdGVtLnRodW1ibmFpbC51cmw7XG4gICAgfVxuXG4gICAgZ2V0RmFsbGJhY2tVcmwoKSB7XG4gICAgICAgIHJldHVybiBDb25maWcudWFsVXJsICsgJy9hcGkvaXRlbXMvJyArIHRoaXMuaXRlbS5pZCArICcvdGh1bWJuYWlsJztcbiAgICB9XG59XG4iXX0=