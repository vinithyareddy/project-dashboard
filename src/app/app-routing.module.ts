import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-detail', component: TaskDetailComponent },
  { path: 'team-member', component: TeamMemberComponent },
  { path: 'gantt-chart', component: GanttChartComponent },
  { path: 'task-detail/:taskTitle', component: TaskDetailComponent },
  { path: '', redirectTo: '/task-list', pathMatch: 'full' },

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
