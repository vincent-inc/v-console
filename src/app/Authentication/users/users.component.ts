import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { first } from 'rxjs';
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
    ) { }
  
  ngOnInit() {
    this.updateUser();
  }

  updateUser()
  {
    this.authenticatorService.getAllUsers().pipe(first()).subscribe(
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
    // let dialog = this.matDialog.open(CreateUserDialog);

    // dialog.afterClosed().pipe(first()).subscribe(
    //   res => {
    //     this.updateUser();
    //   }
    // );
  }
  
  editUser(row: UserRow)
  {
    // let dialog = this.matDialog.open(UserDetailDialog, {data: {userID: row.id}});

    // dialog.afterClosed().pipe(first()).subscribe(
    //   res => {
    //     if(res)
    //     {
    //       let index = this.dataSource.data.indexOf(row);

    //       this.authenticatorService.getUserByID(row.id!).pipe(first()).subscribe(
    //         res => {
    //           this.updateUser();
    //         }
    //       );
    //     }
    //   }
    // );
  }

}
