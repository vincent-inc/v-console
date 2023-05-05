import { NgModule } from '@angular/core';
import { ConfirmDialog } from '../dialog/confirm-dialog/confirm-dialog.component';
import { InputDialog } from '../dialog/input-dialog/input-dialog.component';
import { NgMaterialModule } from './ng-material.module';
import { NgEssentialModule } from './ng-essential.module';
import { UserDialog } from '../dialog/user-dialog/user-dialog.component';

@NgModule({
  declarations: [
    ConfirmDialog,
    InputDialog,
    UserDialog
  ],
  imports: [
    NgMaterialModule,
    NgEssentialModule
  ],
  exports: [
    ConfirmDialog,
    InputDialog,
    UserDialog
  ]
})
export class NgDialogModule { }
