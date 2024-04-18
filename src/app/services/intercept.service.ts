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
      const user = this.authService.getUser();
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Basic ${window.btoa(
            user.username + ':' + user.password
          )}`,
        }),
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
