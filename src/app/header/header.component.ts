import { Component, Input, OnInit } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthenticatorService } from '../shared/service/Authenticator.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input()
  drawer?: MatDrawer;

  constructor(public authenticatorService: AuthenticatorService) { }

  ngOnInit() {
    this.authenticatorService.isLoginCallWithReroute();
  }

  logout(): void {
    this.authenticatorService.logout();
  }

}
