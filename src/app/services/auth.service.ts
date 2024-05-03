import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { URL_SERVER } from 'src/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';
  USER_NAME_SESSION_ATTRIBUTE_NAME_PWD = 'authenticatedUserPWD';

  public username!: string | null;
  public password!: string | null;
  constructor(private http: HttpClient) {}

  authenticationService(username: string, password: string) {
    return this.http
      .get(URL_SERVER + `/auth`, {
        headers: {
          authorization: this.createBasicAuthToken(username, password),
        },
      })
      .pipe(
        map((res) => {
          this.username = username;
          this.password = password;
          this.registerSuccessfulLogin(username, password);
        })
      );
  }

  createBasicAuthToken(username: string, password: string) {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem(
      this.USER_NAME_SESSION_ATTRIBUTE_NAME_PWD,
      JSON.stringify({ username, password })
    );
  }

  /* logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  } */

  isUserLoggedIn() {
    let user = sessionStorage.getItem(
      this.USER_NAME_SESSION_ATTRIBUTE_NAME_PWD
    );
    if (user === null) return false;
    return true;
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) return '';
    return user;
  }

  getUser() {
    let user = JSON.parse(
      sessionStorage.getItem(
        this.USER_NAME_SESSION_ATTRIBUTE_NAME_PWD
      ) as string
    );
    return user;
  }

  getUserSession(username: string, password: string): boolean {
    const sessionResponse = JSON.parse(
      sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME_PWD)!
    );
    if (
      sessionResponse.username === username &&
      sessionResponse.password === password
    ) {
      return true;
    } else {
      return false;
    }
  }

  isAdminRole(): boolean {
    if (sessionStorage.getItem('role') === 'ADMIN') {
      return true;
    } else {
      return false;
    }
  }
}
