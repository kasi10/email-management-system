import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RoutingRuleService {

    private apiUrl =
        'http://localhost:5285/api/RoutingRules';

    constructor(
        private http: HttpClient
    ) { }

    getRules(): Observable<any[]> {
        return this.http.get<any[]>(
            `${this.apiUrl}/all`
        );
    }

    addRule(rule: any) {
        return this.http.post(
            `${this.apiUrl}/create`,
            rule
        );
    }

    deleteRule(id: number) {
        return this.http.delete(
            `${this.apiUrl}/${id}`
        );
    }
}