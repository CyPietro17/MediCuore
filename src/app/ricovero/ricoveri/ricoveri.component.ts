import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { Ricovero } from 'src/types/Ricovero';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparto } from 'src/types/Reparto';
import { MatDialog } from '@angular/material/dialog';

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

  reparto$!: Reparto;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.ricoveri$ = this.webService.getRicoveriReparto(this.id);
    this.webService.getReparto(this.id).subscribe({
      next: (res) => {
        this.reparto$ = res;
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
