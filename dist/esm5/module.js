import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackingService } from '@geoplatform/client';
var trackingServiceInst;
export function TrackingServiceFactory(rpm) {
    if (!trackingServiceInst) {
        trackingServiceInst = new TrackingService({ provider: rpm });
    }
    return trackingServiceInst;
}
// Adds window.RPMService to global namespace
import { RPMServiceFactory } from '@geoplatform/rpm/dist/js/geoplatform.rpm.browser.js';
import { RPMService } from '@geoplatform/rpm/src/iRPMService';
// import { RPMStatsService }   from './rpm/rpmstats.service';
// let RPMStatsServiceFactory = (http: HttpClient) => {
//     return new RPMStatsService(environment.rpmUrl, environment.rpmToken, http)
// }
import { AppAuthService, LoginButtonComponent, LoginModalComponent } from './auth';
import { ListSelectDialog, MessageDialog } from './dialogs/';
import { ImageFallbackDirective, ThumbnailComponent, ResourceLinkComponent, SelectedItemsComponent } from './components';
import { ArrayedItemsPipe, LimitToPipe, SortByPipe, FriendlyTypePipe, FixLabelPipe } from './pipes';
import { GeoPlatformIconDirective } from './directives/icon';
import { ItemResolver, NewItemResolver, ErrorResolver, VersionResolver } from './resolvers';
import { GeoPlatformErrorService } from './error.service';
import { ItemHelper } from './item-helper';
var GeoPlatformCommonModule = /** @class */ (function () {
    function GeoPlatformCommonModule() {
    }
    GeoPlatformCommonModule_1 = GeoPlatformCommonModule;
    GeoPlatformCommonModule.forRoot = function () {
        return {
            ngModule: GeoPlatformCommonModule_1,
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
                    useValue: RPMServiceFactory()
                },
                {
                    provide: TrackingService,
                    useFactory: TrackingServiceFactory,
                    deps: [RPMService]
                }
            ]
        };
    };
    var GeoPlatformCommonModule_1;
    GeoPlatformCommonModule = GeoPlatformCommonModule_1 = tslib_1.__decorate([
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
            providers: [],
            entryComponents: [
                ListSelectDialog,
                MessageDialog
            ]
        })
    ], GeoPlatformCommonModule);
    return GeoPlatformCommonModule;
}());
export { GeoPlatformCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUNILGNBQWMsRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFDbEUsTUFBTSxtQkFBbUIsQ0FBQztBQUMzQixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXRELElBQUksbUJBQXFDLENBQUM7QUFDMUMsTUFBTSxVQUFVLHNCQUFzQixDQUFHLEdBQWdCO0lBQ3JELElBQUcsQ0FBQyxtQkFBbUIsRUFBRTtRQUNyQixtQkFBbUIsR0FBRyxJQUFJLGVBQWUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0tBQ2hFO0lBQ0QsT0FBTyxtQkFBbUIsQ0FBQztBQUMvQixDQUFDO0FBR0QsNkNBQTZDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHFEQUFxRCxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBYSxrQ0FBa0MsQ0FBQTtBQUNwRSw4REFBOEQ7QUFDOUQsdURBQXVEO0FBQ3ZELGlGQUFpRjtBQUNqRixJQUFJO0FBT0osT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFFBQVEsQ0FBQztBQUNuRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBRTdELE9BQU8sRUFDSCxzQkFBc0IsRUFDdEIsa0JBQWtCLEVBQ2xCLHFCQUFxQixFQUNyQixzQkFBc0IsRUFDekIsTUFBTSxjQUFjLENBQUM7QUFFdEIsT0FBTyxFQUNILGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixZQUFZLEVBQ2YsTUFBTSxTQUFTLENBQUM7QUFDakIsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDN0QsT0FBTyxFQUNILFlBQVksRUFBRSxlQUFlLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFDaEUsTUFBTSxhQUFhLENBQUM7QUFDckIsT0FBTyxFQUFFLHVCQUF1QixFQUFHLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFrRHpEO0lBQUE7SUErQkEsQ0FBQztnQ0EvQlksdUJBQXVCO0lBRXpCLCtCQUFPLEdBQWQ7UUFDSSxPQUFPO1lBQ0gsUUFBUSxFQUFFLHlCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1AsY0FBYztnQkFDZCxhQUFhO2dCQUNiLFlBQVk7Z0JBQ1osZUFBZTtnQkFDZixlQUFlO2dCQUNmLHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDVixJQUFJO2dCQUNKLGdDQUFnQztnQkFDaEMsMENBQTBDO2dCQUMxQywyQkFBMkI7Z0JBQzNCLEtBQUs7Z0JBQ0w7b0JBQ0ksT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFFBQVEsRUFBRSxpQkFBaUIsRUFBRTtpQkFDaEM7Z0JBQ0Q7b0JBQ0ksT0FBTyxFQUFFLGVBQWU7b0JBQ3hCLFVBQVUsRUFBRSxzQkFBc0I7b0JBQ2xDLElBQUksRUFBRSxDQUFFLFVBQVUsQ0FBQztpQkFDdEI7YUFDSjtTQUNKLENBQUM7SUFDTixDQUFDOztJQTdCUSx1QkFBdUI7UUFoRG5DLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxlQUFlO2dCQUMvRCxTQUFTO2FBQ1o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUNiLHNCQUFzQixFQUFFLGtCQUFrQjtnQkFDMUMsc0JBQXNCO2dCQUN0QixxQkFBcUI7Z0JBQ3JCLG9CQUFvQixFQUFFLG1CQUFtQjtnQkFFekMsZ0JBQWdCO2dCQUNoQixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsZ0JBQWdCO2dCQUNoQixZQUFZO2dCQUVaLHdCQUF3QjthQUMzQjtZQUNELFlBQVksRUFBRTtnQkFDVixnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2Isc0JBQXNCLEVBQUUsa0JBQWtCO2dCQUMxQyxzQkFBc0I7Z0JBQ3RCLHFCQUFxQjtnQkFDckIsb0JBQW9CLEVBQUUsbUJBQW1CO2dCQUV6QyxnQkFBZ0I7Z0JBQ2hCLFdBQVc7Z0JBQ1gsVUFBVTtnQkFDVixnQkFBZ0I7Z0JBQ2hCLFlBQVk7Z0JBRVosd0JBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFLEVBRVY7WUFDRCxlQUFlLEVBQUU7Z0JBQ2IsZ0JBQWdCO2dCQUNoQixhQUFhO2FBQ2hCO1NBQ0osQ0FBQztPQUNXLHVCQUF1QixDQStCbkM7SUFBRCw4QkFBQztDQUFBLEFBL0JELElBK0JDO1NBL0JZLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHtcbiAgICBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGVcbn0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwnO1xuaW1wb3J0IHsgTmdiTW9kdWxlIH0gZnJvbSAnQG5nLWJvb3RzdHJhcC9uZy1ib290c3RyYXAnO1xuXG5pbXBvcnQgeyBUcmFja2luZ1NlcnZpY2UgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcblxubGV0IHRyYWNraW5nU2VydmljZUluc3QgOiBUcmFja2luZ1NlcnZpY2U7XG5leHBvcnQgZnVuY3Rpb24gVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeSAoIHJwbSA6IFJQTVNlcnZpY2UgKSB7XG4gICAgaWYoIXRyYWNraW5nU2VydmljZUluc3QpIHtcbiAgICAgICAgdHJhY2tpbmdTZXJ2aWNlSW5zdCA9IG5ldyBUcmFja2luZ1NlcnZpY2UoeyBwcm92aWRlcjogcnBtIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJhY2tpbmdTZXJ2aWNlSW5zdDtcbn1cblxuXG4vLyBBZGRzIHdpbmRvdy5SUE1TZXJ2aWNlIHRvIGdsb2JhbCBuYW1lc3BhY2VcbmltcG9ydCB7IFJQTVNlcnZpY2VGYWN0b3J5IH0gZnJvbSAnQGdlb3BsYXRmb3JtL3JwbS9kaXN0L2pzL2dlb3BsYXRmb3JtLnJwbS5icm93c2VyLmpzJztcbmltcG9ydCB7IFJQTVNlcnZpY2UgfSAgICAgICAgZnJvbSAnQGdlb3BsYXRmb3JtL3JwbS9zcmMvaVJQTVNlcnZpY2UnXG4vLyBpbXBvcnQgeyBSUE1TdGF0c1NlcnZpY2UgfSAgIGZyb20gJy4vcnBtL3JwbXN0YXRzLnNlcnZpY2UnO1xuLy8gbGV0IFJQTVN0YXRzU2VydmljZUZhY3RvcnkgPSAoaHR0cDogSHR0cENsaWVudCkgPT4ge1xuLy8gICAgIHJldHVybiBuZXcgUlBNU3RhdHNTZXJ2aWNlKGVudmlyb25tZW50LnJwbVVybCwgZW52aXJvbm1lbnQucnBtVG9rZW4sIGh0dHApXG4vLyB9XG5cblxuXG5cblxuXG5pbXBvcnQgeyBBcHBBdXRoU2VydmljZSwgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL2F1dGgnO1xuaW1wb3J0IHsgTGlzdFNlbGVjdERpYWxvZywgTWVzc2FnZURpYWxvZyB9IGZyb20gJy4vZGlhbG9ncy8nO1xuXG5pbXBvcnQge1xuICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsXG4gICAgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50XG59IGZyb20gJy4vY29tcG9uZW50cyc7XG5cbmltcG9ydCB7XG4gICAgQXJyYXllZEl0ZW1zUGlwZSxcbiAgICBMaW1pdFRvUGlwZSxcbiAgICBTb3J0QnlQaXBlLFxuICAgIEZyaWVuZGx5VHlwZVBpcGUsXG4gICAgRml4TGFiZWxQaXBlXG59IGZyb20gJy4vcGlwZXMnO1xuaW1wb3J0IHsgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmVzL2ljb24nO1xuaW1wb3J0IHtcbiAgICBJdGVtUmVzb2x2ZXIsIE5ld0l0ZW1SZXNvbHZlciwgRXJyb3JSZXNvbHZlciwgVmVyc2lvblJlc29sdmVyXG59IGZyb20gJy4vcmVzb2x2ZXJzJztcbmltcG9ydCB7IEdlb1BsYXRmb3JtRXJyb3JTZXJ2aWNlICB9IGZyb20gJy4vZXJyb3Iuc2VydmljZSc7XG5pbXBvcnQgeyBJdGVtSGVscGVyICAgICAgICAgICAgICAgfSBmcm9tICcuL2l0ZW0taGVscGVyJztcblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIFJvdXRlck1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBGb3Jtc01vZHVsZSxcbiAgICAgICAgTWF0SW5wdXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlLFxuICAgICAgICBOZ2JNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgTGlzdFNlbGVjdERpYWxvZyxcbiAgICAgICAgTWVzc2FnZURpYWxvZyxcbiAgICAgICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSwgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgICAgIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgTGlzdFNlbGVjdERpYWxvZyxcbiAgICAgICAgTWVzc2FnZURpYWxvZyxcbiAgICAgICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSwgVGh1bWJuYWlsQ29tcG9uZW50LFxuICAgICAgICBTZWxlY3RlZEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgICAgIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50LFxuXG4gICAgICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgICAgIExpbWl0VG9QaXBlLFxuICAgICAgICBTb3J0QnlQaXBlLFxuICAgICAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgICAgICBGaXhMYWJlbFBpcGUsXG5cbiAgICAgICAgR2VvUGxhdGZvcm1JY29uRGlyZWN0aXZlXG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcblxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2dcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb1BsYXRmb3JtQ29tbW9uTW9kdWxlIHtcblxuICAgIHN0YXRpYyBmb3JSb290KCk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmdNb2R1bGU6IEdlb1BsYXRmb3JtQ29tbW9uTW9kdWxlLFxuICAgICAgICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgICAgICAgICAgQXBwQXV0aFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgRXJyb3JSZXNvbHZlcixcbiAgICAgICAgICAgICAgICBJdGVtUmVzb2x2ZXIsXG4gICAgICAgICAgICAgICAgTmV3SXRlbVJlc29sdmVyLFxuICAgICAgICAgICAgICAgIFZlcnNpb25SZXNvbHZlcixcbiAgICAgICAgICAgICAgICBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSxcbiAgICAgICAgICAgICAgICBJdGVtSGVscGVyLFxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgcHJvdmlkZTogUlBNU3RhdHNTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIC8vICAgICB1c2VGYWN0b3J5OiBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5LFxuICAgICAgICAgICAgICAgIC8vICAgICBkZXBzOiBbIEh0dHBDbGllbnQgXVxuICAgICAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBSUE1TZXJ2aWNlLFxuICAgICAgICAgICAgICAgICAgICB1c2VWYWx1ZTogUlBNU2VydmljZUZhY3RvcnkoKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBwcm92aWRlOiBUcmFja2luZ1NlcnZpY2UsXG4gICAgICAgICAgICAgICAgICAgIHVzZUZhY3Rvcnk6IFRyYWNraW5nU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgICAgICAgICAgIGRlcHM6IFsgUlBNU2VydmljZV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfVxuXG59XG4iXX0=