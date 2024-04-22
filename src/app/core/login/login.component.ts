import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRequest } from 'src/types/User';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { WebService } from 'src/app/services/web.service';
import { sha512 } from 'js-sha512';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private toastsService: NgToastService,
    private route: Router,
    private webService: WebService
  ) {}

  errorMessage: string = 'username and/or password wrong';
  errorTitle: string = 'Invalid Credentials!';
  successMessage: string = 'Login Success';
  invalidLogin = false;
  loginSuccess = false;
  authenticate: boolean = true;
  nameuser!: string;
  psw!: string;

  ngOnInit(): void {
    sessionStorage.clear();
  }

  controllUser = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
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
    return sha512(this.controllUser.get('password')?.value!);
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
          .subscribe({
            next: () => {
              this.invalidLogin = false;
              this.loginSuccess = true;
              this.toastsService.success({
                detail: this.successMessage.toUpperCase(),
                summary: 'Welcome back to MediCuore "'.concat(
                  res.username.toUpperCase().concat('"')
                ),
                duration: 5000,
              });
              this.route.navigate(['/reparti']);
            },
            error: () => {
              this.invalidLogin = true;
              this.loginSuccess = false;
              this.toastsService.error({
                detail: this.errorTitle.toUpperCase(),
                summary: 'Anything was wrong! Try login again.',
                duration: 5000,
              });
            },
          });
      },
      error: (err) => {
        this.toastsService.warning({
          detail: this.errorTitle.toUpperCase(),
          summary: this.errorMessage,
          duration: 5000,
        });
        console.error(err);
      },
    });
  }
}
