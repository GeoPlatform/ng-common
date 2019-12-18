/**
 *
 */
export declare const EventTypes: {
    CLOSE: symbol;
    OPEN: symbol;
    RESET: symbol;
    SELECT: symbol;
    SELECT_NONE: symbol;
    QUERY: symbol;
    ADDED: symbol;
    REMOVED: symbol;
    CHANGED: symbol;
    ERROR: symbol;
};
/**
 * Search Event
 *
 */
export declare class SearchEvent {
    private type;
    private options;
    constructor(type: Symbol, options?: {
        [key: string]: any;
    });
    getType(): Symbol;
    getOptions(): {
        [key: string]: any;
    };
}
