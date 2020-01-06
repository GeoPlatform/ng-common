import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ItemTypes, QueryParameters, ItemService } from '@geoplatform/client';
import { ItemFilterComponent } from '../item-filter.component';

import { SearchEvent, EventTypes } from '../../../event';

@Component({
  selector: 'gp-topic-filter',
  templateUrl: '../item-filter.component.html',
  styleUrls: ['./topic.component.less']
})
export class TopicFilterComponent extends ItemFilterComponent {

    @Input()  key       : string = QueryParameters.TOPIC_ID;
    @Output() onEvent   : EventEmitter<any> = new EventEmitter<any>();

    constructor(
        @Inject(ItemService) service : ItemService,
        dialog : MatDialog
    ) {
        super(service, ItemTypes.TOPIC, "Topics", dialog);
    }

    getKey() : string {
        return this.key;
    }

    notify( event : SearchEvent ) {
        this.onEvent.emit(event);
    }

}
