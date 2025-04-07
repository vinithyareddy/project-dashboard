import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  teamMembers: string[] = ['John', 'Alice', 'Bob', 'Jones', 'James', 'Bobby', 'Betty', 'Veronica', 'Charles', 'Cheryl', 'Archie', 'Abhigail'];
  // Data for Task Status
  taskStatus = [
    { name: 'Task 1', status: 'Completed', dueDate: new Date('2025-01-10') },
    { name: 'Task 2', status: 'In Progress', dueDate: new Date('2025-04-12') },
    { name: 'Task 3', status: 'Completed',  dueDate: new Date('2025-03-15') },
    { name: 'Task 4', status: 'Completed',  dueDate: new Date('2025-02-11') },
    { name: 'Task 5', status: 'Completed', dueDate: new Date('2025-01-18') },
    { name: 'Task 6', status: 'Completed', dueDate: new Date('2025-02-21') },
    { name: 'Task 7', status: 'In Progress', dueDate: new Date('2025-04-30') },
    { name: 'Task 8', status: 'Completed', dueDate: new Date('2025-03-29') },
    { name: 'Task 9', status: 'Completed', dueDate: new Date('2025-02-23') },
    { name: 'Task 10', status: 'Completed', dueDate: new Date('2025-04-06') },
    { name: 'Task 11', status: 'In Progress', dueDate: new Date('2025-04-17') },
    { name: 'Task 12', status: 'Completed', dueDate: new Date('2025-03-25') },
    { name: 'Task 13', status: 'Completed', dueDate: new Date('2025-03-30') },
    { name: 'Task 14', status: 'In Progress', dueDate: new Date('2025-04-29') },
    { name: 'Task 15', status: 'Completed', dueDate: new Date('2025-04-01') },
    { name: 'Task 16', status: 'Completed', dueDate: new Date('2025-01-06') },
    { name: 'Task 17', status: 'Completed', dueDate: new Date('2025-02-17') },
    { name: 'Task 18', status: 'Completed', dueDate: new Date('2025-02-25') },
    { name: 'Task 19', status: 'Completed', dueDate: new Date('2025-04-10') },
    { name: 'Task 20', status: 'Completed', dueDate: new Date('2025-03-12') },
    { name: 'Task 21', status: 'Completed', dueDate: new Date('2025-02-15') },
    { name: 'Task 22', status: 'Completed', dueDate: new Date('2025-03-11') },
    { name: 'Task 23', status: 'Completed', dueDate: new Date('2025-01-18') },
    { name: 'Task 24', status: 'Completed', dueDate: new Date('2025-03-21') },
    { name: 'Task 25', status: 'In Progress', dueDate: new Date('2025-04-17') },
    { name: 'Task 26', status: 'Not Started', dueDate: new Date('2025-04-25') },
    { name: 'Task 27', status: 'Completed', dueDate: new Date('2025-03-10') },
    { name: 'Task 28', status: 'Completed', dueDate: new Date('2025-03-12') },
    { name: 'Task 29', status: 'Completed', dueDate: new Date('2025-02-15') },
    { name: 'Task 30', status: 'Completed', dueDate: new Date('2025-01-11') },
    { name: 'Task 31', status: 'Not Started', dueDate: new Date('2025-04-18') },
    { name: 'Task 32', status: 'Completed', dueDate: new Date('2025-03-21') },
    { name: 'Task 33', status: 'Not Started', dueDate: new Date('2025-04-23') },
    { name: 'Task 34', status: 'Completed', dueDate: new Date('2025-04-06') },
    { name: 'Task 35', status: 'In Progress', dueDate: new Date('2025-04-17') },
    { name: 'Task 36', status: 'Not Started', dueDate: new Date('2025-04-25') },
    { name: 'Task 37', status: 'Completed', dueDate: new Date('2025-03-30') },
    { name: 'Task 38', status: 'Not Started', dueDate: new Date('2025-04-29') },
    { name: 'Task 39', status: 'Not Started', dueDate: new Date('2025-04-23') },
    { name: 'Task 40', status: 'Completed', dueDate: new Date('2025-01-06') },
    { name: 'Task 41', status: 'Completed', dueDate: new Date('2025-01-17') },
    { name: 'Task 42', status: 'Completed', dueDate: new Date('2025-01-25') },
    { name: 'Task 43', status: 'In Progress', dueDate: new Date('2025-04-10') },
    { name: 'Task 44', status: 'Completed', dueDate: new Date('2025-02-10') },
    { name: 'Task 45', status: 'Completed', dueDate: new Date('2025-03-12') },
    { name: 'Task 46', status: 'Not Started', dueDate: new Date('2025-04-15') },
    { name: 'Task 47', status: 'Completed', dueDate: new Date('2025-01-11') },
    { name: 'Task 48', status: 'Completed', dueDate: new Date('2025-02-18') },
    { name: 'Task 49', status: 'Completed', dueDate: new Date('2025-01-21') },
    { name: 'Task 50', status: 'Not Started', dueDate: new Date('2025-04-30') },
    { name: 'Task 51', status: 'Not Started', dueDate: new Date('2025-04-29') },
    { name: 'Task 52', status: 'In Progress', dueDate: new Date('2025-04-23') },
    { name: 'Task 53', status: 'Completed', dueDate: new Date('2025-03-06') },
    { name: 'Task 54', status: 'Completed', dueDate: new Date('2025-03-17') },
    { name: 'Task 55', status: 'Completed', dueDate: new Date('2025-02-25') },
    { name: 'Task 56', status: 'Completed', dueDate: new Date('2025-01-10') },
    { name: 'Task 57', status: 'Completed', dueDate: new Date('2025-03-12') },
    { name: 'Task 58', status: 'Completed', dueDate: new Date('2025-02-15') },
    { name: 'Task 59', status: 'In Progress', dueDate: new Date('2025-04-11') },
    { name: 'Task 60', status: 'Completed', dueDate: new Date('2025-01-18') },
    { name: 'Task 61', status: 'Not Started', dueDate: new Date('2025-04-21') },
  ];

  // Dynamic Task Summary Variables
  totalTasks: number = 0;
  tasksCompleted: number = 0;
  overdueTasks: number = 0;

  // Task Completion Percentage
  progress: number = 0;

  // Task Status Filtered Data
  filteredTasks = [...this.taskStatus];
  selectedStatus = 'All';

  // Team Performance Data
  teamData = [
    { member: 'John', tasksAssigned: 6, tasksCompleted: 5 },
    { member: 'Alice', tasksAssigned: 5, tasksCompleted: 4 },
    { member: 'Bob', tasksAssigned: 5, tasksCompleted: 4 },
    { member: 'Jones', tasksAssigned: 5, tasksCompleted: 4 },
    { member: 'James', tasksAssigned: 5, tasksCompleted: 4 },
    { member: 'Bobby', tasksAssigned: 5, tasksCompleted: 4 },
    { member: 'Betty', tasksAssigned: 4, tasksCompleted: 2 },
    { member: 'Veronica', tasksAssigned: 4, tasksCompleted: 1 },
    { member: 'Charles', tasksAssigned: 5, tasksCompleted: 2 },
    { member: 'Cheryl', tasksAssigned: 5, tasksCompleted: 5 },
    { member: 'Archie', tasksAssigned: 6, tasksCompleted: 3 },
    { member: 'Abhigail', tasksAssigned: 6, tasksCompleted: 4 }
  ];

  // Filtered Team Data
  filteredTeamData = [...this.teamData];
  selectedTeamMember = 'All';

  // Upcoming Deadlines
  upcomingDeadlines = [
    { name: 'Task 2', deadline: '2025-04-11' },
        { name: 'Task 7', deadline: '2025-04-29' },
        { name: 'Task 11', deadline: '2025-04-16' },
        { name: 'Task 14', deadline: '2025-04-28' },
        { name: 'Task 25', deadline: '2025-04-16' },
        { name: 'Task 26', deadline: '2025-04-24' },
        { name: 'Task 31', deadline: '2025-04-17' },
        { name: 'Task 33', deadline: '2025-04-22' },
        { name: 'Task 35', deadline: '2025-04-16' },
        { name: 'Task 36', deadline: '2025-04-24' },
        { name: 'Task 38', deadline: '2025-04-28' },
        { name: 'Task 39', deadline: '2025-04-22' },
        { name: 'Task 43', deadline: '2025-04-09' },
        { name: 'Task 46', deadline: '2025-04-14' },
        { name: 'Task 50', deadline: '2025-04-29' },
        { name: 'Task 51', deadline: '2025-04-28' },
        { name: 'Task 52', deadline: '2025-04-22' },
        { name: 'Task 59', deadline: '2025-04-10' },
        { name: 'Task 61', deadline: '2025-04-20' },
  ];

  // Filtered Deadlines
  filteredDeadlines = [...this.upcomingDeadlines];
  selectedDeadline = 'All';

  // Columns for task status table
  displayedColumns: string[] = ['task', 'status'];

  displayedColumnsTeam: string[] = ['member', 'tasksAssigned', 'tasksCompleted'];


  // Columns for upcoming deadlines table
  displayedColumnsDeadlines: string[] = ['task', 'deadline'];

  constructor() {}

  ngOnInit(): void {
    this.calculateTaskSummary();
  }

  // Calculate task summary dynamically based on task data
  calculateTaskSummary() {
    this.totalTasks = this.taskStatus.length;
    this.tasksCompleted = this.taskStatus.filter(task => task.status === 'Completed').length;
    const currentDate = new Date();
    this.overdueTasks = this.taskStatus.filter(task => task.dueDate < currentDate && task.status !== 'Completed').length;

    // Update the progress dynamically
    this.progress = (this.tasksCompleted / this.totalTasks) * 100;
  }

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
