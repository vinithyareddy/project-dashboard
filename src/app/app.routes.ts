import { Routes } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { DashboardComponent } from './dashboard/dashboard.component';
// Remove imports for deleted components
// import { TaskListComponent } from './task-list/task-list.component';
// import { TaskDetailComponent } from './task-detail/task-detail.component';
// import { TeamMemberComponent } from './team-member/team-member.component';
// import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { CalendarComponent } from './calendar/calendar.component';

// Define and export the routes array
export const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'task-list', component: TaskListComponent }, // Removed
  // { path: 'task-detail', component: TaskDetailComponent }, // Removed
  // { path: 'task-detail/:taskTitle', component: TaskDetailComponent }, // Removed
  // { path: 'team-member', component: TeamMemberComponent }, // Removed
  // { path: 'gantt-chart', component: GanttChartComponent }, // Removed
  { path: 'teams', component: TeamsComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'calendar', component: CalendarComponent }
]; 