import { OnInit } from '@angular/core';
export declare class ResourceLinkComponent implements OnInit {
    item: any;
    external: boolean;
    label: string;
    showIcon: boolean;
    portalUrl: string;
    constructor();
    ngOnInit(): void;
    hasIcon(): boolean;
    getIcon(): string;
    getLabel(): string;
    getType(): string;
    getIconClass(): string;
}
