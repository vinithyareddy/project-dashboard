import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: 'task-detail', component: TaskDetailComponent },
  { path: 'team-member', component: TeamMemberComponent },
  { path: 'gantt-chart', component: GanttChartComponent },
  { path: 'task-detail/:taskTitle', component: TaskDetailComponent },
  { path: 'header', component: HeaderComponent },
  {path: 'sidebar', component: SidebarComponent} ,
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
