
/**
 *
 */
export const EventTypes = {
    CLOSE       : Symbol( "Close"      ),   //
    OPEN        : Symbol( "Open"       ),   //
    RESET       : Symbol( "Reset"      ),   // clearing query filters
    SELECT      : Symbol( "Select"     ),   // selecting item(s)
    SELECT_NONE : Symbol( "SelectNone" ),   // clearing selections
    QUERY       : Symbol( "Query"      ),   // change to query
    ADDED       : Symbol( "Added"      ),   //
    REMOVED     : Symbol( "Removed"    ),   //
    CHANGED     : Symbol( "Changed"    ),   //
    ERROR       : Symbol( "Error"      )    //
};



/**
 * Search Event
 *
 */
export class SearchEvent {

    private type : Symbol;
    private options : { [key:string] : any } = {} as { [key:string] : any };

    constructor(type : Symbol,options ?: { [key:string] :any }) {
        this.type = type;
        if(options) {
            Object.assign(this.options, options);
        }
    }
    getType() : Symbol { return this.type; }
    getOptions() : { [key:string] : any } { return this.options; }

}
