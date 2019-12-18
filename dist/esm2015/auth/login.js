import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Config } from '@geoplatform/client';
import { AuthenticatedComponent } from './authenticated.component';
import { AppAuthService } from './auth.service';
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
        console.log("LoginButton.onUserChange() : User is " + (user ? user.username : 'null'));
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
            // console.log("Received Auth Message: " + msg.name);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiYXV0aC9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQXFHaEQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxzQkFBc0I7SUFLNUQsWUFBYSxXQUE0QjtRQUNyQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFKaEIsZUFBVSxHQUFZLE1BQU0sQ0FBQyxZQUFZLElBQUksa0NBQWtDLENBQUM7UUFDaEYsU0FBSSxHQUFzQixJQUFJLENBQUM7SUFJdEMsQ0FBQztJQUVELFFBQVE7UUFDSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsNEJBQTRCO0lBQ2hDLENBQUM7SUFFRCxXQUFXO1FBQ1AsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBc0I7UUFDL0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUVKLENBQUE7O1lBNUI4QixjQUFjOztBQUxoQyxvQkFBb0I7SUFqR2hDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxpQkFBaUI7UUFtRDNCLFFBQVEsRUFDUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5Q0M7aUJBM0ZHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQStDQztLQThDUixDQUFDO0dBQ1csb0JBQW9CLENBaUNoQztTQWpDWSxvQkFBb0I7QUFnSGpDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBSzVCLFlBQW9CLFdBQTRCO1FBQTVCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUh6QyxtQkFBYyxHQUFhLEtBQUssQ0FBQztRQUNqQyxlQUFVLEdBQWEsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUlqRCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUMscURBQXFEO1lBQ3JELFFBQU8sR0FBRyxDQUFDLElBQUksRUFBQztnQkFDWixLQUFLLG1CQUFtQjtvQkFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBRyxnQkFBZ0I7b0JBQzlDLE1BQU07Z0JBRVYsS0FBSyxtQkFBbUIsQ0FBQztnQkFDekIsS0FBSywwQkFBMEI7b0JBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUUsZ0JBQWdCO29CQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTTtRQUNGLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0NBRUosQ0FBQTs7WUFoQ3FDLGNBQWM7O0FBTHZDLG1CQUFtQjtJQXJFL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGdCQUFnQjtRQWlFMUIsdWlCQUEyQjtpQkEvRDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkRDO0tBSUosQ0FBQztHQUNXLG1CQUFtQixDQXFDL0I7U0FyQ1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBHZW9QbGF0Zm9ybVVzZXIgfSBmcm9tICdAZ2VvcGxhdGZvcm0vb2F1dGgtbmcvYW5ndWxhcic7XG5cbmltcG9ydCB7IEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgfSBmcm9tICcuL2F1dGhlbnRpY2F0ZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdncC1sb2dpbi1idXR0b24nLFxuICAgIHN0eWxlczogW1xuICAgICAgICBgXG4gICAgICAgIC5idG4tbG9naW4uYnRuLWxpbmsge1xuICAgICAgICAgICAgcGFkZGluZzogLjM3NWVtIC43NWVtO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgICAgICAgbWFyZ2luOiAwIDAuNWVtO1xuICAgICAgICAgICAgZm9udC13ZWlnaHQ6IDcwMDtcbiAgICAgICAgfVxuICAgICAgICAuYnRuLWxvZ2luLmJ0bi1saW5rOmhvdmVyIHtcbiAgICAgICAgICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gICAgICAgICAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgICAgICAgICBjb2xvcjogIzMzMztcbiAgICAgICAgfVxuICAgICAgICAuby1hY2NvdW50LWRldGFpbHMge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICAgICAgICAgICAgbWFyZ2luLXRvcDogLTAuNWVtO1xuICAgICAgICAgICAgcGFkZGluZzogMWVtO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogIzE4NWI4YTtcbiAgICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICB9XG4gICAgICAgIC5vLWFjY291bnQtZGV0YWlsc19fYXZhdGFyIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBmb250LXNpemU6IDZlbTtcbiAgICAgICAgICAgIG1hcmdpbi1yaWdodDogMC4yNWVtO1xuICAgICAgICAgICAgcGFkZGluZy10b3A6IDEwcHg7XG4gICAgICAgICAgICB3aWR0aDogMTAwcHg7XG4gICAgICAgICAgICBoZWlnaHQ6IDEwMHB4O1xuICAgICAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgICAgICAgICBjb2xvcjogIzc3NztcbiAgICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwMCU7XG4gICAgICAgIH1cbiAgICAgICAgLmRyb3Bkb3duLW1lbnUgLmJ0bi5idG4tbGluayB7XG4gICAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgICBwYWRkaW5nOiAwLjM3NXJlbSAwLjc1cmVtO1xuICAgICAgICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgICAgICB9XG4gICAgICAgIC5kcm9wZG93bi1tZW51IC5idG4uYnRuLWxpbms6YWZ0ZXIge1xuICAgICAgICAgICAgY29udGVudDogJyc7XG4gICAgICAgIH1cbiAgICAgICAgLmJ0bi5idG4tbG9nb3V0IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuMzc1cmVtIDAuNzVyZW07XG4gICAgICAgICAgICBtYXJnaW4tYm90dG9tOiAtMC41ZW07XG4gICAgICAgIH1cbiAgICAgICAgYFxuICAgIF0sXG4gICAgdGVtcGxhdGU6XG4gICAgYFxuICAgIDxkaXYgY2xhc3M9XCJidG4tYWNjb3VudCBidG4tZ3JvdXBcIj5cbiAgICAgICAgPCEtLSBub3QgbG9nZ2VkIGluIHlldCAtLT5cbiAgICAgICAgPGEgY2xhc3M9XCJidG4tbG9naW4gYnRuIGJ0bi1saW5rXCIgKGNsaWNrKT1cImxvZ2luKClcIiAqbmdJZj1cIiF1c2VyXCI+U2lnbiBJbjwvYT5cblxuICAgICAgICA8IS0tIGxvZ2dlZCBpbiAtLT5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJidG4tbG9naW4gYnRuIGJ0bi1saW5rIGRyb3Bkb3duLXRvZ2dsZVwiIGRhdGEtdG9nZ2xlPVwiZHJvcGRvd25cIlxuICAgICAgICAgICAgYXJpYS1leHBhbmRlZD1cImZhbHNlXCIgKm5nSWY9XCJ1c2VyXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkLXhzLW5vbmVcIj57e3VzZXI/Lm5hbWV9fTwvc3Bhbj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2FyZXRcIj48L3NwYW4+XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiZHJvcGRvd24tbWVudSBkcm9wZG93bi1tZW51LXJpZ2h0XCIgcm9sZT1cIm1lbnVcIiAqbmdJZj1cInVzZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvLWFjY291bnQtZGV0YWlsc1wiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJvLWFjY291bnQtZGV0YWlsc19fYXZhdGFyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtMVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYS1oZWFkaW5nXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7e3VzZXI/Lm5hbWV9fVxuICAgICAgICAgICAgICAgICAgICAgICAgPHNtYWxsPjxlbT4oe3t1c2VyPy51c2VybmFtZX19KTwvZW0+PC9zbWFsbD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1LXRleHQtLXNtXCI+e3t1c2VyPy5lbWFpbH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1LXRleHQtLXNtXCI+e3t1c2VyPy5vcmd9fTwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGZsZXgtanVzdGlmeS1hcm91bmQgdS1tZy10b3AtLXNtXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cInt7aWRwQmFzZVVybH19L3Byb2ZpbGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtcGVuY2lsLWFsdFwiPjwvc3Bhbj4gRWRpdCBQcm9maWxlXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1zbSBidG4tbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIGhyZWY9XCJ7e2lkcEJhc2VVcmx9fS91cGRhdGVwd1wiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1rZXlcIj48L3NwYW4+IENoYW5nZSBQYXNzd29yZFxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInUtbWctdG9wLS1zbVwiPlxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuLWxvZ291dCBidG4gYnRuLWxpZ2h0IGJ0bi1ibG9ja1wiIChjbGljayk9XCJsb2dvdXQoKVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1wb3dlci1vZmZcIj48L3NwYW4+IFNpZ24gT3V0XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICAgIGBcblxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbkJ1dHRvbkNvbXBvbmVudCBleHRlbmRzIEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgcHVibGljIGlkcEJhc2VVcmwgOiBzdHJpbmcgPSBDb25maWcuSURQX0JBU0VfVVJMIHx8ICdodHRwczovL2FjY291bnRzLmdlb3BsYXRmb3JtLmdvdic7XG4gICAgcHVibGljIHVzZXIgOiBHZW9QbGF0Zm9ybVVzZXIgPSAgbnVsbDtcblxuICAgIGNvbnN0cnVjdG9yKCBhdXRoU2VydmljZSA6IEFwcEF1dGhTZXJ2aWNlICkge1xuICAgICAgICBzdXBlcihhdXRoU2VydmljZSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHN1cGVyLm5nT25Jbml0KCk7XG5cbiAgICAgICAgLy8gdGhpcy5hdXRoU2VydmljZS5jaGVjaygpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIH1cblxuICAgIG9uVXNlckNoYW5nZSh1c2VyIDogR2VvUGxhdGZvcm1Vc2VyKSB7XG4gICAgICAgIHN1cGVyLm9uVXNlckNoYW5nZSh1c2VyKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJMb2dpbkJ1dHRvbi5vblVzZXJDaGFuZ2UoKSA6IFVzZXIgaXMgXCIgKyAodXNlciA/IHVzZXIudXNlcm5hbWUgOiAnbnVsbCcpKTtcbiAgICAgICAgdGhpcy51c2VyID0gdXNlcjtcbiAgICB9XG5cbiAgICBsb2dpbigpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dpbigpO1xuICAgIH1cblxuICAgIGxvZ291dCgpIHtcbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5sb2dvdXQoKTtcbiAgICB9XG5cbn1cblxuXG5cblxuXG5cblxuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnZ3AtbG9naW4tbW9kYWwnLFxuICAgIHN0eWxlczogW1xuICAgIGBcbiAgICAgICAgLmdwTG9naW5Db3ZlciB7XG4gICAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgICB0b3A6IDA7XG4gICAgICAgICAgICBsZWZ0OiAwO1xuICAgICAgICAgICAgYm90dG9tOiAwO1xuICAgICAgICAgICAgcmlnaHQ6IDA7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsMCwwLDAuNik7XG4gICAgICAgICAgICB6LWluZGV4OiA1MDAwO1xuICAgICAgICAgICAgd2lkdGg6IDEwMHZ3O1xuICAgICAgICAgICAgaGVpZ2h0OiAxMDB2aDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5ncExvZ2luQ2FuY2VsSWZyYW1lIHtcbiAgICAgICAgICB6LWluZGV4OiA1MDAxO1xuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgICAgICByaWdodDogMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmdwTG9naW5XaW5kb3cge1xuICAgICAgICAgIHRvcDogMTAwcHg7XG4gICAgICAgICAgaGVpZ2h0OiA2MCU7XG4gICAgICAgICAgd2lkdGg6IDc1JTtcbiAgICAgICAgICBtYXJnaW46IDAgYXV0bztcbiAgICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgICAgICAgei1pbmRleDogNTAwMTtcbiAgICAgICAgXHRib3JkZXI6IDVweCBzb2xpZCAjY2NjY2NjO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDEwcHg7XG4gICAgICAgIH1cblxuICAgICAgICAuZ3BMb2dpbldpbmRvdyBpZnJhbWUge1xuICAgICAgICAgIHdpZHRoOiAxMDAlO1xuICAgICAgICAgIGhlaWdodDogMTAwJVxuICAgICAgICB9XG5cbiAgICAgICAgLmdwTG9naW5XaW5kb3cgLmJ0bi1jYW5jZWwge1xuICAgICAgICAgIGNvbG9yOiB3aGl0ZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gICAgICAgIH1cblxuICAgICAgICAuZ3BMb2dpbldpbmRvdyAuYnRuIHtcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgcGFkZGluZzogNnB4IDEycHg7XG4gICAgICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICAgICAgICBmb250LXNpemU6IDE0cHg7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgICAgICAgICBsaW5lLWhlaWdodDogMS40Mjg1NzE0MztcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICAgIC1tcy10b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgICAgICAgICB0b3VjaC1hY3Rpb246IG1hbmlwdWxhdGlvbjtcbiAgICAgICAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgICAgICAgLXdlYmtpdC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAtbW96LXVzZXItc2VsZWN0OiBub25lO1xuICAgICAgICAgIC1tcy11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWltYWdlOiBub25lO1xuICAgICAgICAgIGJvcmRlcjogMXB4IHNvbGlkIHRyYW5zcGFyZW50O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgICAgICAgfVxuICAgIGBcbiAgICBdLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9sb2dpbi5odG1sJyxcblxufSlcbmV4cG9ydCBjbGFzcyBMb2dpbk1vZGFsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgcHVibGljIHNob3dMb2dpbk1vZGFsIDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHB1YmxpYyBmb3JjZUxvZ2luIDogYm9vbGVhbiA9IENvbmZpZy5GT1JDRV9MT0dJTjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgYXV0aFNlcnZpY2UgOiBBcHBBdXRoU2VydmljZSkge1xuXG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmKCF0aGlzLmF1dGhTZXJ2aWNlKSByZXR1cm47XG5cbiAgICAgICAgdGhpcy5hdXRoU2VydmljZS5nZXRNZXNzZW5nZXIoKS5zdWJzY3JpYmUobXNnID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiUmVjZWl2ZWQgQXV0aCBNZXNzYWdlOiBcIiArIG1zZy5uYW1lKTtcbiAgICAgICAgICAgIHN3aXRjaChtc2cubmFtZSl7XG4gICAgICAgICAgICAgICAgY2FzZSAnYXV0aDpyZXF1aXJlTG9naW4nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2dpbk1vZGFsID0gdHJ1ZTsgICAvL3Nob3cgdGhlIG1vZGFsXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAndXNlckF1dGhlbnRpY2F0ZWQnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ2lmcmFtZTp1c2VyQXV0aGVudGljYXRlZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2hvd0xvZ2luTW9kYWwgPSBmYWxzZTsgIC8vaGlkZSB0aGUgbW9kYWxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hdXRoU2VydmljZS5vblVzZXJDaGFuZ2UobXNnLnVzZXIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuc2hvd0xvZ2luTW9kYWwgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjYW5jZWwoKSB7XG4gICAgICAgIC8vaGlkZSB0aGUgbW9kYWxcbiAgICAgICAgdGhpcy5zaG93TG9naW5Nb2RhbCA9IGZhbHNlO1xuICAgIH1cblxufVxuIl19