import { Inject, Component, HostBinding } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';




export interface MessageDialogData {
    type     : 'error' | 'warn' | 'info';
    label   ?: string;
    message  : string;
}




@Component({
  selector: 'gp-message-dialog',
  templateUrl: 'message.html',
  styleUrls: ['./message.less'],

})
export class MessageDialog {

    @HostBinding('class') className;

    constructor (
        public dialogRef: MatDialogRef<MessageDialog>,
        @Inject(MAT_DIALOG_DATA) public data: MessageDialogData
    ) {

        switch(data.type) {
            case 'error' : this.className = 'danger'; break;
            case 'warn' : this.className = 'warning'; break;
            case 'info' : this.className = 'info'; break;
        }

    }

    close () : void {
        this.dialogRef.close();
    }

    getIconClass() : string {
        switch(this.data.type) {
            case 'error' : return "fas fa-exclamation-circle";
            case 'warn'  : return "fas fa-exclamation-triangle";
            case 'info'  : return 'fas fa-info-circle'
        }
        return '';
    }

}
