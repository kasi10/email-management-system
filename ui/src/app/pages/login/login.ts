import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  username = '';
  password = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
  const data = {
    username: this.username,
    password: this.password
  };

  this.http.post<any>('http://localhost:5285/api/Auth/login', data)
   .subscribe(res => {

  localStorage.setItem('token', res.token);

  const role = res.role;

  if (role === 'Admin') {
    this.router.navigateByUrl('/dashboard', {
      replaceUrl: true
    });
  } else {
    this.router.navigateByUrl('/common-dashboard', {
      replaceUrl: true
    });
  }

}, err => {
  alert("Login failed");
});
}
}