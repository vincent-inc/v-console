import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { ConfirmDialog } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';
import { UtilsService } from 'src/app/shared/service/Utils.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

  userRoles: UserRole[] = [];
  userRolesCopy: UserRole[] = [];

  error: string = '';

  constructor(
    private authenticatorService: AuthenticatorService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.init();
  }

  init(): void {
    this.authenticatorService.getUserRoles().pipe(UtilsService.waitLoadingDialog(this.matDialog)).subscribe(
      res => {
        this.userRoles = res;
        this.userRolesCopy = structuredClone(res);
      }
    );
  }

  isValueChange(): boolean {
    return JSON.stringify(this.userRoles) !== JSON.stringify(this.userRolesCopy);
  }

  reverseChange(): void {
    this.userRoles = structuredClone(this.userRolesCopy);
  }

  addNewRole(): void {

    let dialog = this.matDialog.open(ConfirmDialog, { data: { title: "Create new role confirmation", message: 'Are you sure you want to create new role?\nAfter save it will be irreversible.' } });

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if (res) {
          let newRole: UserRole = {
            id: 0,
            name: '',
            level: 1
          }

          this.userRoles.push(newRole);
        }
      }
    )
  }

  async save(): Promise<void> {

    for (const e of this.userRoles) {
      if (e.id)
        await this.patchUserRole(e);
      else
        await this.createUserRole(e);
    }

    this.init();
  }

  async patchUserRole(userRole: UserRole): Promise<void> {
    return new Promise<void>((resolve) => {
      this.authenticatorService.patchUserRole(userRole).pipe(first()).subscribe(
        res => { },
        error => { },
        () => { resolve() }
      );
    })
  }

  async createUserRole(userRole: UserRole): Promise<void> {
    return new Promise<void>((resolve) => {
      this.authenticatorService.postUserRole(userRole).pipe(first()).subscribe(
        res => { },
        error => { },
        () => { resolve() }
      );
    })
  }

}
