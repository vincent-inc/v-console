import { AfterContentChecked, ChangeDetectorRef, Directive } from "@angular/core";

export interface MatRow {

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