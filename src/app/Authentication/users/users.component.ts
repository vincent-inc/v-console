import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
import { ObjectDialog, ObjectDialogData } from 'src/app/shared/dialog/object-dialog/object-dialog.component';
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
      email:                 user.email ?? '',
      userRoles:             this.getRole(user),
    }

    return userTable;
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
    let dialog = this.matDialog.open(UserDialog, {data: {userId: row.id}, width: '100%'},);

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res)
          this.updateUser();
      }
    );

    // let objectDialogData: ObjectDialogData<User> = {
    //   id: row.id,
    //   title: 'Edit User',
    //   service: this.authenticatorService,
    //   getFn: (service, id) => row,
    //   modifyFn: (service, value) => {
    //     service.patchUser(value).pipe(first()).subscribe(
    //       res => {
    //         this.updateUser();
    //       }
    //     )
    //   }
    // }

    // let dialog = this.matDialog.open(ObjectDialog, {data: {object: row}});
  }

}
