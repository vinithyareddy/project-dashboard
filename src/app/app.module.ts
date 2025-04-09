import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { TeamsComponent } from './teams/teams.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatOptionModule } from '@angular/material/core'; // Import this
import { MatChipsModule } from '@angular/material/chips';

// Import Angular Material Modules
import { MatCardModule } from '@angular/material/card'; // <-- Add this import
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';  // For mat-toolbar
import { MatIconModule } from '@angular/material/icon';  // For mat-icon
import { MatListModule } from '@angular/material/list';  // For mat-nav-list

// Import FormsModule and ReactiveFormsModule for ngModel
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar/calendar.component';


@NgModule({
  declarations: [
    // AppComponent, // Removed
    // TaskListComponent, // Removed
    // TaskDetailComponent, // Removed
    // TeamMemberComponent, // Removed
    // GanttChartComponent, // Removed
    // HeaderComponent, // Removed
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,  // for ngModel
    ReactiveFormsModule,  // for form controls
    MatCardModule,  // <-- Add MatCardModule here
    MatFormFieldModule,  // for mat-form-field
    MatInputModule,  // for input fields
    MatSelectModule,  // for mat-select
    MatButtonModule,  // for buttons
    MatTableModule,  // for mat-table
    MatDatepickerModule,  // for mat-datepicker
    MatNativeDateModule,  // for native date support
    MatToolbarModule,  // Import MatToolbarModule
    MatIconModule,  // Import MatIconModule
    MatListModule,  // Import MatListModule
    MatProgressBarModule,
    MatOptionModule,
    CommonModule,
    MatChipsModule,
    // Standalone imports remain
    // DashboardComponent,
    // TasksComponent,
    // CalendarComponent,
    // ProjectsComponent,
    // TeamsComponent,
    // WelcomeComponent,
    // SidebarComponent
  ],
  providers: [],
})
export class AppModule { }