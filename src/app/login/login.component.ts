import { WebService } from './../services/web.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/types/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: Router,
    private webService: WebService
  ) {}

  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;
  authenticate: boolean = true;

  ngOnInit(): void {}

  controllUser = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

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

  gestAuth(): void {
    this.authService
      .authenticationService(
        this.preparedRequest().username!,
        this.preparedRequest().password!
      )
      .subscribe(
        (result) => {
          this.invalidLogin = false;
          this.loginSuccess = true;
          this.successMessage = 'Login Successful.';
          /* this.webService.roleUser(this.preparedRequest()).subscribe({
            next: (res) => {
              sessionStorage.setItem('Role', res);
            },
          }); */
          this.route.navigate(['/reparti']);
        },
        () => {
          this.invalidLogin = true;
          this.loginSuccess = false;
        }
      );
  }
}
