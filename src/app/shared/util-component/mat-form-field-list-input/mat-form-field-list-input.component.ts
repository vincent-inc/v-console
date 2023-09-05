import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';

@Component({
  selector: 'app-mat-form-field-list-input',
  templateUrl: './mat-form-field-list-input.component.html',
  styleUrls: ['./mat-form-field-list-input.component.scss'],
  providers: [{provide: MatFormFieldComponent, useExisting: forwardRef(() => MatFormFieldListInputComponent)}],
})
export class MatFormFieldListInputComponent extends MatFormFieldComponent implements OnInit {

  @Input()
  inputType: string = 'object';

  @Input()
  override value: any[] = [];

  @Output()
  override valueOutput: EventEmitter<any[]> = new EventEmitter();
  
  @Input()
  showSizeInput: boolean = true;
  
  @Input()
  maxSize: number = 10;

  listLength!: number;

  validForm: boolean = false;

  constructor() {
    super();
  }

  override ngOnInit() {
    this.listLength = this.value.length;
  }

  override isValidInput(): boolean {
    let superCheck = super.isValidInput();
    if(!superCheck)
      return superCheck;
    else
      return this.validForm;
  }

  updateListLength() {
    if(this.reachMaxSize())
      this.listLength = this.maxSize;

    while(this.value.length < this.listLength)
      this.value.push(this.inputType === 'object' ? {} : '');

    if(this.value.length > this.listLength) {
      let deleteSize = this.value.length - this.listLength
      this.value.splice(this.listLength - 1, deleteSize);
    }
    
    this.listLength = this.value.length;
  }

  addNewItem() {
    if(!this.reachMaxSize())
      this.value.push(this.inputType === 'object' ? {} : '');
    this.listLength = this.value.length;
  }

  clone(obj: any): any {
    return structuredClone(obj);
  }

  remove(index: number): void {
    this.value.splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  reachMaxSize(): boolean {
    return this.value.length >= this.maxSize;
  }

}
