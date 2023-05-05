import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { ActivatedRoute } from '@angular/router';
import { Paziente, PazienteRequest } from 'src/types/Paziente';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.css'],
})
export class PazientiComponent implements OnInit {
  constructor(private webService: WebService, private route: ActivatedRoute) {}

  pazienti$!: Observable<Paziente[]>;

  aggiungi: boolean = false;

  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    this.pazienti$ = this.webService.getPazienti();
  }

  add(): boolean {
    return (this.aggiungi = !this.aggiungi);
  }

  onNewPaziente(paziente: PazienteRequest) {
    this.webService.nuovoPaziente(paziente).subscribe({
      next: () => {
        this.pazienti$ = this.webService.getPazienti();
      },
      error: () => {
        console.log('Impossibile aggiungere Paziente');
      },
    });
  }
}
