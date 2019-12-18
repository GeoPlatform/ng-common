import * as tslib_1 from "tslib";
import { Pipe } from '@angular/core';
var ArrayedItemsPipe = /** @class */ (function () {
    function ArrayedItemsPipe() {
    }
    ArrayedItemsPipe.prototype.transform = function (value, property, num) {
        var max = isNaN(num) || num > value.length ? value.length : num;
        return value.slice(0, max).map(function (v) { return v[property]; }).join(' ');
    };
    ArrayedItemsPipe = tslib_1.__decorate([
        Pipe({ name: 'arrayedItems' })
    ], ArrayedItemsPipe);
    return ArrayedItemsPipe;
}());
export { ArrayedItemsPipe };
/*
 * Limits an array of entries to a maximum number
 * Usage:
 *   array | limitTo:num
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
var LimitToPipe = /** @class */ (function () {
    function LimitToPipe() {
    }
    LimitToPipe.prototype.transform = function (value, num, start) {
        if (value && value.length > num) {
            var st = isNaN(start) ? 0 : start;
            if (st > 0)
                num += st;
            return value.slice(st, num);
        }
        return value;
    };
    LimitToPipe = tslib_1.__decorate([
        Pipe({ name: 'limitTo' })
    ], LimitToPipe);
    return LimitToPipe;
}());
export { LimitToPipe };
/*
 *
 * Usage:
 *   array | sortBy : property
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
var SortByPipe = /** @class */ (function () {
    function SortByPipe() {
    }
    SortByPipe.prototype.transform = function (value, property) {
        return value.sort(function (a, b) {
            return a[property] > b[property] ? -1 : 1;
        });
    };
    SortByPipe = tslib_1.__decorate([
        Pipe({ name: 'sortBy' })
    ], SortByPipe);
    return SortByPipe;
}());
export { SortByPipe };
/*
 * Formats a GeoPlatform Item's type to a friendly label
 * Usage:
 *   type | friendlyType
 * Example:
 *   {{ "dcat:Dataset" | friendlyType }}
 *   formats to: "Dataset"
*/
var FriendlyTypePipe = /** @class */ (function () {
    function FriendlyTypePipe() {
    }
    FriendlyTypePipe.prototype.transform = function (value) {
        if (!value || typeof (value) !== 'string' || value.length === 0)
            return value;
        var name = value;
        var idx = value.indexOf(":");
        if (~idx)
            name = value.substring(idx + 1);
        if ('VCard' === name)
            name = 'Contact';
        return name;
    };
    FriendlyTypePipe = tslib_1.__decorate([
        Pipe({ name: 'friendlyType' })
    ], FriendlyTypePipe);
    return FriendlyTypePipe;
}());
export { FriendlyTypePipe };
/*
 * Replaces underscores between words with spaces
 * Usage:
 *   type | fixLabel
 * Example:
 *   {{ "One_Two_Three" | fixLabel }}
 *   formats to: "One Two Three"
*/
var FixLabelPipe = /** @class */ (function () {
    function FixLabelPipe() {
    }
    FixLabelPipe.prototype.transform = function (value) {
        if (!value || typeof (value) !== 'string' || !value.length)
            return 'Untitled';
        var result = value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").trim();
        return result.charAt(0).toUpperCase() + result.slice(1);
    };
    FixLabelPipe = tslib_1.__decorate([
        Pipe({ name: 'fixLabel' })
    ], FixLabelPipe);
    return FixLabelPipe;
}());
export { FixLabelPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsicGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBWSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTTlEO0lBQUE7SUFLQSxDQUFDO0lBSkcsb0NBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxRQUFlLEVBQUUsR0FBWTtRQUNsRCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNoRSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBWCxDQUFXLENBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUpRLGdCQUFnQjtRQUQ1QixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7T0FDaEIsZ0JBQWdCLENBSzVCO0lBQUQsdUJBQUM7Q0FBQSxBQUxELElBS0M7U0FMWSxnQkFBZ0I7QUFRN0I7Ozs7OztHQU1HO0FBRUg7SUFBQTtJQVNBLENBQUM7SUFSRywrQkFBUyxHQUFULFVBQVUsS0FBWSxFQUFFLEdBQVcsRUFBRSxLQUFlO1FBQ2hELElBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQzVCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBRyxFQUFFLEdBQUcsQ0FBQztnQkFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ3JCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDaEM7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBUlEsV0FBVztRQUR2QixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFDLENBQUM7T0FDWCxXQUFXLENBU3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQVRELElBU0M7U0FUWSxXQUFXO0FBYXhCOzs7Ozs7R0FNRztBQUVIO0lBQUE7SUFNQSxDQUFDO0lBTEcsOEJBQVMsR0FBVCxVQUFVLEtBQVksRUFBRSxRQUFnQjtRQUNwQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUUsVUFBQyxDQUFDLEVBQUMsQ0FBQztZQUNuQixPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUMsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBTFEsVUFBVTtRQUR0QixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFDLENBQUM7T0FDVixVQUFVLENBTXRCO0lBQUQsaUJBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSxVQUFVO0FBVXZCOzs7Ozs7O0VBT0U7QUFFRjtJQUFBO0lBU0EsQ0FBQztJQVJHLG9DQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ25CLElBQUcsQ0FBQyxLQUFLLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUM7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUM1RSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUM7UUFDakIsSUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM3QixJQUFHLENBQUMsR0FBRztZQUFFLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBQyxDQUFDLENBQUMsQ0FBQztRQUN2QyxJQUFHLE9BQU8sS0FBSyxJQUFJO1lBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBUlEsZ0JBQWdCO1FBRDVCLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUMsQ0FBQztPQUNoQixnQkFBZ0IsQ0FTNUI7SUFBRCx1QkFBQztDQUFBLEFBVEQsSUFTQztTQVRZLGdCQUFnQjtBQWU3Qjs7Ozs7OztFQU9FO0FBRUY7SUFBQTtJQU1BLENBQUM7SUFMRyxnQ0FBUyxHQUFULFVBQVUsS0FBYTtRQUNuQixJQUFHLENBQUMsS0FBSyxJQUFJLE9BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtZQUFFLE9BQU8sVUFBVSxDQUFDO1FBQzVFLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNqRixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBTFEsWUFBWTtRQUR4QixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDLENBQUM7T0FDWixZQUFZLENBTXhCO0lBQUQsbUJBQUM7Q0FBQSxBQU5ELElBTUM7U0FOWSxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBOZ01vZHVsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCJAZ2VvcGxhdGZvcm0vY2xpZW50XCI7XG5cblxuXG5AUGlwZSh7bmFtZTogJ2FycmF5ZWRJdGVtcyd9KVxuZXhwb3J0IGNsYXNzIEFycmF5ZWRJdGVtc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IEl0ZW1bXSwgcHJvcGVydHk6c3RyaW5nLCBudW0/OiBudW1iZXIpOiBzdHJpbmcge1xuICAgICAgICBsZXQgbWF4ID0gaXNOYU4obnVtKSB8fCBudW0gPiB2YWx1ZS5sZW5ndGggPyB2YWx1ZS5sZW5ndGggOiBudW07XG4gICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCBtYXgpLm1hcCggdiA9PiB2W3Byb3BlcnR5XSApLmpvaW4oJyAnKTtcbiAgICB9XG59XG5cblxuLypcbiAqIExpbWl0cyBhbiBhcnJheSBvZiBlbnRyaWVzIHRvIGEgbWF4aW11bSBudW1iZXJcbiAqIFVzYWdlOlxuICogICBhcnJheSB8IGxpbWl0VG86bnVtXG4gKiBFeGFtcGxlOlxuICogICB7eyBbJ29uZScsJ3R3bycsJ3RocmVlJ10gfCBsaW1pdFRvOjIgfX1cbiAqL1xuQFBpcGUoe25hbWU6ICdsaW1pdFRvJ30pXG5leHBvcnQgY2xhc3MgTGltaXRUb1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgICB0cmFuc2Zvcm0odmFsdWU6IGFueVtdLCBudW06IG51bWJlciwgc3RhcnQgPzogbnVtYmVyKTogYW55W10ge1xuICAgICAgICBpZih2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggPiBudW0pIHtcbiAgICAgICAgICAgIGxldCBzdCA9IGlzTmFOKHN0YXJ0KSA/IDAgOiBzdGFydDtcbiAgICAgICAgICAgIGlmKHN0ID4gMCkgbnVtICs9IHN0O1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKCBzdCwgbnVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5cblxuLypcbiAqXG4gKiBVc2FnZTpcbiAqICAgYXJyYXkgfCBzb3J0QnkgOiBwcm9wZXJ0eVxuICogRXhhbXBsZTpcbiAqICAge3sgWydvbmUnLCd0d28nLCd0aHJlZSddIHwgbGltaXRUbzoyIH19XG4gKi9cbkBQaXBlKHtuYW1lOiAnc29ydEJ5J30pXG5leHBvcnQgY2xhc3MgU29ydEJ5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5zb3J0KCAoYSxiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYVtwcm9wZXJ0eV0gPiBiW3Byb3BlcnR5XSA/IC0xIDogMTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLypcbiAqIEZvcm1hdHMgYSBHZW9QbGF0Zm9ybSBJdGVtJ3MgdHlwZSB0byBhIGZyaWVuZGx5IGxhYmVsXG4gKiBVc2FnZTpcbiAqICAgdHlwZSB8IGZyaWVuZGx5VHlwZVxuICogRXhhbXBsZTpcbiAqICAge3sgXCJkY2F0OkRhdGFzZXRcIiB8IGZyaWVuZGx5VHlwZSB9fVxuICogICBmb3JtYXRzIHRvOiBcIkRhdGFzZXRcIlxuKi9cbkBQaXBlKHtuYW1lOiAnZnJpZW5kbHlUeXBlJ30pXG5leHBvcnQgY2xhc3MgRnJpZW5kbHlUeXBlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYoIXZhbHVlIHx8IHR5cGVvZih2YWx1ZSkgIT09ICdzdHJpbmcnIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBsZXQgbmFtZSA9IHZhbHVlO1xuICAgICAgICBsZXQgaWR4ID0gdmFsdWUuaW5kZXhPZihcIjpcIik7XG4gICAgICAgIGlmKH5pZHgpIG5hbWUgPSB2YWx1ZS5zdWJzdHJpbmcoaWR4KzEpO1xuICAgICAgICBpZignVkNhcmQnID09PSBuYW1lKSBuYW1lID0gJ0NvbnRhY3QnO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG59XG5cblxuXG5cblxuLypcbiAqIFJlcGxhY2VzIHVuZGVyc2NvcmVzIGJldHdlZW4gd29yZHMgd2l0aCBzcGFjZXNcbiAqIFVzYWdlOlxuICogICB0eXBlIHwgZml4TGFiZWxcbiAqIEV4YW1wbGU6XG4gKiAgIHt7IFwiT25lX1R3b19UaHJlZVwiIHwgZml4TGFiZWwgfX1cbiAqICAgZm9ybWF0cyB0bzogXCJPbmUgVHdvIFRocmVlXCJcbiovXG5AUGlwZSh7bmFtZTogJ2ZpeExhYmVsJ30pXG5leHBvcnQgY2xhc3MgRml4TGFiZWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZighdmFsdWUgfHwgdHlwZW9mKHZhbHVlKSAhPT0gJ3N0cmluZycgfHwgIXZhbHVlLmxlbmd0aCkgcmV0dXJuICdVbnRpdGxlZCc7XG4gICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBcIiQxICQyXCIpLnJlcGxhY2UoL18vZywgXCIgXCIpLnRyaW0oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlc3VsdC5zbGljZSgxKTtcbiAgICB9XG59XG4iXX0=