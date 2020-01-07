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
const ɵ0 = RPMServiceFactory(), ɵ1 = TrackingServiceFactory;
let GeoPlatformCommonModule = class GeoPlatformCommonModule {
};
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
export { GeoPlatformCommonModule };
export { ɵ0, ɵ1 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFDL0QsbUJBQW1CLEVBQUUsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQzdELE1BQU0sbUJBQW1CLENBQUM7QUFDM0IsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBR3ZELDZDQUE2QztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxxREFBcUQsQ0FBQztBQUN4RixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQWEsa0NBQWtDLENBQUE7QUFDcEUsOERBQThEO0FBQzlELHVEQUF1RDtBQUN2RCxpRkFBaUY7QUFDakYsSUFBSTtBQUdKLHlFQUF5RTtBQUV6RSxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHNUQsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRzdELE9BQU8sRUFDSCxhQUFhLEVBRWIsd0JBQXdCLEVBQ3hCLHdCQUF3QixFQUN4QixzQkFBc0IsRUFDdEIsd0JBQXdCLEVBQ3hCLHFCQUFxQixF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Z0JBQWdCO1lBQ2hCLGFBQWE7U0FDaEI7S0FDSixDQUFDO0dBQ1csdUJBQXVCLENBQUc7U0FBMUIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICAgIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSxcbiAgICBNYXREYXRlcGlja2VyTW9kdWxlLCBNYXROYXRpdmVEYXRlTW9kdWxlLCBOYXRpdmVEYXRlTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuXG4vLyBBZGRzIHdpbmRvdy5SUE1TZXJ2aWNlIHRvIGdsb2JhbCBuYW1lc3BhY2VcbmltcG9ydCB7IFJQTVNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnQGdlb3BsYXRmb3JtL3JwbS9kaXN0L2pzL2dlb3BsYXRmb3JtLnJwbS5icm93c2VyLmpzJztcbmltcG9ydCB7IFJQTVNlcnZpY2UgfSAgICAgICAgZnJvbSAnQGdlb3BsYXRmb3JtL3JwbS9zcmMvaVJQTVNlcnZpY2UnXG4vLyBpbXBvcnQgeyBSUE1TdGF0c1NlcnZpY2UgfSAgIGZyb20gJy4vcnBtL3JwbXN0YXRzLnNlcnZpY2UnO1xuLy8gbGV0IFJQTVN0YXRzU2VydmljZUZhY3RvcnkgPSAoaHR0cDogSHR0cENsaWVudCkgPT4ge1xuLy8gICAgIHJldHVybiBuZXcgUlBNU3RhdHNTZXJ2aWNlKGVudmlyb25tZW50LnJwbVVybCwgZW52aXJvbm1lbnQucnBtVG9rZW4sIGh0dHApXG4vLyB9XG5cblxuLy8gaW1wb3J0IHsgR2VvUGxhdGZvcm1DbGllbnRNb2R1bGUgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50L2FuZ3VsYXInO1xuXG5pbXBvcnQgeyBUcmFja2luZ1NlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCB7IFRyYWNraW5nU2VydmljZUZhY3RvcnkgfSBmcm9tICcuL3RyYWNraW5nLmZhY3RvcnknO1xuXG5cbmltcG9ydCB7IEFwcEF1dGhTZXJ2aWNlLCBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgeyBMaXN0U2VsZWN0RGlhbG9nLCBNZXNzYWdlRGlhbG9nIH0gZnJvbSAnLi9kaWFsb2dzLyc7XG5cblxuaW1wb3J0IHtcbiAgICBTZWFyY2hTZXJ2aWNlLFxuXG4gICAgQ29tbXVuaXR5RmlsdGVyQ29tcG9uZW50LFxuICAgIENyZWF0ZWRCeUZpbHRlckNvbXBvbmVudCxcbiAgICBLZXl3b3JkRmlsdGVyQ29tcG9uZW50LFxuICAgIFB1Ymxpc2hlckZpbHRlckNvbXBvbmVudCxcbiAgICBTY2hlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgU2VtYW50aWNGaWx0ZXJDb21wb25lbnQsIFNlbWFudGljRmlsdGVyRGlhbG9nLFxuICAgIFNlcnZpY2VUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgIFNpbWlsYXJpdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgVGhlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgVG9waWNGaWx0ZXJDb21wb25lbnQsXG4gICAgVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICBNb2RpZmllZEZpbHRlckNvbXBvbmVudFxufSBmcm9tICcuL3NlYXJjaCc7XG5cblxuaW1wb3J0IHtcbiAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLFxuICAgIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICBIZWFkZXJDb21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgIExpbWl0VG9QaXBlLFxuICAgIFNvcnRCeVBpcGUsXG4gICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICBGaXhMYWJlbFBpcGVcbn0gZnJvbSAnLi9waXBlcyc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaWNvbic7XG5pbXBvcnQge1xuICAgIEl0ZW1SZXNvbHZlciwgTmV3SXRlbVJlc29sdmVyLCBFcnJvclJlc29sdmVyLCBWZXJzaW9uUmVzb2x2ZXJcbn0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgR2VvUGxhdGZvcm1FcnJvclNlcnZpY2UgIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEl0ZW1IZWxwZXIgICAgICAgICAgICAgICB9IGZyb20gJy4vaXRlbS1oZWxwZXInO1xuXG5cblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsXG4gICAgICAgIE1hdERhdGVwaWNrZXJNb2R1bGUsIE1hdE5hdGl2ZURhdGVNb2R1bGUsIE5hdGl2ZURhdGVNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZSxcbiAgICAgICAgLy8gR2VvUGxhdGZvcm1DbGllbnRNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTGlzdFNlbGVjdERpYWxvZyxcbiAgICAgICAgTWVzc2FnZURpYWxvZyxcbiAgICAgICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSwgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgICAgIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50LFxuICAgICAgICBIZWFkZXJDb21wb25lbnQsXG5cbiAgICAgICAgQXJyYXllZEl0ZW1zUGlwZSxcbiAgICAgICAgTGltaXRUb1BpcGUsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEZyaWVuZGx5VHlwZVBpcGUsXG4gICAgICAgIEZpeExhYmVsUGlwZSxcblxuICAgICAgICBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmUsXG5cbiAgICAgICAgQ29tbXVuaXR5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBDcmVhdGVkQnlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIEtleXdvcmRGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFB1Ymxpc2hlckZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2NoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTZW1hbnRpY0ZpbHRlckNvbXBvbmVudCwgU2VtYW50aWNGaWx0ZXJEaWFsb2csXG4gICAgICAgIFNlcnZpY2VUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTaW1pbGFyaXR5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVG9waWNGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIE1vZGlmaWVkRmlsdGVyQ29tcG9uZW50XG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTGlzdFNlbGVjdERpYWxvZyxcbiAgICAgICAgTWVzc2FnZURpYWxvZyxcbiAgICAgICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSwgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgICAgIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50LFxuICAgICAgICBIZWFkZXJDb21wb25lbnQsXG5cbiAgICAgICAgQXJyYXllZEl0ZW1zUGlwZSxcbiAgICAgICAgTGltaXRUb1BpcGUsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEZyaWVuZGx5VHlwZVBpcGUsXG4gICAgICAgIEZpeExhYmVsUGlwZSxcblxuICAgICAgICBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmUsXG5cblxuICAgICAgICBDb21tdW5pdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIENyZWF0ZWRCeUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2V5d29yZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgUHVibGlzaGVyRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTY2hlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNlbWFudGljRmlsdGVyQ29tcG9uZW50LCBTZW1hbnRpY0ZpbHRlckRpYWxvZyxcbiAgICAgICAgU2VydmljZVR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNpbWlsYXJpdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUb3BpY0ZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgTW9kaWZpZWRGaWx0ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBcHBBdXRoU2VydmljZSxcbiAgICAgICAgRXJyb3JSZXNvbHZlcixcbiAgICAgICAgSXRlbVJlc29sdmVyLFxuICAgICAgICBOZXdJdGVtUmVzb2x2ZXIsXG4gICAgICAgIFZlcnNpb25SZXNvbHZlcixcbiAgICAgICAgR2VvUGxhdGZvcm1FcnJvclNlcnZpY2UsXG4gICAgICAgIEl0ZW1IZWxwZXIsXG4gICAgICAgIFNlYXJjaFNlcnZpY2UsXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHByb3ZpZGU6IFJQTVN0YXRzU2VydmljZSxcbiAgICAgICAgLy8gICAgIHVzZUZhY3Rvcnk6IFJQTVN0YXRzU2VydmljZUZhY3RvcnksXG4gICAgICAgIC8vICAgICBkZXBzOiBbIEh0dHBDbGllbnQgXVxuICAgICAgICAvLyB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBSUE1TZXJ2aWNlLFxuICAgICAgICAgICAgdXNlVmFsdWU6IFJQTVNlcnZpY2VGYWN0b3J5KClcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogVHJhY2tpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6IFsgUlBNU2VydmljZV1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2dcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb1BsYXRmb3JtQ29tbW9uTW9kdWxlIHt9XG4iXX0=