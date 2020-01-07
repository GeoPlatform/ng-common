import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule, MatDatepickerModule, MatNativeDateModule, NativeDateModule } from '@angular/material';
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
import { SearchService, CommunityFilterComponent, CreatedByFilterComponent, KeywordFilterComponent, PublisherFilterComponent, SchemeFilterComponent, SemanticFilterComponent, SemanticFilterDialog, ServiceTypeFilterComponent, SimilarityFilterComponent, ThemeFilterComponent, TopicFilterComponent, TypeFilterComponent, ModifiedFilterComponent } from './search';
import { ImageFallbackDirective, ThumbnailComponent, ResourceLinkComponent, SelectedItemsComponent, HeaderComponent } from './components';
import { ArrayedItemsPipe, LimitToPipe, SortByPipe, FriendlyTypePipe, FixLabelPipe } from './pipes';
import { GeoPlatformIconDirective } from './directives/icon';
import { ItemResolver, NewItemResolver, ErrorResolver, VersionResolver } from './resolvers';
import { GeoPlatformErrorService } from './error.service';
import { ItemHelper } from './item-helper';
var ɵ0 = RPMServiceFactory(), ɵ1 = TrackingServiceFactory;
var GeoPlatformCommonModule = /** @class */ (function () {
    function GeoPlatformCommonModule() {
    }
    GeoPlatformCommonModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule,
                CommonModule,
                FormsModule,
                MatInputModule, MatButtonModule, MatIconModule, MatDialogModule,
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
    return GeoPlatformCommonModule;
}());
export { GeoPlatformCommonModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFDL0QsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQzdELE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3ZELDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQWEsa0NBQWtDLENBQUE7QUFDcEUsOERBQThEO0FBQzlELHVEQUF1RDtBQUN2RCxpRkFBaUY7QUFDakYsSUFBSTtBQUdKLHlFQUF5RTtBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzdELE9BQU8sRUFDSCxhQUFhLEVBRWIsd0JBQXdCLEVBQ3hCLHdCQUF3QixFQUN4QixzQkFBc0IsRUFDdEIsd0JBQXdCLEVBQ3hCLHFCQUFxQixF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RSxDQUFFLFVBQVUsQ0FBQztpQkFDdEI7YUFDSjtZQUNELGVBQWUsRUFBRTtnQkFDYixnQkFBZ0I7Z0JBQ2hCLGFBQWE7YUFDaEI7U0FDSixDQUFDO09BQ1csdUJBQXVCLENBQUc7SUFBRCw4QkFBQztDQUFBLEFBQXZDLElBQXVDO1NBQTFCLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsXG4gICAgTWF0RGF0ZXBpY2tlck1vZHVsZSwgTWF0TmF0aXZlRGF0ZU1vZHVsZSwgTmF0aXZlRGF0ZU1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cblxuLy8gQWRkcyB3aW5kb3cuUlBNU2VydmljZSB0byBnbG9iYWwgbmFtZXNwYWNlXG5pbXBvcnQgeyBSUE1TZXJ2aWNlRmFjdG9yeSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vZGlzdC9qcy9nZW9wbGF0Zm9ybS5ycG0uYnJvd3Nlci5qcyc7XG5pbXBvcnQgeyBSUE1TZXJ2aWNlIH0gICAgICAgIGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vc3JjL2lSUE1TZXJ2aWNlJ1xuLy8gaW1wb3J0IHsgUlBNU3RhdHNTZXJ2aWNlIH0gICBmcm9tICcuL3JwbS9ycG1zdGF0cy5zZXJ2aWNlJztcbi8vIGxldCBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5ID0gKGh0dHA6IEh0dHBDbGllbnQpID0+IHtcbi8vICAgICByZXR1cm4gbmV3IFJQTVN0YXRzU2VydmljZShlbnZpcm9ubWVudC5ycG1VcmwsIGVudmlyb25tZW50LnJwbVRva2VuLCBodHRwKVxuLy8gfVxuXG5cbi8vIGltcG9ydCB7IEdlb1BsYXRmb3JtQ2xpZW50TW9kdWxlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudC9hbmd1bGFyJztcblxuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBUcmFja2luZ1NlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi90cmFja2luZy5mYWN0b3J5JztcblxuXG5pbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdERpYWxvZywgTWVzc2FnZURpYWxvZyB9IGZyb20gJy4vZGlhbG9ncy8nO1xuXG5cbmltcG9ydCB7XG4gICAgU2VhcmNoU2VydmljZSxcblxuICAgIENvbW11bml0eUZpbHRlckNvbXBvbmVudCxcbiAgICBDcmVhdGVkQnlGaWx0ZXJDb21wb25lbnQsXG4gICAgS2V5d29yZEZpbHRlckNvbXBvbmVudCxcbiAgICBQdWJsaXNoZXJGaWx0ZXJDb21wb25lbnQsXG4gICAgU2NoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgIFNlbWFudGljRmlsdGVyQ29tcG9uZW50LCBTZW1hbnRpY0ZpbHRlckRpYWxvZyxcbiAgICBTZXJ2aWNlVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICBTaW1pbGFyaXR5RmlsdGVyQ29tcG9uZW50LFxuICAgIFRoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgIFRvcGljRmlsdGVyQ29tcG9uZW50LFxuICAgIFR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgTW9kaWZpZWRGaWx0ZXJDb21wb25lbnRcbn0gZnJvbSAnLi9zZWFyY2gnO1xuXG5cbmltcG9ydCB7XG4gICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSxcbiAgICBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgSGVhZGVyQ29tcG9uZW50XG59IGZyb20gJy4vY29tcG9uZW50cyc7XG5cbmltcG9ydCB7XG4gICAgQXJyYXllZEl0ZW1zUGlwZSxcbiAgICBMaW1pdFRvUGlwZSxcbiAgICBTb3J0QnlQaXBlLFxuICAgIEZyaWVuZGx5VHlwZVBpcGUsXG4gICAgRml4TGFiZWxQaXBlXG59IGZyb20gJy4vcGlwZXMnO1xuaW1wb3J0IHsgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ljb24nO1xuaW1wb3J0IHtcbiAgICBJdGVtUmVzb2x2ZXIsIE5ld0l0ZW1SZXNvbHZlciwgRXJyb3JSZXNvbHZlciwgVmVyc2lvblJlc29sdmVyXG59IGZyb20gJy4vcmVzb2x2ZXJzJztcbmltcG9ydCB7IEdlb1BsYXRmb3JtRXJyb3JTZXJ2aWNlICB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBJdGVtSGVscGVyICAgICAgICAgICAgICAgfSBmcm9tICcuL2l0ZW0taGVscGVyJztcblxuXG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlLFxuICAgICAgICBNYXREYXRlcGlja2VyTW9kdWxlLCBNYXROYXRpdmVEYXRlTW9kdWxlLCBOYXRpdmVEYXRlTW9kdWxlLFxuICAgICAgICBOZ2JNb2R1bGUsXG4gICAgICAgIC8vIEdlb1BsYXRmb3JtQ2xpZW50TW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2csXG4gICAgICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgSGVhZGVyQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlLFxuXG4gICAgICAgIENvbW11bml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgQ3JlYXRlZEJ5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLZXl3b3JkRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBQdWJsaXNoZXJGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNjaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2VtYW50aWNGaWx0ZXJDb21wb25lbnQsIFNlbWFudGljRmlsdGVyRGlhbG9nLFxuICAgICAgICBTZXJ2aWNlVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2ltaWxhcml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVGhlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRvcGljRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBNb2RpZmllZEZpbHRlckNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2csXG4gICAgICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgSGVhZGVyQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlLFxuXG5cbiAgICAgICAgQ29tbXVuaXR5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBDcmVhdGVkQnlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIEtleXdvcmRGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFB1Ymxpc2hlckZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2NoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTZW1hbnRpY0ZpbHRlckNvbXBvbmVudCwgU2VtYW50aWNGaWx0ZXJEaWFsb2csXG4gICAgICAgIFNlcnZpY2VUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTaW1pbGFyaXR5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVG9waWNGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGlmaWVkRmlsdGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQXBwQXV0aFNlcnZpY2UsXG4gICAgICAgIEVycm9yUmVzb2x2ZXIsXG4gICAgICAgIEl0ZW1SZXNvbHZlcixcbiAgICAgICAgTmV3SXRlbVJlc29sdmVyLFxuICAgICAgICBWZXJzaW9uUmVzb2x2ZXIsXG4gICAgICAgIEdlb1BsYXRmb3JtRXJyb3JTZXJ2aWNlLFxuICAgICAgICBJdGVtSGVscGVyLFxuICAgICAgICBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBwcm92aWRlOiBSUE1TdGF0c1NlcnZpY2UsXG4gICAgICAgIC8vICAgICB1c2VGYWN0b3J5OiBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5LFxuICAgICAgICAvLyAgICAgZGVwczogWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogUlBNU2VydmljZSxcbiAgICAgICAgICAgIHVzZVZhbHVlOiBSUE1TZXJ2aWNlRmFjdG9yeSgpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IFRyYWNraW5nU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IFRyYWNraW5nU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiBbIFJQTVNlcnZpY2VdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNvbW1vbk1vZHVsZSB7fVxuIl19