import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // Data for Task Summary
  totalTasks: number = 45;
  tasksCompleted: number = 20;
  overdueTasks: number = 5;

  // Task Completion Percentage
  progress: number = (this.tasksCompleted / this.totalTasks) * 100;

  // Team Performance Data (For the chart)
  teamData = [
    { member: 'John', tasksAssigned: 10, tasksCompleted: 8 },
    { member: 'Alice', tasksAssigned: 8, tasksCompleted: 6 },
    { member: 'Bob', tasksAssigned: 12, tasksCompleted: 10 }
  ];

  // Upcoming Deadlines
  upcomingDeadlines = [
    { name: 'Task 1', deadline: '2025-04-10' },
    { name: 'Task 2', deadline: '2025-04-12' },
    { name: 'Task 3', deadline: '2025-04-15' }
  ];

  // Columns for the table
  displayedColumns: string[] = ['task', 'deadline'];

  constructor() {}

  ngOnInit(): void {}
}
