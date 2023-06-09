import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Ricovero } from 'src/types/Ricovero';
import { Paziente } from 'src/types/Paziente';

@Component({
  selector: 'app-ricoveri-paziente',
  templateUrl: './ricoveri-paziente.component.html',
  styleUrls: ['./ricoveri-paziente.component.css'],
})
export class RicoveriPazienteComponent implements OnInit {
  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  id: number = this.route.snapshot.params['id'];

  ricoveri$!: Observable<Ricovero[]>;
  paziente$!: Paziente;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.ricoveri$ = this.webService.getRicoveriPaziente(this.id);
    this.webService.paziente(this.id).subscribe({
      next: (res) => {
        this.paziente$ = res;
      },
      error: (err) => {
        alert('Risorse non trovate! Cambiare pagina.');
      },
    });
  }
}
