import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AuthComponent } from 'src/app/auth/auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './auth/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'auth', loadComponent: () => import('./auth/auth/auth.component').then(m => m.AuthComponent) },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] }
];
