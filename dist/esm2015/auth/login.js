import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Config } from '@geoplatform/client';
import { AuthenticatedComponent } from './authenticated.component';
import { AppAuthService } from './auth.service';
import { logger } from '../logger';
let LoginButtonComponent = class LoginButtonComponent extends AuthenticatedComponent {
    constructor(authService) {
        super(authService);
        this.idpBaseUrl = Config.IDP_BASE_URL || 'https://accounts.geoplatform.gov';
        this.user = null;
    }
    ngOnInit() {
        super.ngOnInit();
        // this.authService.check();
    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }
    onUserChange(user) {
        super.onUserChange(user);
        logger.debug("LoginButton.onUserChange() : User is " + (user ? user.username : 'null'));
        this.user = user;
    }
    login() {
        this.authService.login();
    }
    logout() {
        this.authService.logout();
    }
};
LoginButtonComponent.ctorParameters = () => [
    { type: AppAuthService }
];
LoginButtonComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-login-button',
        template: `
    <div class="btn-account btn-group">
        <!-- not logged in yet -->
        <a class="btn-login btn btn-link" (click)="login()" *ngIf="!user">Sign In</a>

        <!-- logged in -->
        <button type="button" class="btn-login btn btn-link dropdown-toggle" data-toggle="dropdown"
            aria-expanded="false" *ngIf="user">
            <span class="fas fa-user"></span>
            <span class="d-xs-none">{{user?.name}}</span>
            <span class="caret"></span>
        </button>
        <div class="dropdown-menu dropdown-menu-right" role="menu" *ngIf="user">
            <div class="o-account-details">
                <div class="o-account-details__avatar">
                    <span class="fas fa-user"></span>
                </div>
                <div class="flex-1">
                    <div class="a-heading">
                        {{user?.name}}
                        <small><em>({{user?.username}})</em></small>
                    </div>
                    <div class="u-text--sm">{{user?.email}}</div>
                    <div class="u-text--sm">{{user?.org}}</div>
                </div>
            </div>
            <div class="d-flex flex-justify-around u-mg-top--sm">
                <a class="btn btn-sm btn-link" target="_blank" href="{{idpBaseUrl}}/profile">
                    <span class="fas fa-pencil-alt"></span> Edit Profile
                </a>
                <a class="btn btn-sm btn-link" target="_blank" href="{{idpBaseUrl}}/updatepw">
                    <span class="fas fa-key"></span> Change Password
                </a>
            </div>
            <div class="u-mg-top--sm">
                <a class="btn-logout btn btn-light btn-block" (click)="logout()">
                    <span class="fas fa-power-off"></span> Sign Out
                </a>
            </div>
        </div>
    </div>
    `,
        styles: [`
        .btn-login.btn-link {
            padding: .375em .75em;
            border-right: none;
            margin: 0 0.5em;
            font-weight: 700;
        }
        .btn-login.btn-link:hover {
            background-color: #fff;
            text-decoration: none;
            color: #333;
        }
        .o-account-details {
            display: flex;
            justify-content: space-between;
            align-items: stretch;
            margin-top: -0.5em;
            padding: 1em;
            background: #185b8a;
            color: #fff;
        }
        .o-account-details__avatar {
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 6em;
            margin-right: 0.25em;
            padding-top: 10px;
            width: 100px;
            height: 100px;
            overflow: hidden;
            background: #fff;
            color: #777;
            border-radius: 100%;
        }
        .dropdown-menu .btn.btn-link {
            display: inline-block;
            padding: 0.375rem 0.75rem;
            border-right: none;
        }
        .dropdown-menu .btn.btn-link:after {
            content: '';
        }
        .btn.btn-logout {
            padding: 0.375rem 0.75rem;
            margin-bottom: -0.5em;
        }
        `]
    })
], LoginButtonComponent);
export { LoginButtonComponent };
let LoginModalComponent = class LoginModalComponent {
    constructor(authService) {
        this.authService = authService;
        this.showLoginModal = false;
        this.forceLogin = Config.FORCE_LOGIN;
    }
    ngOnInit() {
        if (!this.authService)
            return;
        this.authService.getMessenger().subscribe(msg => {
            logger.debug("LoginModal received auth message: " + msg.name);
            switch (msg.name) {
                case 'auth:requireLogin':
                    this.showLoginModal = true; //show the modal
                    break;
                case 'userAuthenticated':
                case 'iframe:userAuthenticated':
                    this.showLoginModal = false; //hide the modal
                    this.authService.onUserChange(msg.user);
                    break;
            }
        });
    }
    ngOnDestroy() {
        this.showLoginModal = false;
    }
    cancel() {
        //hide the modal
        this.showLoginModal = false;
    }
};
LoginModalComponent.ctorParameters = () => [
    { type: AppAuthService }
];
LoginModalComponent = tslib_1.__decorate([
    Component({
        selector: 'gp-login-modal',
        template: "<div class=\"gpLoginCover\" *ngIf=\"showLoginModal\">\n    <button class=\"btn btn-danger gpLoginCancelIframe pull-right\" *ngIf=\"!forceLogin\" (click)=\"cancel()\">\n        <span class=\"fas fa-times-circle\"></span> Cancel\n    </button>\n    <div class=\"gpLoginWindow\" *ngIf=\"showLoginModal\">\n        <iframe id=\"gpLoginIFrame\" src=\"/login?redirect_url=${encodeURIComponent(`${window.location.origin}/auth/loading?cachebuster=${(new Date()).getTime()}`)}&cachebuster=${(new Date()).getTime()}\"></iframe>\n    </div>\n</div>\n",
        styles: [`
        .gpLoginCover {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0,0,0,0.6);
            z-index: 5000;
            width: 100vw;
            height: 100vh;
        }

        .gpLoginCancelIframe {
          z-index: 5001;
          position: absolute;
          right: 0px;
        }

        .gpLoginWindow {
          top: 100px;
          height: 60%;
          width: 75%;
          margin: 0 auto;
          position: relative;
          z-index: 5001;
        	border: 5px solid #cccccc;
          border-radius: 10px;
        }

        .gpLoginWindow iframe {
          width: 100%;
          height: 100%
        }

        .gpLoginWindow .btn-cancel {
          color: white;
          background-color: red;
        }

        .gpLoginWindow .btn {
          display: inline-block;
          padding: 6px 12px;
          margin-bottom: 0;
          font-size: 14px;
          font-weight: 400;
          line-height: 1.42857143;
          text-align: center;
          white-space: nowrap;
          vertical-align: middle;
          -ms-touch-action: manipulation;
          touch-action: manipulation;
          cursor: pointer;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          background-image: none;
          border: 1px solid transparent;
          border-radius: 4px;
        }
    `]
    })
], LoginModalComponent);
export { LoginModalComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiYXV0aC9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNoRCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDO0FBb0duQyxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLHNCQUFzQjtJQUs1RCxZQUFhLFdBQTRCO1FBQ3JDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUpoQixlQUFVLEdBQVksTUFBTSxDQUFDLFlBQVksSUFBSSxrQ0FBa0MsQ0FBQztRQUNoRixTQUFJLEdBQXNCLElBQUksQ0FBQztJQUl0QyxDQUFDO0lBRUQsUUFBUTtRQUNKLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUVqQiw0QkFBNEI7SUFDaEMsQ0FBQztJQUVELFdBQVc7UUFDUCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELFlBQVksQ0FBQyxJQUFzQjtRQUMvQixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxLQUFLLENBQUMsdUNBQXVDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM5QixDQUFDO0NBRUosQ0FBQTs7WUE1QjhCLGNBQWM7O0FBTGhDLG9CQUFvQjtJQWpHaEMsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGlCQUFpQjtRQW1EM0IsUUFBUSxFQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlDQztpQkEzRkc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBK0NDO0tBOENSLENBQUM7R0FDVyxvQkFBb0IsQ0FpQ2hDO1NBakNZLG9CQUFvQjtBQWdIakMsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBbUI7SUFLNUIsWUFBb0IsV0FBNEI7UUFBNUIsZ0JBQVcsR0FBWCxXQUFXLENBQWlCO1FBSHpDLG1CQUFjLEdBQWEsS0FBSyxDQUFDO1FBQ2pDLGVBQVUsR0FBYSxNQUFNLENBQUMsV0FBVyxDQUFDO0lBSWpELENBQUM7SUFFRCxRQUFRO1FBQ0osSUFBRyxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQUUsT0FBTztRQUU3QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUM1QyxNQUFNLENBQUMsS0FBSyxDQUFDLG9DQUFvQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5RCxRQUFPLEdBQUcsQ0FBQyxJQUFJLEVBQUM7Z0JBQ1osS0FBSyxtQkFBbUI7b0JBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLENBQUcsZ0JBQWdCO29CQUM5QyxNQUFNO2dCQUVWLEtBQUssbUJBQW1CLENBQUM7Z0JBQ3pCLEtBQUssMEJBQTBCO29CQUMzQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxDQUFFLGdCQUFnQjtvQkFDOUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QyxNQUFNO2FBQ2I7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxXQUFXO1FBQ1AsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztJQUVELE1BQU07UUFDRixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7SUFDaEMsQ0FBQztDQUVKLENBQUE7O1lBaENxQyxjQUFjOztBQUx2QyxtQkFBbUI7SUFyRS9CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFpRTFCLHVpQkFBMkI7aUJBL0QzQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTZEQztLQUlKLENBQUM7R0FDVyxtQkFBbUIsQ0FxQy9CO1NBckNZLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQGdlb3BsYXRmb3JtL2NsaWVudCc7XG5pbXBvcnQgeyBBdXRoU2VydmljZSwgR2VvUGxhdGZvcm1Vc2VyIH0gZnJvbSAnQGdlb3BsYXRmb3JtL29hdXRoLW5nL2FuZ3VsYXInO1xuXG5pbXBvcnQgeyBBdXRoZW50aWNhdGVkQ29tcG9uZW50IH0gZnJvbSAnLi9hdXRoZW50aWNhdGVkLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBBcHBBdXRoU2VydmljZSB9IGZyb20gJy4vYXV0aC5zZXJ2aWNlJztcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gJy4uL2xvZ2dlcic7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdncC1sb2dpbi1idXR0b24nLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgIC5idG4tbG9naW4uYnRuLWxpbmsge1xuICAgICAgICAgICAgcGFkZGluZzogLjM3NWVtIC43NWVtO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgICAgICAgbWFyZ2luOiAwIDAuNWVtO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgfVxuICAgICAgICAuYnRuLWxvZ2luLmJ0bi1saW5rOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICBjb2xvcjogIzMzMztcbiAgICAgICAgfVxuICAgICAgICAuby1hY2NvdW50LWRldGFpbHMge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogLTAuNWVtO1xuICAgICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzE4NWI4YTtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB9XG4gICAgICAgIC5vLWFjY291bnQtZGV0YWlsc19fYXZhdGFyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBmb250LXNpemU6IDZlbTtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMC4yNWVtO1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgICAgICBjb2xvcjogIzc3NztcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmRyb3Bkb3duLW1lbnUgLmJ0bi5idG4tbGluayB7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICBwYWRkaW5nOiAwLjM3NXJlbSAwLjc1cmVtO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5kcm9wZG93bi1tZW51IC5idG4uYnRuLWxpbms6YWZ0ZXIge1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgLmJ0bi5idG4tbG9nb3V0IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuMzc1cmVtIDAuNzVyZW07XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAtMC41ZW07XG4gICAgICAgIH1cbiAgICAgICAgYFxuICAgIF0sXG4gICAgdGVtcGxhdGU6XG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJidG4tYWNjb3VudCBidG4tZ3JvdXBcIj5cbiAgICAgICAgPCEtLSBub3QgbG9nZ2VkIGluIHlldCAtLT5cbiAgICAgICAgPGEgY2xhc3M9XCJidG4tbG9naW4gYnRuIGJ0bi1saW5rXCIgKGNsaWNrKT1cImxvZ2luKClcIiAqbmdJZj1cIiF1c2VyXCI+U2lnbiBJbjwvYT5cblxuICAgICAgICA8IS0tIGxvZ2dlZCBpbiAtLT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tbG9naW4gYnRuIGJ0bi1saW5rIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgKm5nSWY9XCJ1c2VyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkLXhzLW5vbmVcIj57e3VzZXI/Lm5hbWV9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCIgcm9sZT1cIm1lbnVcIiAqbmdJZj1cInVzZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvLWFjY291bnQtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvLWFjY291bnQtZGV0YWlsc19fYXZhdGFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYS1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3VzZXI/Lm5hbWV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPjxlbT4oe3t1c2VyPy51c2VybmFtZX19KTwvZW0+PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1LXRleHQtLXNtXCI+e3t1c2VyPy5lbWFpbH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1LXRleHQtLXNtXCI+e3t1c2VyPy5vcmd9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGZsZXgtanVzdGlmeS1hcm91bmQgdS1tZy10b3AtLXNtXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cInt7aWRwQmFzZVVybH19L3Byb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtcGVuY2lsLWFsdFwiPjwvc3Bhbj4gRWRpdCBQcm9maWxlXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJ7e2lkcEJhc2VVcmx9fS91cGRhdGVwd1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1rZXlcIj48L3NwYW4+IENoYW5nZSBQYXNzd29yZFxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInUtbWctdG9wLS1zbVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWxvZ291dCBidG4gYnRuLWxpZ2h0IGJ0bi1ibG9ja1wiIChjbGljayk9XCJsb2dvdXQoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1wb3dlci1vZmZcIj48L3NwYW4+IFNpZ24gT3V0XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGBcblxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkJ1dHRvbkNvbXBvbmVudCBleHRlbmRzIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGlkcEJhc2VVcmwgOiBzdHJpbmcgPSBDb25maWcuSURQX0JBU0VfVVJMIHx8ICdodHRwczovL2FjY291bnRzLmdlb3BsYXRmb3JtLmdvdic7XG4gICAgcHVibGljIHVzZXIgOiBHZW9QbGF0Zm9ybVVzZXIgPSAgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCBhdXRoU2VydmljZSA6IEFwcEF1dGhTZXJ2aWNlICkge1xuICAgICAgICBzdXBlcihhdXRoU2VydmljZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgLy8gdGhpcy5hdXRoU2VydmljZS5jaGVjaygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uVXNlckNoYW5nZSh1c2VyIDogR2VvUGxhdGZvcm1Vc2VyKSB7XG4gICAgICAgIHN1cGVyLm9uVXNlckNoYW5nZSh1c2VyKTtcbiAgICAgICAgbG9nZ2VyLmRlYnVnKFwiTG9naW5CdXR0b24ub25Vc2VyQ2hhbmdlKCkgOiBVc2VyIGlzIFwiICsgKHVzZXIgPyB1c2VyLnVzZXJuYW1lIDogJ251bGwnKSk7XG4gICAgICAgIHRoaXMudXNlciA9IHVzZXI7XG4gICAgfVxuXG4gICAgbG9naW4oKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9naW4oKTtcbiAgICB9XG5cbiAgICBsb2dvdXQoKSB7XG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UubG9nb3V0KCk7XG4gICAgfVxuXG59XG5cblxuXG5cblxuXG5cblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ2dwLWxvZ2luLW1vZGFsJyxcbiAgICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgIC5ncExvZ2luQ292ZXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjYpO1xuICAgICAgICAgICAgei1pbmRleDogNTAwMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICAgIH1cblxuICAgICAgICAuZ3BMb2dpbkNhbmNlbElmcmFtZSB7XG4gICAgICAgICAgei1pbmRleDogNTAwMTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgcmlnaHQ6IDBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5ncExvZ2luV2luZG93IHtcbiAgICAgICAgICB0b3A6IDEwMHB4O1xuICAgICAgICAgIGhlaWdodDogNjAlO1xuICAgICAgICAgIHdpZHRoOiA3NSU7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHotaW5kZXg6IDUwMDE7XG4gICAgICAgIFx0Ym9yZGVyOiA1cHggc29saWQgI2NjY2NjYztcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmdwTG9naW5XaW5kb3cgaWZyYW1lIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5ncExvZ2luV2luZG93IC5idG4tY2FuY2VsIHtcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLmdwTG9naW5XaW5kb3cgLmJ0biB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAtbXMtdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gICAgICAgICAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIH1cbiAgICBgXG4gICAgXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uaHRtbCcsXG5cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHB1YmxpYyBzaG93TG9naW5Nb2RhbCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgZm9yY2VMb2dpbiA6IGJvb2xlYW4gPSBDb25maWcuRk9SQ0VfTE9HSU47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZighdGhpcy5hdXRoU2VydmljZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0TWVzc2VuZ2VyKCkuc3Vic2NyaWJlKG1zZyA9PiB7XG4gICAgICAgICAgICBsb2dnZXIuZGVidWcoXCJMb2dpbk1vZGFsIHJlY2VpdmVkIGF1dGggbWVzc2FnZTogXCIgKyBtc2cubmFtZSk7XG4gICAgICAgICAgICBzd2l0Y2gobXNnLm5hbWUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2F1dGg6cmVxdWlyZUxvZ2luJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TG9naW5Nb2RhbCA9IHRydWU7ICAgLy9zaG93IHRoZSBtb2RhbFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJBdXRoZW50aWNhdGVkJzpcbiAgICAgICAgICAgICAgICBjYXNlICdpZnJhbWU6dXNlckF1dGhlbnRpY2F0ZWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2dpbk1vZGFsID0gZmFsc2U7ICAvL2hpZGUgdGhlIG1vZGFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uub25Vc2VyQ2hhbmdlKG1zZy51c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnNob3dMb2dpbk1vZGFsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICAvL2hpZGUgdGhlIG1vZGFsXG4gICAgICAgIHRoaXMuc2hvd0xvZ2luTW9kYWwgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==