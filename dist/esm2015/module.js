import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatInputModule, MatSelectModule, MatDialogModule, MatProgressBarModule, MatTabsModule, MatPaginatorModule, MatDatepickerModule, MatNativeDateModule, NativeDateModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// Adds window.RPMService to global namespace
import { RPMServiceFactory } from '@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
// import { RPMStatsService }   from './rpm/rpmstats.service';
// let RPMStatsServiceFactory = (http: HttpClient) => {
//     return new RPMStatsService(environment.rpmUrl, environment.rpmToken, http)
// }
// import { GeoPlatformClientModule } from '@geoplatform/client/angular';
import { TrackingService } from '@geoplatform/client';
import { TrackingServiceFactory } from './tracking.factory';
import { AppAuthService, LoginButtonComponent, LoginModalComponent } from './auth';
import { ListSelectDialog, MessageDialog } from './dialogs/';
import { GeoPlatformSearchService, SearchResultsComponent, SearchResultsItemComponent, CommunityFilterComponent, CreatedByFilterComponent, KeywordFilterComponent, PublisherFilterComponent, SchemeFilterComponent, SemanticFilterComponent, SemanticFilterDialog, ServiceTypeFilterComponent, SimilarityFilterComponent, ThemeFilterComponent, TopicFilterComponent, TypeFilterComponent, ModifiedFilterComponent } from './search';
import { ImageFallbackDirective, ThumbnailComponent, ResourceLinkComponent, SelectedItemsComponent, HeaderComponent } from './components';
import { ArrayedItemsPipe, LimitToPipe, SortByPipe, FriendlyTypePipe, FixLabelPipe } from './pipes';
import { GeoPlatformIconDirective } from './directives/icon';
import { ItemResolver, NewItemResolver, ErrorResolver, VersionResolver } from './resolvers';
import { GeoPlatformErrorService } from './error.service';
import { ItemHelper } from './item-helper';
const ɵ0 = RPMServiceFactory(), ɵ1 = TrackingServiceFactory;
let GeoPlatformCommonModule = class GeoPlatformCommonModule {
};
GeoPlatformCommonModule = tslib_1.__decorate([
    NgModule({
        imports: [
            RouterModule,
            CommonModule,
            FormsModule,
            MatButtonModule, MatIconModule, MatInputModule, MatSelectModule,
            MatDialogModule, MatProgressBarModule, MatTabsModule, MatPaginatorModule,
            MatDatepickerModule, MatNativeDateModule, NativeDateModule,
            NgbModule,
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
                useValue: ɵ0
            },
            {
                provide: TrackingService,
                useFactory: ɵ1,
                deps: [RPMService]
            }
        ],
        entryComponents: [
            ListSelectDialog,
            MessageDialog
        ]
    })
], GeoPlatformCommonModule);
export { GeoPlatformCommonModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFDL0QsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFDeEUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQzdELE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3ZELDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQWEsa0NBQWtDLENBQUE7QUFDcEUsOERBQThEO0FBQzlELHVEQUF1RDtBQUN2RCxpRkFBaUY7QUFDakYsSUFBSTtBQUdKLHlFQUF5RTtBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzdELE9BQU8sRUFDSCx3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RC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QkFBMkI7WUFDM0IsS0FBSztZQUNMO2dCQUNJLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixRQUFRLElBQXFCO2FBQ2hDO1lBQ0Q7Z0JBQ0ksT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLFVBQVUsSUFBd0I7Z0JBQ2xDLElBQUksRUFBRSxDQUFFLFVBQVUsQ0FBQzthQUN0QjtTQUNKO1FBQ0QsZUFBZSxFQUFFO1lBQ2IsZ0JBQWdCO1lBQ2hCLGFBQWE7U0FDaEI7S0FDSixDQUFDO0dBQ1csdUJBQXVCLENBQUc7U0FBMUIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICAgIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsIE1hdFByb2dyZXNzQmFyTW9kdWxlLCBNYXRUYWJzTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTmF0aXZlRGF0ZU1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cblxuLy8gQWRkcyB3aW5kb3cuUlBNU2VydmljZSB0byBnbG9iYWwgbmFtZXNwYWNlXG5pbXBvcnQgeyBSUE1TZXJ2aWNlRmFjdG9yeSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vZGlzdC9qcy9nZW9wbGF0Zm9ybS5ycG0uYnJvd3Nlci5qcyc7XG5pbXBvcnQgeyBSUE1TZXJ2aWNlIH0gICAgICAgIGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vc3JjL2lSUE1TZXJ2aWNlJ1xuLy8gaW1wb3J0IHsgUlBNU3RhdHNTZXJ2aWNlIH0gICBmcm9tICcuL3JwbS9ycG1zdGF0cy5zZXJ2aWNlJztcbi8vIGxldCBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5ID0gKGh0dHA6IEh0dHBDbGllbnQpID0+IHtcbi8vICAgICByZXR1cm4gbmV3IFJQTVN0YXRzU2VydmljZShlbnZpcm9ubWVudC5ycG1VcmwsIGVudmlyb25tZW50LnJwbVRva2VuLCBodHRwKVxuLy8gfVxuXG5cbi8vIGltcG9ydCB7IEdlb1BsYXRmb3JtQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyJztcblxuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBUcmFja2luZ1NlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi90cmFja2luZy5mYWN0b3J5JztcblxuXG5pbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdERpYWxvZywgTWVzc2FnZURpYWxvZyB9IGZyb20gJy4vZGlhbG9ncy8nO1xuXG5cbmltcG9ydCB7XG4gICAgR2VvUGxhdGZvcm1TZWFyY2hTZXJ2aWNlLFxuICAgIFNlYXJjaFJlc3VsdHNDb21wb25lbnQsXG4gICAgU2VhcmNoUmVzdWx0c0l0ZW1Db21wb25lbnQsXG5cbiAgICBDb21tdW5pdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgQ3JlYXRlZEJ5RmlsdGVyQ29tcG9uZW50LFxuICAgIEtleXdvcmRGaWx0ZXJDb21wb25lbnQsXG4gICAgUHVibGlzaGVyRmlsdGVyQ29tcG9uZW50LFxuICAgIFNjaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICBTZW1hbnRpY0ZpbHRlckNvbXBvbmVudCwgU2VtYW50aWNGaWx0ZXJEaWFsb2csXG4gICAgU2VydmljZVR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgU2ltaWxhcml0eUZpbHRlckNvbXBvbmVudCxcbiAgICBUaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICBUb3BpY0ZpbHRlckNvbXBvbmVudCxcbiAgICBUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgIE1vZGlmaWVkRmlsdGVyQ29tcG9uZW50XG59IGZyb20gJy4vc2VhcmNoJztcblxuXG5pbXBvcnQge1xuICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsXG4gICAgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgIEhlYWRlckNvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5pbXBvcnQge1xuICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgTGltaXRUb1BpcGUsXG4gICAgU29ydEJ5UGlwZSxcbiAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgIEZpeExhYmVsUGlwZVxufSBmcm9tICcuL3BpcGVzJztcbmltcG9ydCB7IEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9pY29uJztcbmltcG9ydCB7XG4gICAgSXRlbVJlc29sdmVyLCBOZXdJdGVtUmVzb2x2ZXIsIEVycm9yUmVzb2x2ZXIsIFZlcnNpb25SZXNvbHZlclxufSBmcm9tICcuL3Jlc29sdmVycyc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSAgfSBmcm9tICcuL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgSXRlbUhlbHBlciAgICAgICAgICAgICAgIH0gZnJvbSAnLi9pdGVtLWhlbHBlcic7XG5cblxuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSxcbiAgICAgICAgTWF0RGlhbG9nTW9kdWxlLCBNYXRQcm9ncmVzc0Jhck1vZHVsZSwgTWF0VGFic01vZHVsZSwgTWF0UGFnaW5hdG9yTW9kdWxlLFxuICAgICAgICBNYXREYXRlcGlja2VyTW9kdWxlLCBNYXROYXRpdmVEYXRlTW9kdWxlLCBOYXRpdmVEYXRlTW9kdWxlLFxuICAgICAgICBOZ2JNb2R1bGUsXG4gICAgICAgIC8vIEdlb1BsYXRmb3JtQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2csXG4gICAgICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgSGVhZGVyQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlLFxuXG4gICAgICAgIFNlYXJjaFJlc3VsdHNDb21wb25lbnQsXG4gICAgICAgIFNlYXJjaFJlc3VsdHNJdGVtQ29tcG9uZW50LFxuXG4gICAgICAgIENvbW11bml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgQ3JlYXRlZEJ5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLZXl3b3JkRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBQdWJsaXNoZXJGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNjaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2VtYW50aWNGaWx0ZXJDb21wb25lbnQsIFNlbWFudGljRmlsdGVyRGlhbG9nLFxuICAgICAgICBTZXJ2aWNlVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2ltaWxhcml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVGhlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRvcGljRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBNb2RpZmllZEZpbHRlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2csXG4gICAgICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgSGVhZGVyQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlLFxuXG4gICAgICAgIFNlYXJjaFJlc3VsdHNDb21wb25lbnQsXG4gICAgICAgIFNlYXJjaFJlc3VsdHNJdGVtQ29tcG9uZW50LFxuXG4gICAgICAgIENvbW11bml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgQ3JlYXRlZEJ5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLZXl3b3JkRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBQdWJsaXNoZXJGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNjaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2VtYW50aWNGaWx0ZXJDb21wb25lbnQsIFNlbWFudGljRmlsdGVyRGlhbG9nLFxuICAgICAgICBTZXJ2aWNlVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2ltaWxhcml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVGhlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRvcGljRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBNb2RpZmllZEZpbHRlckNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEFwcEF1dGhTZXJ2aWNlLFxuICAgICAgICBFcnJvclJlc29sdmVyLFxuICAgICAgICBJdGVtUmVzb2x2ZXIsXG4gICAgICAgIE5ld0l0ZW1SZXNvbHZlcixcbiAgICAgICAgVmVyc2lvblJlc29sdmVyLFxuICAgICAgICBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSxcbiAgICAgICAgSXRlbUhlbHBlcixcbiAgICAgICAgR2VvUGxhdGZvcm1TZWFyY2hTZXJ2aWNlLFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBwcm92aWRlOiBSUE1TdGF0c1NlcnZpY2UsXG4gICAgICAgIC8vICAgICB1c2VGYWN0b3J5OiBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5LFxuICAgICAgICAvLyAgICAgZGVwczogWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogUlBNU2VydmljZSxcbiAgICAgICAgICAgIHVzZVZhbHVlOiBSUE1TZXJ2aWNlRmFjdG9yeSgpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IFRyYWNraW5nU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IFRyYWNraW5nU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiBbIFJQTVNlcnZpY2VdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNvbW1vbk1vZHVsZSB7fVxuIl19