import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { UserRequest } from 'src/types/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private webService: WebService, private route: Router) {}

  newUser = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    this.webService.nuovoUtente(this.preparedRequest()).subscribe({
      next: () => {
        this.route.navigate(['login']);
      },
    });
  }

  preparedRequest(): UserRequest {
    return {
      username: this.username,
      email: this.email,
      password: this.password,
    };
  }

  get username() {
    return this.newUser.get('username')?.value;
  }

  get email() {
    return this.newUser.get('email')?.value;
  }

  get password() {
    return this.newUser.get('password')?.value;
  }
}
