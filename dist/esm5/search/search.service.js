import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ItemService } from '@geoplatform/client';
import { logger } from '../logger';
var INVALID_SUBJECT_ERROR = "SearchService implementation must create a valid Subject using SearchService.prototype.createSubject()";
/**
 * Abstract Search Service
 *
 * Base Search Service implementation which implements most of the interfaces
 * methods. The remaning methods are required to be implemented by specific
 * implementations of this class
 */
var AbstractSearchService = /** @class */ (function () {
    function AbstractSearchService() {
        // protected results  : R;
        this._selected = [];
        this.subject = this.createSubject();
        if (!this.subject) {
            throw new Error(INVALID_SUBJECT_ERROR);
        }
        this.subject$ = this.subject.asObservable();
    }
    /**
     * Notify subscribers of a change to one or more pieces of managed data
     */
    AbstractSearchService.prototype.emit = function (event) {
        this.subject.next(event);
    };
    AbstractSearchService.prototype.getError = function () { return this._error; };
    AbstractSearchService.prototype.setError = function (err) { this._error = err; };
    /**
     * Updates the query managed by this search service instance and optionally
     * triggers a refresh of search results using that query
     */
    AbstractSearchService.prototype.setQuery = function (query, andSearch) {
        this._query = query;
        this.emit({ query: query });
        if (true === andSearch) {
            this.search();
        }
    };
    AbstractSearchService.prototype.getQuery = function () { return this._query; };
    AbstractSearchService.prototype.getResults = function () { return this._results; };
    AbstractSearchService.prototype.setResults = function (results) { this._results = results; };
    /**
     * Toggle one or more items as selected
     */
    AbstractSearchService.prototype.select = function (item) {
        var _this = this;
        if (Array.isArray(item)) { //multiple selections
            item.forEach(function (it) { return _this._toggleItem(it, false); });
            this.emit({ selected: this._selected });
            return;
        }
        this._toggleItem(item, true);
    };
    /**
     * Internal method which toggles an Item as selected (or de-selected if it
     * was already selected) and optionally triggers a notification of a change
     * in the selected items managed by this service instance
     */
    AbstractSearchService.prototype._toggleItem = function (item, fireEvent) {
        var _this = this;
        if (!item)
            return;
        var position = this._selected.findIndex(function (s) { return _this.compareItems(s, item); });
        if (position >= 0) { //already selected, deselect it and return
            this._selected.splice(position, 1);
            if (fireEvent)
                this.emit({ selected: this._selected });
            return;
        }
        this._selected.push(item);
        this.sortItems(this._selected);
        if (fireEvent)
            this.emit({ selected: this._selected });
    };
    /**
     * @param item being checked for selection
     * @return boolean
     */
    AbstractSearchService.prototype.isSelected = function (item) {
        var _this = this;
        return this._selected.length && item &&
            this._selected.findIndex(function (it) { return _this.compareItems(it, item); }) >= 0;
    };
    /**
     * @return boolean true if there is one or more selected items
     */
    AbstractSearchService.prototype.hasSelected = function () {
        return this._selected && this._selected.length > 0;
    };
    /**
     * @return array of selected items
     */
    AbstractSearchService.prototype.getSelected = function () {
        return this._selected;
    };
    AbstractSearchService.prototype.setSelected = function (sel) { this._selected = sel; };
    /**
     * De-selects all currently selected items
     */
    AbstractSearchService.prototype.clearSelected = function () {
        this._selected = [];
        this.emit({ selected: this._selected });
    };
    /**
     * Registers a listener on this service's subject which will be notified
     * upon any change in managed data
     */
    AbstractSearchService.prototype.subscribe = function (listener) {
        var obs = {
            next: function (value) {
                if (typeof (value) === 'undefined' || value === null)
                    return;
                if (value.query)
                    listener.onQueryChange(value.query);
                if (value.results)
                    listener.onResultsChange(value.results, value.error || null);
                if (value.selected)
                    listener.onSelectedChange(value.selected);
            },
            error: function (err) {
                console.log("[ERROR] " + err.message);
            },
            complete: function () { }
        };
        var sub = this.subject$.subscribe(obs);
        if (this._query) {
            this.emit({ query: this._query });
        }
        if (this._results || this._error) {
            this.emit({ results: this._results, error: this._error || null });
        }
        if (this._selected) {
            this.emit({ selected: this._selected });
        }
        return sub;
    };
    return AbstractSearchService;
}());
export { AbstractSearchService };
/**
 * GeoPlatform Search Service
 *
 * Instance of SearchService which allows searching GeoPlatform Portfolio (RIM)
 * Items (Datasets, Maps, Layers, Services, etc)
 */
