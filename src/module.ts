import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
    MatButtonModule, MatIconModule, MatInputModule, MatSelectModule,
    MatDialogModule, MatProgressBarModule, MatTabsModule, MatPaginatorModule,
    MatDatepickerModule, MatNativeDateModule, NativeDateModule
} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


// Adds window.RPMService to global namespace
import { RPMServiceFactory } from '@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js';
import { RPMService }        from '@geoplatform/rpm/src/iRPMService'
// import { RPMStatsService }   from './rpm/rpmstats.service';
// let RPMStatsServiceFactory = (http: HttpClient) => {
//     return new RPMStatsService(environment.rpmUrl, environment.rpmToken, http)
// }


// import { GeoPlatformClientModule } from '@geoplatform/client/angular';

import { TrackingService } from '@geoplatform/client';
import { TrackingServiceFactory } from './tracking.factory';


import { AppAuthService, LoginButtonComponent, LoginModalComponent } from './auth';
import { ListSelectDialog, MessageDialog } from './dialogs/';


import {
    GeoPlatformSearchService,
    SearchResultsComponent,
    SearchResultsItemComponent,

    CommunityFilterComponent,
    CreatedByFilterComponent,
    KeywordFilterComponent,
    PublisherFilterComponent,
    SchemeFilterComponent,
    SemanticFilterComponent, SemanticFilterDialog,
    ServiceTypeFilterComponent,
    SimilarityFilterComponent,
    ThemeFilterComponent,
    TopicFilterComponent,
    TypeFilterComponent,
    ModifiedFilterComponent
} from './search';


import {
    ImageFallbackDirective,
    ThumbnailComponent,
    ResourceLinkComponent,
    SelectedItemsComponent,
    HeaderComponent
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
import { GeoPlatformErrorService  } from './error.service';
import { ItemHelper               } from './item-helper';




@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        MatButtonModule, MatIconModule, MatInputModule, MatSelectModule,
        MatDialogModule, MatProgressBarModule, MatTabsModule, MatPaginatorModule,
        MatDatepickerModule, MatNativeDateModule, NativeDateModule,
        NgbModule,
        // GeoPlatformClientModule
    ],
    exports: [
        ListSelectDialog,
        MessageDialog,
        ImageFallbackDirective, ThumbnailComponent,
        SelectedItemsComponent,
        ResourceLinkComponent,
        LoginButtonComponent, LoginModalComponent,
        HeaderComponent,

        ArrayedItemsPipe,
        LimitToPipe,
        SortByPipe,
        FriendlyTypePipe,
        FixLabelPipe,

        GeoPlatformIconDirective,

        SearchResultsComponent,
        SearchResultsItemComponent,

        CommunityFilterComponent,
        CreatedByFilterComponent,
        KeywordFilterComponent,
        PublisherFilterComponent,
        SchemeFilterComponent,
        SemanticFilterComponent, SemanticFilterDialog,
        ServiceTypeFilterComponent,
        SimilarityFilterComponent,
        ThemeFilterComponent,
        TopicFilterComponent,
        TypeFilterComponent,
        ModifiedFilterComponent
    ],
    declarations: [
        ListSelectDialog,
        MessageDialog,
        ImageFallbackDirective, ThumbnailComponent,
        SelectedItemsComponent,
        ResourceLinkComponent,
        LoginButtonComponent, LoginModalComponent,
        HeaderComponent,

        ArrayedItemsPipe,
        LimitToPipe,
        SortByPipe,
        FriendlyTypePipe,
        FixLabelPipe,

        GeoPlatformIconDirective,

        SearchResultsComponent,
        SearchResultsItemComponent,

        CommunityFilterComponent,
        CreatedByFilterComponent,
        KeywordFilterComponent,
        PublisherFilterComponent,
        SchemeFilterComponent,
        SemanticFilterComponent, SemanticFilterDialog,
        ServiceTypeFilterComponent,
        SimilarityFilterComponent,
        ThemeFilterComponent,
        TopicFilterComponent,
        TypeFilterComponent,
        ModifiedFilterComponent
    ],
    providers: [
        AppAuthService,
        ErrorResolver,
        ItemResolver,
        NewItemResolver,
        VersionResolver,
        GeoPlatformErrorService,
        ItemHelper,
        GeoPlatformSearchService,
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
export class GeoPlatformCommonModule {}
