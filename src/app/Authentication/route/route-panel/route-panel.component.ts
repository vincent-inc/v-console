import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { ConfirmDialog } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { Route, UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';

@Component({
  selector: 'app-route-panel',
  templateUrl: './route-panel.component.html',
  styleUrls: ['./route-panel.component.scss']
})
export class RoutePanelComponent implements OnInit {

  @Input()
  route!: Route;

  routeCopy!: Route;

  @Input()
  userRoles!: UserRole[];

  @Output()
  editEvent: EventEmitter<Route> = new EventEmitter();

  @Output()
  deleteEvent: EventEmitter<Route> = new EventEmitter();

  constructor(private authenticatorService: AuthenticatorService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.reset();
  }

  addNewRole(userRoles: UserRole[]): void {
    const random = Math.floor(Math.random() * this.userRoles.length);
    userRoles.push(this.userRoles[random]);
  }

  isChange(): boolean {
    return JSON.stringify(this.route) !== JSON.stringify(this.routeCopy);
  }

  reset(): void {
    this.routeCopy = structuredClone(this.route);
  }
  
  save(): void {
    this.authenticatorService.patchRoute(this.routeCopy).pipe(first()).subscribe(
      res => {
        this.route = res;
        this.editEvent.emit(this.route);
        this.reset();
      }
    );
  }

  remove(): void {
    let dialog = this.matDialog.open(ConfirmDialog, {data: {title: `Deleting route id: ${this.routeCopy.id}`, message: "Are you sure you want to delete this route?"}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res) {
          this.deleteEvent.emit(this.route);
        }
      }
    );
  }

  removeRole(i: number): void {
    this.routeCopy.roles!.splice(i, 1);
  }
}
