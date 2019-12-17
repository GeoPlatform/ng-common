import { OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Item } from "@geoplatform/client";
export declare class ImageFallbackDirective {
    src: string;
    fallback: string;
    className: any;
    onImgError(): void;
    onImgLoad(): void;
}
export declare class ThumbnailComponent implements OnInit {
    private sanitizer;
    item: Item;
    constructor(sanitizer: DomSanitizer);
    ngOnInit(): void;
    getThumbnailUrl(): any;
    getBackgroundImage(): import("@angular/platform-browser").SafeStyle;
    getFallbackBackgroundImage(): string;
    isEmpty(): boolean;
    hasURL(): boolean;
    hasContentData(): boolean;
    getFallbackUrl(): string;
}
