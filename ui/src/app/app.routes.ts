import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UserManagementComponent } from './pages/user-management/user-management';
import { CommonDashboard } from './pages/common-dashboard/common-dashboard';
import { QueryComponent } from './pages/query/query';

import { AdminQueriesComponent } from './pages/admin-queries/admin-queries';

export const routes: Routes = [

  {
    path: '',
    component: LoginComponent
  },

  // Admin

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'user-management',
    component: UserManagementComponent
  },

  {
    path: 'queries',
    component: AdminQueriesComponent
  },

  // Common Users

  {
    path: 'common-dashboard',
    component: CommonDashboard
  },

  {
    path: 'query',
    component: QueryComponent
  }
];