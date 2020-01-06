import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFDbEUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHdkQsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBYSxrQ0FBa0MsQ0FBQTtBQUNwRSw4REFBOEQ7QUFDOUQsdURBQXVEO0FBQ3ZELGlGQUFpRjtBQUNqRixJQUFJO0FBR0oseUVBQXlFO0FBRXpFLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc1RCxPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFHN0QsT0FBTyxFQUNILGFBQWEsRUFFYix3QkFBd0IsRUFDeEIsd0JBQXdCLEVBQ3hCLHNCQUFzQixFQUN0Qix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUFFLG9CQUFvQixFQUM3QywwQkFBMEIs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U0FDSixDQUFDO09BQ1csdUJBQXVCLENBQUc7SUFBRCw4QkFBQztDQUFBLEFBQXZDLElBQXVDO1NBQTFCLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuXG5cbi8vIEFkZHMgd2luZG93LlJQTVNlcnZpY2UgdG8gZ2xvYmFsIG5hbWVzcGFjZVxuaW1wb3J0IHsgUlBNU2VydmljZUZhY3RvcnkgfSBmcm9tICdAZ2VvcGxhdGZvcm0vcnBtL2Rpc3QvanMvZ2VvcGxhdGZvcm0ucnBtLmJyb3dzZXIuanMnO1xuaW1wb3J0IHsgUlBNU2VydmljZSB9ICAgICAgICBmcm9tICdAZ2VvcGxhdGZvcm0vcnBtL3NyYy9pUlBNU2VydmljZSdcbi8vIGltcG9ydCB7IFJQTVN0YXRzU2VydmljZSB9ICAgZnJvbSAnLi9ycG0vcnBtc3RhdHMuc2VydmljZSc7XG4vLyBsZXQgUlBNU3RhdHNTZXJ2aWNlRmFjdG9yeSA9IChodHRwOiBIdHRwQ2xpZW50KSA9PiB7XG4vLyAgICAgcmV0dXJuIG5ldyBSUE1TdGF0c1NlcnZpY2UoZW52aXJvbm1lbnQucnBtVXJsLCBlbnZpcm9ubWVudC5ycG1Ub2tlbiwgaHR0cClcbi8vIH1cblxuXG4vLyBpbXBvcnQgeyBHZW9QbGF0Zm9ybUNsaWVudE1vZHVsZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQvYW5ndWxhcic7XG5cbmltcG9ydCB7IFRyYWNraW5nU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vdHJhY2tpbmcuZmFjdG9yeSc7XG5cblxuaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UsIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoJztcbmltcG9ydCB7IExpc3RTZWxlY3REaWFsb2csIE1lc3NhZ2VEaWFsb2cgfSBmcm9tICcuL2RpYWxvZ3MvJztcblxuXG5pbXBvcnQge1xuICAgIFNlYXJjaFNlcnZpY2UsXG5cbiAgICBDb21tdW5pdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgQ3JlYXRlZEJ5RmlsdGVyQ29tcG9uZW50LFxuICAgIEtleXdvcmRGaWx0ZXJDb21wb25lbnQsXG4gICAgUHVibGlzaGVyRmlsdGVyQ29tcG9uZW50LFxuICAgIFNjaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICBTZW1hbnRpY0ZpbHRlckNvbXBvbmVudCwgU2VtYW50aWNGaWx0ZXJEaWFsb2csXG4gICAgU2VydmljZVR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgU2ltaWxhcml0eUZpbHRlckNvbXBvbmVudCxcbiAgICBUaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICBUb3BpY0ZpbHRlckNvbXBvbmVudCxcbiAgICBUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgIE1vZGlmaWVkRmlsdGVyQ29tcG9uZW50XG59IGZyb20gJy4vc2VhcmNoJztcblxuXG5pbXBvcnQge1xuICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsXG4gICAgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgIEhlYWRlckNvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5pbXBvcnQge1xuICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgTGltaXRUb1BpcGUsXG4gICAgU29ydEJ5UGlwZSxcbiAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgIEZpeExhYmVsUGlwZVxufSBmcm9tICcuL3BpcGVzJztcbmltcG9ydCB7IEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9pY29uJztcbmltcG9ydCB7XG4gICAgSXRlbVJlc29sdmVyLCBOZXdJdGVtUmVzb2x2ZXIsIEVycm9yUmVzb2x2ZXIsIFZlcnNpb25SZXNvbHZlclxufSBmcm9tICcuL3Jlc29sdmVycyc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSAgfSBmcm9tICcuL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgSXRlbUhlbHBlciAgICAgICAgICAgICAgIH0gZnJvbSAnLi9pdGVtLWhlbHBlcic7XG5cblxuXG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTmdiTW9kdWxlLFxuICAgICAgICAvLyBHZW9QbGF0Zm9ybUNsaWVudE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nLFxuICAgICAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLCBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICAgICAgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQsXG4gICAgICAgIEhlYWRlckNvbXBvbmVudCxcblxuICAgICAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgICAgICBMaW1pdFRvUGlwZSxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICAgICAgRml4TGFiZWxQaXBlLFxuXG4gICAgICAgIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSxcblxuICAgICAgICBDb21tdW5pdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIENyZWF0ZWRCeUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgS2V5d29yZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgUHVibGlzaGVyRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBTY2hlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNlbWFudGljRmlsdGVyQ29tcG9uZW50LCBTZW1hbnRpY0ZpbHRlckRpYWxvZyxcbiAgICAgICAgU2VydmljZVR5cGVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNpbWlsYXJpdHlGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRoZW1lRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUb3BpY0ZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgTW9kaWZpZWRGaWx0ZXJDb21wb25lbnRcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nLFxuICAgICAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLCBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICAgICAgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQsXG4gICAgICAgIEhlYWRlckNvbXBvbmVudCxcblxuICAgICAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgICAgICBMaW1pdFRvUGlwZSxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICAgICAgRml4TGFiZWxQaXBlLFxuXG4gICAgICAgIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSxcblxuXG4gICAgICAgIENvbW11bml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgQ3JlYXRlZEJ5RmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBLZXl3b3JkRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBQdWJsaXNoZXJGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFNjaGVtZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2VtYW50aWNGaWx0ZXJDb21wb25lbnQsIFNlbWFudGljRmlsdGVyRGlhbG9nLFxuICAgICAgICBTZXJ2aWNlVHlwZUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgU2ltaWxhcml0eUZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgVGhlbWVGaWx0ZXJDb21wb25lbnQsXG4gICAgICAgIFRvcGljRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBUeXBlRmlsdGVyQ29tcG9uZW50LFxuICAgICAgICBNb2RpZmllZEZpbHRlckNvbXBvbmVudFxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEFwcEF1dGhTZXJ2aWNlLFxuICAgICAgICBFcnJvclJlc29sdmVyLFxuICAgICAgICBJdGVtUmVzb2x2ZXIsXG4gICAgICAgIE5ld0l0ZW1SZXNvbHZlcixcbiAgICAgICAgVmVyc2lvblJlc29sdmVyLFxuICAgICAgICBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSxcbiAgICAgICAgSXRlbUhlbHBlcixcbiAgICAgICAgU2VhcmNoU2VydmljZSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgcHJvdmlkZTogUlBNU3RhdHNTZXJ2aWNlLFxuICAgICAgICAvLyAgICAgdXNlRmFjdG9yeTogUlBNU3RhdHNTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgLy8gICAgIGRlcHM6IFsgSHR0cENsaWVudCBdXG4gICAgICAgIC8vIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IFJQTVNlcnZpY2UsXG4gICAgICAgICAgICB1c2VWYWx1ZTogUlBNU2VydmljZUZhY3RvcnkoKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBUcmFja2luZ1NlcnZpY2UsXG4gICAgICAgICAgICB1c2VGYWN0b3J5OiBUcmFja2luZ1NlcnZpY2VGYWN0b3J5LFxuICAgICAgICAgICAgZGVwczogWyBSUE1TZXJ2aWNlXVxuICAgICAgICB9XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6IFtcbiAgICAgICAgTGlzdFNlbGVjdERpYWxvZyxcbiAgICAgICAgTWVzc2FnZURpYWxvZ1xuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgR2VvUGxhdGZvcm1Db21tb25Nb2R1bGUge31cbiJdfQ==