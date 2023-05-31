import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web.service';
import { Impiegato } from 'src/types/Impiegato';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Reparto } from 'src/types/Reparto';

@Component({
  selector: 'app-impiegati-reparto',
  templateUrl: './impiegati-reparto.component.html',
  styleUrls: ['./impiegati-reparto.component.css'],
})
export class ImpiegatiRepartoComponent implements OnInit {
  constructor(
    private webService: WebService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  admin!: boolean;
  id: number = this.route.snapshot.params['id'];

  impiegati$!: Observable<Impiegato[]>;

  reparto$!: Observable<Reparto>;

  rep!: Reparto;

  ngOnInit(): void {
    if (
      sessionStorage.getItem('authenticatedUser') == null ||
      (sessionStorage.getItem('role') != 'USER' &&
        sessionStorage.getItem('role') != 'ADMIN')
    ) {
      this.router.navigateByUrl('');
    }
    this.impiegati$ = this.webService.getImpiegatiReparto(this.id);
    this.reparto$ = this.webService.getReparto(this.id);
    this.reparto$.subscribe({
      next: (res) => {
        this.rep = res;
        if (sessionStorage.getItem('authenticatedUser') === 'admin01') {
          this.admin = true;
        }
      },
    });
  }
}
