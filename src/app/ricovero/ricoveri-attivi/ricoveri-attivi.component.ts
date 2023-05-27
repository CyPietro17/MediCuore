import { FineRicoveroRequest, Ricovero } from 'src/types/Ricovero';
import { WebService } from '../../services/web.service';
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
    if (sessionStorage.getItem('authenticatedUser') == null) {
      this.router.navigateByUrl('');
    }
    this.ricoveri$ = this.webService.getRicoveriAttivi();
  }

  add() {
    this.router.navigate(['ricoveri/nuovo']);
  }
}
