import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth.service';
import { UserService } from '../../user.service';
import { OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagementComponent implements OnInit{

  showModal = false;
  successMessage = '';
errorMessage = '';
users: any[] = [];
  username = '';
  displayName = '';
  role = 'User';
  password = '';

 constructor(
  private authService: AuthService,
  private userService: UserService,
  private cdr: ChangeDetectorRef
) {}
ngOnInit() {
  this.loadUsers();
}
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
 loadUsers() {
  this.userService.getUsers().subscribe({
    next: (res) => {

      this.users = [...res];

      // Force UI refresh
      this.cdr.detectChanges();
    },

    error: (err) => {
      console.error('Error fetching users', err);
    }
  });
}

 saveUser() {

  const userData = {
    username: this.username,
    displayName: this.displayName,
    role: this.role,
    password: this.password
  };

  this.userService.createUser(userData).subscribe({

    next: (res: any) => {

      console.log('API response:', res);

      // Success message
      this.successMessage = res.message;
      this.errorMessage = '';

      // Reload table
      this.loadUsers();

      // Close modal FIRST
      this.showModal = false;

      // Reset form
      this.username = '';
      this.displayName = '';
      this.role = 'DocCollections';
      this.password = '';

      // Hide success message after 3 sec
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },

    error: (err) => {

      console.error(err);

      this.errorMessage = 'Error creating user';
      this.successMessage = '';

      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }

  });
}

  logout() {
    this.authService.logout();
  }
}