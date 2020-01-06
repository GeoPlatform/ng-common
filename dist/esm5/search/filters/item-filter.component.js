import * as tslib_1 from "tslib";
import { Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ItemService, Query, QueryParameters } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../event';
import { ListSelectDialog } from '../../dialogs';
var ItemFilterComponent = /** @class */ (function () {
    function ItemFilterComponent(service, types, label, dialog) {
        this.service = service;
        this.types = types;
        this.filterLabel = "Item";
        this.isCollapsed = true;
        this.filterLabel = label;
        if (dialog)
            this.dialog = dialog;
    }
    ItemFilterComponent.prototype.ngOnInit = function () {
        this.selected = [];
        this.initQuery();
        // this.fetchResults();
    };
    ItemFilterComponent.prototype.ngOnDestroy = function () {
        this.selected = null;
        this.choices = null;
        this.service = null;
        this.query = null;
        this.types = null;
    };
    ItemFilterComponent.prototype.openDialog = function () {
        var _this = this;
        var opts = this.getDialogOptions();
        var dialogRef = this.dialog.open(ListSelectDialog, opts);
        dialogRef.afterClosed().subscribe(function (results) {
            if (results && results.length) {
                _this.selected = _this.selected.concat(results);
                var key = _this.getKey();
                var change = {};
                change[key] = _this.selected.map(function (s) { return s.id; });
                change[QueryParameters.PAGE] = 0;
                var event_1 = new SearchEvent(EventTypes.QUERY, change);
                _this.notify(event_1);
            }
        });
    };
    /**
     * @return configuration options for the material dialog used to select new values
     */
    ItemFilterComponent.prototype.getDialogOptions = function () {
        return {
            width: '50%',
            data: {
                service: this.service,
                query: this.query,
                selected: []
            }
        };
    };
    ItemFilterComponent.prototype.isSupported = function () {
        return true;
    };
    /**
     *
     */
    ItemFilterComponent.prototype.initQuery = function () {
        this.query = new Query().fields([]).facets([]).types(this.types);
    };
    ItemFilterComponent.prototype.hasSelections = function () {
        return this.selected && this.selected.length > 0;
    };
    ItemFilterComponent.prototype.isSelected = function (arg) {
        // let id = this.getChoiceId(arg);
        return arg && this.selected.findIndex(function (s) { return s.id === arg.id; }) > -1;
    };
    /**
     * @param arg - item or identifier
     */
    ItemFilterComponent.prototype.toggle = function (arg) {
        if (!arg)
            return;
        // let id = this.getChoiceId(arg);
        // if(id === null) return;
        var idx = this.selected.findIndex(function (s) { return s.id === arg.id; });
        if (idx < 0)
            this.selected.push(arg);
        else
            this.selected.splice(idx, 1);
        var key = this.getKey();
        var change = {};
        change[key] = this.selected.map(function (s) { return s.id; });
        change[QueryParameters.PAGE] = 0;
        var event = new SearchEvent(EventTypes.QUERY, change);
        this.notify(event);
    };
    // /**
    //  * Update search results using current query
    //  */
    // fetchResults() {
    //     this.service.search(this.query).then( (response:any) => {
    //         this.choices = response.results as any[];
    //     })
    //     .catch( (e:Error) => {
    //         this.choices = [] as any[];
    //         //TODO display error to user
    //     });
    // }
    //
    // /**
    //  * @param arg - item or identifier
    //  * @return string identifier
    //  */
    // getChoiceId(arg : any) : string {
    //     let id : string = null;
    //     if('string' === typeof(arg)) {
    //         id = arg as string;
    //     } else if(arg && typeof(arg.id) !== 'undefined') {
    //         id = arg.id as string;
    //     }
    //     if(id === null || id === 'undefined') {
    //         let key = this.getKey();
    //         console.log(`[WARN] Can't determine value for filter '${key}'`);
    //         return null;
    //     }
    //     return id;
    // }
    ItemFilterComponent.prototype.clear = function () {
        if (this.hasSelections()) {
            this.selected = [];
            var key = this.getKey();
            var change = {};
            change[key] = [];
            change[QueryParameters.PAGE] = 0;
            var event_2 = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event_2);
        }
        else {
            this.isCollapsed = !this.isCollapsed;
        }
    };
    ItemFilterComponent = tslib_1.__decorate([
        tslib_1.__param(0, Inject(ItemService)),
        tslib_1.__param(3, Inject(MatDialog))
    ], ItemFilterComponent);
    return ItemFilterComponent;
}());
export { ItemFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1maWx0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbInNlYXJjaC9maWx0ZXJzL2l0ZW0tZmlsdGVyLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFnQyxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDckUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRXJELE9BQU8sRUFDVyxXQUFXLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFDcEQsTUFBTSxxQkFBcUIsQ0FBQztBQUU3QixPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN0RCxPQUFPLEVBQXdCLGdCQUFnQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBR3ZFO0lBVUksNkJBQ2lDLE9BQXFCLEVBQzFDLEtBQW9DLEVBQzVDLEtBQW1DLEVBQ2hCLE1BQW1CO1FBSFQsWUFBTyxHQUFQLE9BQU8sQ0FBYztRQUMxQyxVQUFLLEdBQUwsS0FBSyxDQUErQjtRQVZ4QyxnQkFBVyxHQUFZLE1BQU0sQ0FBQztRQUM5QixnQkFBVyxHQUFhLElBQUksQ0FBQztRQWFqQyxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztRQUN6QixJQUFHLE1BQU07WUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNwQyxDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUNJLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBWSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNqQix1QkFBdUI7SUFDM0IsQ0FBQztJQUVELHlDQUFXLEdBQVg7UUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FB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QUFNLEVBQUUsQ0FBQztZQUN4QixJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFDaEIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNqQixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLE9BQUssR0FBRyxJQUFJLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3RELElBQUksQ0FBQyxNQUFNLENBQUMsT0FBSyxDQUFDLENBQUM7U0FDdEI7YUFBTTtZQUNILElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO1NBQ3hDO0lBQ0wsQ0FBQztJQXhKaUIsbUJBQW1CO1FBV2hDLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUduQixtQkFBQSxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUE7T0FkSixtQkFBbUIsQ0E4SnhDO0lBQUQsMEJBQUM7Q0FBQSxBQTlKRCxJQThKQztTQTlKcUIsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2cgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9kaWFsb2cnO1xuaW1wb3J0IHsgSHR0cENsaWVudCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG4gICAgQ29uZmlnLCBJdGVtLCBJdGVtU2VydmljZSwgUXVlcnksIFF1ZXJ5UGFyYW1ldGVycywgSXRlbVR5cGVzXG59IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5pbXBvcnQgeyBTZWFyY2hFdmVudCwgRXZlbnRUeXBlcyB9IGZyb20gJy4uLy4uL2V2ZW50JztcbmltcG9ydCB7IExpc3RTZWxlY3REaWFsb2dEYXRhLCBMaXN0U2VsZWN0RGlhbG9nIH0gZnJvbSAnLi4vLi4vZGlhbG9ncyc7XG5cblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEl0ZW1GaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBwdWJsaWMgIGZpbHRlckxhYmVsIDogc3RyaW5nID0gXCJJdGVtXCI7XG4gICAgcHVibGljICBpc0NvbGxhcHNlZCA6IGJvb2xlYW4gPSB0cnVlO1xuICAgIHB1YmxpYyAgY2hvaWNlcyAgICAgOiBhbnlbXTtcbiAgICBwdWJsaWMgIHNlbGVjdGVkICAgIDogSXRlbVtdO1xuICAgIHB1YmxpYyAgZGlhbG9nICAgICAgOiBNYXREaWFsb2c7XG4gICAgcHJvdGVjdGVkIHF1ZXJ5ICAgICA6IFF1ZXJ5XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBwcml2YXRlIHNlcnZpY2UgOiBJdGVtU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSB0eXBlcyAgICAgICAgICAgICAgOiBzdHJpbmd8c3RyaW5nW10sXG4gICAgICAgIGxhYmVsICAgICAgICAgICAgICAgICAgICAgPzogc3RyaW5nLFxuICAgICAgICBASW5qZWN0KE1hdERpYWxvZykgZGlhbG9nID86IE1hdERpYWxvZ1xuICAgICkge1xuICAgICAgICB0aGlzLmZpbHRlckxhYmVsID0gbGFiZWw7XG4gICAgICAgIGlmKGRpYWxvZykgdGhpcy5kaWFsb2cgPSBkaWFsb2c7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXSBhcyBJdGVtW107XG4gICAgICAgIHRoaXMuaW5pdFF1ZXJ5KCk7XG4gICAgICAgIC8vIHRoaXMuZmV0Y2hSZXN1bHRzKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBudWxsO1xuICAgICAgICB0aGlzLmNob2ljZXMgPSBudWxsO1xuICAgICAgICB0aGlzLnNlcnZpY2UgPSBudWxsO1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gbnVsbDtcbiAgICAgICAgdGhpcy50eXBlcyA9IG51bGw7XG4gICAgfVxuXG4gICAgb3BlbkRpYWxvZygpOiB2b2lkIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLmdldERpYWxvZ09wdGlvbnMoKTtcbiAgICAgICAgY29uc3QgZGlhbG9nUmVmID0gdGhpcy5kaWFsb2cub3BlbihMaXN0U2VsZWN0RGlhbG9nLCBvcHRzKTtcbiAgICAgICAgZGlhbG9nUmVmLmFmdGVyQ2xvc2VkKCkuc3Vic2NyaWJlKCAoIHJlc3VsdHMgOiBJdGVtW10gKSA9PiB7XG4gICAgICAgICAgICBpZihyZXN1bHRzICYmIHJlc3VsdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuc2VsZWN0ZWQuY29uY2F0KHJlc3VsdHMpO1xuXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuZ2V0S2V5KCk7XG4gICAgICAgICAgICAgICAgbGV0IGNoYW5nZSA9IHt9O1xuICAgICAgICAgICAgICAgIGNoYW5nZVtrZXldID0gdGhpcy5zZWxlY3RlZC5tYXAoIHMgPT4gcy5pZCApO1xuICAgICAgICAgICAgICAgIGNoYW5nZVtRdWVyeVBhcmFtZXRlcnMuUEFHRV0gPSAwO1xuICAgICAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICAgICAgICAgIHRoaXMubm90aWZ5KGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSBtYXRlcmlhbCBkaWFsb2cgdXNlZCB0byBzZWxlY3QgbmV3IHZhbHVlc1xuICAgICAqL1xuICAgIGdldERpYWxvZ09wdGlvbnMoKSA6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB3aWR0aDogJzUwJScsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgc2VydmljZSA6IHRoaXMuc2VydmljZSxcbiAgICAgICAgICAgICAgICBxdWVyeSAgIDogdGhpcy5xdWVyeSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogW11cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBpc1N1cHBvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBpbml0UXVlcnkoKSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBuZXcgUXVlcnkoKS5maWVsZHMoW10pLmZhY2V0cyhbXSkudHlwZXModGhpcy50eXBlcyk7XG4gICAgfVxuXG5cbiAgICBoYXNTZWxlY3Rpb25zKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGlzU2VsZWN0ZWQoIGFyZyA6IEl0ZW0gKSA6IGJvb2xlYW4ge1xuICAgICAgICAvLyBsZXQgaWQgPSB0aGlzLmdldENob2ljZUlkKGFyZyk7XG4gICAgICAgIHJldHVybiBhcmcgJiYgdGhpcy5zZWxlY3RlZC5maW5kSW5kZXgoIHMgPT4gcy5pZCA9PT0gYXJnLmlkICkgPiAtMTtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBhcmcgLSBpdGVtIG9yIGlkZW50aWZpZXJcbiAgICAgKi9cbiAgICB0b2dnbGUoIGFyZyA6IEl0ZW0gKSB7XG4gICAgICAgIGlmKCFhcmcpIHJldHVybjtcbiAgICAgICAgLy8gbGV0IGlkID0gdGhpcy5nZXRDaG9pY2VJZChhcmcpO1xuICAgICAgICAvLyBpZihpZCA9PT0gbnVsbCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBpZHggPSB0aGlzLnNlbGVjdGVkLmZpbmRJbmRleCggcyA9PiBzLmlkID09PSBhcmcuaWQgKTtcbiAgICAgICAgaWYoaWR4IDwgMCkgdGhpcy5zZWxlY3RlZC5wdXNoKCBhcmcgKTtcbiAgICAgICAgZWxzZSAgICAgICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoIGlkeCwgMSApO1xuXG4gICAgICAgIGxldCBrZXkgPSB0aGlzLmdldEtleSgpO1xuICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgIGNoYW5nZVtrZXldID0gdGhpcy5zZWxlY3RlZC5tYXAoIHMgPT4gcy5pZCApO1xuICAgICAgICBjaGFuZ2VbUXVlcnlQYXJhbWV0ZXJzLlBBR0VdID0gMDtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMubm90aWZ5KGV2ZW50KTtcbiAgICB9XG5cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIFVwZGF0ZSBzZWFyY2ggcmVzdWx0cyB1c2luZyBjdXJyZW50IHF1ZXJ5XG4gICAgLy8gICovXG4gICAgLy8gZmV0Y2hSZXN1bHRzKCkge1xuICAgIC8vICAgICB0aGlzLnNlcnZpY2Uuc2VhcmNoKHRoaXMucXVlcnkpLnRoZW4oIChyZXNwb25zZTphbnkpID0+IHtcbiAgICAvLyAgICAgICAgIHRoaXMuY2hvaWNlcyA9IHJlc3BvbnNlLnJlc3VsdHMgYXMgYW55W107XG4gICAgLy8gICAgIH0pXG4gICAgLy8gICAgIC5jYXRjaCggKGU6RXJyb3IpID0+IHtcbiAgICAvLyAgICAgICAgIHRoaXMuY2hvaWNlcyA9IFtdIGFzIGFueVtdO1xuICAgIC8vICAgICAgICAgLy9UT0RPIGRpc3BsYXkgZXJyb3IgdG8gdXNlclxuICAgIC8vICAgICB9KTtcbiAgICAvLyB9XG4gICAgLy9cbiAgICAvLyAvKipcbiAgICAvLyAgKiBAcGFyYW0gYXJnIC0gaXRlbSBvciBpZGVudGlmaWVyXG4gICAgLy8gICogQHJldHVybiBzdHJpbmcgaWRlbnRpZmllclxuICAgIC8vICAqL1xuICAgIC8vIGdldENob2ljZUlkKGFyZyA6IGFueSkgOiBzdHJpbmcge1xuICAgIC8vICAgICBsZXQgaWQgOiBzdHJpbmcgPSBudWxsO1xuICAgIC8vICAgICBpZignc3RyaW5nJyA9PT0gdHlwZW9mKGFyZykpIHtcbiAgICAvLyAgICAgICAgIGlkID0gYXJnIGFzIHN0cmluZztcbiAgICAvLyAgICAgfSBlbHNlIGlmKGFyZyAmJiB0eXBlb2YoYXJnLmlkKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyAgICAgICAgIGlkID0gYXJnLmlkIGFzIHN0cmluZztcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBpZihpZCA9PT0gbnVsbCB8fCBpZCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyAgICAgICAgIGxldCBrZXkgPSB0aGlzLmdldEtleSgpO1xuICAgIC8vICAgICAgICAgY29uc29sZS5sb2coYFtXQVJOXSBDYW4ndCBkZXRlcm1pbmUgdmFsdWUgZm9yIGZpbHRlciAnJHtrZXl9J2ApO1xuICAgIC8vICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgcmV0dXJuIGlkO1xuICAgIC8vIH1cblxuICAgIGNsZWFyKCkge1xuICAgICAgICBpZih0aGlzLmhhc1NlbGVjdGlvbnMoKSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICAgICAgbGV0IGtleSA9IHRoaXMuZ2V0S2V5KCk7XG4gICAgICAgICAgICBsZXQgY2hhbmdlID0ge307XG4gICAgICAgICAgICBjaGFuZ2Vba2V5XSA9IFtdO1xuICAgICAgICAgICAgY2hhbmdlW1F1ZXJ5UGFyYW1ldGVycy5QQUdFXSA9IDA7XG4gICAgICAgICAgICBsZXQgZXZlbnQgPSBuZXcgU2VhcmNoRXZlbnQoRXZlbnRUeXBlcy5RVUVSWSwgY2hhbmdlKTtcbiAgICAgICAgICAgIHRoaXMubm90aWZ5KGV2ZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNDb2xsYXBzZWQgPSAhdGhpcy5pc0NvbGxhcHNlZDtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgcHJvdGVjdGVkIGFic3RyYWN0IGdldEtleSgpIDogc3RyaW5nO1xuICAgIHByb3RlY3RlZCBhYnN0cmFjdCBub3RpZnkoIGV2ZW50IDogU2VhcmNoRXZlbnQgKTtcblxufVxuIl19