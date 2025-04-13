// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
// import { AppRoutingModule } from './app-routing.module';
// import { AppComponent } from './app.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { WelcomeComponent } from './welcome/welcome.component';
// import { HeaderComponent } from './header/header.component';
// import { SidebarComponent } from './sidebar/sidebar.component';
// import { TeamsComponent } from './teams/teams.component';
// import { ProjectsComponent } from './projects/projects.component';
// import { TasksComponent } from './tasks/tasks.component';
// import { MatProgressBarModule } from '@angular/material/progress-bar';
// import { MatOptionModule } from '@angular/material/core'; // Import this
// import { MatChipsModule } from '@angular/material/chips';

// // Import Angular Material Modules
// import { MatCardModule } from '@angular/material/card'; // <-- Add this import
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { MatTableModule } from '@angular/material/table';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import { MatNativeDateModule } from '@angular/material/core';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatToolbarModule } from '@angular/material/toolbar';  // For mat-toolbar
// import { MatIconModule } from '@angular/material/icon';  // For mat-icon
// import { MatListModule } from '@angular/material/list';  // For mat-nav-list

// // Import FormsModule and ReactiveFormsModule for ngModel
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// import { CalendarComponent } from './calendar/calendar.component';
// import { ThemeToggleComponent } from './shared/theme-toggle/theme-toggle.component';
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import { provideAuth, getAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import { environment } from '../environments/environment';


// @NgModule({
//   declarations: [

//   ],
//   imports: [
//     BrowserModule,
//     ThemeToggleComponent,
//     RouterModule,
//     AppRoutingModule,
//     BrowserAnimationsModule,
//     FormsModule,  // for ngModel
//     ReactiveFormsModule,  // for form controls
//     MatCardModule,  // <-- Add MatCardModule here
//     MatFormFieldModule,  // for mat-form-field
//     MatInputModule,  // for input fields
//     MatSelectModule,  // for mat-select
//     MatButtonModule,  // for buttons
//     MatTableModule,  // for mat-table
//     MatDatepickerModule,  // for mat-datepicker
//     MatNativeDateModule,  // for native date support
//     MatToolbarModule,  // Import MatToolbarModule
//     MatIconModule,  // Import MatIconModule
//     MatListModule,  // Import MatListModule
//     MatProgressBarModule,
//     MatOptionModule,
//     CommonModule,
//     MatChipsModule,
//     provideFirebaseApp(() => initializeApp(environment.firebase)),
//     provideAuth(() => getAuth()),
//     provideFirestore(() => getFirestore())
//     // Standalone imports remain
//     // DashboardComponent,
//     // TasksComponent,
//     // CalendarComponent,
//     // ProjectsComponent,
//     // TeamsComponent,
//     // WelcomeComponent,
//     // SidebarComponent
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }