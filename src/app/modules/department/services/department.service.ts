import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reparto, RepartoRequest } from 'src/types/Reparto';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private httpClient: HttpClient) {}

  private readonly apiUrl: string = `http://localhost:5003/medicuore/reparti`;

  getReparti(): Observable<Reparto[]> {
    return this.httpClient.get<Reparto[]>(`${this.apiUrl}`);
  }

  getReparto(id: number): Observable<Reparto> {
    return this.httpClient.get<Reparto>(`${this.apiUrl}/cerca?id=` + id);
  }

  nuovoReparto(reparto: RepartoRequest): Observable<Reparto> {
    return this.httpClient.put<Reparto>(`${this.apiUrl}/nuovo`, reparto);
  }
}
