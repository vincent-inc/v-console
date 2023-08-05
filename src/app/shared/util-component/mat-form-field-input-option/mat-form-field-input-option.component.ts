import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { MatOption } from '../../model/Mat.model';

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

  constructor() {
    super();
  }
}
