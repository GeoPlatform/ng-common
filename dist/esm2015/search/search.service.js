import * as tslib_1 from "tslib";
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Query, ItemService } from '@geoplatform/client';
import { logger } from '../logger';
/**
 *
 */
let SearchService = class SearchService {
    constructor(service) {
        this.service = service;
        this.selected = [];
        this.subject = new Subject();
        this.subject$ = this.subject.asObservable();
    }
    setQuery(query) {
        this.query = query ? query.clone() : new Query();
        this.subject.next({ query: this.query.clone() });
    }
    getQuery() {
        return this.query.clone();
    }
    getResults() {
        return this.results;
    }
    search(query) {
        //if a query was provided, store it and use it
        if (query)
            this.setQuery(query);
        this.service.search(this.query)
            .then((response) => {
            logger.debug('SearchService.search() - ' + response.totalResults + " results found");
            this.results = response;
            this.subject.next({ results: response });
        })
            .catch((error) => {
            logger.error(error.message);
        });
    }
    /**
     * @param item - item or array of item selected from search results
     * @param asBaseLayer - boolean indicating how to select the layer
     */
    select(item) {
        if (Array.isArray(item)) { //multiple selections
            item.forEach(it => this._toggleItem(it, false));
            this.subject.next({ selected: this.selected });
            return;
        }
        this._toggleItem(item, true);
    }
    /**
     *
     */
    _toggleItem(item, fireEvent) {
        if (!item || !item.id)
            return;
        let position = this.selected.findIndex(s => s.id === item.id);
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
            .then(fullItem => {
            this.selected.push(fullItem);
            this.selected.sort((a, b) => a.label > b.label ? 1 : -1);
            if (fireEvent)
                this.subject.next({ selected: this.selected });
        })
            .catch(e => {
            logger.error("SearchService.select() - " +
                "Error encountered fetching selected item's details: " + e.message);
        });
    }
    /**
     * @param item Item
     * @return boolean
     */
    isSelected(item) {
        return this.selected.length &&
            item && item.id &&
            this.selected.findIndex(it => it.id === item.id) >= 0;
    }
    /**
     *
     */
    hasSelected() {
        return this.selected && this.selected.length > 0;
    }
    /**
     * @return Item[]
     */
    getSelected() {
        return this.selected;
    }
    clearSelected() {
        this.selected = [];
        this.subject.next({ selected: this.selected });
    }
    subscribe(listener) {
        let obs = {
            next: (value) => {
                if (typeof (value) === 'undefined' || value === null)
                    return;
                if (value.query)
                    listener.onQueryChange(value.query);
                if (value.results)
                    listener.onResultsChange(value.results);
                if (value.selected)
                    listener.onSelectedChange(value.selected);
            },
            error: (err) => {
                console.log("[ERROR] " + err.message);
            },
            complete: () => { }
        };
        let sub = this.subject$.subscribe(obs);
        if (this.query)
            this.subject.next({ query: this.query.clone() });
        if (this.results)
            this.subject.next({ results: this.results });
        if (this.selected)
            this.subject.next({ selected: this.selected });
        return sub;
    }
};
SearchService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [ItemService,] }] }
];
SearchService = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Inject(ItemService))
], SearchService);
export { SearchService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL3NlYXJjaC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQXdCLE9BQU8sRUFBZ0IsTUFBTSxNQUFNLENBQUM7QUFDbkUsT0FBTyxFQUFRLEtBQUssRUFBaUIsV0FBVyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLFdBQVcsQ0FBQztBQXNCbkM7O0dBRUc7QUFFSCxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBVXRCLFlBQ2lDLE9BQXFCO1FBQXJCLFlBQU8sR0FBUCxPQUFPLENBQWM7UUFQOUMsYUFBUSxHQUFZLEVBQVksQ0FBQztRQUVqQyxZQUFPLEdBQUcsSUFBSSxPQUFPLEVBQXNCLENBQUM7UUFDNUMsYUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7SUFPL0MsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELFFBQVE7UUFDSixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELFVBQVU7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDeEIsQ0FBQztJQUVELE1BQU0s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QVE7b0JBQ2IsUUFBUSxDQUFDLGdCQUFnQixDQUFFLEtBQUssQ0FBQyxRQUFRLENBQUUsQ0FBQztZQUNwRCxDQUFDO1lBQ0QsS0FBSyxFQUFHLENBQUUsR0FBVSxFQUFHLEVBQUU7Z0JBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBQ0QsUUFBUSxFQUFHLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDdkIsQ0FBQztRQUVGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBRSxDQUFDO1FBRXpDLElBQUcsSUFBSSxDQUFDLEtBQUs7WUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqRSxJQUFHLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDL0QsSUFBRyxJQUFJLENBQUMsUUFBUTtZQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxFQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBRWxFLE9BQU8sR0FBRyxDQUFDO0lBQ2YsQ0FBQztDQUVKLENBQUE7OzRDQXpJUSxNQUFNLFNBQUMsV0FBVzs7QUFYZCxhQUFhO0lBRHpCLFVBQVUsRUFBRTtJQVlKLG1CQUFBLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTtHQVhmLGFBQWEsQ0FvSnpCO1NBcEpZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3QsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyLCBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEl0ZW0sIFF1ZXJ5LCBTZWFyY2hSZXN1bHRzLCBJdGVtU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgbG9nZ2VyIH0gZnJvbSAnLi4vbG9nZ2VyJztcblxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoU2VydmljZUV2ZW50IHtcbiAgICBxdWVyeSAgICA/OiBRdWVyeTtcbiAgICByZXN1bHRzICA/OiBTZWFyY2hSZXN1bHRzO1xuICAgIHNlbGVjdGVkID86IEl0ZW1bXVxufVxuXG4vKipcbiAqXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoQXdhcmVDb21wb25lbnQge1xuICAgIG9uUXVlcnlDaGFuZ2UoIHF1ZXJ5IDogUXVlcnkgKSA6IHZvaWQ7XG4gICAgb25SZXN1bHRzQ2hhbmdlKCByZXN1bHRzIDogU2VhcmNoUmVzdWx0cyApIDogdm9pZDtcbiAgICBvblNlbGVjdGVkQ2hhbmdlKCBzZWxlY3RlZCA6IEl0ZW1bXSApIDogdm9pZDtcbn1cblxuXG4vKipcbiAqXG4gKi9cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBTZWFyY2hTZXJ2aWNlIHtcblxuICAgIHByaXZhdGUgcXVlcnkgICAgOiBRdWVyeTtcbiAgICBwcml2YXRlIHJlc3VsdHMgIDogU2VhcmNoUmVzdWx0cztcbiAgICBwcml2YXRlIHNlbGVjdGVkIDogSXRlbVtdID0gW10gYXMgSXRlbVtdO1xuXG4gICAgcHJpdmF0ZSBzdWJqZWN0ID0gbmV3IFN1YmplY3Q8U2VhcmNoU2VydmljZUV2ZW50PigpO1xuICAgIHByaXZhdGUgc3ViamVjdCQgPSB0aGlzLnN1YmplY3QuYXNPYnNlcnZhYmxlKCk7XG5cblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KEl0ZW1TZXJ2aWNlKSBwcml2YXRlIHNlcnZpY2UgOiBJdGVtU2VydmljZVxuICAgICkge1xuXG4gICAgfVxuXG4gICAgc2V0UXVlcnkocXVlcnkgOiBRdWVyeSkge1xuICAgICAgICB0aGlzLnF1ZXJ5ID0gcXVlcnkgPyBxdWVyeS5jbG9uZSgpIDogbmV3IFF1ZXJ5KCk7XG4gICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KHsgcXVlcnkgOiB0aGlzLnF1ZXJ5LmNsb25lKCkgfSk7XG4gICAgfVxuXG4gICAgZ2V0UXVlcnkoKSA6IFF1ZXJ5IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnkuY2xvbmUoKTtcbiAgICB9XG5cbiAgICBnZXRSZXN1bHRzKCkgOiBTZWFyY2hSZXN1bHRzIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0cztcbiAgICB9XG5cbiAgICBzZWFyY2gocXVlcnkgPzogUXVlcnkpIHtcblxuICAgICAgICAvL2lmIGEgcXVlcnkgd2FzIHByb3ZpZGVkLCBzdG9yZSBpdCBhbmQgdXNlIGl0XG4gICAgICAgIGlmKHF1ZXJ5KSB0aGlzLnNldFF1ZXJ5KHF1ZXJ5KTtcblxuICAgICAgICB0aGlzLnNlcnZpY2Uuc2VhcmNoKHRoaXMucXVlcnkpXG4gICAgICAgIC50aGVuKCAocmVzcG9uc2U6U2VhcmNoUmVzdWx0cykgPT4ge1xuICAgICAgICAgICAgbG9nZ2VyLmRlYnVnKCdTZWFyY2hTZXJ2aWNlLnNlYXJjaCgpIC0gJyArIHJlc3BvbnNlLnRvdGFsUmVzdWx0cyArIFwiIHJlc3VsdHMgZm91bmRcIik7XG4gICAgICAgICAgICB0aGlzLnJlc3VsdHMgPSByZXNwb25zZTtcbiAgICAgICAgICAgIHRoaXMuc3ViamVjdC5uZXh0KHsgcmVzdWx0cyA6IHJlc3BvbnNlIH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goIChlcnJvciA6IEVycm9yKSA9PiB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW0gLSBpdGVtIG9yIGFycmF5IG9mIGl0ZW0gc2VsZWN0ZWQgZnJvbSBzZWFyY2ggcmVzdWx0c1xuICAgICAqIEBwYXJhbSBhc0Jhc2VMYXllciAtIGJvb2xlYW4gaW5kaWNhdGluZyBob3cgdG8gc2VsZWN0IHRoZSBsYXllclxuICAgICAqL1xuICAgIHNlbGVjdCggaXRlbSA6IEl0ZW18SXRlbVtdICkge1xuXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoaXRlbSkpIHsgLy9tdWx0aXBsZSBzZWxlY3Rpb25zXG4gICAgICAgICAgICBpdGVtLmZvckVhY2goIGl0ID0+IHRoaXMuX3RvZ2dsZUl0ZW0oaXQsIGZhbHNlKSApO1xuICAgICAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoeyBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZCB9KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3RvZ2dsZUl0ZW0oIGl0ZW0sIHRydWUgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIF90b2dnbGVJdGVtKCBpdGVtIDogSXRlbSwgZmlyZUV2ZW50IDogYm9vbGVhbiApIHtcbiAgICAgICAgaWYoIWl0ZW0gfHwgIWl0ZW0uaWQpIHJldHVybjtcblxuICAgICAgICBsZXQgcG9zaXRpb24gPSB0aGlzLnNlbGVjdGVkLmZpbmRJbmRleCggcyA9PiBzLmlkID09PSBpdGVtLmlkICk7XG5cbiAgICAgICAgaWYocG9zaXRpb24gPj0gMCkgeyAvL2FscmVhZHkgc2VsZWN0ZWQsIGRlc2VsZWN0IGl0IGFuZCByZXR1cm5cbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICAgICAgICAgIGlmKGZpcmVFdmVudCkgdGhpcy5zdWJqZWN0Lm5leHQoe3NlbGVjdGVkOiB0aGlzLnNlbGVjdGVkfSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvL25ldyBzZWxlY3Rpb25cbiAgICAgICAgLy8gbG9nZ2VyLmVycm9yKGBTZWxlY3RpbmcgJHtpdGVtLmxhYmVsfSBhcyAke2VudHJ5LnR5cGUudG9TdHJpbmcoKX1gKTtcblxuICAgICAgICAvL2ZldGNoIGZ1bGwgb2JqZWN0IGFuZCByZXBsYWNlIHBsYWNlaG9sZGVyIGluIHNlbGVjdGVkIGFycmF5XG4gICAgICAgIHRoaXMuc2VydmljZS5nZXQoaXRlbS5pZClcbiAgICAgICAgLnRoZW4oIGZ1bGxJdGVtID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChmdWxsSXRlbSk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnNvcnQoIChhLGIpID0+IGEubGFiZWwgPiBiLmxhYmVsID8gMSA6IC0xICk7XG4gICAgICAgICAgICBpZihmaXJlRXZlbnQpIHRoaXMuc3ViamVjdC5uZXh0KHtzZWxlY3RlZDogdGhpcy5zZWxlY3RlZH0pO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2goZSA9PiB7XG4gICAgICAgICAgICBsb2dnZXIuZXJyb3IoXCJTZWFyY2hTZXJ2aWNlLnNlbGVjdCgpIC0gXCIgK1xuICAgICAgICAgICAgICAgIFwiRXJyb3IgZW5jb3VudGVyZWQgZmV0Y2hpbmcgc2VsZWN0ZWQgaXRlbSdzIGRldGFpbHM6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGl0ZW0gSXRlbVxuICAgICAqIEByZXR1cm4gYm9vbGVhblxuICAgICAqL1xuICAgIGlzU2VsZWN0ZWQoIGl0ZW0gOiBJdGVtICk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3RlZC5sZW5ndGggJiZcbiAgICAgICAgICAgIGl0ZW0gJiYgaXRlbS5pZCAmJlxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5maW5kSW5kZXgoaXQ9Pml0LmlkPT09aXRlbS5pZCkgPj0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqL1xuICAgIGhhc1NlbGVjdGVkKCkgOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgJiYgdGhpcy5zZWxlY3RlZC5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4gSXRlbVtdXG4gICAgICovXG4gICAgZ2V0U2VsZWN0ZWQoKSA6IEl0ZW1bXSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkO1xuICAgIH1cblxuICAgIGNsZWFyU2VsZWN0ZWQoKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWQgPSBbXTtcbiAgICAgICAgdGhpcy5zdWJqZWN0Lm5leHQoeyBzZWxlY3RlZDogdGhpcy5zZWxlY3RlZCB9KTtcbiAgICB9XG5cblxuICAgIHN1YnNjcmliZSggbGlzdGVuZXIgOiBTZWFyY2hBd2FyZUNvbXBvbmVudCApIDogU3Vic2NyaXB0aW9uIHtcblxuICAgICAgICBsZXQgb2JzIDogT2JzZXJ2ZXI8U2VhcmNoU2VydmljZUV2ZW50PiA9IHtcbiAgICAgICAgICAgIG5leHQgOiAodmFsdWU6IFNlYXJjaFNlcnZpY2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCB0eXBlb2YodmFsdWUpID09PSAndW5kZWZpbmVkJyB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlLnF1ZXJ5KVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5vblF1ZXJ5Q2hhbmdlKCB2YWx1ZS5xdWVyeSApO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlLnJlc3VsdHMpXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyLm9uUmVzdWx0c0NoYW5nZSggdmFsdWUucmVzdWx0cyApO1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlLnNlbGVjdGVkKVxuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lci5vblNlbGVjdGVkQ2hhbmdlKCB2YWx1ZS5zZWxlY3RlZCApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVycm9yIDogKCBlcnI6IEVycm9yICkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiW0VSUk9SXSBcIiArIGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZSA6ICgpID0+IHsgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCBzdWIgPSB0aGlzLnN1YmplY3QkLnN1YnNjcmliZSggb2JzICk7XG5cbiAgICAgICAgaWYodGhpcy5xdWVyeSkgdGhpcy5zdWJqZWN0Lm5leHQoeyBxdWVyeSA6IHRoaXMucXVlcnkuY2xvbmUoKSB9KTtcbiAgICAgICAgaWYodGhpcy5yZXN1bHRzKSB0aGlzLnN1YmplY3QubmV4dCh7IHJlc3VsdHMgOiB0aGlzLnJlc3VsdHMgfSk7XG4gICAgICAgIGlmKHRoaXMuc2VsZWN0ZWQpIHRoaXMuc3ViamVjdC5uZXh0KHsgc2VsZWN0ZWQgOiB0aGlzLnNlbGVjdGVkIH0pO1xuXG4gICAgICAgIHJldHVybiBzdWI7XG4gICAgfVxuXG59XG4iXX0=