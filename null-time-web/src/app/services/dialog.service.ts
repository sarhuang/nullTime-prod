import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../dialogs/confirm/confirm.component';
import { MessageComponent } from '../dialogs/message/message.component';
import { ConfirmDialogData } from '../reusable/confirm-dialog-data';
import { MessageDialogData } from '../reusable/message-dialog-data';


@Injectable({
  providedIn: 'root',
})

export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean>{
    return this.dialog.open(ConfirmComponent, {
        data,
        width: '400px',
        disableClose: true}).afterClosed();
  } 
  
  messageDialog(data: MessageDialogData){
     this.dialog.open(MessageComponent, {
      data,
      width: '400px',
      disableClose: true}).afterClosed();
  }
}