import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';

import { SearchEvent, EventTypes } from '../../../event';

@Component({
  selector: 'gp-publisher-filter',
  templateUrl: '../item-filter.component.html',
  styleUrls: ['./publisher.component.less']
})
export class PublisherFilterComponent extends ItemFilterComponent {

    @Input()  key       : string = QueryParameters.PUBLISHERS_ID;
    @Output() onEvent   : EventEmitter<any> = new EventEmitter<any>();

    constructor(
        @Inject(ItemService) service : ItemService,
        dialog : MatDialog
    ) {
        super(service, ItemTypes.ORGANIZATION, "Publishers", dialog);
    }

    getKey() : string {
        return this.key;
    }

    notify( event : SearchEvent ) {
        this.onEvent.emit(event);
    }

    initQuery() {
        super.initQuery();
        this.query.fields(['subOrganizationOf']);
    }

    getDialogOptions() : any {
        let opts = super.getDialogOptions();
        opts.data.subHeading = "subOrganizationOf";
        return opts;
    }
}
