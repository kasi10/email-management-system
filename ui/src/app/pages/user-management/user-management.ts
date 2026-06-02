import {
  Component,
  OnInit,
  OnDestroy,
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
import { DepartmentService } from '../../department.service';

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
implements OnInit, OnDestroy {

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
  departments: any[] = [];

  // =========================
  // USERS
  // =========================

  users: any[] = [];

  // =========================
  // FORM
  // =========================

  username = '';

  displayName = '';

  departmentId = 0;

  password = '';

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit() {

    this.loadUsers();
    this.loadDepartments();
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
    !this.password.trim()
  ) {

    this.modalErrorMessage =
      'All fields are required';

    this.successMessage = '';

    this.cdr.detectChanges();

    return;
  }

  // DEPARTMENT VALIDATION

  if (this.departmentId === 0) {

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

    role: 'Employee',

    departmentId:
      this.departmentId,

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

  this.departmentId = 0;

  this.password = '';
}

  // =========================
  // LOGOUT
  // =========================

  logout() {

    this.authService.logout();
  }
 
  // =========================
  // DELETE MODAL
  // =========================

  showDeleteModal = false;

  selectedUserId: number | null = null;

  openDeleteModal(id: number) {

    this.selectedUserId = id;

    this.showDeleteModal = true;
  }

  closeDeleteModal() {

    this.showDeleteModal = false;

    this.selectedUserId = null;
  }

  confirmDeleteUser() {

    if (this.selectedUserId === null) {
      return;
    }

    this.userService
      .deleteUser(this.selectedUserId)
      .subscribe({

        next: () => {

          this.successMessage =
            'User deleted successfully';

          this.loadUsers();

          this.closeDeleteModal();
        },

        error: () => {

          this.errorMessage =
            'Failed to delete user';

          this.closeDeleteModal();
        }
      });
  }
  
  loadDepartments(): void
  {
    this.departmentService
      .getDepartments()
      .subscribe({
        next: (data) =>
        {
          this.departments = data;
        }
      });
  }

  // =========================
  // CLEANUP
  // =========================

  ngOnDestroy(): void {
    this.showModal = false;
    this.showDeleteModal = false;
    this.selectedUserId = null;
    this.resetForm();
  }
}