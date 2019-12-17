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
        selector: 'gpmv-login-button',
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
        selector: 'gpmv-login-modal',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9naW4uanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ2VvcGxhdGZvcm0vY29tbW9uLyIsInNvdXJjZXMiOlsiYXV0aC9sb2dpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsT0FBTyxFQUFFLFNBQVMsRUFBcUIsTUFBTSxlQUFlLENBQUM7QUFDN0QsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRzdDLE9BQU8sRUFBRSxzQkFBc0IsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ25FLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQXFHaEQsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxzQkFBc0I7SUFLNUQsWUFBYSxXQUE0QjtRQUNyQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7UUFKaEIsZUFBVSxHQUFZLE1BQU0sQ0FBQyxZQUFZLElBQUksa0NBQWtDLENBQUM7UUFDaEYsU0FBSSxHQUFzQixJQUFJLENBQUM7SUFJdEMsQ0FBQztJQUVELFFBQVE7UUFDSixLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakIsNEJBQTRCO0lBQ2hDLENBQUM7SUFFRCxXQUFXO1FBQ1AsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxZQUFZLENBQUMsSUFBc0I7UUFDL0IsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLHVDQUF1QyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUIsQ0FBQztDQUVKLENBQUE7O1lBNUI4QixjQUFjOztBQUxoQyxvQkFBb0I7SUFqR2hDLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFtRDdCLFFBQVEsRUFDUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5Q0M7aUJBM0ZHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQStDQztLQThDUixDQUFDO0dBQ1csb0JBQW9CLENBaUNoQztTQWpDWSxvQkFBb0I7QUFnSGpDLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW1CO0lBSzVCLFlBQW9CLFdBQTRCO1FBQTVCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUh6QyxtQkFBYyxHQUFhLEtBQUssQ0FBQztRQUNqQyxlQUFVLEdBQWEsTUFBTSxDQUFDLFdBQVcsQ0FBQztJQUlqRCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUFFLE9BQU87UUFFN0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDNUMscURBQXFEO1lBQ3JELFFBQU8sR0FBRyxDQUFDLElBQUksRUFBQztnQkFDWixLQUFLLG1CQUFtQjtvQkFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBRyxnQkFBZ0I7b0JBQzlDLE1BQU07Z0JBRVYsS0FBSyxtQkFBbUIsQ0FBQztnQkFDekIsS0FBSywwQkFBMEI7b0JBQzNCLElBQUksQ0FBQyxjQUFjLEdBQUcsS0FBSyxDQUFDLENBQUUsZ0JBQWdCO29CQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3hDLE1BQU07YUFDYjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0lBRUQsTUFBTTtRQUNGLGdCQUFnQjtRQUNoQixJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQztJQUNoQyxDQUFDO0NBRUosQ0FBQTs7WUFoQ3FDLGNBQWM7O0FBTHZDLG1CQUFtQjtJQXJFL0IsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLGtCQUFrQjtRQWlFNUIsdWlCQUEyQjtpQkEvRDNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkRDO0tBSUosQ0FBQztHQUNXLG1CQUFtQixDQXFDL0I7U0FyQ1ksbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICdAZ2VvcGxhdGZvcm0vY2xpZW50JztcbmltcG9ydCB7IEF1dGhTZXJ2aWNlLCBHZW9QbGF0Zm9ybVVzZXIgfSBmcm9tICdAZ2VvcGxhdGZvcm0vb2F1dGgtbmcvYW5ndWxhcic7XG5cbmltcG9ydCB7IEF1dGhlbnRpY2F0ZWRDb21wb25lbnQgfSBmcm9tICcuL2F1dGhlbnRpY2F0ZWQuY29tcG9uZW50JztcbmltcG9ydCB7IEFwcEF1dGhTZXJ2aWNlIH0gZnJvbSAnLi9hdXRoLnNlcnZpY2UnO1xuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdncG12LWxvZ2luLWJ1dHRvbicsXG4gICAgc3R5bGVzOiBbXG4gICAgICAgIGBcbiAgICAgICAgLmJ0bi1sb2dpbi5idG4tbGluayB7XG4gICAgICAgICAgICBwYWRkaW5nOiAuMzc1ZW0gLjc1ZW07XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG4gICAgICAgICAgICBtYXJnaW46IDAgMC41ZW07XG4gICAgICAgICAgICBmb250LXdlaWdodDogNzAwO1xuICAgICAgICB9XG4gICAgICAgIC5idG4tbG9naW4uYnRuLWxpbms6aG92ZXIge1xuICAgICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjtcbiAgICAgICAgICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgICAgICAgICAgIGNvbG9yOiAjMzMzO1xuICAgICAgICB9XG4gICAgICAgIC5vLWFjY291bnQtZGV0YWlscyB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IHN0cmV0Y2g7XG4gICAgICAgICAgICBtYXJnaW4tdG9wOiAtMC41ZW07XG4gICAgICAgICAgICBwYWRkaW5nOiAxZW07XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAjMTg1YjhhO1xuICAgICAgICAgICAgY29sb3I6ICNmZmY7XG4gICAgICAgIH1cbiAgICAgICAgLm8tYWNjb3VudC1kZXRhaWxzX19hdmF0YXIge1xuICAgICAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgICAgICAgIGZvbnQtc2l6ZTogNmVtO1xuICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiAwLjI1ZW07XG4gICAgICAgICAgICBwYWRkaW5nLXRvcDogMTBweDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDBweDtcbiAgICAgICAgICAgIGhlaWdodDogMTAwcHg7XG4gICAgICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICAgICAgICAgIGNvbG9yOiAjNzc3O1xuICAgICAgICAgICAgYm9yZGVyLXJhZGl1czogMTAwJTtcbiAgICAgICAgfVxuICAgICAgICAuZHJvcGRvd24tbWVudSAuYnRuLmJ0bi1saW5rIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICAgIHBhZGRpbmc6IDAuMzc1cmVtIDAuNzVyZW07XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IG5vbmU7XG4gICAgICAgIH1cbiAgICAgICAgLmRyb3Bkb3duLW1lbnUgLmJ0bi5idG4tbGluazphZnRlciB7XG4gICAgICAgICAgICBjb250ZW50OiAnJztcbiAgICAgICAgfVxuICAgICAgICAuYnRuLmJ0bi1sb2dvdXQge1xuICAgICAgICAgICAgcGFkZGluZzogMC4zNzVyZW0gMC43NXJlbTtcbiAgICAgICAgICAgIG1hcmdpbi1ib3R0b206IC0wLjVlbTtcbiAgICAgICAgfVxuICAgICAgICBgXG4gICAgXSxcbiAgICB0ZW1wbGF0ZTpcbiAgICBgXG4gICAgPGRpdiBjbGFzcz1cImJ0bi1hY2NvdW50IGJ0bi1ncm91cFwiPlxuICAgICAgICA8IS0tIG5vdCBsb2dnZWQgaW4geWV0IC0tPlxuICAgICAgICA8YSBjbGFzcz1cImJ0bi1sb2dpbiBidG4gYnRuLWxpbmtcIiAoY2xpY2spPVwibG9naW4oKVwiICpuZ0lmPVwiIXVzZXJcIj5TaWduIEluPC9hPlxuXG4gICAgICAgIDwhLS0gbG9nZ2VkIGluIC0tPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0bi1sb2dpbiBidG4gYnRuLWxpbmsgZHJvcGRvd24tdG9nZ2xlXCIgZGF0YS10b2dnbGU9XCJkcm9wZG93blwiXG4gICAgICAgICAgICBhcmlhLWV4cGFuZGVkPVwiZmFsc2VcIiAqbmdJZj1cInVzZXJcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImQteHMtbm9uZVwiPnt7dXNlcj8ubmFtZX19PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjYXJldFwiPjwvc3Bhbj5cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJkcm9wZG93bi1tZW51IGRyb3Bkb3duLW1lbnUtcmlnaHRcIiByb2xlPVwibWVudVwiICpuZ0lmPVwidXNlclwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm8tYWNjb3VudC1kZXRhaWxzXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm8tYWNjb3VudC1kZXRhaWxzX19hdmF0YXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC0xXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt7dXNlcj8ubmFtZX19XG4gICAgICAgICAgICAgICAgICAgICAgICA8c21hbGw+PGVtPih7e3VzZXI/LnVzZXJuYW1lfX0pPC9lbT48L3NtYWxsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInUtdGV4dC0tc21cIj57e3VzZXI/LmVtYWlsfX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInUtdGV4dC0tc21cIj57e3VzZXI/Lm9yZ319PC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggZmxleC1qdXN0aWZ5LWFyb3VuZCB1LW1nLXRvcC0tc21cIj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tc20gYnRuLWxpbmtcIiB0YXJnZXQ9XCJfYmxhbmtcIiBocmVmPVwie3tpZHBCYXNlVXJsfX0vcHJvZmlsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZhcyBmYS1wZW5jaWwtYWx0XCI+PC9zcGFuPiBFZGl0IFByb2ZpbGVcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXNtIGJ0bi1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgaHJlZj1cInt7aWRwQmFzZVVybH19L3VwZGF0ZXB3XCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLWtleVwiPjwvc3Bhbj4gQ2hhbmdlIFBhc3N3b3JkXG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidS1tZy10b3AtLXNtXCI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4tbG9nb3V0IGJ0biBidG4tbGlnaHQgYnRuLWJsb2NrXCIgKGNsaWNrKT1cImxvZ291dCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZmFzIGZhLXBvd2VyLW9mZlwiPjwvc3Bhbj4gU2lnbiBPdXRcbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICAgYFxuXG59KVxuZXhwb3J0IGNsYXNzIExvZ2luQnV0dG9uQ29tcG9uZW50IGV4dGVuZHMgQXV0aGVudGljYXRlZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBwdWJsaWMgaWRwQmFzZVVybCA6IHN0cmluZyA9IENvbmZpZy5JRFBfQkFTRV9VUkwgfHwgJ2h0dHBzOi8vYWNjb3VudHMuZ2VvcGxhdGZvcm0uZ292JztcbiAgICBwdWJsaWMgdXNlciA6IEdlb1BsYXRmb3JtVXNlciA9ICBudWxsO1xuXG4gICAgY29uc3RydWN0b3IoIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UgKSB7XG4gICAgICAgIHN1cGVyKGF1dGhTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgc3VwZXIubmdPbkluaXQoKTtcblxuICAgICAgICAvLyB0aGlzLmF1dGhTZXJ2aWNlLmNoZWNrKCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgfVxuXG4gICAgb25Vc2VyQ2hhbmdlKHVzZXIgOiBHZW9QbGF0Zm9ybVVzZXIpIHtcbiAgICAgICAgc3VwZXIub25Vc2VyQ2hhbmdlKHVzZXIpO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkxvZ2luQnV0dG9uLm9uVXNlckNoYW5nZSgpIDogVXNlciBpcyBcIiArICh1c2VyID8gdXNlci51c2VybmFtZSA6ICdudWxsJykpO1xuICAgICAgICB0aGlzLnVzZXIgPSB1c2VyO1xuICAgIH1cblxuICAgIGxvZ2luKCkge1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ2luKCk7XG4gICAgfVxuXG4gICAgbG9nb3V0KCkge1xuICAgICAgICB0aGlzLmF1dGhTZXJ2aWNlLmxvZ291dCgpO1xuICAgIH1cblxufVxuXG5cblxuXG5cblxuXG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdncG12LWxvZ2luLW1vZGFsJyxcbiAgICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICAgIC5ncExvZ2luQ292ZXIge1xuICAgICAgICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgICAgICAgdG9wOiAwO1xuICAgICAgICAgICAgbGVmdDogMDtcbiAgICAgICAgICAgIGJvdHRvbTogMDtcbiAgICAgICAgICAgIHJpZ2h0OiAwO1xuICAgICAgICAgICAgYmFja2dyb3VuZDogcmdiYSgwLDAsMCwwLjYpO1xuICAgICAgICAgICAgei1pbmRleDogNTAwMDtcbiAgICAgICAgICAgIHdpZHRoOiAxMDB2dztcbiAgICAgICAgICAgIGhlaWdodDogMTAwdmg7XG4gICAgICAgIH1cblxuICAgICAgICAuZ3BMb2dpbkNhbmNlbElmcmFtZSB7XG4gICAgICAgICAgei1pbmRleDogNTAwMTtcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgICAgICAgcmlnaHQ6IDBweDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5ncExvZ2luV2luZG93IHtcbiAgICAgICAgICB0b3A6IDEwMHB4O1xuICAgICAgICAgIGhlaWdodDogNjAlO1xuICAgICAgICAgIHdpZHRoOiA3NSU7XG4gICAgICAgICAgbWFyZ2luOiAwIGF1dG87XG4gICAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICAgIHotaW5kZXg6IDUwMDE7XG4gICAgICAgIFx0Ym9yZGVyOiA1cHggc29saWQgI2NjY2NjYztcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiAxMHB4O1xuICAgICAgICB9XG5cbiAgICAgICAgLmdwTG9naW5XaW5kb3cgaWZyYW1lIHtcbiAgICAgICAgICB3aWR0aDogMTAwJTtcbiAgICAgICAgICBoZWlnaHQ6IDEwMCVcbiAgICAgICAgfVxuXG4gICAgICAgIC5ncExvZ2luV2luZG93IC5idG4tY2FuY2VsIHtcbiAgICAgICAgICBjb2xvcjogd2hpdGU7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgLmdwTG9naW5XaW5kb3cgLmJ0biB7XG4gICAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgICAgICAgIHBhZGRpbmc6IDZweCAxMnB4O1xuICAgICAgICAgIG1hcmdpbi1ib3R0b206IDA7XG4gICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiA0MDA7XG4gICAgICAgICAgbGluZS1oZWlnaHQ6IDEuNDI4NTcxNDM7XG4gICAgICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgICAgICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICAtbXMtdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gICAgICAgICAgdG91Y2gtYWN0aW9uOiBtYW5pcHVsYXRpb247XG4gICAgICAgICAgY3Vyc29yOiBwb2ludGVyO1xuICAgICAgICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAgICAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgICAgICAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcbiAgICAgICAgICBib3JkZXItcmFkaXVzOiA0cHg7XG4gICAgICAgIH1cbiAgICBgXG4gICAgXSxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbG9naW4uaHRtbCcsXG5cbn0pXG5leHBvcnQgY2xhc3MgTG9naW5Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIHB1YmxpYyBzaG93TG9naW5Nb2RhbCA6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgZm9yY2VMb2dpbiA6IGJvb2xlYW4gPSBDb25maWcuRk9SQ0VfTE9HSU47XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGF1dGhTZXJ2aWNlIDogQXBwQXV0aFNlcnZpY2UpIHtcblxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZighdGhpcy5hdXRoU2VydmljZSkgcmV0dXJuO1xuXG4gICAgICAgIHRoaXMuYXV0aFNlcnZpY2UuZ2V0TWVzc2VuZ2VyKCkuc3Vic2NyaWJlKG1zZyA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcIlJlY2VpdmVkIEF1dGggTWVzc2FnZTogXCIgKyBtc2cubmFtZSk7XG4gICAgICAgICAgICBzd2l0Y2gobXNnLm5hbWUpe1xuICAgICAgICAgICAgICAgIGNhc2UgJ2F1dGg6cmVxdWlyZUxvZ2luJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zaG93TG9naW5Nb2RhbCA9IHRydWU7ICAgLy9zaG93IHRoZSBtb2RhbFxuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3VzZXJBdXRoZW50aWNhdGVkJzpcbiAgICAgICAgICAgICAgICBjYXNlICdpZnJhbWU6dXNlckF1dGhlbnRpY2F0ZWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNob3dMb2dpbk1vZGFsID0gZmFsc2U7ICAvL2hpZGUgdGhlIG1vZGFsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXV0aFNlcnZpY2Uub25Vc2VyQ2hhbmdlKG1zZy51c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnNob3dMb2dpbk1vZGFsID0gZmFsc2U7XG4gICAgfVxuXG4gICAgY2FuY2VsKCkge1xuICAgICAgICAvL2hpZGUgdGhlIG1vZGFsXG4gICAgICAgIHRoaXMuc2hvd0xvZ2luTW9kYWwgPSBmYWxzZTtcbiAgICB9XG5cbn1cbiJdfQ==