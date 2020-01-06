import {
    Inject, Component, OnInit, OnChanges, OnDestroy
} from '@angular/core';
import {
    MatDialog, MatDialogRef, MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
    Item, KGService, KGQuery, SearchResults
} from "@geoplatform/client";




export interface SemanticDialogData {
    selected : Item[];
    service  : KGService;
}


@Component({
  selector: 'gp-semantic-filter-dialog',
  templateUrl: 'semantic.dialog.html',
  styleUrls: ['./semantic.dialog.less']
})
export class SemanticFilterDialog {

    public  suggested : any[];
    public  termQuery : string;
    private kgQuery   : KGQuery;

    //pagination
    public  currentPage    : number = 0;
    public  totalSuggested : number = 0;

    constructor (
        public dialogRef: MatDialogRef<SemanticFilterDialog>,
        @Inject(MAT_DIALOG_DATA) public data: SemanticDialogData
    ) {
        this.kgQuery = new KGQuery().page(this.currentPage).pageSize(12);
    }

    onNoClick () : void {
        this.dialogRef.close();
    }


    /**
     * @param {string} value - user input to filter options with
     * @return {Promise} resolving array of string options
     */
    filterValues ( value: string ) : void {

        if(!value) {    //require user to provide input before searching
            this.suggested = [];
            this.totalSuggested = 0;
            return;
        }

        this.kgQuery.q(value);

        this.data.service.suggest(this.kgQuery)
        .then( ( response : SearchResults ) => {
            let hits = response.results;
            // if(current && current.length) {
            //     hits = hits.filter(o => { return current.indexOf(o.uri)<0; });
            // }
            this.suggested = hits;
            this.totalSuggested = response.totalResults;
        })
        .catch(e => {
            //display error message indicating an issue searching...
        });
    }

    addValue ( arg : Item) : void {
        this.data.selected.push( arg );
    }

    removeValue ( value: Item ) : void {
        let index = -1;
        this.data.selected.forEach( (p,i) => { if(p.uri === value.uri) { index = i; } });
        if (index >= 0) {
            this.data.selected.splice(index, 1);
        }
    }

    isSelected ( arg : Item ) : boolean {
        return this.data.selected.length > 0 &&
            !!this.data.selected.find( (s) => s.uri === arg.uri);
    }


    /**
     * @param pageNo - new page number being requested
     */
    onPageChange( pageNo : number ) {
        if(this.currentPage !== pageNo-1 ) {
            this.kgQuery.page( pageNo-1 );
            this.filterValues( this.termQuery );
        }
    }
}
