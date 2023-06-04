import { AfterContentInit, Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { Time } from '../../model/Mat.model';
import { AuthenticatorService } from '../../service/Authenticator.service';

export const TYPE = {DATE: 'DATE', TIME: 'TIME', DATE_TIME: 'DATE_TIME'};

@Component({
  selector: 'app-mat-form-field-input-time',
  templateUrl: './mat-form-field-input-time.component.html',
  styleUrls: ['./mat-form-field-input-time.component.scss'],
  providers: [{provide: MatFormFieldComponent, useExisting: forwardRef(() => MatFormFieldInputTimeComponent)}],
})
export class MatFormFieldInputTimeComponent extends MatFormFieldComponent {

  @Input()
  override value!: Time;
  override valueCopy!: Time;

  @Input()
  toValue!: Time;
  toValueCopy!: Time;

  startDate?: Date;
  endDate?: Date;

  @Output()
  override valueOutput: EventEmitter<Time> = new EventEmitter();

  @Output()
  toValueOutput: EventEmitter<Time> = new EventEmitter();

  @Input()
  type: string = TYPE.DATE;

  @Input()
  range: boolean = false;

  constructor(private authenticatorSerice: AuthenticatorService) {
    super()
  }

  async now() {
    let time = await this.authenticatorSerice.getTime();
    this.value = time; 
    this.valueCopy = structuredClone(time);
    this.toValue = structuredClone(time);
    this.toValueCopy = structuredClone(time);
  }

  async changeStartDate() {
    if(this.value === undefined || this.value === null || this.toValue === undefined || this.toValue === null)
      await this.now();

    this.value.year = this.startDate!.getFullYear();
    this.value.month = this.startDate!.getMonth() + 1;
    this.value.day = this.startDate!.getDate();
  }

  async changeEndDate() {
    if(this.value === undefined || this.value === null || this.toValue === undefined || this.toValue === null)
      await this.now();

    this.toValue.year = this.endDate!.getFullYear();
    this.toValue.month = this.endDate!.getMonth() + 1;
    this.toValue.day = this.endDate!.getDate();
  }

  async changeStartTime() {
    if(this.value === undefined || this.value === null || this.toValue === undefined || this.toValue === null)
      await this.now();

    this.value.hours = this.startDate!.getHours();
    this.value.minute = this.startDate!.getMinutes();
    this.value.second = this.startDate!.getSeconds();
  }

  async changeEndTime() {
    if(this.value === undefined || this.value === null || this.toValue === undefined || this.toValue === null)
      await this.now();

    this.toValue.hours = this.endDate!.getHours();
    this.toValue.minute = this.endDate!.getMinutes();
    this.toValue.second = this.endDate!.getSeconds();
  }


}
