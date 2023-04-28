import { Component } from '@angular/core';
import { AuthenticatorService } from './shared/service/Authenticator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'v-console';

  constructor(private router: Router) {}

}
