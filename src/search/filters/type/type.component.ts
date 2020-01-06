import {
    Component, OnInit, OnChanges,
    Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { ItemTypes, ItemTypeLabels, QueryParameters } from '@geoplatform/client';
import { SearchEvent, EventTypes } from '../../../event';



@Component({
  selector: 'gp-type-filter',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.less']
})
export class TypeFilterComponent implements OnInit {

    @Input()  key       : string = QueryParameters.TYPES;
    @Input()  facets    : any[];
    @Input()  selected  : string[] = [];
    @Output() onEvent   : EventEmitter<any> = new EventEmitter<any>();

    public isCollapsed : boolean = true;
    public choices : any[];
    public visibleAmount : number = 10;

    constructor() {

    }

    ngOnInit() {
        this.choices = Object.keys(ItemTypes).map(key=>{
            let type = ItemTypes[key];
            if( ItemTypes.STANDARD === type || ItemTypes.RIGHTS_STATEMENT === type) return null;
            return { label: ItemTypeLabels[type], value: type };
        }).filter(v=>!!v);
        // console.log("TypeFilter.onInit() " + JSON.stringify(this.selected));
    }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.selected) {
            let value = changes.selected.currentValue;

            console.log("TypeFilter.onChanges() " + JSON.stringify(value));

            //if a selected value wasn't provided, ensure it's 'null' and not undefined
            if(value === undefined) {
                this.selected = [];
            } else if(typeof(value) === 'string') {
                this.selected = [value];
            }
        }
    }

    getKey() : string {
        return this.key;
    }

    notify( event : SearchEvent ) {
        this.onEvent.emit(event);
    }


    hasSelections() : boolean {
        return this.selected && this.selected.length > 0;
    }

    isSelected( arg : any ) : boolean {
        return this.getIndexOf(arg) >= 0;
    }

    getIndexOf( arg: any ) : number {
        return this.selected ? this.selected.indexOf(arg) : -1;
    }


    /**
     * @param arg - item or identifier
     */
    toggle( arg : any ) {

        let idx = this.getIndexOf(arg);
        if(idx >= 0) {
            this.selected.splice(idx, 1);
        } else {
            this.selected.push(arg);
        }


        let key = this.getKey();
        let value = this.selected.length ? this.selected : null;
        let change = {};
        change[key] = value;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.notify(event);
    }

    clear () {
        if(this.hasSelections()) {
            this.selected = [];
            let key = this.getKey();
            let change = {};
            change[key] = null;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event);

        } else if( this.isCollapsed ){
            this.isCollapsed = false;
        }
    }


    getCount( value : any ) : string|number {
        let facet = (this.facets||[]).find( (facet) => facet.name === this.key );
        if(!facet || !facet.buckets || !facet.buckets.length) {
            // console.log("No facet for " + this.key);
            return '';
        }
        let valObj = facet.buckets.find( (v) => v.label === value );
        if(!valObj) {
            // console.log("No bucket for " + value);
            return '';
        }
        return valObj.count;
    }

}
