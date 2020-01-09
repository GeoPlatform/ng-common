
import {
    Component, OnInit, OnDestroy, OnChanges, SimpleChanges,
    Input, Output, EventEmitter, TemplateRef
} from '@angular/core';
import { Item, ItemTypes, QueryParameters } from '@geoplatform/client';

import { SearchEvent, EventTypes } from '../../event';

import { SearchResultsItemAdapter, GeoPlatformResultsItemAdapter } from './item-adapter';



const GP_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/GeoplatformMap';
const AGOL_MAP_RESOURCE_TYPE = 'http://www.geoplatform.gov/ont/openmap/AGOLMap';

/**
 * Search Results Item Component
 *
 * This component is used to display search results items.
 *
 * Example:
 *   <div *ngFor="let item of results">
 *     <gp-search-results-item [item]="item"></gp-search-results-item>
 *   </div>
 *
 * Listen for selection or other events by passing an "onEvent" callback
 *
 * Example:
 *   <div *ngFor="let item of results">
 *     <gp-search-results-item [item]="item"
 *          (onEvent)="handleItemEvent($event)">
 *     </gp-search-results-item>
 *   </div>
 *
 * Customize how the item is displayed using any of the template bindings
 *
 * Example:
 *   <div *ngFor="let item of results">
 *     <gp-search-results-item [item]="item"
 *          [itemHeadingTemplate]="myCustomHeadingTemplate"
 *          [itemActionsTemplate]="myCustomActionsTemplate">
 *     </gp-search-results-item>
 *   </div>
 *   <ng-template #myCustomHeadingTemplate let-item="item">
 *     <div>My Customized {{item.label}}</div>
 *   </ng-template>
 *   <ng-template #myCustomActionsTemplate let-item="item">
 *     <button type="button" class="btn btn-link" (click)="handleClick(item)">Click Me</button>
 *   </ng-template>
 *
 */
@Component({
  selector: 'gp-search-results-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.less']
})
export class SearchResultsItemComponent implements OnInit, OnChanges, OnDestroy {

    @Input() public item       : Item;
    @Input() public adapter : SearchResultsItemAdapter<Item>;
    @Input() public isSelected : boolean = false;
    @Input() public canSelect  : boolean = true;
    @Input() public showDesc   : boolean = false;

    //custom heading template
    @Input() public itemHeadingTemplate   : TemplateRef<any>;
    //custom thumbnail template
    @Input() public itemThumbnailTemplate : TemplateRef<any>;
    //custom footer (complete)
    @Input() public itemFooterTemplate    : TemplateRef<any>;
    //custom footer stats template
    @Input() public itemStatsTemplate     : TemplateRef<any>;
    //custom footer actions template
    @Input() public itemActionsTemplate   : TemplateRef<any>;

    @Output() onEvent : EventEmitter<SearchEvent> = new EventEmitter<SearchEvent>();


    constructor() { }

    ngOnInit() {
        if(!this.adapter) {
            this.adapter = new GeoPlatformResultsItemAdapter();
        }
    }

    ngOnChanges( changes : SimpleChanges ) {
        if(changes.item || changes.adapter) {
            // let item = changes.item ? changes.item.currentValue : null;
            // let adapter = changes.adapter ? changes.adapter.currentValue : (
            //     this.adapter
            //     );
            //
            // if(item && !adapter) {
            //     this.adapter =
            // }
        }
    }

    ngOnDestroy() {
        this.adapter = null;
    }

    /**
     * Triggers a selection event for the item
     */
    select() {
        let event = new SearchEvent(EventTypes.SELECT, { value: this.item });
        this.onEvent.emit(event);
    }

    // getIconClass() {
    //     let type = this.item.type.replace(/^[a-z]+\:/i, '').toLowerCase();
    //     return 'icon-' + type;
    // }
    //
    // getTypeLabel() {
    //     if( ItemTypes.SERVICE === this.item.type && !!this.item.serviceType )
    //         return this.item.serviceType.label || "Service";
    //     if( ItemTypes.MAP === this.item.type) {
    //         let resTypes = this.item.resourceTypes || [];
    //         if( ~resTypes.indexOf(GP_MAP_RESOURCE_TYPE) ) return 'GeoPlatform Map';
    //         if( ~resTypes.indexOf(AGOL_MAP_RESOURCE_TYPE) ) return 'ArcGIS Online Map';
    //         return "Map";
    //     }
    //     if( ItemTypes.CONTACT === this.item.type) return 'Contact';
    //     return this.item.type.replace(/^[a-z]+\:/i, '');
    // }

    /**
     * Trigger a search event which constrains by creator
     */
    constrainToUser(username) {
        let change = {};
        change[QueryParameters.CREATED_BY] = username;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }

}