var GeoPlatformSearchService = /** @class */ (function (_super) {
    tslib_1.__extends(GeoPlatformSearchService, _super);
    function GeoPlatformSearchService(service) {
        var _this = _super.call(this) || this;
        _this.service = service;
        return _this;
    }
    GeoPlatformSearchService.prototype.getService = function () { return this.service; };
    GeoPlatformSearchService.prototype.createSubject = function () {
        return new Subject();
    };
    /**
     *
     */
    GeoPlatformSearchService.prototype.getQuery = function () {
        return _super.prototype.getQuery.call(this).clone();
    };
    // /**
    //  *
    //  */
    // setQuery(query : Query) {
    //     super.setQuery( query ? query.clone() : query );
    // }
    /**
     *
     */
    GeoPlatformSearchService.prototype.search = function (query) {
        var _this = this;
        //if a query was provided, store it and use it
        if (query)
            this.setQuery(query);
        this.service.search(_super.prototype.getQuery.call(this))
            .then(function (response) {
            logger.debug('SearchService.search() - ' + response.totalResults + " results found");
            _this.setResults(response);
            _this.setError(null);
            _this.emit({ results: response, error: null });
        })
            .catch(function (error) {
            logger.error(error.message);
            _this.setError(error);
            _this.emit({ results: null, error: error });
        });
    };
    /**
     *
     */
    GeoPlatformSearchService.prototype._toggleItem = function (item, fireEvent) {
        var _this = this;
        if (!item || !item.id)
            return;
        var selected = this.getSelected();
        var position = selected.findIndex(function (s) { return s.id === item.id; });
        if (position >= 0) { //already selected, deselect it and return
            selected.splice(position, 1);
            this.setSelected(selected);
            if (fireEvent)
                this.emit({ selected: selected });
            return;
        }
        //new selection
        // logger.error(`Selecting ${item.label} as ${entry.type.toString()}`);
        //fetch full object and replace placeholder in selected array
        this.service.get(item.id)
            .then(function (fullItem) {
            var selected = _this.getSelected();
            selected.push(fullItem);
            _this.sortItems(selected);
            _this.setSelected(selected);
            if (fireEvent)
                _this.emit({ selected: selected });
        })
            .catch(function (e) {
            logger.error("SearchService.select() - " +
                "Error encountered fetching selected item's details: " + e.message);
        });
    };
    GeoPlatformSearchService.prototype.compareItems = function (a, b) {
        return a.id === b.id;
    };
    GeoPlatformSearchService.prototype.sortItems = function (items) {
        items.sort(function (a, b) { return a.label > b.label ? 1 : -1; });
    };
    GeoPlatformSearchService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
    ]; };
    GeoPlatformSearchService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(ItemService))
    ], GeoPlatformSearchService);
    return GeoPlatformSearchService;
}(AbstractSearchService));
export { GeoPlatformSearchService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQXdCLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUE4QixXQUFXLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBc0RuQyxJQUFNLHFCQUFxQixHQUFHLHdHQUF3RyxDQUFDO0FBRXZJOzs7Ozs7R0FNRztBQUNIO0lBaUJJO1FBWEEsMEJBQTBCO1FBRWxCLGNBQVMsR0FBUSxFQUFFLENBQUM7UUFVeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7UUFDcEMsSUFBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDMUM7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQW9CRDs7T0FFRztJQUNJLG9DQUFJLEdBQVgsVUFBYSxLQUFpQztRQUMxQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRU0sd0NBQVEsR0FBZixjQUE0QixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ3ZDLHdDQUFRLEdBQWxCLFVBQW9CLEdBQVcsSUFBSyxJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFeEQ7OztPQUdHO0lBQ0ksd0NBQVEsR0FBZixVQUFnQixLQUFT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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBMUIsQ0FBMEIsQ0FBRSxDQUFDO0lBQ3JELENBQUM7O2dEQXJGSSxNQUFNLFNBQUMsV0FBVzs7SUFIZCx3QkFBd0I7UUFEcEMsVUFBVSxFQUFFO1FBSUosbUJBQUEsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFBO09BSGYsd0JBQXdCLENBMEZwQztJQUFELCtCQUFDO0NBQUEsQUExRkQsQ0FBOEMscUJBQXFCLEdBMEZsRTtTQTFGWSx3QkFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEl0ZW0sIFF1ZXJ5LCBTZWFyY2hSZXN1bHRzLCBJdGVtU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcblxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoU2VydmljZUV2ZW50PFEsUixJPiB7XG4gICAgcXVlcnkgICAgPzogUTtcbiAgICByZXN1bHRzICA/OiBSO1xuICAgIHNlbGVjdGVkID86IElbXTtcbiAgICBlcnJvciAgICA/OiBFcnJvcjtcbn1cblxuLyoqXG4gKlxuICovXG5leHBvcnQgaW50ZXJmYWNlIEdlb1BsYXRmb3JtU2VhcmNoU2VydmljZUV2ZW50IGV4dGVuZHMgU2VhcmNoU2VydmljZUV2ZW50PFF1ZXJ5LCBTZWFyY2hSZXN1bHRzLCBJdGVtPiB7XG5cbn1cblxuXG4vKipcbiAqIFNlYXJjaCBBd2FyZSBDb21wb25lbnQgSW50ZXJmYWNlXG4gKlxuICogQ29tcG9uZW50cyB3aGljaCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UgY2FuIHJlY2VpdmUgbm90aWZpY2F0aW9ucyB3aGVuIHRoZWlyXG4gKiBzdWJzY3JpYmVkLXRvIFNlYXJjaFNlcnZpY2UgaW1wbGVtZW50YXRpb24gdHJpZ2dlciBjaGFuZ2VzIHRvIHF1ZXJpZXMsXG4gKiBzZWFyY2ggcmVzdWx0cywgYW5kIHNlbGVjdGlvbnNcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hBd2FyZUNvbXBvbmVudDxRLFIsST4ge1xuICAgIG9uUXVlcnlDaGFuZ2UoIHF1ZXJ5IDogUSApIDogdm9pZDtcbiAgICBvblJlc3VsdHNDaGFuZ2UoIHJlc3VsdHMgOiBSLCBlcnJvciA/OiBFcnJvciApIDogdm9pZDtcbiAgICBvblNlbGVjdGVkQ2hhbmdlKCBzZWxlY3RlZCA6IElbXSApIDogdm9pZDtcbn1cblxuLyoqXG4gKiBTZWFyY2ggU2VydmljZSBJbnRlcmZhY2VcbiAqXG4gKiBTZXJ2aWNlcyB3aGljaCBpbXBsZW1lbnQgdGhpcyBpbnRlcmZhY2UgY2FuIGFjdCBhcyBkYXRhIHByb3ZpZGVycyBmb3JcbiAqIFNlYXJjaEF3YXJlQ29tcG9uZW50IGltcGxlbWVudGF0aW9uc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIFNlYXJjaFNlcnZpY2U8USxSLEk+IHtcbiAgICBzZXRRdWVyeShxdWVyeSA6IFEpO1xuICAgIGdldFF1ZXJ5KCkgOiBRO1xuICAgIGdldFJlc3VsdHMoKSA6IFI7XG4gICAgc2VhcmNoKHF1ZXJ5ID86IFEpO1xuICAgIHNlbGVjdCggaXRlbSA6IEl8SVtdICk7XG4gICAgaXNTZWxlY3RlZCggaXRlbSA6IEkgKSA6IGJvb2xlYW47XG4gICAgaGFzU2VsZWN0ZWQoKSA6IGJvb2xlYW47XG4gICAgZ2V0U2VsZWN0ZWQoKSA6IElbXTtcbiAgICBjbGVhclNlbGVjdGVkKCk7XG4gICAgc3Vic2NyaWJlKCBsaXN0ZW5lciA6IFNlYXJjaEF3YXJlQ29tcG9uZW50PFEsUixJPiApIDogU3Vic2NyaXB0aW9uO1xufVxuXG5cbmNvbnN0IElOVkFMSURfU1VCSkVDVF9FUlJPUiA9IFwiU2VhcmNoU2VydmljZSBpbXBsZW1lbnRhdGlvbiBtdXN0IGNyZWF0ZSBhIHZhbGlkIFN1YmplY3QgdXNpbmcgU2VhcmNoU2VydmljZS5wcm90b3R5cGUuY3JlYXRlU3ViamVjdCgpXCI7XG5cbi8qKlxuICogQWJzdHJhY3QgU2VhcmNoIFNlcnZpY2VcbiAqXG4gKiBCYXNlIFNlYXJjaCBTZXJ2aWNlIGltcGxlbWVudGF0aW9uIHdoaWNoIGltcGxlbWVudHMgbW9zdCBvZiB0aGUgaW50ZXJmYWNlc1xuICogbWV0aG9kcy4gVGhlIHJlbWFuaW5nIG1ldGhvZHMgYXJlIHJlcXVpcmVkIHRvIGJlIGltcGxlbWVudGVkIGJ5IHNwZWNpZmljXG4gKiBpbXBsZW1lbnRhdGlvbnMgb2YgdGhpcyBjbGFzc1xuICovXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWJzdHJhY3RTZWFyY2hTZXJ2aWNlPFEsUixJPiBpbXBsZW1lbnRzIFNlYXJjaFNlcnZpY2U8USxSLEk+IHtcblxuICAgIHByaXZhdGUgX3F1ZXJ5IDogUTtcbiAgICAvLyBwcm90ZWN0ZWQgcXVlcnkgICAgOiBRO1xuXG4gICAgcHJpdmF0ZSBfcmVzdWx0cyA6IFI7XG4gICAgLy8gcHJvdGVjdGVkIHJlc3VsdHMgIDogUjtcblxuICAgIHByaXZhdGUgX3NlbGVjdGVkOiBJW10gPSBbXTtcbiAgICAvLyBwcm90ZWN0ZWQgc2VsZWN0ZWQgOiBJW10gPSBbXTtcblxuICAgIHByaXZhdGUgX2Vycm9yIDogRXJyb3I7XG4gICAgLy8gcHJvdGVjdGVkIGVycm9yICAgIDogRXJyb3I7XG5cbiAgICBwcm90ZWN0ZWQgc3ViamVjdCA6IFN1YmplY3Q8U2VhcmNoU2VydmljZUV2ZW50PFEsUixJPj47XG4gICAgcHJvdGVjdGVkIHN1YmplY3QkIDogT2JzZXJ2YWJsZTxTZWFyY2hTZXJ2aWNlRXZlbnQ8USxSLEk+PjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnN1YmplY3QgPSB0aGlzLmNyZWF0ZVN1YmplY3QoKTtcbiAgICAgICAgaWYoIXRoaXMuc3ViamVjdCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKElOVkFMSURfU1VCSkVDVF9FUlJPUik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdWJqZWN0JCA9IHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBGYWN0b3J5IHRvIGNyZWF0ZSB0aGUgaW50ZXJuYWwgc3ViamVjdCB1c2VkIHRvIG5vdGlmeSBzdWJzY3JpYmVycyB0b1xuICAgICAqIGNoYW5nZXMgaW4gdGhlIGRhdGEgdGhlIHNlYXJjaCBzZXJ2aWNlIGlzIG1hbmFnaW5nLlxuICAgICAqL1xuICAgIHB1YmxpYyBhYnN0cmFjdCBjcmVhdGVTdWJqZWN0KCkgOiBTdWJqZWN0PFNlYXJjaFNlcnZpY2VFdmVudDxRLFIsST4+O1xuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlcnMgYSBxdWVyeSBvZiBkYXRhIHVzaW5nIGVpdGhlciB0aGUgc3VwcGxpZWQgcXVlcnkgaW5zdGFuY2Ugb3JcbiAgICAgKiB0aGUgbW9zdCByZWNlbnQgb25lIG1hbmFnZWQgYnkgdGhpcyBzZXJ2aWNlXG4gICAgICovXG4gICAgcHVibGljIGFic3RyYWN0IHNlYXJjaChxdWVyeSA/OiBRKTtcblxuICAgIC8qKiBNZXRob2QgdG8gY29tcGFyZSB0d28gaXRlbXMgZm9yIHNpbWlsYXJpdHkgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29tcGFyZUl0ZW1zKGEgOiBJLCBiIDogSSkgOiBib29sZWFuO1xuXG4gICAgLyoqIE1ldGhvZCB0byBzb3J0IHNlYXJjaCByZXN1bHQgaXRlbXMgKi9cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3Qgc29ydEl0ZW1zKCBpdGVtczogSVtdICk7XG5cbiAgICAvKipcbiAgICAgKiBOb3RpZnkgc3Vic2NyaWJlcnMgb2YgYSBjaGFuZ2UgdG8gb25lIG9yIG1vcmUgcGllY2VzIG9mIG1hbmFnZWQgZGF0YVxuICAgICAqL1xuICAgIHB1YmxpYyBlbWl0KCBldmVudCA6IFNlYXJjaFNlcnZpY2VFdmVudDxRLFIsST4gKSB7XG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KGV2ZW50KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0RXJyb3IoKSA6IEVycm9yIHsgcmV0dXJuIHRoaXMuX2Vycm9yOyB9XG4gICAgcHJvdGVjdGVkIHNldEVycm9yKCBlcnIgOiBFcnJvciApIHsgdGhpcy5fZXJyb3IgPSBlcnI7IH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHF1ZXJ5IG1hbmFnZWQgYnkgdGhpcyBzZWFyY2ggc2VydmljZSBpbnN0YW5jZSBhbmQgb3B0aW9uYWxseVxuICAgICAqIHRyaWdnZXJzIGEgcmVmcmVzaCBvZiBzZWFyY2ggcmVzdWx0cyB1c2luZyB0aGF0IHF1ZXJ5XG4gICAgICovXG4gICAgcHVibGljIHNldFF1ZXJ5KHF1ZXJ5IDogUSwgYW5kU2VhcmNoID86IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fcXVlcnkgPSBxdWVyeTtcbiAgICAgICAgdGhpcy5lbWl0KHsgcXVlcnkgOiBxdWVyeSB9KTtcblxuICAgICAgICBpZiggdHJ1ZSA9PT0gYW5kU2VhcmNoICkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2goKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBwdWJsaWMgZ2V0UXVlcnkoKSA6IFEgeyByZXR1cm4gdGhpcy5fcXVlcnk7IH1cblxuICAgIHB1YmxpYyBnZXRSZXN1bHRzKCkgOiBSIHsgcmV0dXJuIHRoaXMuX3Jlc3VsdHM7IH1cbiAgICBwcm90ZWN0ZWQgc2V0UmVzdWx0cyggcmVzdWx0cyA6IFIgKSB7IHRoaXMuX3Jlc3VsdHMgPSByZXN1bHRzOyB9XG5cbiAgICAvKipcbiAgICAgKiBUb2dnbGUgb25lIG9yIG1vcmUgaXRlbXMgYXMgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBwdWJsaWMgc2VsZWN0KCBpdGVtIDogSXxJW10gKSB7XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoaXRlbSkpIHsgLy9tdWx0aXBsZSBzZWxlY3Rpb25zXG4gICAgICAgICAgICBpdGVtLmZvckVhY2goIGl0ID0+IHRoaXMuX3RvZ2dsZUl0ZW0oaXQsIGZhbHNlKSApO1xuICAgICAgICAgICAgdGhpcy5lbWl0KHsgc2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3RvZ2dsZUl0ZW0oIGl0ZW0sIHRydWUgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBtZXRob2Qgd2hpY2ggdG9nZ2xlcyBhbiBJdGVtIGFzIHNlbGVjdGVkIChvciBkZS1zZWxlY3RlZCBpZiBpdFxuICAgICAqIHdhcyBhbHJlYWR5IHNlbGVjdGVkKSBhbmQgb3B0aW9uYWxseSB0cmlnZ2VycyBhIG5vdGlmaWNhdGlvbiBvZiBhIGNoYW5nZVxuICAgICAqIGluIHRoZSBzZWxlY3RlZCBpdGVtcyBtYW5hZ2VkIGJ5IHRoaXMgc2VydmljZSBpbnN0YW5jZVxuICAgICAqL1xuICAgIHByb3RlY3RlZCBfdG9nZ2xlSXRlbSggaXRlbSA6IEksIGZpcmVFdmVudCA6IGJvb2xlYW4gKSB7XG4gICAgICAgIGlmKCFpdGVtKSByZXR1cm47XG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuX3NlbGVjdGVkLmZpbmRJbmRleCggKHM6SSkgPT4gdGhpcy5jb21wYXJlSXRlbXMocywgaXRlbSkgKTtcbiAgICAgICAgaWYocG9zaXRpb24gPj0gMCkgeyAvL2FscmVhZHkgc2VsZWN0ZWQsIGRlc2VsZWN0IGl0IGFuZCByZXR1cm5cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgICAgICBpZihmaXJlRXZlbnQpIHRoaXMuZW1pdCh7c2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQucHVzaChpdGVtKTtcbiAgICAgICAgdGhpcy5zb3J0SXRlbXModGhpcy5fc2VsZWN0ZWQpO1xuICAgICAgICBpZihmaXJlRXZlbnQpIHRoaXMuZW1pdCh7c2VsZWN0ZWQ6IHRoaXMuX3NlbGVjdGVkfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW0gYmVpbmcgY2hlY2tlZCBmb3Igc2VsZWN0aW9uXG4gICAgICogQHJldHVybiBib29sZWFuXG4gICAgICovXG4gICAgcHVibGljIGlzU2VsZWN0ZWQoIGl0ZW0gOiBJICk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQubGVuZ3RoICYmIGl0ZW0gJiZcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGVkLmZpbmRJbmRleCggKGl0OkkpID0+IHRoaXMuY29tcGFyZUl0ZW1zKGl0LCBpdGVtKSApID49IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBib29sZWFuIHRydWUgaWYgdGhlcmUgaXMgb25lIG9yIG1vcmUgc2VsZWN0ZWQgaXRlbXNcbiAgICAgKi9cbiAgICBwdWJsaWMgaGFzU2VsZWN0ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQgJiYgdGhpcy5fc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIGFycmF5IG9mIHNlbGVjdGVkIGl0ZW1zXG4gICAgICovXG4gICAgcHVibGljIGdldFNlbGVjdGVkKCkgOiBJW10ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWQ7XG4gICAgfVxuICAgIHByb3RlY3RlZCBzZXRTZWxlY3RlZCggc2VsIDogSVtdICkgeyB0aGlzLl9zZWxlY3RlZCA9IHNlbDsgfVxuXG4gICAgLyoqXG4gICAgICogRGUtc2VsZWN0cyBhbGwgY3VycmVudGx5IHNlbGVjdGVkIGl0ZW1zXG4gICAgICovXG4gICAgcHVibGljIGNsZWFyU2VsZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gW107XG4gICAgICAgIHRoaXMuZW1pdCh7IHNlbGVjdGVkOiB0aGlzLl9zZWxlY3RlZCB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBsaXN0ZW5lciBvbiB0aGlzIHNlcnZpY2UncyBzdWJqZWN0IHdoaWNoIHdpbGwgYmUgbm90aWZpZWRcbiAgICAgKiB1cG9uIGFueSBjaGFuZ2UgaW4gbWFuYWdlZCBkYXRhXG4gICAgICovXG4gICAgcHVibGljIHN1YnNjcmliZSggbGlzdGVuZXIgOiBTZWFyY2hBd2FyZUNvbXBvbmVudDxRLFIsST4gKSA6IFN1YnNjcmlwdGlvbiB7XG5cbiAgICAgICAgbGV0IG9icyA6IE9ic2VydmVyPFNlYXJjaFNlcnZpY2VFdmVudDxRLFIsST4+ID0ge1xuICAgICAgICAgICAgbmV4dCA6ICh2YWx1ZTogU2VhcmNoU2VydmljZUV2ZW50PFEsUixJPikgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCB0eXBlb2YodmFsdWUpID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlLnF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5vblF1ZXJ5Q2hhbmdlKCB2YWx1ZS5xdWVyeSApO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlLnJlc3VsdHMpXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uUmVzdWx0c0NoYW5nZSggdmFsdWUucmVzdWx0cywgdmFsdWUuZXJyb3J8fG51bGwgKTtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZS5zZWxlY3RlZClcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIub25TZWxlY3RlZENoYW5nZSggdmFsdWUuc2VsZWN0ZWQgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlcnJvciA6ICggZXJyOiBFcnJvciApID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIltFUlJPUl0gXCIgKyBlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGUgOiAoKSA9PiB7IH1cbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgc3ViID0gdGhpcy5zdWJqZWN0JC5zdWJzY3JpYmUoIG9icyApO1xuXG4gICAgICAgIGlmKHRoaXMuX3F1ZXJ5KSB7XG4gICAgICAgICAgICB0aGlzLmVtaXQoeyBxdWVyeSA6IHRoaXMuX3F1ZXJ5IH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuX3Jlc3VsdHMgfHwgdGhpcy5fZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCh7IHJlc3VsdHMgOiB0aGlzLl9yZXN1bHRzLCBlcnJvcjogdGhpcy5fZXJyb3J8fG51bGwgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5fc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdCh7IHNlbGVjdGVkIDogdGhpcy5fc2VsZWN0ZWQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3ViO1xuICAgIH1cblxufVxuXG5cblxuXG5cblxuXG4vKipcbiAqIEdlb1BsYXRmb3JtIFNlYXJjaCBTZXJ2aWNlXG4gKlxuICogSW5zdGFuY2Ugb2YgU2VhcmNoU2VydmljZSB3aGljaCBhbGxvd3Mgc2VhcmNoaW5nIEdlb1BsYXRmb3JtIFBvcnRmb2xpbyAoUklNKVxuICogSXRlbXMgKERhdGFzZXRzLCBNYXBzLCBMYXllcnMsIFNlcnZpY2VzLCBldGMpXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybVNlYXJjaFNlcnZpY2UgZXh0ZW5kcyBBYnN0cmFjdFNlYXJjaFNlcnZpY2U8UXVlcnksIFNlYXJjaFJlc3VsdHMsIEl0ZW0+e1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSXRlbVNlcnZpY2UpIHByaXZhdGUgc2VydmljZSA6IEl0ZW1TZXJ2aWNlXG4gICAgKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIGdldFNlcnZpY2UoKSA6IEl0ZW1TZXJ2aWNlIHsgcmV0dXJuIHRoaXMuc2VydmljZTsgfVxuXG4gICAgY3JlYXRlU3ViamVjdCgpIDogU3ViamVjdDxTZWFyY2hTZXJ2aWNlRXZlbnQ8UXVlcnksU2VhcmNoUmVzdWx0cyxJdGVtPj4ge1xuICAgICAgICByZXR1cm4gbmV3IFN1YmplY3Q8U2VhcmNoU2VydmljZUV2ZW50PFF1ZXJ5LFNlYXJjaFJlc3VsdHMsSXRlbT4+KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBnZXRRdWVyeSgpIDogUXVlcnkge1xuICAgICAgICByZXR1cm4gc3VwZXIuZ2V0UXVlcnkoKS5jbG9uZSgpO1xuICAgIH1cblxuICAgIC8vIC8qKlxuICAgIC8vICAqXG4gICAgLy8gICovXG4gICAgLy8gc2V0UXVlcnkocXVlcnkgOiBRdWVyeSkge1xuICAgIC8vICAgICBzdXBlci5zZXRRdWVyeSggcXVlcnkgPyBxdWVyeS5jbG9uZSgpIDogcXVlcnkgKTtcbiAgICAvLyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIHNlYXJjaChxdWVyeSA/OiBRdWVyeSkge1xuICAgICAgICAvL2lmIGEgcXVlcnkgd2FzIHByb3ZpZGVkLCBzdG9yZSBpdCBhbmQgdXNlIGl0XG4gICAgICAgIGlmKHF1ZXJ5KSB0aGlzLnNldFF1ZXJ5KHF1ZXJ5KTtcblxuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VhcmNoKCBzdXBlci5nZXRRdWVyeSgpIClcbiAgICAgICAgLnRoZW4oIChyZXNwb25zZSA6IFNlYXJjaFJlc3VsdHMpID0+IHtcbiAgICAgICAgICAgIGxvZ2dlci5kZWJ1ZygnU2VhcmNoU2VydmljZS5zZWFyY2goKSAtICcgKyByZXNwb25zZS50b3RhbFJlc3VsdHMgKyBcIiByZXN1bHRzIGZvdW5kXCIpO1xuICAgICAgICAgICAgdGhpcy5zZXRSZXN1bHRzKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIHRoaXMuc2V0RXJyb3IobnVsbCk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoeyByZXN1bHRzIDogcmVzcG9uc2UsIGVycm9yOiBudWxsIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIChlcnJvciA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICAgICB0aGlzLnNldEVycm9yKGVycm9yKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdCh7IHJlc3VsdHMgOiBudWxsLCBlcnJvcjogZXJyb3IgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKi9cbiAgICBfdG9nZ2xlSXRlbSggaXRlbSA6IEl0ZW0sIGZpcmVFdmVudCA6IGJvb2xlYW4gKSB7XG4gICAgICAgIGlmKCFpdGVtIHx8ICFpdGVtLmlkKSByZXR1cm47XG4gICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuZ2V0U2VsZWN0ZWQoKTtcbiAgICAgICAgbGV0IHBvc2l0aW9uID0gc2VsZWN0ZWQuZmluZEluZGV4KCBzID0+IHMuaWQgPT09IGl0ZW0uaWQgKTtcbiAgICAgICAgaWYocG9zaXRpb24gPj0gMCkgeyAvL2FscmVhZHkgc2VsZWN0ZWQsIGRlc2VsZWN0IGl0IGFuZCByZXR1cm5cbiAgICAgICAgICAgIHNlbGVjdGVkLnNwbGljZShwb3NpdGlvbiwgMSk7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKHNlbGVjdGVkKTtcbiAgICAgICAgICAgIGlmKGZpcmVFdmVudCkgdGhpcy5lbWl0KHtzZWxlY3RlZDogc2VsZWN0ZWR9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbmV3IHNlbGVjdGlvblxuICAgICAgICAvLyBsb2dnZXIuZXJyb3IoYFNlbGVjdGluZyAke2l0ZW0ubGFiZWx9IGFzICR7ZW50cnkudHlwZS50b1N0cmluZygpfWApO1xuXG4gICAgICAgIC8vZmV0Y2ggZnVsbCBvYmplY3QgYW5kIHJlcGxhY2UgcGxhY2Vob2xkZXIgaW4gc2VsZWN0ZWQgYXJyYXlcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldChpdGVtLmlkKVxuICAgICAgICAudGhlbiggZnVsbEl0ZW0gPT4ge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5nZXRTZWxlY3RlZCgpO1xuICAgICAgICAgICAgc2VsZWN0ZWQucHVzaChmdWxsSXRlbSk7XG4gICAgICAgICAgICB0aGlzLnNvcnRJdGVtcyhzZWxlY3RlZCk7XG4gICAgICAgICAgICB0aGlzLnNldFNlbGVjdGVkKHNlbGVjdGVkKTtcbiAgICAgICAgICAgIGlmKGZpcmVFdmVudCkgdGhpcy5lbWl0KHtzZWxlY3RlZDogc2VsZWN0ZWR9KTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKGUgPT4ge1xuICAgICAgICAgICAgbG9nZ2VyLmVycm9yKFwiU2VhcmNoU2VydmljZS5zZWxlY3QoKSAtIFwiICtcbiAgICAgICAgICAgICAgICBcIkVycm9yIGVuY291bnRlcmVkIGZldGNoaW5nIHNlbGVjdGVkIGl0ZW0ncyBkZXRhaWxzOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGNvbXBhcmVJdGVtcyhhIDogSXRlbSwgYiA6IEl0ZW0pIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiBhLmlkID09PSBiLmlkO1xuICAgIH1cblxuICAgIHNvcnRJdGVtcyggaXRlbXM6IEl0ZW1bXSApIHtcbiAgICAgICAgaXRlbXMuc29ydCgoYSxiKSA9PiBhLmxhYmVsID4gYi5sYWJlbCA/IDEgOiAtMSApO1xuICAgIH1cblxufVxuIl19