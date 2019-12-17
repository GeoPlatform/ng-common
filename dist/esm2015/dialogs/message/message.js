import * as tslib_1 from "tslib";
import { Inject, Component, HostBinding } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
let MessageDialog = class MessageDialog {
    constructor(dialogRef, data) {
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
    close() {
        this.dialogRef.close();
    }
    getIconClass() {
        switch (this.data.type) {
            case 'error': return "fas fa-exclamation-circle";
            case 'warn': return "fas fa-exclamation-triangle";
            case 'info': return 'fas fa-info-circle';
        }
        return '';
    }
};
MessageDialog.ctorParameters = () => [
    { type: MatDialogRef },
    { type: undefined, decorators: [{ type: Inject, args: [MAT_DIALOG_DATA,] }] }
];
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
export { MessageDialog };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BnZW9wbGF0Zm9ybS9jb21tb24vIiwic291cmNlcyI6WyJkaWFsb2dzL21lc3NhZ2UvbWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9ELE9BQU8sRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBc0JwRixJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO0lBSXRCLFlBQ1csU0FBc0MsRUFDYixJQUF1QjtRQURoRCxjQUFTLEdBQVQsU0FBUyxDQUE2QjtRQUNiLFNBQUksR0FBSixJQUFJLENBQW1CO1FBR3ZELFFBQU8sSUFBSSxDQUFDLElBQUksRUFBRTtZQUNkLEtBQUssT0FBTztnQkFBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQztnQkFBQyxNQUFNO1lBQ2hELEtBQUssTUFBTTtnQkFBRyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztnQkFBQyxNQUFNO1lBQ2hELEtBQUssTUFBTTtnQkFBRyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFBQyxNQUFNO1NBQ2hEO0lBRUwsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUFZO1FBQ1IsUUFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNuQixLQUFLLE9BQVEsQ0FBQyxDQUFDLE9BQU8sMkJBQTJCLENBQUM7WUFDbEQsS0FBSyxNQUFRLENBQUMsQ0FBQyxPQUFPLDZCQUE2QixDQUFDO1lBQ3BELEtBQUssTUFBUSxDQUFDLENBQUMsT0FBTyxvQkFBb0IsQ0FBQTtTQUM3QztRQUNELE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUVKLENBQUE7O1lBekJ5QixZQUFZOzRDQUM3QixNQUFNLFNBQUMsZUFBZTs7QUFKTDtJQUFyQixXQUFXLENBQUMsT0FBTyxDQUFDO2dEQUFXO0FBRnZCLGFBQWE7SUFOekIsU0FBUyxDQUFDO1FBQ1QsUUFBUSxFQUFFLHFCQUFxQjtRQUMvQixzWEFBMkI7O0tBRzVCLENBQUM7SUFPTyxtQkFBQSxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUE7R0FObkIsYUFBYSxDQThCekI7U0E5QlksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgQ29tcG9uZW50LCBIb3N0QmluZGluZyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0RGlhbG9nLCBNYXREaWFsb2dSZWYsIE1BVF9ESUFMT0dfREFUQSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2RpYWxvZyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBkZWJvdW5jZVRpbWUsIGRpc3RpbmN0VW50aWxDaGFuZ2VkIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5cblxuXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VEaWFsb2dEYXRhIHtcbiAgICB0eXBlICAgICA6ICdlcnJvcicgfCAnd2FybicgfCAnaW5mbyc7XG4gICAgbGFiZWwgICA/OiBzdHJpbmc7XG4gICAgbWVzc2FnZSAgOiBzdHJpbmc7XG59XG5cblxuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dwb2UtbWVzc2FnZS1kaWFsb2cnLFxuICB0ZW1wbGF0ZVVybDogJ21lc3NhZ2UuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UubGVzcyddLFxuXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEaWFsb2cge1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcycpIGNsYXNzTmFtZTtcblxuICAgIGNvbnN0cnVjdG9yIChcbiAgICAgICAgcHVibGljIGRpYWxvZ1JlZjogTWF0RGlhbG9nUmVmPE1lc3NhZ2VEaWFsb2c+LFxuICAgICAgICBASW5qZWN0KE1BVF9ESUFMT0dfREFUQSkgcHVibGljIGRhdGE6IE1lc3NhZ2VEaWFsb2dEYXRhXG4gICAgKSB7XG5cbiAgICAgICAgc3dpdGNoKGRhdGEudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnZXJyb3InIDogdGhpcy5jbGFzc05hbWUgPSAnZGFuZ2VyJzsgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd3YXJuJyA6IHRoaXMuY2xhc3NOYW1lID0gJ3dhcm5pbmcnOyBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luZm8nIDogdGhpcy5jbGFzc05hbWUgPSAnaW5mbyc7IGJyZWFrO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBjbG9zZSAoKSA6IHZvaWQge1xuICAgICAgICB0aGlzLmRpYWxvZ1JlZi5jbG9zZSgpO1xuICAgIH1cblxuICAgIGdldEljb25DbGFzcygpIDogc3RyaW5nIHtcbiAgICAgICAgc3dpdGNoKHRoaXMuZGF0YS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdlcnJvcicgOiByZXR1cm4gXCJmYXMgZmEtZXhjbGFtYXRpb24tY2lyY2xlXCI7XG4gICAgICAgICAgICBjYXNlICd3YXJuJyAgOiByZXR1cm4gXCJmYXMgZmEtZXhjbGFtYXRpb24tdHJpYW5nbGVcIjtcbiAgICAgICAgICAgIGNhc2UgJ2luZm8nICA6IHJldHVybiAnZmFzIGZhLWluZm8tY2lyY2xlJ1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbn1cbiJdfQ==