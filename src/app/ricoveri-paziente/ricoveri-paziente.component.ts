import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Ricovero } from 'src/types/Ricovero';
import { Paziente } from 'src/types/Paziente';

@Component({
  selector: 'app-ricoveri-paziente',
  templateUrl: './ricoveri-paziente.component.html',
  styleUrls: ['./ricoveri-paziente.component.css'],
})
export class RicoveriPazienteComponent implements OnInit {
  constructor(private webService: WebService, private route: ActivatedRoute) {}

  id: number = this.route.snapshot.params['id'];

  ricoveri$!: Observable<Ricovero[]>;
  paziente$!: Observable<Paziente>;
  paz!: Paziente;

  ngOnInit(): void {
    this.ricoveri$ = this.webService.getRicoveriPaziente(this.id);
    this.paziente$ = this.webService.paziente(this.id);
    this.paziente$.subscribe({
      next: (res) => {
        this.paz = res;
      },
      error: (err) => {
        alert('Risorse non trovate! Cambiare pagina.');
      },
    });
  }
}
