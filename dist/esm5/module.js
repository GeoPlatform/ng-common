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
import { ErrorService } from './error.service';
import { ItemHelper } from './item-helper';
var ɵ0 = RPMServiceFactory();
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
                ErrorService,
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
                    useFactory: TrackingServiceFactory,
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
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0gsY0FBYyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUNsRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsSUFBSSxtQkFBcUMsQ0FBQztBQUMxQyxNQUFNLFVBQVUsc0JBQXNCLENBQUcsR0FBZ0I7SUFDckQsSUFBRyxDQUFDLG1CQUFtQixFQUFFO1FBQ3JCLG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFDRCxPQUFPLG1CQUFtQixDQUFDO0FBQy9CLENBQUM7QUFHRCw2Q0FBNkM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFhLGtDQUFrQyxDQUFBO0FBQ3BFLDhEQUE4RDtBQUM5RCx1REFBdUQ7QUFDdkQsaUZBQWlGO0FBQ2pGLElBQUk7QUFPSixPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUNILHNCQUFzQixFQUN0QixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN6QixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDZixNQUFNLFNBQVMsQ0FBQztBQUNqQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQ0gsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUNoRSxNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsWUFBWSxFQUFjLE1BQU0saUJBQWlCLENBQUM7QUFDM0QsT0FBTyxFQUFFLFVBQVUsRUFBZ0IsTUFBTSxlQUFlLENBQUM7U0EwRG5DLGlCQUFpQixFQUFFO0FBYXpDO0lBQUE7SUFBdUMsQ0FBQztJQUEzQix1QkFBdUI7UUFyRW5DLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRTtnQkFDTCxZQUFZO2dCQUNaLFlBQVk7Z0JBQ1osV0FBVztnQkFDWCxjQUFjLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxlQUFlO2dCQUMvRCxTQUFTO2FBQ1o7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsZ0JBQWdCO2dCQUNoQixhQUFhO2dCQUNiLHNCQUFzQixFQUFFLGtCQUFrQjtnQkFDMUMsc0JBQXNCO2dCQUN0QixxQkFBcUI7Z0JBQ3JCLG9CQUFvQixFQUFFLG1CQUFtQjtnQkFFekMsZ0JBQWdCO2dCQUNoQixXQUFXO2dCQUNYLFVBQVU7Z0JBQ1YsZ0JBQWdCO2dCQUNoQixZQUFZO2dCQUVaLHdCQUF3QjthQUMzQjtZQUNELFlBQVksRUFBRTtnQkFDVixnQkFBZ0I7Z0JBQ2hCLGFBQWE7Z0JBQ2Isc0JBQXNCLEVBQUUsa0JBQWtCO2dCQUMxQyxzQkFBc0I7Z0JBQ3RCLHFCQUFxQjtnQkFDckIsb0JBQW9CLEVBQUUsbUJBQW1CO2dCQUV6QyxnQkFBZ0I7Z0JBQ2hCLFdBQVc7Z0JBQ1gsVUFBVTtnQkFDVixnQkFBZ0I7Z0JBQ2hCLFlBQVk7Z0JBRVosd0JBQXdCO2FBQzNCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixZQUFZO2dCQUNaLGVBQWU7Z0JBQ2YsZUFBZTtnQkFDZixZQUFZO2dCQUNaLFVBQVU7Z0JBRVYsSUFBSTtnQkFDSixnQ0FBZ0M7Z0JBQ2hDLDBDQUEwQztnQkFDMUMsMkJBQTJCO2dCQUMzQixLQUFLO2dCQUNMO29CQUNJLE9BQU8sRUFBRSxVQUFVO29CQUNuQixRQUFRLElBQXFCO2lCQUNoQztnQkFDRDtvQkFDSSxPQUFPLEVBQUUsZUFBZTtvQkFDeEIsVUFBVSxFQUFFLHNCQUFzQjtvQkFDbEMsSUFBSSxFQUFFLENBQUUsVUFBVSxDQUFDO2lCQUN0QjthQUNKO1lBQ0QsZUFBZSxFQUFFO2dCQUNiLGdCQUFnQjtnQkFDaEIsYUFBYTthQUNoQjtTQUNKLENBQUM7T0FDVyx1QkFBdUIsQ0FBSTtJQUFELDhCQUFDO0NBQUEsQUFBeEMsSUFBd0M7U0FBM0IsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IFJvdXRlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5pbXBvcnQge1xuICAgIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZVxufSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbCc7XG5pbXBvcnQgeyBOZ2JNb2R1bGUgfSBmcm9tICdAbmctYm9vdHN0cmFwL25nLWJvb3RzdHJhcCc7XG5cbmltcG9ydCB7IFRyYWNraW5nU2VydmljZSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9jbGllbnQnO1xuXG5sZXQgdHJhY2tpbmdTZXJ2aWNlSW5zdCA6IFRyYWNraW5nU2VydmljZTtcbmV4cG9ydCBmdW5jdGlvbiBUcmFja2luZ1NlcnZpY2VGYWN0b3J5ICggcnBtIDogUlBNU2VydmljZSApIHtcbiAgICBpZighdHJhY2tpbmdTZXJ2aWNlSW5zdCkge1xuICAgICAgICB0cmFja2luZ1NlcnZpY2VJbnN0ID0gbmV3IFRyYWNraW5nU2VydmljZSh7IHByb3ZpZGVyOiBycG0gfSk7XG4gICAgfVxuICAgIHJldHVybiB0cmFja2luZ1NlcnZpY2VJbnN0O1xufVxuXG5cbi8vIEFkZHMgd2luZG93LlJQTVNlcnZpY2UgdG8gZ2xvYmFsIG5hbWVzcGFjZVxuaW1wb3J0IHsgUlBNU2VydmljZUZhY3RvcnkgfSBmcm9tICdAZ2VvcGxhdGZvcm0vcnBtL2Rpc3QvanMvZ2VvcGxhdGZvcm0ucnBtLmJyb3dzZXIuanMnO1xuaW1wb3J0IHsgUlBNU2VydmljZSB9ICAgICAgICBmcm9tICdAZ2VvcGxhdGZvcm0vcnBtL3NyYy9pUlBNU2VydmljZSdcbi8vIGltcG9ydCB7IFJQTVN0YXRzU2VydmljZSB9ICAgZnJvbSAnLi9ycG0vcnBtc3RhdHMuc2VydmljZSc7XG4vLyBsZXQgUlBNU3RhdHNTZXJ2aWNlRmFjdG9yeSA9IChodHRwOiBIdHRwQ2xpZW50KSA9PiB7XG4vLyAgICAgcmV0dXJuIG5ldyBSUE1TdGF0c1NlcnZpY2UoZW52aXJvbm1lbnQucnBtVXJsLCBlbnZpcm9ubWVudC5ycG1Ub2tlbiwgaHR0cClcbi8vIH1cblxuXG5cblxuXG5cbmltcG9ydCB7IEFwcEF1dGhTZXJ2aWNlLCBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCB9IGZyb20gJy4vYXV0aCc7XG5pbXBvcnQgeyBMaXN0U2VsZWN0RGlhbG9nLCBNZXNzYWdlRGlhbG9nIH0gZnJvbSAnLi9kaWFsb2dzLyc7XG5cbmltcG9ydCB7XG4gICAgSW1hZ2VGYWxsYmFja0RpcmVjdGl2ZSxcbiAgICBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnRcbn0gZnJvbSAnLi9jb21wb25lbnRzJztcblxuaW1wb3J0IHtcbiAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgIExpbWl0VG9QaXBlLFxuICAgIFNvcnRCeVBpcGUsXG4gICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICBGaXhMYWJlbFBpcGVcbn0gZnJvbSAnLi9waXBlcyc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZXMvaWNvbic7XG5pbXBvcnQge1xuICAgIEl0ZW1SZXNvbHZlciwgTmV3SXRlbVJlc29sdmVyLCBFcnJvclJlc29sdmVyLCBWZXJzaW9uUmVzb2x2ZXJcbn0gZnJvbSAnLi9yZXNvbHZlcnMnO1xuaW1wb3J0IHsgRXJyb3JTZXJ2aWNlICAgICAgICAgICAgIH0gZnJvbSAnLi9lcnJvci5zZXJ2aWNlJztcbmltcG9ydCB7IEl0ZW1IZWxwZXIgICAgICAgICAgICAgICB9IGZyb20gJy4vaXRlbS1oZWxwZXInO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBNYXRJbnB1dE1vZHVsZSwgTWF0QnV0dG9uTW9kdWxlLCBNYXRJY29uTW9kdWxlLCBNYXREaWFsb2dNb2R1bGUsXG4gICAgICAgIE5nYk1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nLFxuICAgICAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLCBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICAgICAgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQsXG5cbiAgICAgICAgQXJyYXllZEl0ZW1zUGlwZSxcbiAgICAgICAgTGltaXRUb1BpcGUsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEZyaWVuZGx5VHlwZVBpcGUsXG4gICAgICAgIEZpeExhYmVsUGlwZSxcblxuICAgICAgICBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nLFxuICAgICAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLCBUaHVtYm5haWxDb21wb25lbnQsXG4gICAgICAgIFNlbGVjdGVkSXRlbXNDb21wb25lbnQsXG4gICAgICAgIFJlc291cmNlTGlua0NvbXBvbmVudCxcbiAgICAgICAgTG9naW5CdXR0b25Db21wb25lbnQsIExvZ2luTW9kYWxDb21wb25lbnQsXG5cbiAgICAgICAgQXJyYXllZEl0ZW1zUGlwZSxcbiAgICAgICAgTGltaXRUb1BpcGUsXG4gICAgICAgIFNvcnRCeVBpcGUsXG4gICAgICAgIEZyaWVuZGx5VHlwZVBpcGUsXG4gICAgICAgIEZpeExhYmVsUGlwZSxcblxuICAgICAgICBHZW9QbGF0Zm9ybUljb25EaXJlY3RpdmVcbiAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBBcHBBdXRoU2VydmljZSxcbiAgICAgICAgRXJyb3JSZXNvbHZlcixcbiAgICAgICAgSXRlbVJlc29sdmVyLFxuICAgICAgICBOZXdJdGVtUmVzb2x2ZXIsXG4gICAgICAgIFZlcnNpb25SZXNvbHZlcixcbiAgICAgICAgRXJyb3JTZXJ2aWNlLFxuICAgICAgICBJdGVtSGVscGVyLFxuXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHByb3ZpZGU6IFJQTVN0YXRzU2VydmljZSxcbiAgICAgICAgLy8gICAgIHVzZUZhY3Rvcnk6IFJQTVN0YXRzU2VydmljZUZhY3RvcnksXG4gICAgICAgIC8vICAgICBkZXBzOiBbIEh0dHBDbGllbnQgXVxuICAgICAgICAvLyB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBwcm92aWRlOiBSUE1TZXJ2aWNlLFxuICAgICAgICAgICAgdXNlVmFsdWU6IFJQTVNlcnZpY2VGYWN0b3J5KClcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogVHJhY2tpbmdTZXJ2aWNlLFxuICAgICAgICAgICAgdXNlRmFjdG9yeTogVHJhY2tpbmdTZXJ2aWNlRmFjdG9yeSxcbiAgICAgICAgICAgIGRlcHM6IFsgUlBNU2VydmljZV1cbiAgICAgICAgfVxuICAgIF0sXG4gICAgZW50cnlDb21wb25lbnRzOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2dcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEdlb1BsYXRmb3JtQ29tbW9uTW9kdWxlIHsgfVxuIl19