import { MatDialogRef } from '@angular/material/dialog';
export interface MessageDialogData {
    type: 'error' | 'warn' | 'info';
    label?: string;
    message: string;
}
export declare class MessageDialog {
    dialogRef: MatDialogRef<MessageDialog>;
    data: MessageDialogData;
    className: any;
    constructor(dialogRef: MatDialogRef<MessageDialog>, data: MessageDialogData);
    close(): void;
    getIconClass(): string;
}
