import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-common-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './common-dashboard.html',
  styleUrl: './common-dashboard.css'
})
export class CommonDashboard {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');

    this.router.navigateByUrl('/', {
      replaceUrl: true
    });
  }
}