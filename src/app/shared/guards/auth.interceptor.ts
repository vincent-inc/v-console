import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticatorService } from '../service/Authenticator.service';

const headers = new HttpHeaders().set('content-type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor
{
  constructor(private authenticatorService: AuthenticatorService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> 
  {
    let body = req.body;
    let jwt = this.authenticatorService.getJwt();

    if(body && typeof body === 'string')
      return next.handle(req.clone({
        headers: req.headers.set('Content-Type', 'application/json')
                            .set('Authorization', `Bearer ${jwt}`),
      }));

    return next.handle(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwt}`),
    }));
  }
}
