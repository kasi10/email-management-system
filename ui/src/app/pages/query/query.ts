import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
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

export class QueryComponent implements OnDestroy {


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


    /* VALIDATION */

    if (
      !this.senderEmail.trim() ||
      !this.subject.trim() ||
      !this.body.trim()
    ) {


      this.errorMessage = 'All fields are mandatory';

      this.errorMessage =
        'All fields are required';

      this.successMessage = '';

      return;
    }


    /* START LOADING */

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


        /* RESET FORM */


        this.senderEmail = '';
        this.subject = '';
        this.body = '';


        /* SUCCESS */

        this.successMessage =
          'Query submitted successfully';

        this.isLoading = false;

        this.cdr.detectChanges();


        /* AUTO REMOVE MESSAGE */

        setTimeout(() => {

          this.successMessage = '';

          this.cdr.detectChanges();

        }, 3000);

      },

      error: (err) => {

        console.error(err);

        this.errorMessage =
          'Failed to submit query';

        this.isLoading = false;

        this.cdr.detectChanges();


        /* AUTO REMOVE ERROR */

        setTimeout(() => {

          this.errorMessage = '';

          this.cdr.detectChanges();

        }, 3000);

      }
    });
  }

  goHome() {

    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {

    this.isLoading = false;

    this.successMessage = '';

    this.errorMessage = '';
  }
}