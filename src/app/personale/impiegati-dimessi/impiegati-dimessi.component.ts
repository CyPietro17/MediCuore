import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebService } from 'src/app/services/web.service';
import { Impiegato } from 'src/types/Impiegato';

@Component({
  selector: 'app-impiegati-dimessi',
  templateUrl: './impiegati-dimessi.component.html',
  styleUrls: ['./impiegati-dimessi.component.css'],
})
export class ImpiegatiDimessiComponent implements OnInit {
  constructor(private webService: WebService, private route: Router) {}

  dimessi$!: Observable<Impiegato[]>;

  ngOnInit(): void {
    if (sessionStorage.getItem('authenticatedUser') === 'admin01') {
      this.dimessi$ = this.webService.getImpiegatiDimessi();
    } else {
      /* alert('ACCESSO NEGATO!!'); */
      this.route.navigateByUrl('/error');
      /* sessionStorage.clear(); */
    }
  }
}
