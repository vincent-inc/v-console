import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jwt, User } from '../model/Authenticator.model';
import { SettingService } from './Setting.service';
import { Observable, first, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatorService {

  jwt?: string | null;
  private currentUser: User | undefined | null;
  isLoginB: boolean = false;

  private prefix = "authenticator"

  constructor(private httpClient: HttpClient, private router: Router, private settingService: SettingService) { 
    this.jwt = sessionStorage.getItem("jwt");
    setInterval(() => {
      this.isLoginCall();
    }, 120000); //2 mins
  }

  healthCheck(): Observable<string> {
    return this.httpClient.get<string>(`${this.settingService.getGatewayUrl()}/_status/healthz`);
  }

  // Authentication
  login(user: {username: string, password: string}): Observable<Jwt>{
    return this.httpClient.post<Jwt>(`${this.settingService.getGatewayUrl()}/${this.prefix}/auth/login`, user);
  }

  private async updateUser(): Promise<void>
  {
    return new Promise<void>((resolve, reject) => {
      this.httpClient.get<User>(`${this.settingService.getGatewayUrl()}/${this.prefix}/users`)
      .pipe(first()).subscribe(
        res => {
          this.currentUser = res;
          this.isLoginB = true;
        },
        error => {
          this.currentUser = null;
          this.isLoginB = false;
        },
        () => resolve()
      );
    });
  }

  async autoUpdateUserWithJwt(jwt: string): Promise<void>
  {
    this.jwt = jwt;
    sessionStorage.setItem("jwt", jwt);
    await this.autoUpdateUser();
  }

  async autoUpdateUser(): Promise<void>
  {
    await this.updateUser().then().catch();
  }

  isLoginCall(): void {
    this.isLogin().pipe(first()).subscribe(
      async res => {
        this.isLoginB = true
      },
      error => {
        this.isLoginB = false
      }
    );
  }

  isLoginCallWithReroute(navigate: string): void {
    this.isLogin().pipe(first()).subscribe(
      async res => {
        this.isLoginB = true;
        this.router.navigate([navigate]);
      },
      error => {
        this.isLoginB = false;
        this.router.navigate(["/login"]);
      }
    );
  }

  isLogin(): Observable<void> {
    return this.httpClient.get<void>(`${this.settingService.getGatewayUrl()}/${this.prefix}/auth`);
  }

  logout(): void {
    sessionStorage.removeItem("jwt");
    this.isLoginB = false;
    this.httpClient.get<void>(`${this.settingService.getGatewayUrl()}/${this.prefix}/auth/logout`).pipe(first()).subscribe(
      res => {},
      error => {},
      () => {
        this.jwt = null;
        this.router.navigate(["/login"]);
      }
    );
  }

  getJwt(): string {
    if(this.jwt === null || this.jwt === undefined)
      this.router.navigate(['login']);
    return this.jwt!;
  }

  // USERs
  public getCurrentLoginUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.settingService.getGatewayUrl()}/${this.prefix}/users`);
  }
}
