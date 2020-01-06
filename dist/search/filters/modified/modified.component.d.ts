import { OnInit, EventEmitter } from '@angular/core';
export declare class ModifiedFilterComponent implements OnInit {
    key: string;
    value: Date;
    onEvent: EventEmitter<any>;
    isCollapsed: boolean;
    format: string;
    debouncePromise: any;
    lastModifiedOptions: any[];
    lastModifiedDir: any;
    constructor();
    ngOnInit(): void;
    onKeyUp($event: any): void;
    onValueChange(value: any): void;
    onDirChange(): void;
    clear(): void;
}
