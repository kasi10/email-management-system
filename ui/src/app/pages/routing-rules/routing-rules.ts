import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  RouterModule
} from '@angular/router';

import {
  RoutingRuleService
} from '../../routing-rule.service';

@Component({
  selector: 'app-routing-rules',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],

  templateUrl:
    './routing-rules.html',

  styleUrl:
    './routing-rules.css'
})
export class RoutingRulesComponent
  implements OnInit, OnDestroy {

  rules: any[] = [];

  showModal = false;

  keyword = '';

  department = '';

  priority = '';

  successMessage = '';

  errorMessage = '';

  constructor(
    private routingRuleService:
      RoutingRuleService
  ) { }

  ngOnInit(): void {
    this.loadRules();
  }

  loadRules(): void {
    this.routingRuleService
      .getRules()
      .subscribe({
        next: (data) => {
          this.rules = data;
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
}