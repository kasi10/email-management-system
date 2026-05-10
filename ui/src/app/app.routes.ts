import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { UserManagementComponent } from './pages/user-management/user-management';
import { CommonDashboard } from './pages/common-dashboard/common-dashboard';

export const routes: Routes = [
  { path: '', component: LoginComponent },

  // Admin
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-management', component: UserManagementComponent },

  // Common users
  { path: 'common-dashboard', component: CommonDashboard }
];