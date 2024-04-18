import { Component } from '@angular/core';
import { WebService } from '../../services/web.service';
import { UserRequest } from 'src/types/User';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { sha512 } from 'js-sha512';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private webService: WebService, private route: Router) {}

  // private hash: Hasher = sha512_256.create();

  newUser = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });

  onSubmit() {
    console.log(this.preparedRequest().password);

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
    return sha512(this.newUser.get('password')?.value!);
  }
}
