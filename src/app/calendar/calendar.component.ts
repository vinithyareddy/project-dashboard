import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Task {
  id: number;
  title: string;
  status: 'not-started' | 'in-progress' | 'completed';
  dueDate: Date;
  assignee: string;
}

// Add Project interface
interface Project {
  name: string;
  description: string;
  status: 'in-progress' | 'completed' | 'not-started';
  dueDate: Date;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth: number;
  currentYear: number;
  calendar: (Date | null)[][] = [];
  tasks: Task[] = [];
  projects: Project[] = []; // Add projects array
  
  constructor() {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }

  ngOnInit() {
    this.generateCalendar();
    // Mock tasks - Replace with actual data
    this.tasks = [
      { id: 1, title: 'Review Design Mockups', status: 'completed', dueDate: new Date(2025, 2, 10), assignee: 'Alice' },
      { id: 2, title: 'Develop API Endpoint', status: 'completed', dueDate: new Date(2025, 2, 18), assignee: 'Bob' },
      { id: 3, title: 'Write Unit Tests', status: 'completed', dueDate: new Date(2025, 2, 22), assignee: 'Charlie' },
      { id: 4, title: 'Deploy to Staging', status: 'completed', dueDate: new Date(2025, 3, 5), assignee: 'Betty' },
      { id: 5, title: 'Client Demo Prep', status: 'in-progress', dueDate: new Date(2025, 3, 12), assignee: 'Bobby' },
      { id: 6, title: 'Fix Login Bug', status: 'completed', dueDate: new Date(2025, 2, 5), assignee: 'Charles' },
      { id: 7, title: 'Update Documentation', status: 'not-started', dueDate: new Date(2025, 3, 20), assignee: 'James' },
      { id: 8, title: 'Performance Testing', status: 'not-started', dueDate: new Date(2025, 3, 25), assignee: 'John' },
      { id: 9, title: 'Widget Development', status: 'in-progress', dueDate: new Date(2025, 3, 21), assignee: 'Veronica' },
      { id: 10, title: 'World Map Designing', status: 'completed', dueDate: new Date(2025, 1, 20), assignee: 'Cheryl' },
      { id: 11, title: 'Back End Development', status: 'completed', dueDate: new Date(2025, 1, 10), assignee: 'Archie' },
      { id: 12, title: 'Software setup', status: 'completed', dueDate: new Date(2025, 1, 12), assignee: 'Charles' },
      { id: 13, title: 'Toggle Button Design', status: 'completed', dueDate: new Date(2025, 1, 5), assignee: 'Archie' },
      { id: 14, title: 'Update Information', status: 'completed', dueDate: new Date(2025, 1, 25), assignee: 'Alice' },
      { id: 15, title: 'Add New Icons', status: 'not-started', dueDate: new Date(2025, 3, 23), assignee: 'Bob' },
      { id: 16, title: 'Add real time data', status: 'completed', dueDate: new Date(2025, 0, 18), assignee: 'Bobby' },
      { id: 17, title: 'Write API Documentation', status: 'completed', dueDate: new Date(2025, 0, 15), assignee: 'Betty' },
      { id: 18, title: 'Update Table Data', status: 'completed', dueDate: new Date(2025, 0, 29), assignee: 'Cheryl' },
      { id: 19, title: 'Update User Interface', status: 'completed', dueDate: new Date(2025, 0, 31), assignee: 'Veronica' },
      { id: 20, title: 'Update test cases', status: 'completed', dueDate: new Date(2025, 0, 30), assignee: 'Cheryl' },
      { id: 21, title: 'Add new features', status: 'not-started', dueDate: new Date(2025, 3, 29), assignee: 'James' },
      { id: 22, title: 'Develop UI Components', status: 'completed', dueDate: new Date(2025, 2, 30), assignee: 'John' },
      { id: 23, title: 'Fix Bugs', status: 'completed', dueDate: new Date(2025, 1, 11), assignee: 'Alice' },
      { id: 24, title: 'Review Code', status: 'completed', dueDate: new Date(2025, 1, 19), assignee: 'Cheryl' },
      { id: 25, title: 'Review documentation', status: 'completed', dueDate: new Date(2025, 0, 28), assignee: 'Betty' },
      { id: 26, title: 'Performance Testing', status: 'completed', dueDate: new Date(2025, 0, 10), assignee: 'Veronica' },
      { id: 27, title: 'Deploy to Production', status: 'completed', dueDate: new Date(2025, 0, 13), assignee: 'Alice' },
      { id: 28, title: 'Deploy to Staging ', status: 'completed', dueDate: new Date(2025, 0, 17), assignee: 'Bob' },
      { id: 29, title: 'Add new widgets', status: 'completed', dueDate: new Date(2025, 1, 16), assignee: 'Bobby' },
      { id: 30, title: 'Add information icons', status: 'in-progress', dueDate: new Date(2025, 3, 17), assignee: 'Betty' },
      { id: 31, title: 'Deploy to qa', status: 'in-progress', dueDate: new Date(2025, 3, 13), assignee: 'Charlie' },
      { id: 32, title: 'Complete the test cases', status: 'completed', dueDate: new Date(2025, 3, 2), assignee: 'Charles' },
      { id: 33, title: 'Update the dummy data', status: 'completed', dueDate: new Date(2025, 3, 6), assignee: 'Alice' },
      { id: 34, title: 'Review Design Mockups', status: 'completed', dueDate: new Date(2025, 2, 13), assignee: 'James' },
      { id: 35, title: 'Develop API Endpoint', status: 'completed', dueDate: new Date(2025, 2, 15), assignee: 'Bob' },
      { id: 36, title: 'Write Unit Tests', status: 'completed', dueDate: new Date(2025, 2, 22), assignee: 'Charlie' },
      { id: 37, title: 'Deploy to Staging', status: 'completed', dueDate: new Date(2025, 3, 5), assignee: 'Alice' },
      { id: 38, title: 'Client Demo Prep', status: 'in-progress', dueDate: new Date(2025, 3, 12), assignee: 'Bob' },
      { id: 39, title: 'Fix Login Bug', status: 'completed', dueDate: new Date(2025, 2, 5), assignee: 'Charlie' },
      { id: 40, title: 'Update Documentation', status: 'completed', dueDate: new Date(2025, 3, 9), assignee: 'Alice' },
      { id: 41, title: 'Performance Testing', status: 'not-started', dueDate: new Date(2025, 3, 27), assignee: 'Bob' },
      { id: 42, title: 'Widget Development', status: 'completed', dueDate: new Date(2025, 1, 12), assignee: 'John' },
      { id: 43, title: 'World Map Designing', status: 'completed', dueDate: new Date(2025, 1, 16), assignee: 'James' },
      { id: 44, title: 'Back End Development', status: 'completed', dueDate: new Date(2025, 1, 2), assignee: 'Abhigail' },
      { id: 45, title: 'Software setup', status: 'completed', dueDate: new Date(2025, 1, 4), assignee: 'Abhigail' },
      { id: 46, title: 'Toggle Button Design', status: 'completed', dueDate: new Date(2025, 0, 22), assignee: 'Alice' },
      { id: 47, title: 'Update Information', status: 'completed', dueDate: new Date(2025, 0, 12), assignee: 'ABhigail' },
      { id: 48, title: 'Add New Icons', status: 'completed', dueDate: new Date(2025, 0, 24), assignee: 'Cheryl' },
      { id: 49, title: 'Add real time data', status: 'completed', dueDate: new Date(2025, 0, 23), assignee: 'Cheryl' },
      { id: 50, title: 'Write API Documentation', status: 'completed', dueDate: new Date(2025, 1, 26), assignee: 'Charlie' },
      { id: 51, title: 'Update Table Data', status: 'completed', dueDate: new Date(2025, 1, 27), assignee: 'Abhigail' },
      { id: 52, title: 'Update User Interface', status: 'completed', dueDate: new Date(2025, 1, 14), assignee: 'Bob' },
      { id: 53, title: 'Update test cases', status: 'completed', dueDate: new Date(2025, 1, 16), assignee: 'Charlie' },
      { id: 54, title: 'Add new features', status: 'completed', dueDate: new Date(2025, 1, 17), assignee: 'Abhigail' },
      { id: 55, title: 'Develop UI Components', status: 'completed', dueDate: new Date(2025, 1, 11), assignee: 'Alice' },
      { id: 56, title: 'Fix Bugs', status: 'completed', dueDate: new Date(2025, 2, 11), assignee: 'Betty' },
      { id: 57, title: 'Review Code', status: 'completed', dueDate: new Date(2025, 2, 15), assignee: 'Betty' },
      { id: 58, title: 'Review documentation', status: 'completed', dueDate: new Date(2025, 2, 21), assignee: 'Veronica' },
      { id: 59, title: 'Performance Testing', status: 'completed', dueDate: new Date(2025, 2, 6), assignee: 'Archie' },
      { id: 60, title: 'Deploy to Production', status: 'completed', dueDate: new Date(2025, 2, 7), assignee: 'Alice' },
      { id: 61, title: 'Deploy to Staging ', status: 'completed', dueDate: new Date(2025, 2, 26), assignee: 'Alice' },
    ];
    // Mock projects - Replace with actual data
    this.projects = [
      { name: 'Website Redesign', description: 'Update company website', status: 'in-progress', dueDate: new Date(2025, 5, 30)},
      { name: 'Mobile App Launch', description: 'iOS and Android app', status: 'not-started', dueDate: new Date(2025, 6, 15) },
      { name: 'Internal HR Portal', description: 'New portal for HR', status: 'completed', dueDate: new Date(2025, 3, 1)},
      { name: 'Q3 Marketing Campaign', description: 'Social media campaign', status: 'not-started', dueDate: new Date(2025, 7, 1)},
    ];
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];
    const startingDay = firstDay.getDay();
    for (let i = 0; i < startingDay; i++) { currentWeek.push(null); }
    for (let day = 1; day <= lastDay.getDate(); day++) {
      if (currentWeek.length === 7) { weeks.push(currentWeek); currentWeek = []; }
      currentWeek.push(new Date(this.currentYear, this.currentMonth, day));
    }
    while (currentWeek.length < 7) { currentWeek.push(null); }
    weeks.push(currentWeek);
    this.calendar = weeks;
  }

  getTasksForDate(date: Date | null): Task[] {
    if (!date) return [];
    return this.tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return taskDate.getDate() === date.getDate() &&
             taskDate.getMonth() === date.getMonth() &&
             taskDate.getFullYear() === date.getFullYear();
    });
  }

  // Add method to get projects for a specific date
  getProjectsForDate(date: Date | null): Project[] {
    if (!date) return [];
    return this.projects.filter(project => {
      const projectDueDate = new Date(project.dueDate);
      return projectDueDate.getDate() === date.getDate() &&
             projectDueDate.getMonth() === date.getMonth() &&
             projectDueDate.getFullYear() === date.getFullYear();
    });
  }

  previousMonth() {
    if (this.currentMonth === 0) { this.currentMonth = 11; this.currentYear--; }
    else { this.currentMonth--; }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) { this.currentMonth = 0; this.currentYear++; }
    else { this.currentMonth++; }
    this.generateCalendar();
  }

  getMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }
}
