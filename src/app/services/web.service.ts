import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserRequest } from 'src/types/User';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private httpClient: HttpClient) {}

  private readonly apiUrl: string = `http://localhost:5003/medicuore`;
  //medicuore.eu-north-1.elasticbeanstalk.com

  nuovoUtente(utente: UserRequest): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/register`, utente);
  }

  roleUser(user: UserRequest): Observable<string> {
    return this.httpClient.post<string>(`${this.apiUrl}/role`, user);
  }

  login(user: UserRequest): Observable<User> {
    return this.httpClient.post<User>(`${this.apiUrl}/login`, user);
  }
}
