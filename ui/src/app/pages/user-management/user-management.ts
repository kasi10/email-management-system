import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  AuthService
} from '../../auth.service';

import {
  UserService
} from '../../user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './user-management.html',
  styleUrl: './user-management.css'
})
export class UserManagementComponent
implements OnInit {

  // =========================
  // MODAL
  // =========================

  showModal = false;

  // =========================
  // MESSAGES
  // =========================

  successMessage = '';

  errorMessage = '';

  modalErrorMessage = '';

  // =========================
  // USERS
  // =========================

  users: any[] = [];

  // =========================
  // FORM
  // =========================

  username = '';

  displayName = '';

  role = '';

  departmentId = 0;

  password = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit() {

    this.loadUsers();
  }

  // =========================
  // MODAL
  // =========================

  openModal() {

    this.showModal = true;
  }

  closeModal() {

    this.showModal = false;

    this.resetForm();
  }

  // =========================
  // LOAD USERS
  // =========================

  loadUsers() {

    this.userService
      .getUsers()
      .subscribe({

        next: (res) => {

          this.users = [...res];

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error fetching users',
            err
          );
        }
      });
  }

  // =========================
  // SAVE USER
  // =========================

  saveUser() {

    // BASIC VALIDATION

    if (
      !this.username.trim()
      ||
      !this.displayName.trim()
      ||
      !this.role.trim()
      ||
      !this.password.trim()
    ) {

      this.modalErrorMessage =
        'All fields are required';

      this.successMessage = '';

      this.cdr.detectChanges();

      return;
    }

    // EMPLOYEE VALIDATION

    if (
      this.role === 'Employee'
      &&
      this.departmentId === 0
    ) {

      this.modalErrorMessage =
        'Please select a department';

      this.cdr.detectChanges();

      return;
    }

    // PAYLOAD

    const userData = {

      username:
        this.username,

      displayName:
        this.displayName,

      role:
        this.role,

      departmentId:

        this.role === 'Admin'
        ? null
        : this.departmentId,

      password:
        this.password
    };

    console.log(
      'USER PAYLOAD:',
      userData
    );

    // API CALL

    this.userService
      .createUser(userData)
      .subscribe({

        next: (res: any) => {

          console.log(
            'API response:',
            res
          );

          this.successMessage =
            res.message;

          this.modalErrorMessage = '';

          // RELOAD USERS

          this.loadUsers();

          // CLOSE MODAL

          this.showModal = false;

          // RESET

          this.resetForm();

          this.cdr.detectChanges();

          setTimeout(() => {

            this.successMessage = '';

          }, 3000);
        },

        error: (err) => {

          console.error(err);

          this.modalErrorMessage =
            'Failed to create user';

          this.successMessage = '';

          this.cdr.detectChanges();

          setTimeout(() => {

            this.modalErrorMessage = '';

          }, 3000);
        }
      });
  }

  // =========================
  // RESET FORM
  // =========================

  resetForm() {

    this.username = '';

    this.displayName = '';

    this.role = '';

    this.departmentId = 0;

    this.password = '';
  }

  // =========================
  // LOGOUT
  // =========================

  logout() {

    this.authService.logout();
  }
}