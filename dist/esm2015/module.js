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
import { SearchService, SearchResultsComponent, SearchResultsItemComponent, CommunityFilterComponent, CreatedByFilterComponent, KeywordFilterComponent, PublisherFilterComponent, SchemeFilterComponent, SemanticFilterComponent, SemanticFilterDialog, ServiceTypeFilterComponent, SimilarityFilterComponent, ThemeFilterComponent, TopicFilterComponent, TypeFilterComponent, ModifiedFilterComponent } from './search';
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
            SearchService,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGVBQWUsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGVBQWUsRUFDL0QsZUFBZSxFQUFFLG9CQUFvQixFQUFFLGFBQWEsRUFBRSxrQkFBa0IsRUFDeEUsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQzdELE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3ZELDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQWEsa0NBQWtDLENBQUE7QUFDcEUsOERBQThEO0FBQzlELHVEQUF1RDtBQUN2RCxpRkFBaUY7QUFDakYsSUFBSTtBQUdKLHlFQUF5RTtBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzdELE9BQU8sRUFDSCxhQUFhLEVBQ2Isc0JBQXNCLEVBQ3RCLDBC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WUFDM0IsS0FBSztZQUNMO2dCQUNJLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixRQUFRLElBQXFCO2FBQ2hDO1lBQ0Q7Z0JBQ0ksT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLFVBQVUsSUFBd0I7Z0JBQ2xDLElBQUksRUFBRSxDQUFFLFVBQVUsQ0FBQzthQUN0QjtTQUNKO1FBQ0QsZUFBZSxFQUFFO1lBQ2IsZ0JBQWdCO1lBQ2hCLGFBQWE7U0FDaEI7S0FDSixDQUFDO0dBQ1csdUJBQXVCLENBQUc7U0FBMUIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICAgIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0SW5wdXRNb2R1bGUsIE1hdFNlbGVjdE1vZHVsZSxcbiAgICBNYXREaWFsb2dNb2R1bGUsIE1hdFByb2dyZXNzQmFyTW9kdWxlLCBNYXRUYWJzTW9kdWxlLCBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTmF0aXZlRGF0ZU1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cblxuLy8gQWRkcyB3aW5kb3cuUlBNU2VydmljZSB0byBnbG9iYWwgbmFtZXNwYWNlXG5pbXBvcnQgeyBSUE1TZXJ2aWNlRmFjdG9yeSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vZGlzdC9qcy9nZW9wbGF0Zm9ybS5ycG0uYnJvd3Nlci5qcyc7XG5pbXBvcnQgeyBSUE1TZXJ2aWNlIH0gICAgICAgIGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vc3JjL2lSUE1TZXJ2aWNlJ1xuLy8gaW1wb3J0IHsgUlBNU3RhdHNTZXJ2aWNlIH0gICBmcm9tICcuL3JwbS9ycG1zdGF0cy5zZXJ2aWNlJztcbi8vIGxldCBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5ID0gKGh0dHA6IEh0dHBDbGllbnQpID0+IHtcbi8vICAgICByZXR1cm4gbmV3IFJQTVN0YXRzU2VydmljZShlbnZpcm9ubWVudC5ycG1VcmwsIGVudmlyb25tZW50LnJwbVRva2VuLCBodHRwKVxuLy8gfVxuXG5cbi8vIGltcG9ydCB7IEdlb1BsYXRmb3JtQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyJztcblxuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBUcmFja2luZ1NlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi90cmFja2luZy5mYWN0b3J5JztcblxuXG5pbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdERpYWxvZywgTWVzc2FnZURpYWxvZyB9IGZyb20gJy4vZGlhbG9ncy8nO1xuXG5cbmltcG9ydCB7XG4gICAgU2VhcmNoU2VydmljZSxcbiAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50LFxuICAgIFNlYXJjaFJlc3VsdHNJdGVtQ29tcG9uZW50LFxuXG4gICAgQ29tbXVuaXR5RmlsdGVyQ29tcG9uZW50LFxuICAgIENyZWF0ZWRCeUZpbHRlckNvbXBvbmVudCxcbiAgICBLZXl3b3JkRmlsdGVyQ29tcG9uZW50LFxuICAgIFB1Ymxpc2hlckZpbHRlckNvbXBvbmVudCxcbiAgICBTY2hlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgU2VtYW50aWNGaWx0ZXJDb21wb25lbnQsIFNlbWFudGljRmlsdGVyRGlhbG9nLFxuICAgIFNlcnZpY2VUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgIFNpbWlsYXJpdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgVGhlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgVG9waWNGaWx0ZXJDb21wb25lbnQsXG4gICAgVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICBNb2RpZmllZEZpbHRlckNvbXBvbmVudFxufSBmcm9tICcuL3NlYXJjaCc7XG5cblxuaW1wb3J0IHtcbiAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLFxuICAgIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICBIZWFkZXJDb21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgIExpbWl0VG9QaXBlLFxuICAgIFNvcnRCeVBpcGUsXG4gICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICBGaXhMYWJlbFBpcGVcbn0gZnJvbSAnLi9waXBlcyc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaWNvbic7XG5pbXBvcnQge1xuICAgIEl0ZW1SZXNvbHZlciwgTmV3SXRlbVJlc29sdmVyLCBFcnJvclJlc29sdmVyLCBWZXJzaW9uUmVzb2x2ZXJcbn0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgR2VvUGxhdGZvcm1FcnJvclNlcnZpY2UgIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEl0ZW1IZWxwZXIgICAgICAgICAgICAgICB9IGZyb20gJy4vaXRlbS1oZWxwZXInO1xuXG5cblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdElucHV0TW9kdWxlLCBNYXRTZWxlY3RNb2R1bGUsXG4gICAgICAgIE1hdERpYWxvZ01vZHVsZSwgTWF0UHJvZ3Jlc3NCYXJNb2R1bGUsIE1hdFRhYnNNb2R1bGUsIE1hdFBhZ2luYXRvck1vZHVsZSxcbiAgICAgICAgTWF0RGF0ZXBpY2tlck1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTmF0aXZlRGF0ZU1vZHVsZSxcbiAgICAgICAgTmdiTW9kdWxlLFxuICAgICAgICAvLyBHZW9QbGF0Zm9ybUNsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nLFxuICAgICAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLCBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICAgICAgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQsXG4gICAgICAgIEhlYWRlckNvbXBvbmVudCxcblxuICAgICAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgICAgICBMaW1pdFRvUGlwZSxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICAgICAgRml4TGFiZWxQaXBlLFxuXG4gICAgICAgIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSxcblxuICAgICAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hSZXN1bHRzSXRlbUNvbXBvbmVudCxcblxuICAgICAgICBDb21tdW5pdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIENyZWF0ZWRCeUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2V5d29yZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgUHVibGlzaGVyRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTY2hlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNlbWFudGljRmlsdGVyQ29tcG9uZW50LCBTZW1hbnRpY0ZpbHRlckRpYWxvZyxcbiAgICAgICAgU2VydmljZVR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNpbWlsYXJpdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUb3BpY0ZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgTW9kaWZpZWRGaWx0ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nLFxuICAgICAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLCBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICAgICAgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQsXG4gICAgICAgIEhlYWRlckNvbXBvbmVudCxcblxuICAgICAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgICAgICBMaW1pdFRvUGlwZSxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICAgICAgRml4TGFiZWxQaXBlLFxuXG4gICAgICAgIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSxcblxuICAgICAgICBTZWFyY2hSZXN1bHRzQ29tcG9uZW50LFxuICAgICAgICBTZWFyY2hSZXN1bHRzSXRlbUNvbXBvbmVudCxcblxuICAgICAgICBDb21tdW5pdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIENyZWF0ZWRCeUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2V5d29yZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgUHVibGlzaGVyRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTY2hlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNlbWFudGljRmlsdGVyQ29tcG9uZW50LCBTZW1hbnRpY0ZpbHRlckRpYWxvZyxcbiAgICAgICAgU2VydmljZVR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNpbWlsYXJpdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUb3BpY0ZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgTW9kaWZpZWRGaWx0ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBcHBBdXRoU2VydmljZSxcbiAgICAgICAgRXJyb3JSZXNvbHZlcixcbiAgICAgICAgSXRlbVJlc29sdmVyLFxuICAgICAgICBOZXdJdGVtUmVzb2x2ZXIsXG4gICAgICAgIFZlcnNpb25SZXNvbHZlcixcbiAgICAgICAgR2VvUGxhdGZvcm1FcnJvclNlcnZpY2UsXG4gICAgICAgIEl0ZW1IZWxwZXIsXG4gICAgICAgIFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHByb3ZpZGU6IFJQTVN0YXRzU2VydmljZSxcbiAgICAgICAgLy8gICAgIHVzZUZhY3Rvcnk6IFJQTVN0YXRzU2VydmljZUZhY3RvcnksXG4gICAgICAgIC8vICAgICBkZXBzOiBbIEh0dHBDbGllbnQgXVxuICAgICAgICAvLyB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBSUE1TZXJ2aWNlLFxuICAgICAgICAgICAgdXNlVmFsdWU6IFJQTVNlcnZpY2VGYWN0b3J5KClcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogVHJhY2tpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6IFsgUlBNU2VydmljZV1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2dcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb1BsYXRmb3JtQ29tbW9uTW9kdWxlIHt9XG4iXX0=