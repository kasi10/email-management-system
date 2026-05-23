import { Component, ChangeDetectorRef } from '@angular/core';
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
export class QueryComponent {

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

    // Validation
    if (
      !this.senderEmail.trim() ||
      !this.subject.trim() ||
      !this.body.trim()
    ) {

      this.errorMessage = 'All fields are mandatory';
      this.successMessage = '';

      return;
    }

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

        this.senderEmail = '';
        this.subject = '';
        this.body = '';

        this.successMessage =
          'Query submitted successfully';

        this.isLoading = false;

        this.cdr.detectChanges();
      },

      error: (err) => {

        console.error(err);

        this.errorMessage =
          'Failed to submit query';

        this.isLoading = false;

        this.cdr.detectChanges();
      }
    });
  }

  goHome() {

    this.router.navigate(['/']);
  }
}