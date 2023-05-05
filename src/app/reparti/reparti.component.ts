import { Observable } from 'rxjs';
import { WebService } from '../services/web.service';
import { Component, OnInit } from '@angular/core';
import { Reparto, RepartoRequest } from 'src/types/Reparto';

@Component({
  selector: 'app-reparti',
  templateUrl: './reparti.component.html',
  styleUrls: ['./reparti.component.css'],
})
export class RepartiComponent implements OnInit {
  constructor(private webService: WebService) {}

  aggiungi: boolean = false;

  reparti$!: Observable<Reparto[]>;

  ngOnInit(): void {
    this.reparti$ = this.webService.getReparti();
  }

  add(): boolean {
    return (this.aggiungi = !this.aggiungi);
  }

  onNewReparto(reparto: RepartoRequest) {
    this.webService.nuovoReparto(reparto).subscribe({
      next: () => {
        this.reparti$ = this.webService.getReparti();
      },
      error: () => {
        console.log('Impossibile aggiungere Reparto');
      },
    });
  }
}
