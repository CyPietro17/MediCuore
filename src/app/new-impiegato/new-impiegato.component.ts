import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImpiegatoRequest } from 'src/types/Impiegato';
import { Reparto } from 'src/types/Reparto';
import { WebService } from '../services/web.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-impiegato',
  templateUrl: './new-impiegato.component.html',
  styleUrls: ['./new-impiegato.component.css'],
})
export class NewImpiegatoComponent {
  constructor(private webService: WebService, private route: Router) {}

  reparti$: Observable<Reparto[]> = this.webService.getReparti();

  newImpiegato = new FormGroup({
    t_nome: new FormControl('', Validators.required),
    t_cognome: new FormControl('', Validators.required),
    d_dataNascita: new FormControl(new Date(), Validators.required),
    t_professione: new FormControl('', Validators.required),
    n_reparto: new FormControl(0, Validators.required),
  });

  onSubmit() {
    this.webService.nuovoImpiegato(this.prepareRequest()).subscribe({
      next: () => {
        this.webService.getImpiegatiAssunti();
        this.route.navigate(['/impiegati']);
      },
      error: () => {
        console.log('Impossibile aggiungere Impiegato');
      },
    });
  }

  prepareRequest(): ImpiegatoRequest {
    return {
      t_nome: this.t_nome,
      t_cognome: this.t_cognome,
      d_dataNascita: this.d_dataNascita,
      t_professione: this.t_professione,
      n_reparto: this.n_reparto,
    };
  }

  get t_nome() {
    return this.newImpiegato.get('t_nome')!.value;
  }

  get t_cognome() {
    return this.newImpiegato.get('t_cognome')!.value;
  }

  get d_dataNascita() {
    return this.newImpiegato.get('d_dataNascita')!.value;
  }

  get t_professione() {
    return this.newImpiegato.get('t_professione')!.value;
  }

  get n_reparto() {
    return this.newImpiegato.get('n_reparto')!.value;
  }
}
