import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { UserDialog } from 'src/app/shared/dialog/user-dialog/user-dialog.component';
import UserRow, { User, UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit  {
  
  userRows: UserRow[] = [];

  constructor(
    private authenticatorService: AuthenticatorService,
    private matDialog: MatDialog
    ) { }
  
  ngOnInit() {
    this.updateUser();
  }

  updateUser()
  {
    this.authenticatorService.getUsers().pipe(first()).subscribe(
      res => {
      this.userRows = [];
      res.forEach((u) => {
        this.userRows.push(this.convertUserData(u));
      })
    });
  }

  convertUserData(user: User): UserRow
  {
    let userTable: UserRow = {
      id:                    user.id,
      username:              user.username!,
      enable:                user.enable,
      email:                 this.getEmail(user)!,
      userRoles:             this.getRole(user),
    }

    return userTable;
  }

  private getEmail(user: User) {
    if(user.userProfile)
      return user.userProfile.email;
    else
      return "";
  }

  private getRole(user: User)
  {
    if(user.userRoles)
    {
      let result: string[] = [];
      user.userRoles.forEach(r => result.push(r.name!))
      return result.join(', ');
    }

    return "";
  }

  createNewUser(): void
  {
    let dialog = this.matDialog.open(UserDialog, {data: {userId: 0}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
          this.updateUser();
      }
    );
  }
  
  editUser(row: UserRow)
  {
    let dialog = this.matDialog.open(UserDialog, {data: {userId: row.id}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
          this.updateUser();
      }
    );
  }

}
