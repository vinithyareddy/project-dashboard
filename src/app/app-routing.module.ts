import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';
import { AuthGuard } from './auth/auth.guard'; // ✅ Correct path
import { NotFoundComponent } from './not-found/not-found.component';



export const routes: Routes = [ // 👈 this makes them usable in main.ts
  { path: '', component: WelcomeComponent },
  {
    path: 'auth',
    loadComponent: () => import('./auth/auth/auth.component').then(m => m.AuthComponent)
  },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] },
  { path: 'teams', component: TeamsComponent, canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
  // { path: '**', component: NotFoundComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


