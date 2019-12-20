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
import { TrackingService } from '@geoplatform/client';
import { TrackingServiceFactory } from './tracking.factory';
import { AppAuthService, LoginButtonComponent, LoginModalComponent } from './auth';
import { ListSelectDialog, MessageDialog } from './dialogs/';
import { SearchService } from './search';
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
            NgbModule
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
            GeoPlatformIconDirective
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
            GeoPlatformIconDirective
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFDbEUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHdkQsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBYSxrQ0FBa0MsQ0FBQTtBQUNwRSw4REFBOEQ7QUFDOUQsdURBQXVEO0FBQ3ZELGlGQUFpRjtBQUNqRixJQUFJO0FBR0osT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUM3RCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sVUFBVSxDQUFDO0FBR3pDLE9BQU8sRUFDSCxzQkFBc0IsRUFDdEIsa0JBQWtCLEVBQ2xCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDdEIsZUFBZSxFQUNsQixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDZixNQUFNLFNBQVMsQ0FBQztBQUNqQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQ0gsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUNoRSxNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsdUJBQXVCLEVBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztXQTREbkMsaUJBQWlCLEVBQUUsT0FJakIsc0JBQXNCO0FBUzlDLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXVCO0NBQUcsQ0FBQTtBQUExQix1QkFBdUI7SUF2RW5DLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRTtZQUNMLFlBQVk7WUFDWixZQUFZO1lBQ1osV0FBVztZQUNYLGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWU7WUFDL0QsU0FBUztTQUNaO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixzQkFBc0IsRUFBRSxrQkFBa0I7WUFDMUMsc0JBQXNCO1lBQ3RCLHFCQUFxQjtZQUNyQixvQkFBb0IsRUFBRSxtQkFBbUI7WUFDekMsZUFBZTtZQUVmLGdCQUFnQjtZQUNoQixXQUFXO1lBQ1gsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixZQUFZO1lBRVosd0JBQXdCO1NBQzNCO1FBQ0QsWUFBWSxFQUFFO1lBQ1YsZ0JBQWdCO1lBQ2hCLGFBQWE7WUFDYixzQkFBc0IsRUFBRSxrQkFBa0I7WUFDMUMsc0JBQXNCO1lBQ3RCLHFCQUFxQjtZQUNyQixvQkFBb0IsRUFBRSxtQkFBbUI7WUFDekMsZUFBZTtZQUVmLGdCQUFnQjtZQUNoQixXQUFXO1lBQ1gsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixZQUFZO1lBRVosd0JBQXdCO1NBQzNCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsY0FBYztZQUNkLGFBQWE7WUFDYixZQUFZO1lBQ1osZUFBZTtZQUNmLGVBQWU7WUFDZix1QkFBdUI7WUFDdkIsVUFBVTtZQUNWLGFBQWE7WUFDYixJQUFJO1lBQ0osZ0NBQWdDO1lBQ2hDLDBDQUEwQztZQUMxQywyQkFBMkI7WUFDM0IsS0FBSztZQUNMO2dCQUNJLE9BQU8sRUFBRSxVQUFVO2dCQUNuQixRQUFRLElBQXFCO2FBQ2hDO1lBQ0Q7Z0JBQ0ksT0FBTyxFQUFFLGVBQWU7Z0JBQ3hCLFVBQVUsSUFBd0I7Z0JBQ2xDLElBQUksRUFBRSxDQUFFLFVBQVUsQ0FBQzthQUN0QjtTQUNKO1FBQ0QsZUFBZSxFQUFFO1lBQ2IsZ0JBQWdCO1lBQ2hCLGFBQWE7U0FDaEI7S0FDSixDQUFDO0dBQ1csdUJBQXVCLENBQUc7U0FBMUIsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICAgIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cblxuLy8gQWRkcyB3aW5kb3cuUlBNU2VydmljZSB0byBnbG9iYWwgbmFtZXNwYWNlXG5pbXBvcnQgeyBSUE1TZXJ2aWNlRmFjdG9yeSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vZGlzdC9qcy9nZW9wbGF0Zm9ybS5ycG0uYnJvd3Nlci5qcyc7XG5pbXBvcnQgeyBSUE1TZXJ2aWNlIH0gICAgICAgIGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vc3JjL2lSUE1TZXJ2aWNlJ1xuLy8gaW1wb3J0IHsgUlBNU3RhdHNTZXJ2aWNlIH0gICBmcm9tICcuL3JwbS9ycG1zdGF0cy5zZXJ2aWNlJztcbi8vIGxldCBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5ID0gKGh0dHA6IEh0dHBDbGllbnQpID0+IHtcbi8vICAgICByZXR1cm4gbmV3IFJQTVN0YXRzU2VydmljZShlbnZpcm9ubWVudC5ycG1VcmwsIGVudmlyb25tZW50LnJwbVRva2VuLCBodHRwKVxuLy8gfVxuXG5cbmltcG9ydCB7IFRyYWNraW5nU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeSB9IGZyb20gJy4vdHJhY2tpbmcuZmFjdG9yeSc7XG5cblxuaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UsIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoJztcbmltcG9ydCB7IExpc3RTZWxlY3REaWFsb2csIE1lc3NhZ2VEaWFsb2cgfSBmcm9tICcuL2RpYWxvZ3MvJztcbmltcG9ydCB7IFNlYXJjaFNlcnZpY2UgfSBmcm9tICcuL3NlYXJjaCc7XG5cblxuaW1wb3J0IHtcbiAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLFxuICAgIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICBIZWFkZXJDb21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgIExpbWl0VG9QaXBlLFxuICAgIFNvcnRCeVBpcGUsXG4gICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICBGaXhMYWJlbFBpcGVcbn0gZnJvbSAnLi9waXBlcyc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaWNvbic7XG5pbXBvcnQge1xuICAgIEl0ZW1SZXNvbHZlciwgTmV3SXRlbVJlc29sdmVyLCBFcnJvclJlc29sdmVyLCBWZXJzaW9uUmVzb2x2ZXJcbn0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgR2VvUGxhdGZvcm1FcnJvclNlcnZpY2UgIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEl0ZW1IZWxwZXIgICAgICAgICAgICAgICB9IGZyb20gJy4vaXRlbS1oZWxwZXInO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nLFxuICAgICAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLCBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICAgICAgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQsXG4gICAgICAgIEhlYWRlckNvbXBvbmVudCxcblxuICAgICAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgICAgICBMaW1pdFRvUGlwZSxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICAgICAgRml4TGFiZWxQaXBlLFxuXG4gICAgICAgIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2csXG4gICAgICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCxcbiAgICAgICAgSGVhZGVyQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQXBwQXV0aFNlcnZpY2UsXG4gICAgICAgIEVycm9yUmVzb2x2ZXIsXG4gICAgICAgIEl0ZW1SZXNvbHZlcixcbiAgICAgICAgTmV3SXRlbVJlc29sdmVyLFxuICAgICAgICBWZXJzaW9uUmVzb2x2ZXIsXG4gICAgICAgIEdlb1BsYXRmb3JtRXJyb3JTZXJ2aWNlLFxuICAgICAgICBJdGVtSGVscGVyLFxuICAgICAgICBTZWFyY2hTZXJ2aWNlLFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBwcm92aWRlOiBSUE1TdGF0c1NlcnZpY2UsXG4gICAgICAgIC8vICAgICB1c2VGYWN0b3J5OiBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5LFxuICAgICAgICAvLyAgICAgZGVwczogWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogUlBNU2VydmljZSxcbiAgICAgICAgICAgIHVzZVZhbHVlOiBSUE1TZXJ2aWNlRmFjdG9yeSgpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IFRyYWNraW5nU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IFRyYWNraW5nU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiBbIFJQTVNlcnZpY2VdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNvbW1vbk1vZHVsZSB7fVxuIl19