import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { first } from 'rxjs';
import { Route, UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';

interface RecommendPath {
  path: string;
  fullPath: string;
}

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

  updateUserRoles(): void {
    this.authenticatorService.getAllRoles().pipe(first()).subscribe(
      res => {
        this.userRoles = res
      },
      error => {}
    );
  }

  updateRoutes(): void {
    this.authenticatorService.getAllRoutes().pipe(first()).subscribe(
      res => {
        this.routes = res;        
      },
      error => {}
    );
  }

  getExactRoutes(): Route[] {
    let filterRoutes: Route[];
    let cPath = this.path.endsWith('/') ? this.path.substring(0, this.path.length - 1) : this.path;
    filterRoutes = this.routes.filter((r) => {
      return r.path === cPath;
    })
    return filterRoutes;
  }
  
  getFilterRoutes(): Route[] {
    let filterRoutes: Route[];
    filterRoutes = this.routes.filter((r) => {
      return r.path!.includes(this.path) && r.path !== this.path;
    })
    return filterRoutes;
  }

  getRecommendPath(): RecommendPath[] {
    let filterRoutes = this.getFilterRoutes();
    let recommendPaths: RecommendPath[] = [];
    let numberOfDash: number = this.path.split('/').length - 1;
    filterRoutes.forEach(e => {
      let splits = e.path!.split('/');
      while(splits.length > numberOfDash + 1)
        splits.pop();
      let rPath = splits[splits.length - 1];
      let fPath = splits.join('/');

      let recommendPath: RecommendPath = {
        path: rPath,
        fullPath: fPath
      }

      if(!recommendPaths.some(e => e.fullPath === recommendPath.fullPath))
        recommendPaths.push({path: rPath, fullPath: fPath});

    })

    return recommendPaths;
  }

  moveToRoute(route: string): void {
    this.path = route + '/';
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

  addNewRoute(): void {
    let cPath = this.path.endsWith('/') ? this.path.substring(0, this.path.length - 1) : this.path;

    let newRoute: Route = {
      path: cPath,
      method: 'GET',
      secure: false,
      roles: []
    };

    this.authenticatorService.postRoutes(newRoute).pipe(first()).subscribe(
      res => {
        this.routes.push(res);
      }
    );
  }

  deleteRoute(route: Route): void {
    this.authenticatorService.deleteRoutes(route.id!).pipe(first()).subscribe(
      res => {
        this.updateRoutes();
      }
    );
  }

  goBackRoute(): void {
    if(this.path.charAt(this.path.length - 1) === '/')
      this.path = this.path.substring(0, this.path.lastIndexOf("/"));
    
    this.path = this.path.substring(0, this.path.lastIndexOf("/"));
    if(this.path === '')
      this.path = '/';
  }

  validatorFn(value: string) {
    if(!value.startsWith('/'))
      return "Path need to start with /"

    return "";
  }
}
