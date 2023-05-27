import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { WebService } from '../../services/web.service';
import { Component, OnInit } from '@angular/core';
import { Reparto, RepartoRequest } from 'src/types/Reparto';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-reparti',
  templateUrl: './reparti.component.html',
  styleUrls: ['./reparti.component.css'],
})
export class RepartiComponent implements OnInit {
  constructor(
    private webService: WebService,
    private route: Router,
    private authService: AuthService
  ) {}

  admin: boolean = false;
  aggiungi: boolean = false;
  adminRole: boolean = false;
  isLoggedIn = false;

  reparti$!: Observable<Reparto[]>;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.webService.getReparti().subscribe({
      next: () => {
        this.reparti$ = this.webService.getReparti();
        this.getRole();
      },
      error: () => {
        this.route.navigateByUrl('/login');
      },
    });
  }

  add(): boolean {
    return (this.aggiungi = !this.aggiungi);
  }

  getRole(): boolean {
    if (sessionStorage.getItem('authenticatedUser') === 'admin01') {
      return (this.admin = true);
    }
    return (this.admin = false);
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
