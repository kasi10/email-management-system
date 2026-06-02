import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl =
    'http://localhost:5285/api';

  constructor(
    private http: HttpClient
  ) {}

  // USERS

  getUsers(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/users`
    );
  }

  // QUERIES

  getQueries(): Observable<any[]> {

    return this.http.get<any[]>(
      `${this.apiUrl}/queries/admin`
    );
  }
}