import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private apiUrl =
    'http://localhost:5285/api/Queries';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // SUBMIT QUERY
  // =========================

  submitQuery(data: any) {

    return this.http.post(
      this.apiUrl,
      data
    );
  }

  // =========================
  // GET BY DEPARTMENT
  // =========================

  getQueriesByDepartment(
    departmentId: number
  ) {

    return this.http.get<any[]>(

      `${this.apiUrl}/department/${departmentId}`

    );
  }

  // =========================
  // UPDATE STATUS
  // =========================

  updateStatus(
    id: number,
    status: string
  ) {

    return this.http.patch(

      `${this.apiUrl}/${id}/status`,

      {
        status: status
      }
    );
  }
}