import { AuthService } from './auth.service';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptService implements HttpInterceptor {
  username: string | null = sessionStorage.getItem('username');
  password: string | null = sessionStorage.getItem('password');

  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.authService.isUserLoggedIn() &&
      req.url.indexOf('basicauth') === -1
    ) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Basic ${window.btoa(
            this.authService.username + ':' + this.authService.password
          )}`,
        }),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
