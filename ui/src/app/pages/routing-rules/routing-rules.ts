import {Component,OnInit,OnDestroy} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RoutingRuleService} from '../../routing-rule.service';
import { DepartmentService } from '../../department.service';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-routing-rules',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl:'./routing-rules.html',

  styleUrl:'./routing-rules.css'
})
export class RoutingRulesComponent
  implements OnInit, OnDestroy {

  rules: any[] = [];
  departments: any[] = [];

  showModal = false;

  keyword = '';

  department = '';

  priority = '';

  successMessage = '';

  errorMessage = '';

  constructor(
    private routingRuleService: RoutingRuleService,
    private departmentService: DepartmentService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadRules();
    this.loadDepartments();
  }

  loadRules(): void {

    this.routingRuleService
      .getRules()
      .subscribe({

        next: (data) => {
          this.rules = data;
          this.cdr.detectChanges();
        },

        error: (err) => {

          console.error('Error:', err);

        }
      });
  }

  openModal(): void {
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;

    this.keyword = '';

    this.department = '';

    this.priority = '';
  }

  saveRule(): void {

    if (
      !this.keyword.trim() ||
      !this.department ||
      !this.priority
    ) {

      this.errorMessage =
        'All fields are required';

      return;
    }
    const payload = {

      keyword:
        this.keyword,

      department:
        this.department,

      priority:
        this.priority
    };

    this.routingRuleService
      .addRule(payload)
      .subscribe({

        next: () => {
          this.successMessage =
            'Rule added successfully';

          this.loadRules();

          this.closeModal();
        },

        error: () => {
          this.errorMessage =
            'Failed to add rule';
        }
      });
  }
  loadDepartments(): void {

    this.departmentService
      .getDepartments()
      .subscribe({

        next: (data) => {

          this.departments = data;
        }
      });
  }
  deleteRule(id: number): void {
    this.routingRuleService
      .deleteRule(id)
      .subscribe({

        next: () => {
          this.loadRules();
        }
      });
  }

  ngOnDestroy(): void {
    this.showModal = false;
    this.keyword = '';
    this.department = '';
    this.priority = '';
  }
  logout(): void {

    localStorage.clear();

    this.router.navigate(['/']);
  }
}