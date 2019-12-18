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
import { ImageFallbackDirective, ThumbnailComponent, ResourceLinkComponent, SelectedItemsComponent } from './components';
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
                GeoPlatformErrorService,
                ItemHelper,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFDbEUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHdkQsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBYSxrQ0FBa0MsQ0FBQTtBQUNwRSw4REFBOEQ7QUFDOUQsdURBQXVEO0FBQ3ZELGlGQUFpRjtBQUNqRixJQUFJO0FBR0osT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRzVELE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxRQUFRLENBQUM7QUFDbkYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUU3RCxPQUFPLEVBQ0gsc0JBQXNCLEVBQ3RCLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsc0JBQXNCLEVBQ3pCLE1BQU0sY0FBYyxDQUFDO0FBRXRCLE9BQU8sRUFDSCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUNYLFVBQVUsRUFDVixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNmLE1BQU0sU0FBUyxDQUFDO0FBQ2pCLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQzdELE9BQU8sRUFDSCxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQ2hFLE1BQU0sYUFBYSxDQUFDO0FBQ3JCLE9BQU8sRUFBRSx1QkFBdUIsRUFBRyxNQUFNLGlCQUFpQixDQUFDO0FBQzNELE9BQU8sRUFBRSxVQUFVLEVBQWdCLE1BQU0sZUFBZSxDQUFDO1NBeURuQyxpQkFBaUIsRUFBRSxPQUlqQixzQkFBc0I7QUFTOUM7SUFBQTtJQUFzQyxDQUFDO0lBQTFCLHVCQUF1QjtRQXBFbkMsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFO2dCQUNMLFlBQVk7Z0JBQ1osWUFBWTtnQkFDWixXQUFXO2dCQUNYLGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWU7Z0JBQy9ELFNBQVM7YUFDWjtZQUNELE9BQU8sRUFBRTtnQkFDTCxnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2Isc0JBQXNCLEVBQUUsa0JBQWtCO2dCQUMxQyxzQkFBc0I7Z0JBQ3RCLHFCQUFxQjtnQkFDckIsb0JBQW9CLEVBQUUsbUJBQW1CO2dCQUV6QyxnQkFBZ0I7Z0JBQ2hCLFdBQVc7Z0JBQ1gsVUFBVTtnQkFDVixnQkFBZ0I7Z0JBQ2hCLFlBQVk7Z0JBRVosd0JBQXdCO2FBQzNCO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLGdCQUFnQjtnQkFDaEIsYUFBYTtnQkFDYixzQkFBc0IsRUFBRSxrQkFBa0I7Z0JBQzFDLHNCQUFzQjtnQkFDdEIscUJBQXFCO2dCQUNyQixvQkFBb0IsRUFBRSxtQkFBbUI7Z0JBRXpDLGdCQUFnQjtnQkFDaEIsV0FBVztnQkFDWCxVQUFVO2dCQUNWLGdCQUFnQjtnQkFDaEIsWUFBWTtnQkFFWix3QkFBd0I7YUFDM0I7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFlBQVk7Z0JBQ1osZUFBZTtnQkFDZixlQUFlO2dCQUNmLHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDVixJQUFJO2dCQUNKLGdDQUFnQztnQkFDaEMsMENBQTBDO2dCQUMxQywyQkFBMkI7Z0JBQzNCLEtBQUs7Z0JBQ0w7b0JBQ0ksT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFFBQVEsSUFBcUI7aUJBQ2hDO2dCQUNEO29CQUNJLE9BQU8sRUFBRSxlQUFlO29CQUN4QixVQUFVLElBQXdCO29CQUNsQyxJQUFJLEVBQUUsQ0FBRSxVQUFVLENBQUM7aUJBQ3RCO2FBQ0o7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsZ0JBQWdCO2dCQUNoQixhQUFhO2FBQ2hCO1NBQ0osQ0FBQztPQUNXLHVCQUF1QixDQUFHO0lBQUQsOEJBQUM7Q0FBQSxBQUF2QyxJQUF1QztTQUExQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gICAgTWF0SW5wdXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuXG4vLyBBZGRzIHdpbmRvdy5SUE1TZXJ2aWNlIHRvIGdsb2JhbCBuYW1lc3BhY2VcbmltcG9ydCB7IFJQTVNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnQGdlb3BsYXRmb3JtL3JwbS9kaXN0L2pzL2dlb3BsYXRmb3JtLnJwbS5icm93c2VyLmpzJztcbmltcG9ydCB7IFJQTVNlcnZpY2UgfSAgICAgICAgZnJvbSAnQGdlb3BsYXRmb3JtL3JwbS9zcmMvaVJQTVNlcnZpY2UnXG4vLyBpbXBvcnQgeyBSUE1TdGF0c1NlcnZpY2UgfSAgIGZyb20gJy4vcnBtL3JwbXN0YXRzLnNlcnZpY2UnO1xuLy8gbGV0IFJQTVN0YXRzU2VydmljZUZhY3RvcnkgPSAoaHR0cDogSHR0cENsaWVudCkgPT4ge1xuLy8gICAgIHJldHVybiBuZXcgUlBNU3RhdHNTZXJ2aWNlKGVudmlyb25tZW50LnJwbVVybCwgZW52aXJvbm1lbnQucnBtVG9rZW4sIGh0dHApXG4vLyB9XG5cblxuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBUcmFja2luZ1NlcnZpY2VGYWN0b3J5IH0gZnJvbSAnLi90cmFja2luZy5mYWN0b3J5JztcblxuXG5pbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdERpYWxvZywgTWVzc2FnZURpYWxvZyB9IGZyb20gJy4vZGlhbG9ncy8nO1xuXG5pbXBvcnQge1xuICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsXG4gICAgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50XG59IGZyb20gJy4vY29tcG9uZW50cyc7XG5cbmltcG9ydCB7XG4gICAgQXJyYXllZEl0ZW1zUGlwZSxcbiAgICBMaW1pdFRvUGlwZSxcbiAgICBTb3J0QnlQaXBlLFxuICAgIEZyaWVuZGx5VHlwZVBpcGUsXG4gICAgRml4TGFiZWxQaXBlXG59IGZyb20gJy4vcGlwZXMnO1xuaW1wb3J0IHsgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ljb24nO1xuaW1wb3J0IHtcbiAgICBJdGVtUmVzb2x2ZXIsIE5ld0l0ZW1SZXNvbHZlciwgRXJyb3JSZXNvbHZlciwgVmVyc2lvblJlc29sdmVyXG59IGZyb20gJy4vcmVzb2x2ZXJzJztcbmltcG9ydCB7IEdlb1BsYXRmb3JtRXJyb3JTZXJ2aWNlICB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBJdGVtSGVscGVyICAgICAgICAgICAgICAgfSBmcm9tICcuL2l0ZW0taGVscGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlLFxuICAgICAgICBOZ2JNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTGlzdFNlbGVjdERpYWxvZyxcbiAgICAgICAgTWVzc2FnZURpYWxvZyxcbiAgICAgICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSwgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgICAgIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTGlzdFNlbGVjdERpYWxvZyxcbiAgICAgICAgTWVzc2FnZURpYWxvZyxcbiAgICAgICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSwgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgICAgIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQXBwQXV0aFNlcnZpY2UsXG4gICAgICAgIEVycm9yUmVzb2x2ZXIsXG4gICAgICAgIEl0ZW1SZXNvbHZlcixcbiAgICAgICAgTmV3SXRlbVJlc29sdmVyLFxuICAgICAgICBWZXJzaW9uUmVzb2x2ZXIsXG4gICAgICAgIEdlb1BsYXRmb3JtRXJyb3JTZXJ2aWNlLFxuICAgICAgICBJdGVtSGVscGVyLFxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBwcm92aWRlOiBSUE1TdGF0c1NlcnZpY2UsXG4gICAgICAgIC8vICAgICB1c2VGYWN0b3J5OiBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5LFxuICAgICAgICAvLyAgICAgZGVwczogWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogUlBNU2VydmljZSxcbiAgICAgICAgICAgIHVzZVZhbHVlOiBSUE1TZXJ2aWNlRmFjdG9yeSgpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IFRyYWNraW5nU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IFRyYWNraW5nU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiBbIFJQTVNlcnZpY2VdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNvbW1vbk1vZHVsZSB7fVxuIl19