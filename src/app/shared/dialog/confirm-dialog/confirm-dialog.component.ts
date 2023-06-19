import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogInput } from '../../model/Mat.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialog implements OnInit {

  yes: string = 'Yes';
  no: string = 'No';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInput
    ) { }

  ngOnInit() 
  {
    if(this.data.yes)
      this.yes = this.data.yes;

    if(this.data.no || this.data.no === '')
      this.no = this.data.no;
  }

}
