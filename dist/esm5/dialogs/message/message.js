import * as tslib_1 from "tslib";
import { Inject, Component, HostBinding } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
var MessageDialog = /** @class */ (function () {
    function MessageDialog(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        switch (data.type) {
            case 'error':
                this.className = 'danger';
                break;
            case 'warn':
                this.className = 'warning';
                break;
            case 'info':
                this.className = 'info';
                break;
        }
    }
    MessageDialog.prototype.close = function () {
        this.dialogRef.close();
    };
    MessageDialog.prototype.getIconClass = function () {
        switch (this.data.type) {
            case 'error': return "fas fa-exclamation-circle";
            case 'warn': return "fas fa-exclamation-triangle";
            case 'info': return 'fas fa-info-circle';
        }
        return '';
    };
    MessageDialog.ctorParameters = function () { return [
        { type: MatDialogRef },
        { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
    ]; };
    tslib_1.__decorate([
        HostBinding('class')
    ], MessageDialog.prototype, "className", void 0);
    MessageDialog = tslib_1.__decorate([
        Component({
            selector: 'gpoe-message-dialog',
            template: "<div class=\"a-heading\" mat-dialog-title>\n    <span [attr.class]=\"getIconClass()\"></span>\n    {{data.label || \"Message\"}}\n</div>\n<div mat-dialog-content>\n    {{data.message}}\n</div>\n<div mat-dialog-actions class=\"d-flex flex-justify-end flex-align-center\">\n    <button type=\"button\" mat-flat-button (click)=\"close()\">Dismiss</button>\n</div>\n",
            styles: [":host.danger .mat-dialog-title{color:#d53c37}:host.warning .mat-dialog-title{color:#b35d29}:host.info .mat-dialog-title{color:#007fa4}"]
        }),
        tslib_1.__param(1, Inject(MAT_DIALOG_DATA))
    ], MessageDialog);
    return MessageDialog;
}());
export { MessageDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJkaWFsb2dzL21lc3NhZ2UvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBc0JwRjtJQUlJLHVCQUNXLFNBQXNDLEVBQ2IsSUFBdUI7UUFEaEQsY0FBUyxHQUFULFNBQVMsQ0FBNkI7UUFDYixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUd2RCxRQUFPLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxLQUFLLE9BQU87Z0JBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUM7Z0JBQUMsTUFBTTtZQUNoRCxLQUFLLE1BQU07Z0JBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Z0JBQUMsTUFBTTtZQUNoRCxLQUFLLE1BQU07Z0JBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQUMsTUFBTTtTQUNoRDtJQUVMLENBQUM7SUFFRCw2QkFBSyxHQUFMO1FBQ0ksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRUQsb0NBQVksR0FBWjtRQUNJLFFBQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDbkIsS0FBSyxPQUFRLENBQUMsQ0FBQyxPQUFPLDJCQUEyQixDQUFDO1lBQ2xELEtBQUssTUFBUSxDQUFDLENBQUMsT0FBTyw2QkFBNkIsQ0FBQztZQUNwRCxLQUFLLE1BQVEsQ0FBQyxDQUFDLE9BQU8sb0JBQW9CLENBQUE7U0FDN0M7UUFDRCxPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7O2dCQXZCcUIsWUFBWTtnREFDN0IsTUFBTSxTQUFDLGVBQWU7O0lBSkw7UUFBckIsV0FBVyxDQUFDLE9BQU8sQ0FBQztvREFBVztJQUZ2QixhQUFhO1FBTnpCLFNBQVMsQ0FBQztZQUNULFFBQVEsRUFBRSxxQkFBcUI7WUFDL0Isc1hBQTJCOztTQUc1QixDQUFDO1FBT08sbUJBQUEsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFBO09BTm5CLGFBQWEsQ0E4QnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTlCRCxJQThCQztTQTlCWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBDb21wb25lbnQsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBNYXREaWFsb2csIE1hdERpYWxvZ1JlZiwgTUFUX0RJQUxPR19EQVRBIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZGlhbG9nJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGRlYm91bmNlVGltZSwgZGlzdGluY3RVbnRpbENoYW5nZWQgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cblxuXG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZURpYWxvZ0RhdGEge1xuICAgIHR5cGUgICAgIDogJ2Vycm9yJyB8ICd3YXJuJyB8ICdpbmZvJztcbiAgICBsYWJlbCAgID86IHN0cmluZztcbiAgICBtZXNzYWdlICA6IHN0cmluZztcbn1cblxuXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ3BvZS1tZXNzYWdlLWRpYWxvZycsXG4gIHRlbXBsYXRlVXJsOiAnbWVzc2FnZS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZS5sZXNzJ10sXG5cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZURpYWxvZyB7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzJykgY2xhc3NOYW1lO1xuXG4gICAgY29uc3RydWN0b3IgKFxuICAgICAgICBwdWJsaWMgZGlhbG9nUmVmOiBNYXREaWFsb2dSZWY8TWVzc2FnZURpYWxvZz4sXG4gICAgICAgIEBJbmplY3QoTUFUX0RJQUxPR19EQVRBKSBwdWJsaWMgZGF0YTogTWVzc2FnZURpYWxvZ0RhdGFcbiAgICApIHtcblxuICAgICAgICBzd2l0Y2goZGF0YS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdlcnJvcicgOiB0aGlzLmNsYXNzTmFtZSA9ICdkYW5nZXInOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3dhcm4nIDogdGhpcy5jbGFzc05hbWUgPSAnd2FybmluZyc7IGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW5mbycgOiB0aGlzLmNsYXNzTmFtZSA9ICdpbmZvJzsgYnJlYWs7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGNsb3NlICgpIDogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlhbG9nUmVmLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgZ2V0SWNvbkNsYXNzKCkgOiBzdHJpbmcge1xuICAgICAgICBzd2l0Y2godGhpcy5kYXRhLnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Vycm9yJyA6IHJldHVybiBcImZhcyBmYS1leGNsYW1hdGlvbi1jaXJjbGVcIjtcbiAgICAgICAgICAgIGNhc2UgJ3dhcm4nICA6IHJldHVybiBcImZhcyBmYS1leGNsYW1hdGlvbi10cmlhbmdsZVwiO1xuICAgICAgICAgICAgY2FzZSAnaW5mbycgIDogcmV0dXJuICdmYXMgZmEtaW5mby1jaXJjbGUnXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxufVxuIl19