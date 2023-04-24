import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatFormFieldAppearance, MatFormFieldDefaultOptions } from '@angular/material/form-field';



@Component({
  selector: 'app-mat-form-field-input',
  templateUrl: './mat-form-field-input.component.html',
  styleUrls: ['./mat-form-field-input.component.scss']
})
export class MatFormFieldInputComponent implements OnInit
{
  
  @Input()
  value: string = '';

  @Output()
  valueOutput: EventEmitter<string> = new EventEmitter();

  @Input()
  placeholder: string = '';

  @Input()
  appearance: string = 'fill';

  @Input()
  matColor: ThemePalette = 'primary';

  @Input()
  width: number = 40;

  @Input()
  label: string = '';

  @Input()
  styleWidth?: string;
  
  @Input()
  required: boolean = false;

  @Input()
  autoResize: boolean = false;

  @Input()
  disable: boolean = false;

  @Input()
  showGoto: boolean = false;

  @Input()
  showVisibleSwitch: boolean = false;

  @Input()
  showCopyToClipboard: boolean = false;

  @Input()
  showGenerateValue: boolean = false;

  //input copy
  @Input()
  copyDisplayMessage: string = this.value;

  //switch
  @Input()
  switchVisibility: boolean = false;

  @Input()
  defaultType: string = 'text';

  @Input()
  switchType: string = 'password';

  @Input()
  onIcon: string = 'visibility';

  @Input()
  offIcon: string = 'visibility_off';

  constructor() { }

  ngOnInit() {
  }

  emitValue(): void
  {
    this.valueOutput.emit(this.value);
  }

  clear(): void
  {
    this.value = '';
    this.valueOutput.emit(this.value);
  }

  getSize(data: string): number
  {
    let offset = 10;
    if(this.showCopyToClipboard)
      offset += 5;
    if(this.showGenerateValue)
      offset += 5;
    if(this.showGoto)
      offset += 5;
    if(this.showVisibleSwitch)
      offset += 5;
    
    if(!this.autoResize)
      return this.width;

    if(data.length <= 10)
      return this.width;
    else
      return data.length + offset;
  }

  getAppearance(): MatFormFieldAppearance
  {
    let appearance: MatFormFieldAppearance = 'fill';
    switch(this.appearance.toLowerCase())
    {
      case 'fill':
      case '1':
        appearance = 'fill'
        break;

      case 'outline':
      case '2':
        appearance = 'outline'
        break;

      default:
        break;
    }

    return appearance;
  }

  openLink(link: string): void
  {
    window.open(link);
  }
  
}