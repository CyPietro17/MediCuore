import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/types/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  authenticate: boolean = true;
  errorMsg: string = 'Username e/o Password sono errati!';

  ngOnInit(): void {}

  controllUser = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  gestAuth(): void {
    this.authService.autenticazione(this.preparedRequest());
  }

  preparedRequest(): UserRequest {
    return {
      username: this.username,
      password: this.password,
      email: null,
    };
  }

  get username() {
    return this.controllUser.get('username')?.value;
  }

  get password() {
    return this.controllUser.get('password')?.value;
  }
}
