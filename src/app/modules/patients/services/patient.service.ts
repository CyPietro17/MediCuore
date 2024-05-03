import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVER } from 'src/constants/constants';
import { Paziente, PazienteRequest } from 'src/types/Paziente';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  private readonly apiUrl: string = URL_SERVER + `/pazienti`;

  getPazienti(): Observable<Paziente[]> {
    return this.httpClient.get<Paziente[]>(`${this.apiUrl}/tutti`);
  }

  getPazientiNonRicoverati(): Observable<Paziente[]> {
    return this.httpClient.get<Paziente[]>(`${this.apiUrl}/dimessi`);
  }

  paziente(id: number): Observable<Paziente> {
    return this.httpClient.get<Paziente>(`${this.apiUrl}/cerca?id=` + id);
  }

  nuovoPaziente(paziente: PazienteRequest): Observable<Paziente> {
    return this.httpClient.put<Paziente>(`${this.apiUrl}/nuovo`, paziente);
  }
}
