import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { MatOption } from '../../model/Mat.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-mat-form-field-input-option',
  templateUrl: './mat-form-field-input-option.component.html',
  styleUrls: ['./mat-form-field-input-option.component.scss'],
  providers: [{provide: MatFormFieldComponent, useExisting: forwardRef(() => MatFormFieldInputOptionComponent)}],
})
export class MatFormFieldInputOptionComponent extends MatFormFieldComponent {

  @Input()
  options: MatOption[] = [];

  @Input()
  noneLabel = 'None';

  @Output()
  opened: EventEmitter<void> = new EventEmitter();

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  @Output()
  selectionChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    super();
  }

  emitOpened() {
    this.opened.emit();
  }

  emitClosed() {
    this.closed.emit();
  }

  emitSelectionChange(matSelectChange: MatSelectChange) {
    this.selectionChange.emit(matSelectChange.value);
  }
}
