import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InizioRicoveroRequest, Ricovero } from 'src/types/Ricovero';
import { Reparto, RepartoRequest } from 'src/types/Reparto';
import { Paziente, PazienteRequest } from 'src/types/Paziente';
import { Impiegato, ImpiegatoRequest } from 'src/types/Impiegato';
import { User, UserRequest } from 'src/types/User';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  constructor(private httpClient: HttpClient, private route: Router) {}

  private readonly apiUrl: string = `http://localhost:8080`;

  getReparti(): Observable<Reparto[]> {
    return this.httpClient.get<Reparto[]>(`${this.apiUrl}/reparti`);
  }

  getReparto(id: number): Observable<Reparto> {
    return this.httpClient.get<Reparto>(
      `${this.apiUrl}/reparti/cerca?id=` + id
    );
  }

  nuovoReparto(reparto: RepartoRequest): Observable<Reparto> {
    return this.httpClient.put<Reparto>(
      `${this.apiUrl}/reparti/nuovo`,
      reparto
    );
  }

  getRicoveriAttivi(): Observable<Ricovero[]> {
    return this.httpClient.get<Ricovero[]>(`${this.apiUrl}/ricoveri/attivi`);
  }

  getRicoveriReparto(id: number): Observable<Ricovero[]> {
    return this.httpClient.get<Ricovero[]>(
      `${this.apiUrl}/ricoveri/attivi/reparto/` + id
    );
  }

  nuovoRicovero(ricoveri: InizioRicoveroRequest): Observable<Ricovero> {
    return this.httpClient.put<Ricovero>(
      `${this.apiUrl}/ricoveri/nuovo`,
      ricoveri
    );
  }

  getRicoveriPaziente(id: number): Observable<Ricovero[]> {
    return this.httpClient.get<Ricovero[]>(
      `${this.apiUrl}/ricoveri/paziente?id_p=` + id
    );
  }

  getImpiegatiReparto(id: number): Observable<Impiegato[]> {
    return this.httpClient.get<Impiegato[]>(
      `${this.apiUrl}/impiegati/reparto/` + id
    );
  }

  getPazienti(): Observable<Paziente[]> {
    return this.httpClient.get<Paziente[]>(`${this.apiUrl}/pazienti/tutti`);
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

  nuovoImpiegato(impiegato: ImpiegatoRequest): Observable<Impiegato> {
    return this.httpClient.put<Impiegato>(
      `${this.apiUrl}/impiegati/aggiungi`,
      impiegato
    );
  }

  nuovoUtente(utente: UserRequest): Observable<User> {
    return this.httpClient.put<User>(`${this.apiUrl}/register`, utente);
  }

  roleUser(user: UserRequest): Observable<string> {
    return this.httpClient.get<string>(`${this.apiUrl}/role`);
  }
}
