import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagementComponent {

  showModal = false;

  username = '';
  displayName = '';
  role = 'User';
  password = '';

  constructor(private authService: AuthService) {}

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  saveUser() {
    alert('User Added (next step = API)');
    this.closeModal();
  }

  logout() {
    this.authService.logout();
  }
}