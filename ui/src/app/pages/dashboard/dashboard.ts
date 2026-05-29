import {
  Component,
  ChangeDetectorRef
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import { 
  QueryService 
} from '../../query.service';

import {
  UserService
} from '../../user.service';

import {
  AuthService
} from '../../auth.service';

import {
  DashboardService
} from '../../dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class DashboardComponent {

  recentQueries: any[] = [];

  // USERS

  users: any[] = [];

  // QUERIES

  queries: any[] = [];

  // METRICS

  activeQueries = 0;

  manualReviews = 0;

  constructor(

    private userService: UserService,

    private authService: AuthService,

    private dashboardService: DashboardService,

    private queryService: QueryService,

    private router: Router,

    private cdr: ChangeDetectorRef

  ) {}

  ngOnInit() {

    const token =
      localStorage.getItem('token');

    if (!token) {

      this.router.navigate(['/']);

      return;
    }

    this.loadUsers();

    this.loadQueries();
  }

  // LOAD USERS

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
            'Error fetching users:',
            err
          );
        }
      });
  }

  // LOAD QUERIES

  loadQueries() {

    this.queryService
      .getQueries()
      .subscribe({

        next: (res) => {

          this.queries = [...res];
          this.recentQueries =
          this.queries.slice(0, 3);

          // ACTIVE QUERIES

          this.activeQueries =
            this.queries.filter(

              q => q.status !== 'Finished'

            ).length;

          // MANUAL REVIEWS

          this.manualReviews =
            this.queries.filter(

              q =>
                q.requiresManualReview === true

            ).length;

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error(
            'Error fetching queries:',
            err
          );
        }
      });
  }

  // LOGOUT

  logout() {

    this.authService.logout();
  }
}