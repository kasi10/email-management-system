import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  HttpClient
} from '@angular/common/http';

import {
  Router
} from '@angular/router';

import {
  FormsModule
} from '@angular/forms';

import {
  AuthService
} from '../../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username = '';

  password = '';

  errorMessage = '';

  isLoading = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
  ) {}

  // =========================
  // LOGIN
  // =========================

  login() {

    // EMPTY VALIDATION

    if (
      !this.username.trim()
      ||
      !this.password.trim()
    ) {

      this.errorMessage =
        'Username and password are required';

      this.cdr.detectChanges();

      return;
    }

    // START LOADER

    this.isLoading = true;

    const data = {

      username:
        this.username,

      password:
        this.password
    };

    this.http
      .post<any>(
        'http://localhost:5285/api/Auth/login',
        data
      )
      .subscribe({

        next: (res) => {

          console.log(
            'LOGIN RESPONSE:',
            res
          );

          this.errorMessage = '';

          // SAVE SESSION

          this.authService.saveSession(

            res.token,

            res.role,

            res.departmentId
          );

          // ROUTING

          if (res.role === 'Admin') {

            this.router.navigateByUrl(
              '/dashboard',
              {
                replaceUrl: true
              }
            );
          }
          else {

            this.router.navigateByUrl(
              '/common-dashboard',
              {
                replaceUrl: true
              }
            );
          }

          this.isLoading = false;

          this.cdr.detectChanges();
        },

        error: () => {

          this.errorMessage =
            'Invalid username or password';

          this.isLoading = false;

          this.cdr.detectChanges();
        }
      });
  }

  // =========================
  // PUBLIC QUERY PAGE
  // =========================

  goToQueryPage() {

    this.router.navigate(
      ['/query']
    );
  }
}