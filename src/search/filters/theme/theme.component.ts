import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';
import { SearchEvent, EventTypes } from '../../../event';

@Component({
  selector: 'gp-theme-filter',
  templateUrl: '../item-filter.component.html',
  styleUrls: ['./theme.component.less']
})
export class ThemeFilterComponent extends ItemFilterComponent {

    @Input()  key       : string = QueryParameters.THEMES_ID;
    @Output() onEvent   : EventEmitter<any> = new EventEmitter<any>();

    constructor(
        @Inject(ItemService) service : ItemService,
        dialog : MatDialog
    ) {
        super(service, ItemTypes.CONCEPT, "Themes", dialog);
    }

    getKey() : string {
        return this.key;
    }

    notify( event : SearchEvent ) {
        this.onEvent.emit(event);
    }

    initQuery() {
        super.initQuery();
        this.query.fields(['scheme']);
    }

    getDialogOptions() : any {
        let opts = super.getDialogOptions();
        opts.data.subHeading = "scheme";
        return opts;
    }

}
