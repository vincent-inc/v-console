import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgEssentialModule } from './shared/module/ng-essential.module';
import { NgMaterialModule } from './shared/module/ng-material.module';
import { NgComponentModule } from './shared/module/ng-component.module';
import { HomeComponent } from './home/home.component';
import { SideDrawerComponent } from './side-drawer/side-drawer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgDialogModule } from './shared/module/ng-dialog.module ';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './shared/guards/auth.interceptor';
import { RequestSenderComponent } from './request-sender/request-sender.component';
import { RouteComponent } from './Authentication/route/route.component';
import { RoutePanelComponent } from './Authentication/route/route-panel/route-panel.component';
import { UserRoleComponent } from './Authentication/user-role/user-role.component';
import { UsersComponent } from './Authentication/users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SideDrawerComponent,
    LoginComponent,
    RegisterComponent,
    RequestSenderComponent,
    RouteComponent,
    RoutePanelComponent,
    UsersComponent,
    UserRoleComponent
  ],
  imports: [
    NgEssentialModule,
    NgMaterialModule,
    NgComponentModule,
    NgDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
