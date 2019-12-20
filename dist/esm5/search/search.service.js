import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Query, ItemService } from '@geoplatform/client';
import { logger } from '../logger';
/**
 *
 */
var SearchService = /** @class */ (function () {
    function SearchService(service) {
        this.service = service;
        this.selected = [];
        this.subject = new Subject();
        this.subject$ = this.subject.asObservable();
    }
    SearchService.prototype.setQuery = function (query) {
        this.query = query ? query.clone() : new Query();
        this.subject.next({ query: this.query.clone() });
    };
    SearchService.prototype.getQuery = function () {
        return this.query.clone();
    };
    SearchService.prototype.getResults = function () {
        return this.results;
    };
    SearchService.prototype.search = function (query) {
        var _this = this;
        //if a query was provided, store it and use it
        if (query)
            this.setQuery(query);
        this.service.search(this.query)
            .then(function (response) {
            logger.debug('SearchService.search() - ' + response.totalResults + " results found");
            _this.results = response;
            _this.subject.next({ results: response });
        })
            .catch(function (error) {
            logger.error(error.message);
        });
    };
    /**
     * @param item - item or array of item selected from search results
     * @param asBaseLayer - boolean indicating how to select the layer
     */
    SearchService.prototype.select = function (item) {
        var _this = this;
        if (Array.isArray(item)) { //multiple selections
            item.forEach(function (it) { return _this._toggleItem(it, false); });
            this.subject.next({ selected: this.selected });
            return;
        }
        this._toggleItem(item, true);
    };
    /**
     *
     */
    SearchService.prototype._toggleItem = function (item, fireEvent) {
        var _this = this;
        if (!item || !item.id)
            return;
        var position = this.selected.findIndex(function (s) { return s.id === item.id; });
        if (position >= 0) { //already selected, deselect it and return
            this.selected.splice(position, 1);
            if (fireEvent)
                this.subject.next({ selected: this.selected });
            return;
        }
        //new selection
        // logger.error(`Selecting ${item.label} as ${entry.type.toString()}`);
        //fetch full object and replace placeholder in selected array
        this.service.get(item.id)
            .then(function (fullItem) {
            _this.selected.push(fullItem);
            _this.selected.sort(function (a, b) { return a.label > b.label ? 1 : -1; });
            if (fireEvent)
                _this.subject.next({ selected: _this.selected });
        })
            .catch(function (e) {
            logger.error("SearchService.select() - " +
                "Error encountered fetching selected item's details: " + e.message);
        });
    };
    /**
     * @param item Item
     * @return boolean
     */
    SearchService.prototype.isSelected = function (item) {
        return this.selected.length &&
            item && item.id &&
            this.selected.findIndex(function (it) { return it.id === item.id; }) >= 0;
    };
    /**
     *
     */
    SearchService.prototype.hasSelected = function () {
        return this.selected && this.selected.length > 0;
    };
    /**
     * @return Item[]
     */
    SearchService.prototype.getSelected = function () {
        return this.selected;
    };
    SearchService.prototype.clearSelected = function () {
        this.selected = [];
        this.subject.next({ selected: this.selected });
    };
    SearchService.prototype.subscribe = function (listener) {
        var obs = {
            next: function (value) {
                if (typeof (value) === 'undefined' || value === null)
                    return;
                if (value.query)
                    listener.onQueryChange(value.query);
                if (value.results)
                    listener.onResultsChange(value.results);
                if (value.selected)
                    listener.onSelectedChange(value.selected);
            },
            error: function (err) {
                console.log("[ERROR] " + err.message);
            },
            complete: function () { }
        };
        return this.subject$.subscribe(obs);
    };
    SearchService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
    ]; };
    SearchService = tslib_1.__decorate([
        Injectable(),
        tslib_1.__param(0, Inject(ItemService))
    ], SearchService);
    return SearchService;
}());
export { SearchService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQXdCLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFRLEtBQUssRUFBaUIsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQXNCbkM7O0dBRUc7QUFFSDtJQVVJLHVCQUNpQyxPQUFxQjtRQUFyQixZQUFPLEdBQVAsT0FBTyxDQUFjO1FBUDlDLGFBQVEsR0FBWSxFQUFZLENBQUM7UUFFakMsWUFBTyxHQUFHLElBQUksT0FBTyxFQUFzQixDQUFDO1FBQzVDLGFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBTy9DLENBQUM7SUFFRCxnQ0FBUSxHQUFSLFVBQVMsS0FBYTtRQUNsQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDO1FBQ2pELElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFRCxnQ0FBUSxHQUFSO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxrQ0FBVSxHQUFWO1FBQ0ksT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3hCLENBQUM7SUFFRCw4QkFBTSxHQUFOLFVB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O29CQUNaLFFBQVEsQ0FBQyxlQUFlLENBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBRSxDQUFDO2dCQUM5QyxJQUFHLEtBQUssQ0FBQyxRQUFRO29CQUNiLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBRSxLQUFLLENBQUMsUUFBUSxDQUFFLENBQUM7WUFDcEQsQ0FBQztZQUNELEtBQUssRUFBRyxVQUFFLEdBQVU7Z0JBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsUUFBUSxFQUFHLGNBQVEsQ0FBQztTQUN2QixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUMxQyxDQUFDOztnREFqSUksTUFBTSxTQUFDLFdBQVc7O0lBWGQsYUFBYTtRQUR6QixVQUFVLEVBQUU7UUFZSixtQkFBQSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7T0FYZixhQUFhLENBOEl6QjtJQUFELG9CQUFDO0NBQUEsQUE5SUQsSUE4SUM7U0E5SVksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIsIFN1YmplY3QsIFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgSXRlbSwgUXVlcnksIFNlYXJjaFJlc3VsdHMsIEl0ZW1TZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tICcuLi9sb2dnZXInO1xuXG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hTZXJ2aWNlRXZlbnQge1xuICAgIHF1ZXJ5ICAgID86IFF1ZXJ5O1xuICAgIHJlc3VsdHMgID86IFNlYXJjaFJlc3VsdHM7XG4gICAgc2VsZWN0ZWQgPzogSXRlbVtdXG59XG5cbi8qKlxuICpcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTZWFyY2hBd2FyZUNvbXBvbmVudCB7XG4gICAgb25RdWVyeUNoYW5nZSggcXVlcnkgOiBRdWVyeSApIDogdm9pZDtcbiAgICBvblJlc3VsdHNDaGFuZ2UoIHJlc3VsdHMgOiBTZWFyY2hSZXN1bHRzICkgOiB2b2lkO1xuICAgIG9uU2VsZWN0ZWRDaGFuZ2UoIHNlbGVjdGVkIDogSXRlbVtdICkgOiB2b2lkO1xufVxuXG5cbi8qKlxuICpcbiAqL1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFNlYXJjaFNlcnZpY2Uge1xuXG4gICAgcHJpdmF0ZSBxdWVyeSAgICA6IFF1ZXJ5O1xuICAgIHByaXZhdGUgcmVzdWx0cyAgOiBTZWFyY2hSZXN1bHRzO1xuICAgIHByaXZhdGUgc2VsZWN0ZWQgOiBJdGVtW10gPSBbXSBhcyBJdGVtW107XG5cbiAgICBwcml2YXRlIHN1YmplY3QgPSBuZXcgU3ViamVjdDxTZWFyY2hTZXJ2aWNlRXZlbnQ+KCk7XG4gICAgcHJpdmF0ZSBzdWJqZWN0JCA9IHRoaXMuc3ViamVjdC5hc09ic2VydmFibGUoKTtcblxuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIEBJbmplY3QoSXRlbVNlcnZpY2UpIHByaXZhdGUgc2VydmljZSA6IEl0ZW1TZXJ2aWNlXG4gICAgKSB7XG5cbiAgICB9XG5cbiAgICBzZXRRdWVyeShxdWVyeSA6IFF1ZXJ5KSB7XG4gICAgICAgIHRoaXMucXVlcnkgPSBxdWVyeSA/IHF1ZXJ5LmNsb25lKCkgOiBuZXcgUXVlcnkoKTtcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoeyBxdWVyeSA6IHRoaXMucXVlcnkuY2xvbmUoKSB9KTtcbiAgICB9XG5cbiAgICBnZXRRdWVyeSgpIDogUXVlcnkge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeS5jbG9uZSgpO1xuICAgIH1cblxuICAgIGdldFJlc3VsdHMoKSA6IFNlYXJjaFJlc3VsdHMge1xuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHRzO1xuICAgIH1cblxuICAgIHNlYXJjaChxdWVyeSA/OiBRdWVyeSkge1xuXG4gICAgICAgIC8vaWYgYSBxdWVyeSB3YXMgcHJvdmlkZWQsIHN0b3JlIGl0IGFuZCB1c2UgaXRcbiAgICAgICAgaWYocXVlcnkpIHRoaXMuc2V0UXVlcnkocXVlcnkpO1xuXG4gICAgICAgIHRoaXMuc2VydmljZS5zZWFyY2godGhpcy5xdWVyeSlcbiAgICAgICAgLnRoZW4oIChyZXNwb25zZTpTZWFyY2hSZXN1bHRzKSA9PiB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoJ1NlYXJjaFNlcnZpY2Uuc2VhcmNoKCkgLSAnICsgcmVzcG9uc2UudG90YWxSZXN1bHRzICsgXCIgcmVzdWx0cyBmb3VuZFwiKTtcbiAgICAgICAgICAgIHRoaXMucmVzdWx0cyA9IHJlc3BvbnNlO1xuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoeyByZXN1bHRzIDogcmVzcG9uc2UgfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCggKGVycm9yIDogRXJyb3IpID0+IHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbSAtIGl0ZW0gb3IgYXJyYXkgb2YgaXRlbSBzZWxlY3RlZCBmcm9tIHNlYXJjaCByZXN1bHRzXG4gICAgICogQHBhcmFtIGFzQmFzZUxheWVyIC0gYm9vbGVhbiBpbmRpY2F0aW5nIGhvdyB0byBzZWxlY3QgdGhlIGxheWVyXG4gICAgICovXG4gICAgc2VsZWN0KCBpdGVtIDogSXRlbXxJdGVtW10gKSB7XG5cbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShpdGVtKSkgeyAvL211bHRpcGxlIHNlbGVjdGlvbnNcbiAgICAgICAgICAgIGl0ZW0uZm9yRWFjaCggaXQgPT4gdGhpcy5fdG9nZ2xlSXRlbShpdCwgZmFsc2UpICk7XG4gICAgICAgICAgICB0aGlzLnN1YmplY3QubmV4dCh7IHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fdG9nZ2xlSXRlbSggaXRlbSwgdHJ1ZSApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgX3RvZ2dsZUl0ZW0oIGl0ZW0gOiBJdGVtLCBmaXJlRXZlbnQgOiBib29sZWFuICkge1xuICAgICAgICBpZighaXRlbSB8fCAhaXRlbS5pZCkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBwb3NpdGlvbiA9IHRoaXMuc2VsZWN0ZWQuZmluZEluZGV4KCBzID0+IHMuaWQgPT09IGl0ZW0uaWQgKTtcblxuICAgICAgICBpZihwb3NpdGlvbiA+PSAwKSB7IC8vYWxyZWFkeSBzZWxlY3RlZCwgZGVzZWxlY3QgaXQgYW5kIHJldHVyblxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgICAgICAgICAgaWYoZmlyZUV2ZW50KSB0aGlzLnN1YmplY3QubmV4dCh7c2VsZWN0ZWQ6IHRoaXMuc2VsZWN0ZWR9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vbmV3IHNlbGVjdGlvblxuICAgICAgICAvLyBsb2dnZXIuZXJyb3IoYFNlbGVjdGluZyAke2l0ZW0ubGFiZWx9IGFzICR7ZW50cnkudHlwZS50b1N0cmluZygpfWApO1xuXG4gICAgICAgIC8vZmV0Y2ggZnVsbCBvYmplY3QgYW5kIHJlcGxhY2UgcGxhY2Vob2xkZXIgaW4gc2VsZWN0ZWQgYXJyYXlcbiAgICAgICAgdGhpcy5zZXJ2aWNlLmdldChpdGVtLmlkKVxuICAgICAgICAudGhlbiggZnVsbEl0ZW0gPT4ge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5wdXNoKGZ1bGxJdGVtKTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc29ydCggKGEsYikgPT4gYS5sYWJlbCA+IGIubGFiZWwgPyAxIDogLTEgKTtcbiAgICAgICAgICAgIGlmKGZpcmVFdmVudCkgdGhpcy5zdWJqZWN0Lm5leHQoe3NlbGVjdGVkOiB0aGlzLnNlbGVjdGVkfSk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaChlID0+IHtcbiAgICAgICAgICAgIGxvZ2dlci5lcnJvcihcIlNlYXJjaFNlcnZpY2Uuc2VsZWN0KCkgLSBcIiArXG4gICAgICAgICAgICAgICAgXCJFcnJvciBlbmNvdW50ZXJlZCBmZXRjaGluZyBzZWxlY3RlZCBpdGVtJ3MgZGV0YWlsczogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gaXRlbSBJdGVtXG4gICAgICogQHJldHVybiBib29sZWFuXG4gICAgICovXG4gICAgaXNTZWxlY3RlZCggaXRlbSA6IEl0ZW0gKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkLmxlbmd0aCAmJlxuICAgICAgICAgICAgaXRlbSAmJiBpdGVtLmlkICYmXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLmZpbmRJbmRleChpdD0+aXQuaWQ9PT1pdGVtLmlkKSA+PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICovXG4gICAgaGFzU2VsZWN0ZWQoKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZCAmJiB0aGlzLnNlbGVjdGVkLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiBJdGVtW11cbiAgICAgKi9cbiAgICBnZXRTZWxlY3RlZCgpIDogSXRlbVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3RlZCgpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuICAgICAgICB0aGlzLnN1YmplY3QubmV4dCh7IHNlbGVjdGVkOiB0aGlzLnNlbGVjdGVkIH0pO1xuICAgIH1cblxuXG4gICAgc3Vic2NyaWJlKCBsaXN0ZW5lciA6IFNlYXJjaEF3YXJlQ29tcG9uZW50ICkgOiBTdWJzY3JpcHRpb24ge1xuXG4gICAgICAgIGxldCBvYnMgOiBPYnNlcnZlcjxTZWFyY2hTZXJ2aWNlRXZlbnQ+ID0ge1xuICAgICAgICAgICAgbmV4dCA6ICh2YWx1ZTogU2VhcmNoU2VydmljZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYoIHR5cGVvZih2YWx1ZSkgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSBudWxsKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYodmFsdWUucXVlcnkpXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uUXVlcnlDaGFuZ2UoIHZhbHVlLnF1ZXJ5ICk7XG4gICAgICAgICAgICAgICAgaWYodmFsdWUucmVzdWx0cylcbiAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIub25SZXN1bHRzQ2hhbmdlKCB2YWx1ZS5yZXN1bHRzICk7XG4gICAgICAgICAgICAgICAgaWYodmFsdWUuc2VsZWN0ZWQpXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uU2VsZWN0ZWRDaGFuZ2UoIHZhbHVlLnNlbGVjdGVkICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3IgOiAoIGVycjogRXJyb3IgKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJbRVJST1JdIFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbXBsZXRlIDogKCkgPT4geyB9XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuc3ViamVjdCQuc3Vic2NyaWJlKCBvYnMgKTtcbiAgICB9XG5cbn1cbiJdfQ==