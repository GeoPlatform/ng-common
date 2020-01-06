import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import {
    Config, Item, ItemService, Query, QueryParameters, ItemTypes
} from '@geoplatform/client';

import { SearchEvent, EventTypes } from '../../event';
import { ListSelectDialogData, ListSelectDialog } from '../../dialogs';


export abstract class ItemFilterComponent implements OnInit, OnDestroy {

    public  filterLabel : string = "Item";
    public  isCollapsed : boolean = true;
    public  choices     : any[];
    public  selected    : Item[];
    public  dialog      : MatDialog;
    protected query     : Query


    constructor(
        @Inject(ItemService) private service : ItemService,
        private types              : string|string[],
        label                     ?: string,
        @Inject(MatDialog) dialog ?: MatDialog
    ) {
        this.filterLabel = label;
        if(dialog) this.dialog = dialog;
    }

    ngOnInit() {
        this.selected = [] as Item[];
        this.initQuery();
        // this.fetchResults();
    }

    ngOnDestroy() {
        this.selected = null;
        this.choices = null;
        this.service = null;
        this.query = null;
        this.types = null;
    }

    openDialog(): void {
        let opts = this.getDialogOptions();
        const dialogRef = this.dialog.open(ListSelectDialog, opts);
        dialogRef.afterClosed().subscribe( ( results : Item[] ) => {
            if(results && results.length) {
                this.selected = this.selected.concat(results);

                let key = this.getKey();
                let change = {};
                change[key] = this.selected.map( s => s.id );
                change[QueryParameters.PAGE] = 0;
                let event = new SearchEvent(EventTypes.QUERY, change);
                this.notify(event);
            }
        });
    }

    /**
     * @return configuration options for the material dialog used to select new values
     */
    getDialogOptions() : any {
        return {
            width: '50%',
            data: {
                service : this.service,
                query   : this.query,
                selected: []
            }
        };
    }

    isSupported() {
        return true;
    }

    /**
     *
     */
    initQuery() {
        this.query = new Query().fields([]).facets([]).types(this.types);
    }


    hasSelections() : boolean {
        return this.selected && this.selected.length > 0;
    }

    isSelected( arg : Item ) : boolean {
        // let id = this.getChoiceId(arg);
        return arg && this.selected.findIndex( s => s.id === arg.id ) > -1;
    }


    /**
     * @param arg - item or identifier
     */
    toggle( arg : Item ) {
        if(!arg) return;
        // let id = this.getChoiceId(arg);
        // if(id === null) return;

        let idx = this.selected.findIndex( s => s.id === arg.id );
        if(idx < 0) this.selected.push( arg );
        else        this.selected.splice( idx, 1 );

        let key = this.getKey();
        let change = {};
        change[key] = this.selected.map( s => s.id );
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.notify(event);
    }


    // /**
    //  * Update search results using current query
    //  */
    // fetchResults() {
    //     this.service.search(this.query).then( (response:any) => {
    //         this.choices = response.results as any[];
    //     })
    //     .catch( (e:Error) => {
    //         this.choices = [] as any[];
    //         //TODO display error to user
    //     });
    // }
    //
    // /**
    //  * @param arg - item or identifier
    //  * @return string identifier
    //  */
    // getChoiceId(arg : any) : string {
    //     let id : string = null;
    //     if('string' === typeof(arg)) {
    //         id = arg as string;
    //     } else if(arg && typeof(arg.id) !== 'undefined') {
    //         id = arg.id as string;
    //     }
    //     if(id === null || id === 'undefined') {
    //         let key = this.getKey();
    //         console.log(`[WARN] Can't determine value for filter '${key}'`);
    //         return null;
    //     }
    //     return id;
    // }

    clear() {
        if(this.hasSelections()) {
            this.selected = [];
            let key = this.getKey();
            let change = {};
            change[key] = [];
            change[QueryParameters.PAGE] = 0;
            let event = new SearchEvent(EventTypes.QUERY, change);
            this.notify(event);
        } else {
            this.isCollapsed = !this.isCollapsed;
        }
    }


    protected abstract getKey() : string;
    protected abstract notify( event : SearchEvent );

}
