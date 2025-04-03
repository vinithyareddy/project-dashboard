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

  // Task Status Data
  taskStatus = [
    { name: 'Task 1', status: 'Completed' },
    { name: 'Task 2', status: 'In Progress' },
    { name: 'Task 3', status: 'Completed' },
    { name: 'Task 4', status: 'Overdue' },
    { name: 'Task 5', status: 'In Progress' },
    { name: 'Task 6', status: 'Completed' }
  ];

  // Filtered Tasks for Task Status
  filteredTasks = [...this.taskStatus];
  selectedStatus = 'All';

  // Team Performance Data
  teamData = [
    { member: 'John', tasksAssigned: 10, tasksCompleted: 8 },
    { member: 'Alice', tasksAssigned: 8, tasksCompleted: 6 },
    { member: 'Bob', tasksAssigned: 12, tasksCompleted: 10 }
  ];

  // Filtered Team Data
  filteredTeamData = [...this.teamData];
  selectedTeamMember = 'All';

  // Upcoming Deadlines
  upcomingDeadlines = [
    { name: 'Task 1', deadline: '2025-04-10' },
    { name: 'Task 2', deadline: '2025-04-12' },
    { name: 'Task 3', deadline: '2025-04-15' }
  ];

  // Filtered Deadlines
  filteredDeadlines = [...this.upcomingDeadlines];
  selectedDeadline = 'All';

  // Columns for the task status table
  displayedColumns: string[] = ['task', 'status'];

  // Columns for the upcoming deadlines table
  displayedColumnsDeadlines: string[] = ['task', 'deadline'];

  constructor() {}

  ngOnInit(): void {}

  // Filter tasks based on selected status
  filterTasks(status: string): void {
    if (status === 'All') {
      this.filteredTasks = [...this.taskStatus];
    } else {
      this.filteredTasks = this.taskStatus.filter(task => task.status === status);
    }
  }

  // Filter team performance by member
  filterTeamMember(member: string): void {
    if (member === 'All') {
      this.filteredTeamData = [...this.teamData];
    } else {
      this.filteredTeamData = this.teamData.filter(team => team.member === member);
    }
  }

  // Filter upcoming deadlines by date
  filterDeadlines(date: string): void {
    if (date === 'All') {
      this.filteredDeadlines = [...this.upcomingDeadlines];
    } else {
      this.filteredDeadlines = this.upcomingDeadlines.filter(deadline => deadline.deadline === date);
    }
  }
}
