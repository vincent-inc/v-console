import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { InputDialog } from 'src/app/shared/dialog/input-dialog/input-dialog.component';
import { Route, UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';
import { UtilsService } from 'src/app/shared/service/Utils.service';

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

  private setting = {
    element: {
      dynamicDownload: HTMLElement
    }
  }

  routes: Route[] = [];
  userRoles: UserRole[] = [];
  path: string = "/";

  constructor(
    private authenticatorService: AuthenticatorService,
    private utils: UtilsService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.updateRoutes();
    this.updateUserRoles();
  }

  updateUserRoles(): void {
    this.authenticatorService.getUserRoles().pipe(first()).subscribe(
      res => {
        this.userRoles = res
      },
      error => { }
    );
  }

  updateRoutes(): void {
    this.authenticatorService.getRoutes().pipe(first()).subscribe(
      res => {
        this.routes = res;
      },
      error => { }
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
      while (splits.length > numberOfDash + 1)
        splits.pop();
      let rPath = splits[splits.length - 1];
      let fPath = splits.join('/');

      let recommendPath: RecommendPath = {
        path: rPath,
        fullPath: fPath
      }

      if (!recommendPaths.some(e => e.fullPath === recommendPath.fullPath))
        recommendPaths.push({ path: rPath, fullPath: fPath });

    })

    return recommendPaths;
  }

  moveToRoute(route: string): void {
    this.path = route + '/';
  }

  editRoute(route: Route): void {
    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].id === route.id) {
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

    this.authenticatorService.postRoute(newRoute).pipe(first()).subscribe(
      res => {
        this.routes.push(res);
      }
    );
  }

  deleteRoute(route: Route): void {
    this.authenticatorService.deleteRoute(route.id!).pipe(first()).subscribe(
      res => {
        this.updateRoutes();
      }
    );
  }

  goBackRoute(): void {
    if (this.path.charAt(this.path.length - 1) === '/')
      this.path = this.path.substring(0, this.path.lastIndexOf("/"));

    this.path = this.path.substring(0, this.path.lastIndexOf("/")) + '/';

    if (this.path === '')
      this.path = '/';
  }

  validatorFn(value: string) {
    if (!value.startsWith('/'))
      return "Path need to start with /"

    return "";
  }

  exportRoute() {
    let dialog = this.matDialog.open(InputDialog, {
      width: '100%',
      data: { title: 'Save as', message: 'File Name' } 
    })
    
    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if (res)
          this.utils.saveFile(res + '.json', "application/json", JSON.stringify(this.routes));
      }
    );
  }

  async replaceRoute() {
    let file = await this.utils.uploadFile('application/json');
  }

}
