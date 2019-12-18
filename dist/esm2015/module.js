import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule, MatButtonModule, MatIconModule, MatDialogModule } from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackingService } from '@geoplatform/client';
let trackingServiceInst;
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
const ɵ0 = RPMServiceFactory();
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
export { GeoPlatformCommonModule };
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGdlb3BsYXRmb3JtL2NvbW1vbi8iLCJzb3VyY2VzIjpbIm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQ0gsY0FBYyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUNsRSxNQUFNLG1CQUFtQixDQUFDO0FBQzNCLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFdEQsSUFBSSxtQkFBcUMsQ0FBQztBQUMxQyxNQUFNLFVBQVUsc0JBQXNCLENBQUcsR0FBZ0I7SUFDckQsSUFBRyxDQUFDLG1CQUFtQixFQUFFO1FBQ3JCLG1CQUFtQixHQUFHLElBQUksZUFBZSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDaEU7SUFDRCxPQUFPLG1CQUFtQixDQUFDO0FBQy9CLENBQUM7QUFHRCw2Q0FBNkM7QUFDN0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scURBQXFELENBQUM7QUFDeEYsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFhLGtDQUFrQyxDQUFBO0FBQ3BFLDhEQUE4RDtBQUM5RCx1REFBdUQ7QUFDdkQsaUZBQWlGO0FBQ2pGLElBQUk7QUFPSixPQUFPLEVBQUUsY0FBYyxFQUFFLG9CQUFvQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFN0QsT0FBTyxFQUNILHNCQUFzQixFQUN0QixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN6QixNQUFNLGNBQWMsQ0FBQztBQUV0QixPQUFPLEVBQ0gsZ0JBQWdCLEVBQ2hCLFdBQVcsRUFDWCxVQUFVLEVBQ1YsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDZixNQUFNLFNBQVMsQ0FBQztBQUNqQixPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUM3RCxPQUFPLEVBQ0gsWUFBWSxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZSxFQUNoRSxNQUFNLGFBQWEsQ0FBQztBQUNyQixPQUFPLEVBQUUsdUJBQXVCLEVBQUcsTUFBTSxpQkFBaUIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsVUFBVSxFQUFnQixNQUFNLGVBQWUsQ0FBQztXQTBEbkMsaUJBQWlCLEVBQUU7QUFhekMsSUFBYSx1QkFBdUIsR0FBcEMsTUFBYSx1QkFBdUI7Q0FBSSxDQUFBO0FBQTNCLHVCQUF1QjtJQXJFbkMsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFO1lBQ0wsWUFBWTtZQUNaLFlBQVk7WUFDWixXQUFXO1lBQ1gsY0FBYyxFQUFFLGVBQWUsRUFBRSxhQUFhLEVBQUUsZUFBZTtZQUMvRCxTQUFTO1NBQ1o7UUFDRCxPQUFPLEVBQUU7WUFDTCxnQkFBZ0I7WUFDaEIsYUFBYTtZQUNiLHNCQUFzQixFQUFFLGtCQUFrQjtZQUMxQyxzQkFBc0I7WUFDdEIscUJBQXFCO1lBQ3JCLG9CQUFvQixFQUFFLG1CQUFtQjtZQUV6QyxnQkFBZ0I7WUFDaEIsV0FBVztZQUNYLFVBQVU7WUFDVixnQkFBZ0I7WUFDaEIsWUFBWTtZQUVaLHdCQUF3QjtTQUMzQjtRQUNELFlBQVksRUFBRTtZQUNWLGdCQUFnQjtZQUNoQixhQUFhO1lBQ2Isc0JBQXNCLEVBQUUsa0JBQWtCO1lBQzFDLHNCQUFzQjtZQUN0QixxQkFBcUI7WUFDckIsb0JBQW9CLEVBQUUsbUJBQW1CO1lBRXpDLGdCQUFnQjtZQUNoQixXQUFXO1lBQ1gsVUFBVTtZQUNWLGdCQUFnQjtZQUNoQixZQUFZO1lBRVosd0JBQXdCO1NBQzNCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsY0FBYztZQUNkLGFBQWE7WUFDYixZQUFZO1lBQ1osZUFBZTtZQUNmLGVBQWU7WUFDZix1QkFBdUI7WUFDdkIsVUFBVTtZQUVWLElBQUk7WUFDSixnQ0FBZ0M7WUFDaEMsMENBQTBDO1lBQzFDLDJCQUEyQjtZQUMzQixLQUFLO1lBQ0w7Z0JBQ0ksT0FBTyxFQUFFLFVBQVU7Z0JBQ25CLFFBQVEsSUFBcUI7YUFDaEM7WUFDRDtnQkFDSSxPQUFPLEVBQUUsZUFBZTtnQkFDeEIsVUFBVSxFQUFFLHNCQUFzQjtnQkFDbEMsSUFBSSxFQUFFLENBQUUsVUFBVSxDQUFDO2FBQ3RCO1NBQ0o7UUFDRCxlQUFlLEVBQUU7WUFDYixnQkFBZ0I7WUFDaEIsYUFBYTtTQUNoQjtLQUNKLENBQUM7R0FDVyx1QkFBdUIsQ0FBSTtTQUEzQix1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7XG4gICAgTWF0SW5wdXRNb2R1bGUsIE1hdEJ1dHRvbk1vZHVsZSwgTWF0SWNvbk1vZHVsZSwgTWF0RGlhbG9nTW9kdWxlXG59IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsJztcbmltcG9ydCB7IE5nYk1vZHVsZSB9IGZyb20gJ0BuZy1ib290c3RyYXAvbmctYm9vdHN0cmFwJztcblxuaW1wb3J0IHsgVHJhY2tpbmdTZXJ2aWNlIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5cbmxldCB0cmFja2luZ1NlcnZpY2VJbnN0IDogVHJhY2tpbmdTZXJ2aWNlO1xuZXhwb3J0IGZ1bmN0aW9uIFRyYWNraW5nU2VydmljZUZhY3RvcnkgKCBycG0gOiBSUE1TZXJ2aWNlICkge1xuICAgIGlmKCF0cmFja2luZ1NlcnZpY2VJbnN0KSB7XG4gICAgICAgIHRyYWNraW5nU2VydmljZUluc3QgPSBuZXcgVHJhY2tpbmdTZXJ2aWNlKHsgcHJvdmlkZXI6IHJwbSB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRyYWNraW5nU2VydmljZUluc3Q7XG59XG5cblxuLy8gQWRkcyB3aW5kb3cuUlBNU2VydmljZSB0byBnbG9iYWwgbmFtZXNwYWNlXG5pbXBvcnQgeyBSUE1TZXJ2aWNlRmFjdG9yeSB9IGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vZGlzdC9qcy9nZW9wbGF0Zm9ybS5ycG0uYnJvd3Nlci5qcyc7XG5pbXBvcnQgeyBSUE1TZXJ2aWNlIH0gICAgICAgIGZyb20gJ0BnZW9wbGF0Zm9ybS9ycG0vc3JjL2lSUE1TZXJ2aWNlJ1xuLy8gaW1wb3J0IHsgUlBNU3RhdHNTZXJ2aWNlIH0gICBmcm9tICcuL3JwbS9ycG1zdGF0cy5zZXJ2aWNlJztcbi8vIGxldCBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5ID0gKGh0dHA6IEh0dHBDbGllbnQpID0+IHtcbi8vICAgICByZXR1cm4gbmV3IFJQTVN0YXRzU2VydmljZShlbnZpcm9ubWVudC5ycG1VcmwsIGVudmlyb25tZW50LnJwbVRva2VuLCBodHRwKVxuLy8gfVxuXG5cblxuXG5cblxuaW1wb3J0IHsgQXBwQXV0aFNlcnZpY2UsIExvZ2luQnV0dG9uQ29tcG9uZW50LCBMb2dpbk1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoJztcbmltcG9ydCB7IExpc3RTZWxlY3REaWFsb2csIE1lc3NhZ2VEaWFsb2cgfSBmcm9tICcuL2RpYWxvZ3MvJztcblxuaW1wb3J0IHtcbiAgICBJbWFnZUZhbGxiYWNrRGlyZWN0aXZlLFxuICAgIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICBSZXNvdXJjZUxpbmtDb21wb25lbnQsXG4gICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudFxufSBmcm9tICcuL2NvbXBvbmVudHMnO1xuXG5pbXBvcnQge1xuICAgIEFycmF5ZWRJdGVtc1BpcGUsXG4gICAgTGltaXRUb1BpcGUsXG4gICAgU29ydEJ5UGlwZSxcbiAgICBGcmllbmRseVR5cGVQaXBlLFxuICAgIEZpeExhYmVsUGlwZVxufSBmcm9tICcuL3BpcGVzJztcbmltcG9ydCB7IEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZSB9IGZyb20gJy4vZGlyZWN0aXZlcy9pY29uJztcbmltcG9ydCB7XG4gICAgSXRlbVJlc29sdmVyLCBOZXdJdGVtUmVzb2x2ZXIsIEVycm9yUmVzb2x2ZXIsIFZlcnNpb25SZXNvbHZlclxufSBmcm9tICcuL3Jlc29sdmVycyc7XG5pbXBvcnQgeyBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSAgfSBmcm9tICcuL2Vycm9yLnNlcnZpY2UnO1xuaW1wb3J0IHsgSXRlbUhlbHBlciAgICAgICAgICAgICAgIH0gZnJvbSAnLi9pdGVtLWhlbHBlcic7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgRm9ybXNNb2R1bGUsXG4gICAgICAgIE1hdElucHV0TW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIE1hdERpYWxvZ01vZHVsZSxcbiAgICAgICAgTmdiTW9kdWxlXG4gICAgXSxcbiAgICBleHBvcnRzOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2csXG4gICAgICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCxcblxuICAgICAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgICAgICBMaW1pdFRvUGlwZSxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICAgICAgRml4TGFiZWxQaXBlLFxuXG4gICAgICAgIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIExpc3RTZWxlY3REaWFsb2csXG4gICAgICAgIE1lc3NhZ2VEaWFsb2csXG4gICAgICAgIEltYWdlRmFsbGJhY2tEaXJlY3RpdmUsIFRodW1ibmFpbENvbXBvbmVudCxcbiAgICAgICAgU2VsZWN0ZWRJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgUmVzb3VyY2VMaW5rQ29tcG9uZW50LFxuICAgICAgICBMb2dpbkJ1dHRvbkNvbXBvbmVudCwgTG9naW5Nb2RhbENvbXBvbmVudCxcblxuICAgICAgICBBcnJheWVkSXRlbXNQaXBlLFxuICAgICAgICBMaW1pdFRvUGlwZSxcbiAgICAgICAgU29ydEJ5UGlwZSxcbiAgICAgICAgRnJpZW5kbHlUeXBlUGlwZSxcbiAgICAgICAgRml4TGFiZWxQaXBlLFxuXG4gICAgICAgIEdlb1BsYXRmb3JtSWNvbkRpcmVjdGl2ZVxuICAgIF0sXG4gICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEFwcEF1dGhTZXJ2aWNlLFxuICAgICAgICBFcnJvclJlc29sdmVyLFxuICAgICAgICBJdGVtUmVzb2x2ZXIsXG4gICAgICAgIE5ld0l0ZW1SZXNvbHZlcixcbiAgICAgICAgVmVyc2lvblJlc29sdmVyLFxuICAgICAgICBHZW9QbGF0Zm9ybUVycm9yU2VydmljZSxcbiAgICAgICAgSXRlbUhlbHBlcixcblxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICBwcm92aWRlOiBSUE1TdGF0c1NlcnZpY2UsXG4gICAgICAgIC8vICAgICB1c2VGYWN0b3J5OiBSUE1TdGF0c1NlcnZpY2VGYWN0b3J5LFxuICAgICAgICAvLyAgICAgZGVwczogWyBIdHRwQ2xpZW50IF1cbiAgICAgICAgLy8gfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcHJvdmlkZTogUlBNU2VydmljZSxcbiAgICAgICAgICAgIHVzZVZhbHVlOiBSUE1TZXJ2aWNlRmFjdG9yeSgpXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHByb3ZpZGU6IFRyYWNraW5nU2VydmljZSxcbiAgICAgICAgICAgIHVzZUZhY3Rvcnk6IFRyYWNraW5nU2VydmljZUZhY3RvcnksXG4gICAgICAgICAgICBkZXBzOiBbIFJQTVNlcnZpY2VdXG4gICAgICAgIH1cbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czogW1xuICAgICAgICBMaXN0U2VsZWN0RGlhbG9nLFxuICAgICAgICBNZXNzYWdlRGlhbG9nXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBHZW9QbGF0Zm9ybUNvbW1vbk1vZHVsZSB7IH1cbiJdfQ==