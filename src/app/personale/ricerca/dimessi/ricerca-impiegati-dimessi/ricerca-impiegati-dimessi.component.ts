import { Component, Output, EventEmitter } from '@angular/core';
import { WebService } from 'src/app/services/web.service';
import { Impiegato, ImpiegatoRequest } from 'src/types/Impiegato';

@Component({
  selector: 'app-ricerca-impiegati-dimessi',
  templateUrl: './ricerca-impiegati-dimessi.component.html',
  styleUrls: ['./ricerca-impiegati-dimessi.component.css'],
})
export class RicercaImpiegatiDimessiComponent {
  constructor(private webService: WebService) {}

  @Output() impEmit = new EventEmitter<Impiegato[]>();

  data: ImpiegatoRequest = {
    t_nome: '',
    t_cognome: '',
    d_dataNascita: null,
    t_codiceFiscale: '',
    t_professione: '',
    n_reparto: null,
  };

  filterImpDimessi() {
    setTimeout(() => {
      this.webService.filterImpiegatiAssunti(this.data).subscribe({
        next: (res) => {
          this.impEmit.emit(res);
        },
      });
    }, 1000);
  }
}
