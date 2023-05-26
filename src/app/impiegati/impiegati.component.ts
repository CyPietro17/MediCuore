import { Component, OnInit } from '@angular/core';
import { WebService } from '../services/web.service';
import { Impiegato, ImpiegatoRequest } from 'src/types/Impiegato';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-impiegati',
  templateUrl: './impiegati.component.html',
  styleUrls: ['./impiegati.component.css'],
})
export class ImpiegatiComponent implements OnInit {
  constructor(private webService: WebService, private route: Router) {}

  admin: boolean = false;
  aggiungi: boolean = false;

  impiegati$!: Observable<Impiegato[]>;

  ngOnInit(): void {
    this.impiegati$ = this.webService.getImpiegatiAssunti();
    this.getRole();
  }

  getRole(): boolean {
    if (sessionStorage.getItem('authenticatedUser') === 'admin01') {
      return (this.admin = true);
    }
    return (this.admin = false);
  }

  add() {
    this.route.navigate(['/impiegati/nuovo']);
  }

  onNewImpiegato(impiegato: ImpiegatoRequest) {
    this.webService.nuovoImpiegato(impiegato).subscribe({
      next: () => {
        this.impiegati$ = this.webService.getImpiegatiAssunti();
      },
      error: () => {
        console.log('Impossibile aggiungere Impiegato');
      },
    });
  }
}
