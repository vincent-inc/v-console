import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
import { MethodName, Path, Route, Swaggers, UserRole } from 'src/app/shared/model/Authenticator.model';
import { AuthenticatorService } from 'src/app/shared/service/Authenticator.service';
import { UtilsService } from 'src/app/shared/service/Utils.service';
import { RouteDialog, RouteDialogData } from './route-dialog/route-dialog.component';

@Component({
  selector: 'app-auto-route',
  templateUrl: './auto-route.component.html',
  styleUrls: ['./auto-route.component.scss']
})
export class AutoRouteComponent implements OnInit {

  swaggers!: Swaggers[];
  routes!: Route[];
  tempRoutes!: Route[];
  userRoles: UserRole[] = [];
  searchText: string = '';
  blankPath: Path = new Path();

  constructor(private authenticatorService: AuthenticatorService, private matDialog: MatDialog) { }

  ngOnInit() {
    this.authenticatorService.getSwagger().pipe(first()).subscribe({
      next: res => {
        this.swaggers = res;
      }
    });

    this.authenticatorService.getRoutes().pipe(first()).subscribe({
      next: res => {
        this.routes = res;
        this.tempRoutes = structuredClone(res);
      }
    });

    this.authenticatorService.getUserRoles().pipe(first()).subscribe({
      next: res => {
        this.userRoles = res;
      }
    })
  }

  processPath(paths: Path[]): Path[] {
    let newPaths: Path[] = [];

    paths.forEach(e => {
      if(!newPaths.some(path => path.path === e.path))
        newPaths.push(e);
    })
    
    return newPaths;
  }

  containIgnoreCase(target: string, text: string) {
    return target.toLowerCase().match(text.toLowerCase());
  }

  getRoutes(absolutePath: string): Route[] {
    return  this.tempRoutes.filter(e => e.path === absolutePath)
  }

  editGlobalRule(prefix: string) {
    if(prefix.charAt(0) !== '/')
      prefix = `/${prefix}`;

    let absolutePath = `${prefix}/.*`;
    let swaggerMethods: string[] = [];
    for(let method in MethodName) 
      swaggerMethods.push(method);
    
    this.editRule(absolutePath, swaggerMethods);
  }

  editRule(path: string, swaggerMethods: string[]) {
    let selectedRoutes = this.getRoutes(path);
    let routeDialogData: RouteDialogData = {
      absolutePath: path,
      selectedRoutes: selectedRoutes,
      userRoles: this.userRoles,
      swaggerMethods: swaggerMethods
    }

    let dialog = this.matDialog.open(RouteDialog, {data: {routeDialogData}, width: "100%"});

    dialog.afterClosed().subscribe({
      next: res => {
        let newRoutes: Route[] = res;
        newRoutes.forEach(e => {
          console.log(e);
          let index = this.tempRoutes.findIndex(r => r.path === e.path && r.method === e.method);
          if(index >= 0)
            this.tempRoutes[index] = e;
          else
            this.tempRoutes.push(e);
        })
        console.log(this.tempRoutes);
      }
    })
  }

  isRouteChange() {
    return UtilsService.isNotEqual(this.routes, this.tempRoutes);
  }
}

