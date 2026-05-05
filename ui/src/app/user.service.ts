import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5285/api/Users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}