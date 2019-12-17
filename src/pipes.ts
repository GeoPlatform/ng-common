
import { NgModule, Pipe, PipeTransform } from '@angular/core';
import { Item } from "@geoplatform/client";



@Pipe({name: 'arrayedItems'})
export class ArrayedItemsPipe implements PipeTransform {
    transform(value: Item[], property:string, num?: number): string {
        let max = isNaN(num) || num > value.length ? value.length : num;
        return value.slice(0, max).map( v => v[property] ).join(' ');
    }
}


/*
 * Limits an array of entries to a maximum number
 * Usage:
 *   array | limitTo:num
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
@Pipe({name: 'limitTo'})
export class LimitToPipe implements PipeTransform {
    transform(value: any[], num: number, start ?: number): any[] {
        if(value && value.length > num) {
            let st = isNaN(start) ? 0 : start;
            if(st > 0) num += st;
            console.log("Slicing from " + st + " to " + num);
            return value.slice( st, num);
        }
        return value;
    }
}



/*
 *
 * Usage:
 *   array | sortBy : property
 * Example:
 *   {{ ['one','two','three'] | limitTo:2 }}
 */
@Pipe({name: 'sortBy'})
export class SortByPipe implements PipeTransform {
    transform(value: any[], property: string): any[] {
        return value.sort( (a,b) => {
            return a[property] > b[property] ? -1 : 1;
        });
    }
}



/*
 * Formats a GeoPlatform Item's type to a friendly label
 * Usage:
 *   type | friendlyType
 * Example:
 *   {{ "dcat:Dataset" | friendlyType }}
 *   formats to: "Dataset"
*/
@Pipe({name: 'friendlyType'})
export class FriendlyTypePipe implements PipeTransform {
    transform(value: string): string {
        if(!value || typeof(value) !== 'string' || value.length === 0) return value;
        let name = value;
        let idx = value.indexOf(":");
        if(~idx) name = value.substring(idx+1);
        if('VCard' === name) name = 'Contact';
        return name;
    }
}





/*
 * Replaces underscores between words with spaces
 * Usage:
 *   type | fixLabel
 * Example:
 *   {{ "One_Two_Three" | fixLabel }}
 *   formats to: "One Two Three"
*/
@Pipe({name: 'fixLabel'})
export class FixLabelPipe implements PipeTransform {
    transform(value: string): string {
        if(!value || typeof(value) !== 'string' || !value.length) return 'Untitled';
        let result = value.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/_/g, " ").trim();
        return result.charAt(0).toUpperCase() + result.slice(1);
    }
}
