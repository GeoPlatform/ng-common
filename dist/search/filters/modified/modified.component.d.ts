import { OnInit, EventEmitter } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material';
export declare class ModifiedFilterComponent implements OnInit {
    key: string;
    value: number;
    onEvent: EventEmitter<any>;
    datepicker: MatDatepicker<Date>;
    isCollapsed: boolean;
    format: string;
    debouncePromise: any;
    lastModifiedOptions: string[];
    lastModifiedDir: string;
    constructor();
    ngOnInit(): void;
    onDateChanged(event: MatDatepickerInputEvent<Date>): void;
    onValueChange(value: any): void;
    onDirChange(): void;
    clear(): void;
}
