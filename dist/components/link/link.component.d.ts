import { OnInit } from '@angular/core';
export declare class ResourceLinkComponent implements OnInit {
    item: any;
    icon: any;
    external: boolean;
    constructor();
    ngOnInit(): void;
    hasIcon(): boolean;
    getIcon(): string;
    getLabel(): string;
    getType(): string;
    getIconClass(): string;
}
