import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Jwt, User } from '../model/Authenticator.model';
import { SettingService } from './Setting.service';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  jwt?: string | null;
  private currentUser: User | undefined | null;

  private prefix = "authenticator"

  constructor(private httpClient: HttpClient, private router: Router, private settingService: SettingService) { }

  healthCheck(): Observable<string> {
    return this.httpClient.get<string>(`${this.settingService.getGatewayUrl()}/_status/healthz`);
  }

  // Authentication
  login(user: {username: string, password: string}): Observable<Jwt>{
    const userFormData = new HttpParams()
      .append('username', user.username)
      .append('password', user.password);
    
    return this.httpClient.post<Jwt>(`${this.settingService.getGatewayUrl()}/${this.prefix}/login`, userFormData);
  }
  
  private async updateUser()
  {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.get<User>(`${this.settingService.getGatewayUrl()}/${this.prefix}/users`)
      .pipe(first()).subscribe(
        res => {this.currentUser = res},
        error => {this.currentUser = null},
        () => resolve()
      );
    });
  }

  async autoUpdateUser()
  {
    const updateUser = await this.updateUser().then().catch();
  }


  getJwt(): string {
    if(this.jwt === null || this.jwt === undefined)
      this.router.navigate(['login']);
    return this.jwt!;
  }

}
