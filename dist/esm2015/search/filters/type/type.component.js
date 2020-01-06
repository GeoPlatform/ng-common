import * as tslib_1 from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemTypes, ItemTypeLabels, QueryParameters } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../../event';
let TypeFilterComponent = class TypeFilterComponent {
    constructor() {
        this.key = QueryParameters.TYPES;
        this.selected = [];
        this.onEvent = new EventEmitter();
        this.isCollapsed = true;
        this.visibleAmount = 10;
    }
    ngOnInit() {
        this.choices = Object.keys(ItemTypes).map(key => {
            let type = ItemTypes[key];
            if (ItemTypes.STANDARD === type || ItemTypes.RIGHTS_STATEMENT === type)
                return null;
            return { label: ItemTypeLabels[type], value: type };
        }).filter(v => !!v);
        // console.log("TypeFilter.onInit() " + JSON.stringify(this.selected));
    }
    ngOnChanges(changes) {
        if (changes.selected) {
            let value = changes.selected.currentValue;
            console.log("TypeFilter.onChanges() " + JSON.stringify(value));
            //if a selected value wasn't provided, ensure it's 'null' and not undefined
            if (value === undefined) {
                this.selected = [];
            }
            else if (typeof (value) === 'string') {
                this.selected = [value];
            }
        }
    }
    getKey() {
        return this.key;
    }
    notify(event) {
        this.onEvent.emit(event);
    }
    hasSelections() {
        return this.selected && this.selected.length > 0;
    }
    isSelected(arg) {
        return this.getIndexOf(arg) >= 0;
    }
    getIndexOf(arg) {
        return this.selected ? this.selected.indexOf(arg) : -1;
    }
    /**
     * @param arg - item or identifier
     */
    toggle(arg) {
        let idx = this.getIndexOf(arg);
        if (idx >= 0) {
            this.selected.splice(idx, 1);
        }
        else {
            this.selected.push(arg);
        }
        let key = this.getKey();
        let value = this.selected.length ? this.selected : null;
        let change = {};
        change[key] = value;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.notify(event);
    }
    clear() {
        if (this.hasSelections()) {
            this.selected = [];
            let key = this.getKey();
            let change = {};
            change[key] = null;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event);
        }
        else if (this.isCollapsed) {
            this.isCollapsed = false;
        }
    }
    getCount(value) {
        let facet = (this.facets || []).find((facet) => facet.name === this.key);
        if (!facet || !facet.buckets || !facet.buckets.length) {
            // console.log("No facet for " + this.key);
            return '';
        }
        let valObj = facet.buckets.find((v) => v.label === value);
        if (!valObj) {
            // console.log("No bucket for " + value);
            return '';
        }
        return valObj.count;
    }
};
tslib_1.__decorate([
    Input()
], TypeFilterComponent.prototype, "key", void 0);
tslib_1.__decorate([
    Input()
], TypeFilterComponent.prototype, "facets", void 0);
tslib_1.__decorate([
    Input()
], TypeFilterComponent.prototype, "selected", void 0);
tslib_1.__decorate([
    Output()
], TypeFilterComponent.prototype, "onEvent", void 0);
TypeFilterComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-type-filter',
        template: "<div class=\"m-article o-query-filter\">\n    <div class=\"m-article__heading\">\n        <button type=\"button\" class=\"btn btn-sm btn-link\"\n            title=\"{{isCollapsed?'Expand':'Collapse'}}\"\n            (click)=\"isCollapsed = !isCollapsed\">\n            <span class=\"fas\"\n                [ngClass]=\"{'fa-minus-square':!isCollapsed,'fa-plus-square':isCollapsed}\">\n            </span>\n        </button>\n        Filter by Type\n    </div>\n    <div class=\"m-article__desc o-facets\" [ngClass]=\"{'is-collapsed':isCollapsed}\">\n        <a class=\"m-facet\" (click)=\"clear()\" [ngClass]=\"{active:!hasSelections()}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':!hasSelections(), 'fa-square t-fg--gray-xlt':hasSelections()}\">\n            </span>\n            Any Type\n        </a>\n        <div class=\"m-facet\" *ngFor=\"let option of choices; let $index=index\"\n            (click)=\"toggle(option.value)\"\n            [ngClass]=\"{active:isSelected(option.value),'is-hidden':$index>visibleAmount}\">\n            <span class=\"u-mg-right--sm far\"\n                [ngClass]=\"{'fa-check-square':isSelected(option.value),'fa-square':!isSelected(option.value)}\">\n            </span>\n            <span class=\"icon-{{option.label.toLowerCase().replace(' ','')}} is-themed\"></span>\n            {{option.label}}\n            <span class=\"badge badge-secondary\">{{getCount(option.value)}}</span>\n        </div>\n    </div>\n</div>\n",
        styles: [""]
    })
], TypeFilterComponent);
export { TypeFilterComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsic2VhcmNoL2ZpbHRlcnMvdHlwZS90eXBlLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUNILFNBQVMsRUFDVCxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFDOUIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFNBQVMsRUFBRSxjQUFjLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDakYsT0FBTyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQVN6RCxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFtQjtJQVc1QjtRQVRVLFFBQUcsR0FBa0IsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUUzQyxhQUFRLEdBQWUsRUFBRSxDQUFDO1FBQzFCLFlBQU8sR0FBeUIsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUUzRCxnQkFBVyxHQUFhLElBQUksQ0FBQztRQUU3QixrQkFBYSxHQUFZLEVBQUUsQ0FBQztJQUluQyxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFBLEVBQUU7WUFDM0MsSUFBSSxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLElBQUksU0FBUyxDQUFDLFFBQVEsS0FBSyxJQUFJLElBQUksU0FBUyxDQUFDLGdCQUFnQixLQUFLLElBQUk7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDcEYsT0FBTyxFQUFFLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO1FBQ3hELENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUEsRUFB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QUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDNUI7SUFDTCxDQUFDO0lBR0QsUUFBUSxDQUFFLEtBQVc7UUFDakIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBRSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFFLENBQUM7UUFDekUsSUFBRyxDQUFDLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtZQUNsRCwyQ0FBMkM7WUFDM0MsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBRSxDQUFDO1FBQzVELElBQUcsQ0FBQyxNQUFNLEVBQUU7WUFDUix5Q0FBeUM7WUFDekMsT0FBTyxFQUFFLENBQUM7U0FDYjtRQUNELE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN4QixDQUFDO0NBRUosQ0FBQTtBQTdHYTtJQUFULEtBQUssRUFBRTtnREFBNkM7QUFDM0M7SUFBVCxLQUFLLEVBQUU7bURBQW9CO0FBQ2xCO0lBQVQsS0FBSyxFQUFFO3FEQUE0QjtBQUMxQjtJQUFULE1BQU0sRUFBRTtvREFBeUQ7QUFMekQsbUJBQW1CO0lBTC9CLFNBQVMsQ0FBQztRQUNULFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsdy9DQUFvQzs7S0FFckMsQ0FBQztHQUNXLG1CQUFtQixDQStHL0I7U0EvR1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBDb21wb25lbnQsIE9uSW5pdCwgT25DaGFuZ2VzLFxuICAgIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgU2ltcGxlQ2hhbmdlc1xufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEl0ZW1UeXBlcywgSXRlbVR5cGVMYWJlbHMsIFF1ZXJ5UGFyYW1ldGVycyB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgU2VhcmNoRXZlbnQsIEV2ZW50VHlwZXMgfSBmcm9tICcuLi8uLi8uLi9ldmVudCc7XG5cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdncC10eXBlLWZpbHRlcicsXG4gIHRlbXBsYXRlVXJsOiAnLi90eXBlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vdHlwZS5jb21wb25lbnQubGVzcyddXG59KVxuZXhwb3J0IGNsYXNzIFR5cGVGaWx0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQElucHV0KCkgIGtleSAgICAgICA6IHN0cmluZyA9IFF1ZXJ5UGFyYW1ldGVycy5UWVBFUztcbiAgICBASW5wdXQoKSAgZmFjZXRzICAgIDogYW55W107XG4gICAgQElucHV0KCkgIHNlbGVjdGVkICA6IHN0cmluZ1tdID0gW107XG4gICAgQE91dHB1dCgpIG9uRXZlbnQgICA6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgICBwdWJsaWMgaXNDb2xsYXBzZWQgOiBib29sZWFuID0gdHJ1ZTtcbiAgICBwdWJsaWMgY2hvaWNlcyA6IGFueVtdO1xuICAgIHB1YmxpYyB2aXNpYmxlQW1vdW50IDogbnVtYmVyID0gMTA7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNob2ljZXMgPSBPYmplY3Qua2V5cyhJdGVtVHlwZXMpLm1hcChrZXk9PntcbiAgICAgICAgICAgIGxldCB0eXBlID0gSXRlbVR5cGVzW2tleV07XG4gICAgICAgICAgICBpZiggSXRlbVR5cGVzLlNUQU5EQVJEID09PSB0eXBlIHx8IEl0ZW1UeXBlcy5SSUdIVFNfU1RBVEVNRU5UID09PSB0eXBlKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiB7IGxhYmVsOiBJdGVtVHlwZUxhYmVsc1t0eXBlXSwgdmFsdWU6IHR5cGUgfTtcbiAgICAgICAgfSkuZmlsdGVyKHY9PiEhdik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiVHlwZUZpbHRlci5vbkluaXQoKSBcIiArIEpTT04uc3RyaW5naWZ5KHRoaXMuc2VsZWN0ZWQpKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyggY2hhbmdlcyA6IFNpbXBsZUNoYW5nZXMgKSB7XG4gICAgICAgIGlmKGNoYW5nZXMuc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IGNoYW5nZXMuc2VsZWN0ZWQuY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlR5cGVGaWx0ZXIub25DaGFuZ2VzKCkgXCIgKyBKU09OLnN0cmluZ2lmeSh2YWx1ZSkpO1xuXG4gICAgICAgICAgICAvL2lmIGEgc2VsZWN0ZWQgdmFsdWUgd2Fzbid0IHByb3ZpZGVkLCBlbnN1cmUgaXQncyAnbnVsbCcgYW5kIG5vdCB1bmRlZmluZWRcbiAgICAgICAgICAgIGlmKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICB9IGVsc2UgaWYodHlwZW9mKHZhbHVlKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW3ZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEtleSgpIDogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5O1xuICAgIH1cblxuICAgIG5vdGlmeSggZXZlbnQgOiBTZWFyY2hFdmVudCApIHtcbiAgICAgICAgdGhpcy5vbkV2ZW50LmVtaXQoZXZlbnQpO1xuICAgIH1cblxuXG4gICAgaGFzU2VsZWN0aW9ucygpIDogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGVkICYmIHRoaXMuc2VsZWN0ZWQubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKCBhcmcgOiBhbnkgKSA6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRJbmRleE9mKGFyZykgPj0gMDtcbiAgICB9XG5cbiAgICBnZXRJbmRleE9mKCBhcmc6IGFueSApIDogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWQgPyB0aGlzLnNlbGVjdGVkLmluZGV4T2YoYXJnKSA6IC0xO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIGFyZyAtIGl0ZW0gb3IgaWRlbnRpZmllclxuICAgICAqL1xuICAgIHRvZ2dsZSggYXJnIDogYW55ICkge1xuXG4gICAgICAgIGxldCBpZHggPSB0aGlzLmdldEluZGV4T2YoYXJnKTtcbiAgICAgICAgaWYoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goYXJnKTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IGtleSA9IHRoaXMuZ2V0S2V5KCk7XG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuc2VsZWN0ZWQubGVuZ3RoID8gdGhpcy5zZWxlY3RlZCA6IG51bGw7XG4gICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcbiAgICAgICAgY2hhbmdlW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgbGV0IGV2ZW50ID0gbmV3IFNlYXJjaEV2ZW50KEV2ZW50VHlwZXMuUVVFUlksIGNoYW5nZSk7XG4gICAgICAgIHRoaXMubm90aWZ5KGV2ZW50KTtcbiAgICB9XG5cbiAgICBjbGVhciAoKSB7XG4gICAgICAgIGlmKHRoaXMuaGFzU2VsZWN0aW9ucygpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG4gICAgICAgICAgICBsZXQga2V5ID0gdGhpcy5nZXRLZXkoKTtcbiAgICAgICAgICAgIGxldCBjaGFuZ2UgPSB7fTtcbiAgICAgICAgICAgIGNoYW5nZVtrZXldID0gbnVsbDtcbiAgICAgICAgICAgIGxldCBldmVudCA9IG5ldyBTZWFyY2hFdmVudChFdmVudFR5cGVzLlFVRVJZLCBjaGFuZ2UpO1xuICAgICAgICAgICAgdGhpcy5ub3RpZnkoZXZlbnQpO1xuXG4gICAgICAgIH0gZWxzZSBpZiggdGhpcy5pc0NvbGxhcHNlZCApe1xuICAgICAgICAgICAgdGhpcy5pc0NvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBnZXRDb3VudCggdmFsdWUgOiBhbnkgKSA6IHN0cmluZ3xudW1iZXIge1xuICAgICAgICBsZXQgZmFjZXQgPSAodGhpcy5mYWNldHN8fFtdKS5maW5kKCAoZmFjZXQpID0+IGZhY2V0Lm5hbWUgPT09IHRoaXMua2V5ICk7XG4gICAgICAgIGlmKCFmYWNldCB8fCAhZmFjZXQuYnVja2V0cyB8fCAhZmFjZXQuYnVja2V0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiTm8gZmFjZXQgZm9yIFwiICsgdGhpcy5rZXkpO1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICAgIGxldCB2YWxPYmogPSBmYWNldC5idWNrZXRzLmZpbmQoICh2KSA9PiB2LmxhYmVsID09PSB2YWx1ZSApO1xuICAgICAgICBpZighdmFsT2JqKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIk5vIGJ1Y2tldCBmb3IgXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbE9iai5jb3VudDtcbiAgICB9XG5cbn1cbiJdfQ==