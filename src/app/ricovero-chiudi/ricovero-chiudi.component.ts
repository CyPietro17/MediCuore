import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FineRicoveroRequest, Ricovero } from 'src/types/Ricovero';
import { WebService } from '../services/web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-ricovero-chiudi',
  templateUrl: './ricovero-chiudi.component.html',
  styleUrls: ['./ricovero-chiudi.component.css'],
})
export class RicoveroChiudiComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private webService: WebService,
    private router: Router
  ) {}

  id: number = this.route.snapshot.params['id'];
  ricovero$!: Ricovero;

  ngOnInit(): void {
    this.webService.cercaRicovero(this.id).subscribe({
      next: (res) => {
        console.log(res);

        this.ricovero$ = res;
      },
      error: (err) => {
        console.log('non va');
      },
    });
  }

  onSubmit() {
    this.webService.chiudiRicovero(this.prepareRequest()).subscribe({
      next: () => {
        this.webService.getRicoveriAttivi();
        this.router.navigate(['/ricoveri/attivi']);
      },
      error: () => {
        console.log('Impossibile chiudere ricovero');
      },
    });
  }

  chiudiRicovero = new FormGroup({
    d_fineRicovero: new FormControl(new Date(), Validators.required),
  });

  prepareRequest(): FineRicoveroRequest {
    return {
      d_fineRicovero: this.d_fineRicovero,
      n_paziente: this.ricovero$.n_paziente.n_id,
      n_reparto: this.ricovero$.t_reparto.n_id,
    };
  }

  get d_fineRicovero() {
    return this.chiudiRicovero.get('d_fineRicovero')!.value;
  }
}
