import { WebService } from './web.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRequest } from 'src/types/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private webService: WebService, private route: Router) {}

  autenticazione(user: UserRequest) {
    this.webService.getUtente(user).subscribe({
      next: (user) => {
        console.log(user);
        window.sessionStorage.setItem('username', user.username!);
        window.sessionStorage.setItem('password', user.password!);
        this.route.navigateByUrl('/reparti');
      },
      error: () => {
        console.log('Impossibile raggiungere end-point');
      },
    });
  }
}
