import { InizioRicoveroRequest } from './../../../types/Ricovero';
import { WebService } from '../../services/web.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Paziente } from 'src/types/Paziente';
import { Reparto } from 'src/types/Reparto';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-ricovero',
  templateUrl: './new-ricovero.component.html',
  styleUrls: ['./new-ricovero.component.css'],
})
export class NewRicoveroComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: InizioRicoveroRequest,
    private dialogSheet: MatDialogRef<NewRicoveroComponent>,
    private webService: WebService,
    private route: Router
  ) {}

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.route.navigateByUrl('');
    }
  }

  reparti$: Observable<Reparto[]> = this.webService.getReparti();
  pazienti$: Observable<Paziente[]> =
    this.webService.getPazientiNonRicoverati();

  onClick() {
    this.webService.nuovoRicovero(this.data).subscribe({
      next: () => {
        this.dialogSheet.close(this.data);
      },
    });
  }
  /*
  onSubmit() {
    console.log(this.prepareRequest());
    this.webService.nuovoRicovero(this.prepareRequest()).subscribe({
      next: (res) => {
        this.webService.getRicoveriAttivi();
        this.newRicovero.reset();
        this.route.navigate(['/ricoveri/attivi']);
      },
      error: () => {
        alert('Registrazione ricovero non riuscita');
      },
    });
  }

  newRicovero = new FormGroup({
    d_inizioRicovero: new FormControl(new Date(), Validators.required),
    n_paziente: new FormControl(0, Validators.required),
    n_reparto: new FormControl(0, Validators.required),
  });

  prepareRequest(): InizioRicoveroRequest {
    return {
      d_inizioRicovero: this.d_inizioRicovero,
      n_paziente: this.n_paziente,
      n_reparto: this.n_reparto,
    };
  }

  get d_inizioRicovero() {
    return this.newRicovero.get('d_inizioRicovero')!.value;
  }

  get n_paziente() {
    return this.newRicovero.get('n_paziente')!.value;
  }

  get n_reparto() {
    return this.newRicovero.get('n_reparto')!.value;
  } */
}
