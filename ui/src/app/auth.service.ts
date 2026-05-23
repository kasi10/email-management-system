import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router
  ) {}

  // =========================
  // TOKEN
  // =========================

  getToken(): string {

    return localStorage.getItem('token') || '';
  }

  // =========================
  // ROLE
  // =========================

  getRole(): string {

    return localStorage.getItem('role') || '';
  }

  // =========================
  // DEPARTMENT ID
  // =========================

  getDepartmentId(): number {

    return Number(
      localStorage.getItem('departmentId')
    ) || 0;
  }

  // =========================
  // IS ADMIN
  // =========================

  isAdmin(): boolean {

    return this.getRole() === 'Admin';
  }

  // =========================
  // IS EMPLOYEE
  // =========================

  isEmployee(): boolean {

    return this.getRole() === 'Employee';
  }

  // =========================
  // SAVE SESSION
  // =========================

  saveSession(
    token: string,
    role: string,
    departmentId: number | null
  ) {

    localStorage.setItem(
      'token',
      token
    );

    localStorage.setItem(
      'role',
      role
    );

    if (departmentId !== null) {

      localStorage.setItem(
        'departmentId',
        departmentId.toString()
      );
    }
  }

  // =========================
  // LOGOUT
  // =========================

  logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('role');

    localStorage.removeItem(
      'departmentId'
    );

    this.router.navigate(
      ['/'],
      {
        replaceUrl: true
      }
    );
  }
}