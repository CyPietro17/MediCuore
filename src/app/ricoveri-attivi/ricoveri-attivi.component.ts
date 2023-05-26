import { FineRicoveroRequest, Ricovero } from 'src/types/Ricovero';
import { WebService } from './../services/web.service';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ricoveri-attivi',
  templateUrl: './ricoveri-attivi.component.html',
  styleUrls: ['./ricoveri-attivi.component.css'],
})
export class RicoveriAttiviComponent {
  constructor(private webService: WebService, private router: Router) {}

  bool: boolean = false;

  ricoveri$!: Observable<Ricovero[]>;

  ngOnInit(): void {
    this.ricoveri$ = this.webService.getRicoveriAttivi();
  }

  add() {
    this.router.navigate(['ricoveri/nuovo']);
  }
  //TODO: CONTROLLARE, NON VA BENE COSI'
  dimissioni(id: number): boolean {
    let a: boolean = this.bool;
    this.webService.cercaRicovero(id).subscribe({
      next: (res) => {
        return (res.b_cond = true);
      },
    });
    return this.bool;
  }

  dimissioniPaziente(ricovero: FineRicoveroRequest) {
    this.webService.chiudiRicovero(ricovero).subscribe({
      next: (res) => {
        this.webService.getRicoveriAttivi();
      },
      error: () => {
        console.log('Impossbile procedere con le dimissioni del paziente!');
      },
    });
  }
}
