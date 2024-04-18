import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paziente, PazienteRequest } from 'src/types/Paziente';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private httpClient: HttpClient) {}

  private readonly apiUrl: string = `http://localhost:5003/medicuore/pazienti`;

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
