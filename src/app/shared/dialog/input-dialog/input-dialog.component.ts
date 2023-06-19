import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogInput } from '../../model/Mat.model';

@Component({
  selector: 'app-input-dialog',
  templateUrl: './input-dialog.component.html',
  styleUrls: ['./input-dialog.component.scss']
})
export class InputDialog implements OnInit {

  yes: string = 'Save';
  no: string = 'Cancel';
  input: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogInput
    ) { }

  ngOnInit() 
  {
    if(this.data.yes)
      this.yes = this.data.yes;

    if(this.data.no || this.data.no === '')
      this.no = this.data.no;

    this.input = this.data.defaultValue ?? '';
  }

  getWidth(): number
  {
    if(this.input.length < 20)
      return 20;
    else
      return this.input.length;
  }

}
