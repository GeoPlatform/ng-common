import { PipeTransform } from '@angular/core';
import { Item } from "@geoplatform/client";
export declare class ArrayedItemsPipe implements PipeTransform {
    transform(value: Item[], property: string, num?: number): string;
}
export declare class LimitToPipe implements PipeTransform {
    transform(value: any[], num: number, start?: number): any[];
}
export declare class SortByPipe implements PipeTransform {
    transform(value: any[], property: string): any[];
}
export declare class FriendlyTypePipe implements PipeTransform {
    transform(value: string): string;
}
export declare class FixLabelPipe implements PipeTransform {
    transform(value: string): string;
}
