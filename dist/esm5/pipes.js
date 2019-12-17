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
            console.log("Slicing from " + st + " to " + num);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsicGlwZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sRUFBWSxJQUFJLEVBQWlCLE1BQU0sZUFBZSxDQUFDO0FBTTlEO0lBQUE7SUFLQSxDQUFDO0lBSkcsb0NBQVMsR0FBVCxVQUFVLEtBQWEsRUFBRSxRQUFlLEVBQUUsR0FBWTtRQUNsRCxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNoRSxPQUFPLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBWCxDQUFXLENBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUpRLGdCQUFnQjtRQUQ1QixJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsY0FBYyxFQUFDLENBQUM7T0FDaEIsZ0JBQWdCLENBSzVCO0lBQUQsdUJBQUM7Q0FBQSxBQUxELElBS0M7U0FMWSxnQkFBZ0I7QUFRN0I7Ozs7OztHQU1HO0FBRUg7SUFBQTtJQVVBLENBQUM7SUFURywrQkFBUyxHQUFULFVBQVUsS0FBWSxFQUFFLEdBQVcsRUFBRSxLQUFlO1FBQ2hELElBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxFQUFFO1lBQzVCLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDbEMsSUFBRyxFQUFFLEdBQUcsQ0FBQztnQkFBRSxHQUFHLElBQUksRUFBRSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxHQUFHLEVBQUUsR0FBRyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDakQsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNoQztRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFUUSxXQUFXO1FBRHZCLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxTQUFTLEVBQUMsQ0FBQztPQUNYLFdBQVcsQ0FVdkI7SUFBRCxrQkFBQztDQUFBLEFBVkQsSUFVQztTQVZZLFdBQVc7QUFjeEI7Ozs7OztHQU1HO0FBRUg7SUFBQTtJQU1BLENBQUM7SUFMRyw4QkFBUyxHQUFULFVBQVUsS0FBWSxFQUFFLFFBQWdCO1FBQ3BDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBRSxVQUFDLENBQUMsRUFBQyxDQUFDO1lBQ25CLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFMUSxVQUFVO1FBRHRCLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxRQUFRLEVBQUMsQ0FBQztPQUNWLFVBQVUsQ0FNdEI7SUFBRCxpQkFBQztDQUFBLEFBTkQsSUFNQztTQU5ZLFVBQVU7QUFVdkI7Ozs7Ozs7RUFPRTtBQUVGO0lBQUE7SUFTQSxDQUFDO0lBUkcsb0NBQVMsR0FBVCxVQUFVLEtBQWE7UUFDbkIsSUFBRyxDQUFDLEtBQUssSUFBSSxPQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQzVFLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztRQUNqQixJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUcsQ0FBQyxHQUFHO1lBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUcsT0FBTyxLQUFLLElBQUk7WUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFSUSxnQkFBZ0I7UUFENUIsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBQyxDQUFDO09BQ2hCLGdCQUFnQixDQVM1QjtJQUFELHVCQUFDO0NBQUEsQUFURCxJQVNDO1NBVFksZ0JBQWdCO0FBZTdCOzs7Ozs7O0VBT0U7QUFFRjtJQUFBO0lBTUEsQ0FBQztJQUxHLGdDQUFTLEdBQVQsVUFBVSxLQUFhO1FBQ25CLElBQUcsQ0FBQyxLQUFLLElBQUksT0FBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQUUsT0FBTyxVQUFVLENBQUM7UUFDNUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2pGLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVELENBQUM7SUFMUSxZQUFZO1FBRHhCLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxVQUFVLEVBQUMsQ0FBQztPQUNaLFlBQVksQ0FNeEI7SUFBRCxtQkFBQztDQUFBLEFBTkQsSUFNQztTQU5ZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCB7IE5nTW9kdWxlLCBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIkBnZW9wbGF0Zm9ybS9jbGllbnRcIjtcblxuXG5cbkBQaXBlKHtuYW1lOiAnYXJyYXllZEl0ZW1zJ30pXG5leHBvcnQgY2xhc3MgQXJyYXllZEl0ZW1zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogSXRlbVtdLCBwcm9wZXJ0eTpzdHJpbmcsIG51bT86IG51bWJlcik6IHN0cmluZyB7XG4gICAgICAgIGxldCBtYXggPSBpc05hTihudW0pIHx8IG51bSA+IHZhbHVlLmxlbmd0aCA/IHZhbHVlLmxlbmd0aCA6IG51bTtcbiAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKDAsIG1heCkubWFwKCB2ID0+IHZbcHJvcGVydHldICkuam9pbignICcpO1xuICAgIH1cbn1cblxuXG4vKlxuICogTGltaXRzIGFuIGFycmF5IG9mIGVudHJpZXMgdG8gYSBtYXhpbXVtIG51bWJlclxuICogVXNhZ2U6XG4gKiAgIGFycmF5IHwgbGltaXRUbzpudW1cbiAqIEV4YW1wbGU6XG4gKiAgIHt7IFsnb25lJywndHdvJywndGhyZWUnXSB8IGxpbWl0VG86MiB9fVxuICovXG5AUGlwZSh7bmFtZTogJ2xpbWl0VG8nfSlcbmV4cG9ydCBjbGFzcyBMaW1pdFRvUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55W10sIG51bTogbnVtYmVyLCBzdGFydCA/OiBudW1iZXIpOiBhbnlbXSB7XG4gICAgICAgIGlmKHZhbHVlICYmIHZhbHVlLmxlbmd0aCA+IG51bSkge1xuICAgICAgICAgICAgbGV0IHN0ID0gaXNOYU4oc3RhcnQpID8gMCA6IHN0YXJ0O1xuICAgICAgICAgICAgaWYoc3QgPiAwKSBudW0gKz0gc3Q7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlNsaWNpbmcgZnJvbSBcIiArIHN0ICsgXCIgdG8gXCIgKyBudW0pO1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlLnNsaWNlKCBzdCwgbnVtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxufVxuXG5cblxuLypcbiAqXG4gKiBVc2FnZTpcbiAqICAgYXJyYXkgfCBzb3J0QnkgOiBwcm9wZXJ0eVxuICogRXhhbXBsZTpcbiAqICAge3sgWydvbmUnLCd0d28nLCd0aHJlZSddIHwgbGltaXRUbzoyIH19XG4gKi9cbkBQaXBlKHtuYW1lOiAnc29ydEJ5J30pXG5leHBvcnQgY2xhc3MgU29ydEJ5UGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogYW55W10sIHByb3BlcnR5OiBzdHJpbmcpOiBhbnlbXSB7XG4gICAgICAgIHJldHVybiB2YWx1ZS5zb3J0KCAoYSxiKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYVtwcm9wZXJ0eV0gPiBiW3Byb3BlcnR5XSA/IC0xIDogMTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxuLypcbiAqIEZvcm1hdHMgYSBHZW9QbGF0Zm9ybSBJdGVtJ3MgdHlwZSB0byBhIGZyaWVuZGx5IGxhYmVsXG4gKiBVc2FnZTpcbiAqICAgdHlwZSB8IGZyaWVuZGx5VHlwZVxuICogRXhhbXBsZTpcbiAqICAge3sgXCJkY2F0OkRhdGFzZXRcIiB8IGZyaWVuZGx5VHlwZSB9fVxuICogICBmb3JtYXRzIHRvOiBcIkRhdGFzZXRcIlxuKi9cbkBQaXBlKHtuYW1lOiAnZnJpZW5kbHlUeXBlJ30pXG5leHBvcnQgY2xhc3MgRnJpZW5kbHlUeXBlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAgIHRyYW5zZm9ybSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICAgICAgaWYoIXZhbHVlIHx8IHR5cGVvZih2YWx1ZSkgIT09ICdzdHJpbmcnIHx8IHZhbHVlLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICBsZXQgbmFtZSA9IHZhbHVlO1xuICAgICAgICBsZXQgaWR4ID0gdmFsdWUuaW5kZXhPZihcIjpcIik7XG4gICAgICAgIGlmKH5pZHgpIG5hbWUgPSB2YWx1ZS5zdWJzdHJpbmcoaWR4KzEpO1xuICAgICAgICBpZignVkNhcmQnID09PSBuYW1lKSBuYW1lID0gJ0NvbnRhY3QnO1xuICAgICAgICByZXR1cm4gbmFtZTtcbiAgICB9XG59XG5cblxuXG5cblxuLypcbiAqIFJlcGxhY2VzIHVuZGVyc2NvcmVzIGJldHdlZW4gd29yZHMgd2l0aCBzcGFjZXNcbiAqIFVzYWdlOlxuICogICB0eXBlIHwgZml4TGFiZWxcbiAqIEV4YW1wbGU6XG4gKiAgIHt7IFwiT25lX1R3b19UaHJlZVwiIHwgZml4TGFiZWwgfX1cbiAqICAgZm9ybWF0cyB0bzogXCJPbmUgVHdvIFRocmVlXCJcbiovXG5AUGlwZSh7bmFtZTogJ2ZpeExhYmVsJ30pXG5leHBvcnQgY2xhc3MgRml4TGFiZWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gICAgdHJhbnNmb3JtKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZighdmFsdWUgfHwgdHlwZW9mKHZhbHVlKSAhPT0gJ3N0cmluZycgfHwgIXZhbHVlLmxlbmd0aCkgcmV0dXJuICdVbnRpdGxlZCc7XG4gICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZS5yZXBsYWNlKC8oW2Etel0pKFtBLVpdKS9nLCBcIiQxICQyXCIpLnJlcGxhY2UoL18vZywgXCIgXCIpLnRyaW0oKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlc3VsdC5zbGljZSgxKTtcbiAgICB9XG59XG4iXX0=