import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { Time } from '../../model/Mat.model';
import { AuthenticatorService } from '../../service/Authenticator.service';

@Component({
  selector: 'app-mat-form-field-input-time',
  templateUrl: './mat-form-field-input-time.component.html',
  styleUrls: ['./mat-form-field-input-time.component.scss']
})
export class MatFormFieldInputTimeComponent extends MatFormFieldComponent implements AfterContentInit {

  @Input()
  override value!: Time;

  override valueCopy!: Time;

  constructor(private authenticatorSerice: AuthenticatorService) {
    super()
  }
  
  async ngAfterContentInit(): Promise<void> {
    if(this.value === undefined) {
      let time = await this.authenticatorSerice.getTime();
      this.value = time; 
      this.valueCopy = structuredClone(time)
    }
  }
}
