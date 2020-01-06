import { OnInit, EventEmitter, SimpleChanges } from '@angular/core';
import { SearchEvent } from '../../../event';
export declare class TypeFilterComponent implements OnInit {
    key: string;
    facets: any[];
    selected: string[];
    onEvent: EventEmitter<any>;
    isCollapsed: boolean;
    choices: any[];
    visibleAmount: number;
    constructor();
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    getKey(): string;
    notify(event: SearchEvent): void;
    hasSelections(): boolean;
    isSelected(arg: any): boolean;
    getIndexOf(arg: any): number;
    /**
     * @param arg - item or identifier
     */
    toggle(arg: any): void;
    clear(): void;
    getCount(value: any): string | number;
}
