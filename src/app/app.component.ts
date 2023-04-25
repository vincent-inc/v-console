import { Component } from '@angular/core';
import { AuthenticatorService } from './shared/service/Authenticator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'v-console';

  constructor() {}
}
