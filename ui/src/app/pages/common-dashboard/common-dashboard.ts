import {
  Component,
  OnInit,
  ChangeDetectorRef,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import {
  CommonModule,
  NgFor
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

import {
  AuthService
} from '../../auth.service';

import {
  QueryService
} from '../../query.service';

Chart.register(
  PieController,
  ArcElement,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-common-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NgFor
  ],
  templateUrl: './common-dashboard.html',
  styleUrl: './common-dashboard.css'
})
export class CommonDashboard
implements OnInit, AfterViewInit, OnDestroy {

  queries: any[] = [];

  originalQueries: any[] = [];

  searchText = '';

  selectedQuery: any = null;

  pieChart: any;

  activeQueries = 0;
  // NEW

  departmentId = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private queryService: QueryService,
    private cdr: ChangeDetectorRef
  ) {}

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {

    this.departmentId =
      this.authService
        .getDepartmentId();

    console.log(
      'DEPARTMENT ID:',
      this.departmentId
    );

    this.loadQueries();
  }

  ngAfterViewInit(): void {

    this.createChart();
  }

  // =========================
  // LOAD QUERIES
  // =========================

  loadQueries() {

    this.queryService

      .getQueriesByDepartment(
        this.departmentId
      )

      .subscribe({

        next: (res: any) => {

          console.log(
            'DEPARTMENT QUERIES:',
            res
          );

          this.queries =
            Array.isArray(res)
              ? [...res]
              : [];

          this.originalQueries = [...this.queries];

          // Count only active queries
          this.activeQueries = this.queries.filter(
            q => q.status !== 'Finished'
          ).length;

          this.updateChart();

          this.cdr.detectChanges();
        },

        error: (err: any) => {

          console.log(err);
        }
      });
  }

  // =========================
  // CHART
  // =========================

  createChart() {

    const ctx: any =
      document.getElementById(
        'priorityChart'
      );

    this.pieChart = new Chart(ctx, {

      type: 'pie',

      data: {

        labels: [
          'High',
          'Medium',
          'Low'
        ],

        datasets: [
          {
            data: [0, 0, 0],

            backgroundColor: [
              '#ef4444',
              '#f59e0b',
              '#22c55e'
            ],

            borderWidth: 1
          }
        ]
      },

      options: {

        responsive: true,

        plugins: {

          legend: {

            position: 'bottom'
          }
        }
      }
    });
  }

  updateChart() {

    if (!this.pieChart) {
      return;
    }

    const activeQueries =

      this.queries.filter(

        q => q.status !== 'Finished'
      );

    const high =

      activeQueries.filter(

        q => q.priority === 'High'
      ).length;

    const medium =

      activeQueries.filter(

        q => q.priority === 'Medium'
      ).length;

    const low =

      activeQueries.filter(

        q => q.priority === 'Low'
      ).length;

    this.pieChart.data.datasets[0].data = [

      high,
      medium,
      low
    ];

    this.pieChart.update();
  }

  // =========================
  // FILTER
  // =========================

  sortQueries(event: any) {

    const value =
      event.target.value;

    if (!value) {

      this.queries =
        [...this.originalQueries];

      this.updateChart();

      return;
    }

    this.queries =

      this.originalQueries.filter(

        q => q.priority === value
      );

    this.updateChart();
  }

  // =========================
  // SEARCH
  // =========================

  searchQueries(event: any) {

    const value =

      event.target.value
        .toLowerCase();

    this.searchText = value;

    this.queries =

      this.originalQueries.filter(q =>

        q.senderEmail
          .toLowerCase()
          .includes(value)

        ||

        q.subject
          .toLowerCase()
          .includes(value)

        ||

        q.category
          .toLowerCase()
          .includes(value)
      );

    this.updateChart();
  }

  // =========================
  // MODAL
  // =========================

  selectQuery(query: any) {

    console.log("SELECTED QUERY:", query);

    this.selectedQuery = query;
  }

  closeModal() {

    this.selectedQuery = null;
  }

  // =========================
  // STATUS UPDATE
  // =========================

  updateStatus(event: any) {

    const newStatus =
      event.target.value;

    this.queryService

      .updateStatus(

        this.selectedQuery.id,
        newStatus

      )

      .subscribe({

        next: () => {

          // Update selected query status
          this.selectedQuery.status = newStatus;

          // Reload latest data from database
          this.loadQueries();

          console.log(
            'Status updated successfully'
          );
        },

        error: (err) => {

          console.log(err);
        }
      });
  }

  // =========================
  // LOGOUT
  // =========================

  logout() {

    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.selectedQuery = null;
    if (this.pieChart && typeof this.pieChart.destroy === 'function') {
      try { this.pieChart.destroy(); } catch { /* ignore */ }
    }
  }
}