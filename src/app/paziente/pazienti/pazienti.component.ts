import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Paziente, PazienteRequest } from 'src/types/Paziente';
import { Observable } from 'rxjs';
import { Ricovero } from 'src/types/Ricovero';

@Component({
  selector: 'app-pazienti',
  templateUrl: './pazienti.component.html',
  styleUrls: ['./pazienti.component.css'],
})
export class PazientiComponent implements OnInit {
  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  pazienti$!: Observable<Paziente[]>;

  aggiungi: boolean = false;

  id: number = this.route.snapshot.params['id'];

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
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
