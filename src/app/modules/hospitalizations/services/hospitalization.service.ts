import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVER } from 'src/constants/constants';
import {
  Ricovero,
  FineRicoveroRequest,
  InizioRicoveroRequest,
} from 'src/types/Ricovero';

@Injectable({
  providedIn: 'root',
})
export class HospitalizationService {
  constructor(private httpClient: HttpClient) {}

  private readonly apiUrl: string = URL_SERVER + `/ricoveri`;

  cercaRicovero(id: number): Observable<Ricovero> {
    return this.httpClient.get<Ricovero>(`${this.apiUrl}/cerca?id=` + id);
  }

  chiudiRicovero(ricovero: FineRicoveroRequest): Observable<Ricovero> {
    return this.httpClient.post<Ricovero>(`${this.apiUrl}/chiudi`, ricovero);
  }

  getRicoveriAttivi(): Observable<Ricovero[]> {
    return this.httpClient.get<Ricovero[]>(`${this.apiUrl}/attivi`);
  }

  getRicoveriReparto(id: number): Observable<Ricovero[]> {
    return this.httpClient.get<Ricovero[]>(
      `${this.apiUrl}/attivi/reparto/` + id
    );
  }

  nuovoRicovero(ricoveri: InizioRicoveroRequest): Observable<Ricovero> {
    return this.httpClient.put<Ricovero>(`${this.apiUrl}/nuovo`, ricoveri);
  }

  getRicoveriPaziente(id: number): Observable<Ricovero[]> {
    return this.httpClient.get<Ricovero[]>(
      `${this.apiUrl}/paziente?id_p=` + id
    );
  }
}
