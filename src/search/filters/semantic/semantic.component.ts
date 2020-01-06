
import {
    Component, OnInit, OnDestroy, Input, Output, EventEmitter, Inject
} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, of, from } from 'rxjs';
import { map, flatMap, startWith } from 'rxjs/operators';
import { Item, Config, QueryParameters, KGService } from "@geoplatform/client";

import { SearchEvent, EventTypes } from '../../../event';

import { SemanticDialogData, SemanticFilterDialog } from "./semantic.dialog";



@Component({
  selector: 'gp-semantic-filter',
  templateUrl: './semantic.component.html',
  styleUrls: ['./semantic.component.less']
})
export class SemanticFilterComponent implements OnInit {

    @Input()  key       : string;
    @Output() onEvent   : EventEmitter<any> = new EventEmitter<any>();

    public isCollapsed : boolean = true;
    public selected  : Item[];
    public visibleAmount : number = 10;

    constructor(
        @Inject(KGService) private service : KGService,
        @Inject(MatDialog) public dialog: MatDialog
    ) {

    }

    ngOnInit() {
        this.selected = [];
    }

    openDialog(): void {

        const dialogRef = this.dialog.open(SemanticFilterDialog, {
            width: '50%',
            data: { service : this.service, selected: [] }
        });

        dialogRef.afterClosed().subscribe( ( result : Item[] ) => {
            if(result && result.length) {
                this.selected = this.selected.concat(result);
                this.notify();
            }
        });
    }

    getKey() : string {
        return this.key;
    }

    notify( ) {
        let key = this.key;
        let change = {};
        change[key] = this.selected.map(s=>s.uri);
        change[QueryParameters.PAGE] = 0;
        let event = new SearchEvent(EventTypes.QUERY, change);
        this.onEvent.emit(event);
    }

    hasSelections() : boolean {
        return this.selected && this.selected.length > 0;
    }

    isSelected( arg : Item ) : boolean {
        return this.hasSelections() && this.getIndexOf(arg) >= 0;
    }

    getIndexOf( arg : Item ) : number {
        if(!this.selected || !this.selected.length) return -1;
        return this.selected.findIndex( s=> s.uri === arg.uri );
    }


    /**
     * @param arg - item or identifier
     */
    toggle( arg : Item ) {
        let idx = this.getIndexOf(arg);
        if( idx >= 0 ) this.selected.splice(idx, 1);    //found, remove it
        else this.selected.push(arg);                   //not found, add it
        this.notify();
    }

    clear () {
        if(this.hasSelections()) {
            this.selected = [];
            this.notify();

        } else if( this.isCollapsed ){
            this.isCollapsed = false;
        }
    }

}
