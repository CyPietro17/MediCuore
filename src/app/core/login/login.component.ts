import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/types/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WebService } from 'src/app/services/web.service';

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

  errorMessage = 'Invalid Credentials! username e/o password non valide';
  successMessage!: string;
  invalidLogin = false;
  loginSuccess = false;
  authenticate: boolean = true;
  nameuser!: string;
  psw!: string;

  ngOnInit(): void {
    sessionStorage.clear();
  }

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
    this.webService.login(this.preparedRequest()).subscribe({
      next: (res) => {
        this.nameuser = res.username;
        sessionStorage.setItem('role', res.role);
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
              this.route.navigate(['/reparti']);
            },
            () => {
              this.invalidLogin = true;
              this.loginSuccess = false;
              alert(this.errorMessage);
            }
          );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
