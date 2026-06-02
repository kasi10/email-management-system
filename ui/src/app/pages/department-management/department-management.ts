import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { DepartmentService } from '../../department.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector:
    'app-department-management',
    standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],


  templateUrl:
    './department-management.html',

  styleUrls:
    ['./department-management.css']
})
export class DepartmentManagement implements OnInit, OnDestroy
{
  departments: any[] = [];

  showModal = false;

  departmentName = '';

  successMessage = '';

  errorMessage = '';

  constructor(
    private departmentService:
      DepartmentService,

    private cdr:
      ChangeDetectorRef
  ) {}

  ngOnInit(): void
  {
    this.loadDepartments();
  }

  loadDepartments(): void
  {
    this.departmentService
      .getDepartments()
      .subscribe({
        next: (data) =>
        {
          console.log(data);

          this.departments = [...data];

          this.cdr.detectChanges();
        },

        error: () =>
        {
          this.errorMessage =
            'Failed to load departments';
        }
      });
  }

  openModal(): void
  {
    this.showModal = true;
  }

  closeModal(): void
  {
    this.showModal = false;

    this.departmentName = '';

    this.errorMessage = '';
  }

  saveDepartment(): void
  {
    if (!this.departmentName.trim())
    {
      this.errorMessage =
        'Department name required';

      return;
    }

    const payload =
    {
      departmentName:
        this.departmentName
    };

    this.departmentService
      .addDepartment(payload)
      .subscribe({
        next: () =>
        {
          this.successMessage =
            'Department added successfully';

          this.closeModal();

          this.loadDepartments();
        },

        error: () =>
        {
          this.errorMessage =
            'Failed to add department';
        }
      });
  }

  showDeleteModal = false;

  deleteDepartmentId: number | null = null;

  openDeleteModal(id: number): void {
    this.deleteDepartmentId = id;

    this.showDeleteModal = true;
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;

    this.deleteDepartmentId = null;
  }

  confirmDeleteDepartment(): void {
    if (this.deleteDepartmentId === null) {
      return;
    }

    this.departmentService
      .deleteDepartment(this.deleteDepartmentId)
      .subscribe({

        next: () => {
          this.successMessage =
            'Department deleted';

          this.loadDepartments();

          this.closeDeleteModal();
        },

        error: (err) => {
          this.errorMessage =
            err.error.message;

          this.closeDeleteModal();
        }
      });
  }
  ngOnDestroy(): void {
    this.showModal = false;
    this.showDeleteModal = false;
    this.deleteDepartmentId = null;
    this.departmentName = '';
    this.errorMessage = '';
  }
}