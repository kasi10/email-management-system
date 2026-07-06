import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl =
    'http://localhost:5285/api/departments';

  constructor(
    private http: HttpClient
  ) {}

  getDepartments():
    Observable<any[]>
  {
    return this.http.get<any[]>(
      `${this.apiUrl}/all`
    );
  }

  addDepartment(
    department: any
  ): Observable<any>
  {
    return this.http.post(
      `${this.apiUrl}/create`,
      department
    );
  }

  deleteDepartment(
    id: number
  ): Observable<any>
  {
    return this.http.delete(
      `${this.apiUrl}/${id}`
    );
  }
}