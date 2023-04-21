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

@NgModule({
  declarations: [		
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SideDrawerComponent,
      LoginComponent,
      RegisterComponent
   ],
  imports: [
    NgEssentialModule,
    NgMaterialModule,
    NgComponentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
