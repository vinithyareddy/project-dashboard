import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { MatTableModule } from '@angular/material/table';  // Import MatTableModule
import { MatToolbarModule } from '@angular/material/toolbar'; // Import MatToolbarModule for the header
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule for icons
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule for button functionality
import { MatListModule } from '@angular/material/list';  // For mat-nav-list
// Import Angular Material modules
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; // Import this





@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    TaskListComponent,
    TaskDetailComponent,
    TeamMemberComponent,
    GanttChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,  // MatTableModule to use mat-table
    MatToolbarModule, // MatToolbarModule to use mat-toolbar
    MatIconModule, // MatIconModule to use mat-icon
    MatButtonModule, // MatButtonModule to use buttons
    MatListModule, // MatListModule to use mat-nav-list
    MatCardModule,       // Import MatCardModule here
    MatProgressBarModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule, 



  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
