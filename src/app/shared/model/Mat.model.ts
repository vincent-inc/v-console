import { AfterContentChecked, ChangeDetectorRef, Directive } from "@angular/core";

export interface MatRow {

}

export interface MatOption {
    value: any, 
    valueLabel: string, 
    disable?: boolean
}

export interface Time {
    id?: number;
    year?: number;
    month?: number;
    day?: number;
    hours?: number;
    minute?: number;
    second?: number;
}