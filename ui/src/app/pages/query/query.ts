<<<<<<< HEAD
import { Component, ChangeDetectorRef } from '@angular/core';
=======
import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
>>>>>>> feature/admin-workflow-management
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { QueryService } from '../../query.service';

@Component({
  selector: 'app-query',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './query.html',
  styleUrl: './query.css'
})
<<<<<<< HEAD
export class QueryComponent {
=======
export class QueryComponent implements OnDestroy {
>>>>>>> feature/admin-workflow-management

  senderEmail = '';
  subject = '';
  body = '';

  successMessage = '';
  errorMessage = '';

  isLoading = false;

  constructor(
    private queryService: QueryService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  submitQuery() {

    if (this.isLoading) {
      return;
    }

<<<<<<< HEAD
    // Validation
=======
    /* VALIDATION */

>>>>>>> feature/admin-workflow-management
    if (
      !this.senderEmail.trim() ||
      !this.subject.trim() ||
      !this.body.trim()
    ) {

<<<<<<< HEAD
      this.errorMessage = 'All fields are mandatory';
=======
      this.errorMessage =
        'All fields are required';

>>>>>>> feature/admin-workflow-management
      this.successMessage = '';

      return;
    }

<<<<<<< HEAD
=======
    /* START LOADING */

>>>>>>> feature/admin-workflow-management
    this.isLoading = true;

    this.errorMessage = '';
    this.successMessage = '';

    const queryData = {

      senderEmail: this.senderEmail,
      subject: this.subject,
      body: this.body
    };

    this.queryService.submitQuery(queryData).subscribe({

      next: () => {

<<<<<<< HEAD
=======
        /* RESET FORM */

>>>>>>> feature/admin-workflow-management
        this.senderEmail = '';
        this.subject = '';
        this.body = '';

<<<<<<< HEAD
=======
        /* SUCCESS */

>>>>>>> feature/admin-workflow-management
        this.successMessage =
          'Query submitted successfully';

        this.isLoading = false;

        this.cdr.detectChanges();
<<<<<<< HEAD
=======

        /* AUTO REMOVE MESSAGE */

        setTimeout(() => {

          this.successMessage = '';

          this.cdr.detectChanges();

        }, 3000);
>>>>>>> feature/admin-workflow-management
      },

      error: (err) => {

        console.error(err);

        this.errorMessage =
          'Failed to submit query';

        this.isLoading = false;

        this.cdr.detectChanges();
<<<<<<< HEAD
=======

        /* AUTO REMOVE ERROR */

        setTimeout(() => {

          this.errorMessage = '';

          this.cdr.detectChanges();

        }, 3000);
>>>>>>> feature/admin-workflow-management
      }
    });
  }

  goHome() {

    this.router.navigate(['/']);
  }
<<<<<<< HEAD
=======
  ngOnDestroy(): void {

    this.isLoading = false;

    this.successMessage = '';

    this.errorMessage = '';
  }
>>>>>>> feature/admin-workflow-management
}