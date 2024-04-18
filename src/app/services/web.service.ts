import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  FineRicoveroRequest,
  InizioRicoveroRequest,
  Ricovero,
} from 'src/types/Ricovero';
import { Reparto, RepartoRequest } from 'src/types/Reparto';
import { Paziente, PazienteRequest } from 'src/types/Paziente';
import { Impiegato, ImpiegatoRequest } from 'src/types/Impiegato';
import { User, UserRequest } from 'src/types/User';
@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private httpClient: HttpClient) {}

  private readonly apiUrl: string = `http://localhost:5003/medicuore`;
  //medicuore.eu-north-1.elasticbeanstalk.com

  getImpiegatiReparto(id: number): Observable<Impiegato[]> {
    return this.httpClient.get<Impiegato[]>(
      `${this.apiUrl}/impiegati/reparto/` + id
    );
  }

  getImpiegatiDimessi(): Observable<Impiegato[]> {
    return this.httpClient.get<Impiegato[]>(`${this.apiUrl}/impiegati/dimessi`);
  }

  getPazienti(): Observable<Paziente[]> {
    return this.httpClient.get<Paziente[]>(`${this.apiUrl}/pazienti/tutti`);
  }

  getPazientiNonRicoverati(): Observable<Paziente[]> {
    return this.httpClient.get<Paziente[]>(`${this.apiUrl}/pazienti/dimessi`);
  }

  paziente(id: number): Observable<Paziente> {
    return this.httpClient.get<Paziente>(
      `${this.apiUrl}/pazienti/cerca?id=` + id
    );
  }

  nuovoPaziente(paziente: PazienteRequest): Observable<Paziente> {
    return this.httpClient.put<Paziente>(
      `${this.apiUrl}/pazienti/nuovo`,
      paziente
    );
  }

  getImpiegatiAssunti(): Observable<Impiegato[]> {
    return this.httpClient.get<Impiegato[]>(`${this.apiUrl}/impiegati/assunti`);
  }

  dimissioniImpiegato(id: number): Observable<Impiegato> {
    return this.httpClient.delete<Impiegato>(
      `${this.apiUrl}/impiegati/dimissione?id=` + id
    );
  }

  nuovoImpiegato(impiegato: ImpiegatoRequest): Observable<Impiegato> {
    return this.httpClient.put<Impiegato>(
      `${this.apiUrl}/impiegati/aggiungi`,
      impiegato
    );
  }

  filterImpiegatiAssunti(impiegato: ImpiegatoRequest): Observable<Impiegato[]> {
    return this.httpClient.post<Impiegato[]>(
      `${this.apiUrl}/impiegati/filter/assunti`,
      impiegato
    );
  }

  filterImpiegatiDimessi(impiegato: ImpiegatoRequest): Observable<Impiegato[]> {
    return this.httpClient.post<Impiegato[]>(
      `${this.apiUrl}/impiegati/filter/dimessi`,
      impiegato
    );
  }

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
