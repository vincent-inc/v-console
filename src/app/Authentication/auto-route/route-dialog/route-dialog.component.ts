import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ObjectDialog, ObjectDialogData } from 'src/app/shared/dialog/object-dialog/object-dialog.component';
import { MethodName, Route, UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';

export interface RouteDialogData {
  selectedRoutes: Route[];
  userRoles: UserRole[];
  absolutePath: string;
  swaggerMethods: string[];
}

@Component({
  selector: 'app-route-dialog',
  templateUrl: './route-dialog.component.html',
  styleUrls: ['./route-dialog.component.scss']
})
export class RouteDialog implements OnInit, AfterContentChecked {

  routeDialogData!: RouteDialogData;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: {routeDialogData: RouteDialogData},
    private dialogRef: MatDialogRef<ObjectDialog>,
    private cd: ChangeDetectorRef,
    private authenticatorService: AuthenticatorService
  ) {}

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  ngOnInit(): void {
    this.routeDialogData = this.data.routeDialogData;
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  isMissingAnyMethod() {
    return this.routeDialogData.swaggerMethods.some(e => this.isMissingMethod(e));
  }

  isMissingMethod(name: string) {
    return !this.routeDialogData.selectedRoutes.some(e => e.method === name);
  }

  pushNewRoute(method: string) {
    let foundNormalRole = this.routeDialogData.userRoles.findIndex(e => e.name?.toLowerCase() === 'normal' || e.level === 1);
    let index = this.routeDialogData.swaggerMethods.findIndex(e => e === method);
    
    if (!this.routeDialogData.selectedRoutes.some(r => r.method === method)) {
      this.routeDialogData.selectedRoutes[index] = {
        id: 0,
        method: method,
        path: this.routeDialogData.absolutePath,
        secure: true,
        roles: foundNormalRole >= 0 ? [this.routeDialogData.userRoles[foundNormalRole]] : undefined
      };
    }
  }

  pushAllMissingRoute() {
    this.routeDialogData.swaggerMethods.forEach(method => {
      this.pushNewRoute(method);
    })
  }

  removeRoute(route: Route) {
    let index = this.routeDialogData.selectedRoutes.findIndex(e => e.method === route.method);
    this.routeDialogData.selectedRoutes.splice(index, 1);
  }
}
