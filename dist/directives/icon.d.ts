import { ElementRef } from '@angular/core';
import { Item } from "@geoplatform/client";
export declare class GeoPlatformIconDirective {
    private el;
    item: Item;
    themed: boolean;
    constructor(el: ElementRef);
    ngOnInit(): void;
}
