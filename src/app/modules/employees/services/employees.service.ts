import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_SERVER } from 'src/constants/constants';
import { Impiegato, ImpiegatoRequest } from 'src/types/Impiegato';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  constructor(private httpCilent: HttpClient) {}

  private readonly apiUrl: string = URL_SERVER + `/impiegati`;

  getImpiegatiReparto(id: number): Observable<Impiegato[]> {
    return this.httpCilent.get<Impiegato[]>(`${this.apiUrl}/reparto/` + id);
  }

  getImpiegatiDimessi(): Observable<Impiegato[]> {
    return this.httpCilent.get<Impiegato[]>(`${this.apiUrl}/dimessi`);
  }

  getImpiegatiAssunti(): Observable<Impiegato[]> {
    return this.httpCilent.get<Impiegato[]>(`${this.apiUrl}/assunti`);
  }

  dimissioniImpiegato(id: number): Observable<Impiegato> {
    return this.httpCilent.delete<Impiegato>(
      `${this.apiUrl}/dimissione?id=` + id
    );
  }

  nuovoImpiegato(impiegato: ImpiegatoRequest): Observable<Impiegato> {
    return this.httpCilent.put<Impiegato>(`${this.apiUrl}/aggiungi`, impiegato);
  }

  filterImpiegatiAssunti(impiegato: ImpiegatoRequest): Observable<Impiegato[]> {
    return this.httpCilent.post<Impiegato[]>(
      `${this.apiUrl}/filter/assunti`,
      impiegato
    );
  }

  filterImpiegatiDimessi(impiegato: ImpiegatoRequest): Observable<Impiegato[]> {
    return this.httpCilent.post<Impiegato[]>(
      `${this.apiUrl}/filter/dimessi`,
      impiegato
    );
  }
}
