import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Route, UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {

  routes: Route[] = [];
  userRoles: UserRole[] = [];
  validPath: boolean = false;
  path: string = "/";

  constructor(private authenticatorService: AuthenticatorService) { }

  ngOnInit() {
    this.updateRoutes();
    this.updateUserRoles();
  }

  private updateUserRoles(): void {
    this.authenticatorService.getAllRoles().pipe(first()).subscribe(
      res => {
        this.userRoles = res
      },
      error => {}
    );
  }

  private updateRoutes(): void {
    this.authenticatorService.getAllRoutes().pipe(first()).subscribe(
      res => {
        this.routes = res;        
      },
      error => {}
    );
  }

  getExactRoutes(): Route[] {
    let filterRoutes: Route[] = [];
    filterRoutes = this.routes.filter((r) => {
      return r.path === this.path
    })
    return filterRoutes;
  }
  
  getRoutes(): Route[] {
    let filterRoutes: Route[] = [];
    filterRoutes = this.routes.filter((r) => {
      return r.path.includes(this.path) && r.path !== this.path;
    })
    return filterRoutes;
  }

  moveToRoute(route: string): void {
    this.path = route;
  }

  editRoute(route: Route): void {
    for(let i = 0; i < this.routes.length; i++) {
      if(this.routes[i].id === route.id)
      {
        this.routes[i] = route;
        break;
      }
    }
  }

  deleteRoute(route: Route): void {
    this.routes = this.routes.filter(e => e.id === route.id);
  }

  goBackRoute(): void {
    this.path = this.path.substring(0, this.path.lastIndexOf("/"));
  }

  validatorFn(value: string) {
    if(!value.startsWith('/'))
      return "Path need to start with /"

    return "";
  }
}
