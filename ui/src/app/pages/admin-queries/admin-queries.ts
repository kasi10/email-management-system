import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';

import {
  CommonModule,
  NgFor
} from '@angular/common';

import {
  Router,
  RouterModule
} from '@angular/router';

import {
  HttpClient
} from '@angular/common/http';

import {
  AuthService
} from '../../auth.service';

@Component({
  selector: 'app-admin-queries',
  standalone: true,
  imports: [
    CommonModule,
    NgFor,
    RouterModule
  ],
  templateUrl: './admin-queries.html',
  styleUrl: './admin-queries.css',
})
export class AdminQueriesComponent
implements OnInit, OnDestroy {

  // ALL QUERIES

  queries: any[] = [];

  // MANUAL REVIEW QUEUE

  manualReviewQueries: any[] = [];

  // DISPLAYED TABLE

  displayedQueries: any[] = [];

  // SEARCH

  originalQueries: any[] = [];

  searchText = '';

  // MODAL

  selectedQuery: any = null;

  // ACTIVE TAB

  activeTab = 'all';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    const token =
      localStorage.getItem('token');

    if (!token) {

      this.router.navigate(['/']);

      return;
    }

    this.loadQueries();

    this.loadManualReviewQueries();
  }

  // =========================
  // LOAD ALL QUERIES
  // =========================

  loadQueries() {

    this.http
      .get<any[]>(
        'http://localhost:5285/api/Queries/admin'
      )
      .subscribe({

        next: (res) => {

          console.log(
            'ADMIN QUERIES:',
            res
          );

          this.queries =
            Array.isArray(res)
            ? [...res]
            : [];

          this.originalQueries =
            [...this.queries];

          this.displayedQueries =
            [...this.queries];

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  // =========================
  // LOAD MANUAL REVIEW
  // =========================

  loadManualReviewQueries() {

    this.http
      .get<any[]>(
        'http://localhost:5285/api/Queries/manual-review'
      )
      .subscribe({

        next: (res) => {

          console.log(
            'MANUAL REVIEW:',
            res
          );

          this.manualReviewQueries =
            Array.isArray(res)
            ? [...res]
            : [];

          if (this.activeTab === 'review') {

            this.displayedQueries =
              [...this.manualReviewQueries];
          }

          this.cdr.detectChanges();
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  // =========================
  // TAB SWITCHING
  // =========================

  setTab(tab: string) {

    this.activeTab = tab;

    if (tab === 'all') {

      this.displayedQueries =
        [...this.queries];
    }
    else {

      this.displayedQueries =
        [...this.manualReviewQueries];
    }
  }

  // =========================
  // SEARCH
  // =========================

  searchQueries(event: any) {

    const value =
      event.target.value.toLowerCase();

    const source =
      this.activeTab === 'all'
      ? this.queries
      : this.manualReviewQueries;

    this.displayedQueries =
      source.filter(q =>

        (q.senderEmail || '')
          .toLowerCase()
          .includes(value)

        ||

        (q.subject || '')
          .toLowerCase()
          .includes(value)

        ||

        (q.category || '')
          .toLowerCase()
          .includes(value)

        ||

        (q.assignedTeam || '')
          .toLowerCase()
          .includes(value)
      );
  }

  // =========================
  // MODAL
  // =========================

  selectQuery(query: any) {

    console.log(query);

    this.selectedQuery = {
      ...query
    };
  }

  closeModal() {

    this.selectedQuery = null;
  }

  // =========================
  // MANUAL ROUTING
  // =========================

  manualRoute(
    queryId: number,
    departmentId: string
  ) {

    this.http.patch(

      `http://localhost:5285/api/Queries/${queryId}/manual-route`,

      {
        departmentId:
          Number(departmentId)
      }

    ).subscribe({

      next: () => {

        alert(
          'Query routed successfully'
        );

        this.closeModal();

        this.loadQueries();

        this.loadManualReviewQueries();
      },

      error: (err) => {

        console.log(err);

        alert(
          'Routing failed'
        );
      }
    });
  }

  // =========================
  // TRACK BY
  // =========================

  trackByQuery(
    index: number,
    query: any
  ): number {

    return query.id;
  }

  // =========================
  // LOGOUT
  // =========================

  logout() {

    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.selectedQuery = null;
  }
}