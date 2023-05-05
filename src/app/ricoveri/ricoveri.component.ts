import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Ricovero } from 'src/types/Ricovero';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparto } from 'src/types/Reparto';

@Component({
  selector: 'app-ricoveri',
  templateUrl: './ricoveri.component.html',
  styleUrls: ['./ricoveri.component.css'],
})
export class RicoveriComponent implements OnInit {
  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ricoveri$!: Observable<Ricovero[]>;

  id: number = this.route.snapshot.params['id'];

  reparto$!: Observable<Reparto>;

  rep!: Reparto;

  ngOnInit(): void {
    this.ricoveri$ = this.webService.getRicoveriReparto(this.id);
    this.reparto$ = this.webService.getReparto(this.id);
    this.reparto$.subscribe({
      next: (res) => {
        this.rep = res;
      },
      error: (err) => {
        alert('Risorse non trovate! Cambiare pagina.');
      },
    });
  }

  add() {
    this.router.navigate(['ricoveri/nuovo']);
  }
}
