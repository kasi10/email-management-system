import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { UserService } from '../../user.service';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent {

  users: any[] = [];

 constructor(
  private userService: UserService,
  private authService: AuthService,
  private router: Router,
  private cdr: ChangeDetectorRef
) {}

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (res) => {
        this.users = [...res];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }

 logout() {
  this.authService.logout();
}
}