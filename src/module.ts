import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    MatInputModule, MatButtonModule, MatIconModule, MatDialogModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TrackingService } from '@geoplatform/client';

let trackingServiceInst : TrackingService;
export function TrackingServiceFactory ( rpm : RPMService ) {
    if(!trackingServiceInst) {
        trackingServiceInst = new TrackingService({ provider: rpm });
    }
    return trackingServiceInst;
}


// Adds window.RPMService to global namespace
import { RPMServiceFactory } from '@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js';
import { RPMService }        from '@geoplatform/rpm/src/iRPMService'
// import { RPMStatsService }   from './rpm/rpmstats.service';
// let RPMStatsServiceFactory = (http: HttpClient) => {
//     return new RPMStatsService(environment.rpmUrl, environment.rpmToken, http)
// }






import { AppAuthService, LoginButtonComponent, LoginModalComponent } from './auth';
import { ListSelectDialog, MessageDialog } from './dialogs/';

import {
    ImageFallbackDirective,
    ThumbnailComponent,
    ResourceLinkComponent,
    SelectedItemsComponent
} from './components';

import {
    ArrayedItemsPipe,
    LimitToPipe,
    SortByPipe,
    FriendlyTypePipe,
    FixLabelPipe
} from './pipes';
import { GeoPlatformIconDirective } from './directives/icon';
import {
    ItemResolver, NewItemResolver, ErrorResolver, VersionResolver
} from './resolvers';
import { ErrorService             } from './error.service';
import { ItemHelper               } from './item-helper';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        MatInputModule, MatButtonModule, MatIconModule, MatDialogModule,
        NgbModule
    ],
    exports: [
        ListSelectDialog,
        MessageDialog,
        ImageFallbackDirective, ThumbnailComponent,
        SelectedItemsComponent,
        ResourceLinkComponent,
        LoginButtonComponent, LoginModalComponent,

        ArrayedItemsPipe,
        LimitToPipe,
        SortByPipe,
        FriendlyTypePipe,
        FixLabelPipe,

        GeoPlatformIconDirective
    ],
    declarations: [
        ListSelectDialog,
        MessageDialog,
        ImageFallbackDirective, ThumbnailComponent,
        SelectedItemsComponent,
        ResourceLinkComponent,
        LoginButtonComponent, LoginModalComponent,

        ArrayedItemsPipe,
        LimitToPipe,
        SortByPipe,
        FriendlyTypePipe,
        FixLabelPipe,

        GeoPlatformIconDirective
    ],
    providers: [
        AppAuthService,
        ErrorResolver,
        ItemResolver,
        NewItemResolver,
        VersionResolver,
        ErrorService,
        ItemHelper,

        // {
        //     provide: RPMStatsService,
        //     useFactory: RPMStatsServiceFactory,
        //     deps: [ HttpClient ]
        // },
        {
            provide: RPMService,
            useValue: RPMServiceFactory()
        },
        {
            provide: TrackingService,
            useFactory: TrackingServiceFactory,
            deps: [ RPMService]
        }
    ],
    entryComponents: [
        ListSelectDialog,
        MessageDialog
    ]
})
export class GeoPlatformCommonModule { }
