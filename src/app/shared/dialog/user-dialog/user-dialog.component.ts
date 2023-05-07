import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AuthenticatorService } from '../../service/Authenticator.service';
import { User, UserRole } from '../../model/Authenticator.model';
import { first } from 'rxjs';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialog implements OnInit {

  user!: User;
  userClone!: User;

  userRoles: UserRole[] = [];

  usernameExist: boolean = false;

  usernameError: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {userId: number},
    private dialogRef: MatDialogRef<UserDialog>,
    private authenticatorService: AuthenticatorService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    let id = this.data.userId;
    this.authenticatorService.getAllRoles().pipe(first()).subscribe(
      res => this.userRoles = res,
      error => {}
    );

    if(id === 0) {
      this.user = {
        id: 0,
        username: '',
        password: '',
        userProfile: {
          firstName:   '',
          lastName:    '',
          phoneNumber: '',
          email:       '',
          address:     '',
          city:        '',
          state:       '',
          zip:         '',
          alias:       '',
        },
        enable: true,
      }

      this.userClone = structuredClone(this.user);
    }
    else {
      this.authenticatorService.getUser(id).pipe(first()).subscribe(
        res => {
          this.user = res; 
          if(!this.user.userProfile)
            this.user.userProfile = {
              firstName:   '',
              lastName:    '',
              phoneNumber: '',
              email:       '',
              address:     '',
              city:        '',
              state:       '',
              zip:         '',
              alias:       '',
            }
          this.userClone = structuredClone(res);
        },
        error => this.dialogRef.close()
      );
    }
    
  }

  checkUsername(): void
  {
    if(this.user.username)
      this.authenticatorService.isUsernameExist(this.user.username).pipe(first()).subscribe(
        res => this.usernameExist = true,
        error => this.usernameExist = false
      );
  }

  isValueChange(): boolean
  {
    return JSON.stringify(this.user) !== JSON.stringify(this.userClone);
  }

  revert()
  {
    this.user = structuredClone(this.userClone);
  }

  save(): void
  {
    if(this.user.id === 0) {
      this.authenticatorService.postUser(this.user).pipe(first()).subscribe(
        res => {
          this.dialogRef.close('save')
        },
        err => {
          window.alert('Technical difficulty, please try again latter');
          this.dialogRef.close('');
        }
      );
    }
    else {
      this.authenticatorService.patchUser(this.user).pipe(first()).subscribe(
        res => {
          this.dialogRef.close('save')
        },
        err => {
          window.alert('Technical difficulty, please try again latter');
          this.dialogRef.close('');
        }
      );
    }
  }

  validateUsername() {
    if(this.user.username === this.userClone.username) {
      this.usernameError = "";
      return;
    }

    this.authenticatorService.isUsernameExist(this.user.username!).pipe(first()).subscribe(
      res => {
        this.usernameError = res.exist ? "Username already exist" : "";
      }
    );
  }

  addNewRole(): void {
    const random = Math.floor(Math.random() * this.userRoles.length);
    let role = structuredClone(this.userRoles[random]);
    this.user.userRoles!.push(role);
  }

  removeUserRole(index: number) {
    this.user.userRoles!.splice(index, 1);
  }
}
