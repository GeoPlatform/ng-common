import { OnInit, EventEmitter } from '@angular/core';
export declare class KeywordFilterComponent implements OnInit {
    key: string;
    searchString: string;
    placeholder: string;
    onEvent: EventEmitter<any>;
    constructor();
    ngOnInit(): void;
    onKeyUp($event: any): void;
    onValueChange(value: any): void;
    clear(): void;
}
