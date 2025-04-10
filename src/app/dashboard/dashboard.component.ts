import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle.component'; // Adjust the path


Chart.register(...registerables);

interface Task {
  id: number;
  title: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: Date;
  assignee: string;
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: Date;
  progress: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    ThemeToggleComponent, // 👈 Add this!

  ],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('donutChart') donutChartRef!: ElementRef;
  @ViewChild('performanceChart') performanceChartRef!: ElementRef;

  donutChart!: Chart;
  performanceChart!: Chart;

  tasks: Task[] = [
    { id: 1, title: 'Review Design Mockups', status: 'Completed', dueDate: new Date(2025, 2, 10), assignee: 'Alice' },
    { id: 2, title: 'Develop API Endpoint', status: 'Completed', dueDate: new Date(2025, 2, 18), assignee: 'Bob' },
    { id: 3, title: 'Write Unit Tests', status: 'Completed', dueDate: new Date(2025, 2, 22), assignee: 'Charlie' },
    { id: 4, title: 'Deploy to Staging', status: 'Completed', dueDate: new Date(2025, 3, 5), assignee: 'Betty' },
    { id: 5, title: 'Client Demo Prep', status: 'In Progress', dueDate: new Date(2025, 3, 12), assignee: 'Bobby' },
    { id: 6, title: 'Fix Login Bug', status: 'Completed', dueDate: new Date(2025, 2, 5), assignee: 'Charles' },
    { id: 7, title: 'Update Documentation', status: 'Not Started', dueDate: new Date(2025, 3, 20), assignee: 'James' },
    { id: 8, title: 'Performance Testing', status: 'Not Started', dueDate: new Date(2025, 3, 25), assignee: 'John' },
    { id: 9, title: 'Widget Development', status: 'In Progress', dueDate: new Date(2025, 3, 21), assignee: 'Veronica' },
    { id: 10, title: 'World Map Designing', status: 'Completed', dueDate: new Date(2025, 1, 20), assignee: 'Cheryl' },
    { id: 11, title: 'Back End Development', status: 'Completed', dueDate: new Date(2025, 1, 10), assignee: 'Archie' },
    { id: 12, title: 'Software setup', status: 'Completed', dueDate: new Date(2025, 1, 12), assignee: 'Charles' },
    { id: 13, title: 'Toggle Button Design', status: 'Completed', dueDate: new Date(2025, 1, 5), assignee: 'Archie' },
    { id: 14, title: 'Update Information', status: 'Completed', dueDate: new Date(2025, 1, 25), assignee: 'Alice' },
    { id: 15, title: 'Add New Icons', status: 'Not Started', dueDate: new Date(2025, 3, 23), assignee: 'Bob' },
    { id: 16, title: 'Add real time data', status: 'Completed', dueDate: new Date(2025, 0, 18), assignee: 'Bobby' },
    { id: 17, title: 'Write API Documentation', status: 'Completed', dueDate: new Date(2025, 0, 15), assignee: 'Betty' },
    { id: 18, title: 'Update Table Data', status: 'Completed', dueDate: new Date(2025, 0, 29), assignee: 'Cheryl' },
    { id: 19, title: 'Update User Interface', status: 'Completed', dueDate: new Date(2025, 0, 31), assignee: 'Veronica' },
    { id: 20, title: 'Update test cases', status: 'Completed', dueDate: new Date(2025, 0, 30), assignee: 'Cheryl' },
    { id: 21, title: 'Add new features', status: 'Not Started', dueDate: new Date(2025, 3, 29), assignee: 'James' },
    { id: 22, title: 'Develop UI Components', status: 'Completed', dueDate: new Date(2025, 2, 30), assignee: 'John' },
    { id: 23, title: 'Fix Bugs', status: 'Completed', dueDate: new Date(2025, 1, 11), assignee: 'Alice' },
    { id: 24, title: 'Review Code', status: 'Completed', dueDate: new Date(2025, 1, 19), assignee: 'Cheryl' },
    { id: 25, title: 'Review documentation', status: 'Completed', dueDate: new Date(2025, 0, 28), assignee: 'Betty' },
    { id: 26, title: 'Performance Testing', status: 'Completed', dueDate: new Date(2025, 0, 10), assignee: 'Veronica' },
    { id: 27, title: 'Deploy to Production', status: 'Completed', dueDate: new Date(2025, 0, 13), assignee: 'Alice' },
    { id: 28, title: 'Deploy to Staging ', status: 'Completed', dueDate: new Date(2025, 0, 17), assignee: 'Bob' },
    { id: 29, title: 'Add new widgets', status: 'Completed', dueDate: new Date(2025, 1, 16), assignee: 'Bobby' },
    { id: 30, title: 'Add information icons', status: 'In Progress', dueDate: new Date(2025, 3, 17), assignee: 'Betty' },
    { id: 31, title: 'Deploy to qa', status: 'In Progress', dueDate: new Date(2025, 3, 13), assignee: 'Charlie' },
    { id: 32, title: 'Complete the test cases', status: 'Completed', dueDate: new Date(2025, 3, 2), assignee: 'Charles' },
    { id: 33, title: 'Update the dummy data', status: 'Completed', dueDate: new Date(2025, 3, 6), assignee: 'Alice' },
    { id: 34, title: 'Review Design Mockups', status: 'Completed', dueDate: new Date(2025, 2, 13), assignee: 'James' },
    { id: 35, title: 'Develop API Endpoint', status: 'Completed', dueDate: new Date(2025, 2, 15), assignee: 'Bob' },
    { id: 36, title: 'Write Unit Tests', status: 'Completed', dueDate: new Date(2025, 2, 22), assignee: 'Charlie' },
    { id: 37, title: 'Deploy to Staging', status: 'Completed', dueDate: new Date(2025, 3, 5), assignee: 'Alice' },
    { id: 38, title: 'Client Demo Prep', status: 'In Progress', dueDate: new Date(2025, 3, 12), assignee: 'Bob' },
    { id: 39, title: 'Fix Login Bug', status: 'Completed', dueDate: new Date(2025, 2, 5), assignee: 'Charlie' },
    { id: 40, title: 'Update Documentation', status: 'Completed', dueDate: new Date(2025, 3, 9), assignee: 'Alice' },
    { id: 41, title: 'Performance Testing', status: 'Not Started', dueDate: new Date(2025, 3, 27), assignee: 'Bob' },
    { id: 42, title: 'Widget Development', status: 'Completed', dueDate: new Date(2025, 1, 12), assignee: 'John' },
    { id: 43, title: 'World Map Designing', status: 'Completed', dueDate: new Date(2025, 1, 16), assignee: 'James' },
    { id: 44, title: 'Back End Development', status: 'Completed', dueDate: new Date(2025, 1, 2), assignee: 'Abhigail' },
    { id: 45, title: 'Software setup', status: 'Completed', dueDate: new Date(2025, 1, 4), assignee: 'Abhigail' },
    { id: 46, title: 'Toggle Button Design', status: 'Completed', dueDate: new Date(2025, 0, 22), assignee: 'Alice' },
    { id: 47, title: 'Update Information', status: 'Completed', dueDate: new Date(2025, 0, 12), assignee: 'ABhigail' },
    { id: 48, title: 'Add New Icons', status: 'Completed', dueDate: new Date(2025, 0, 24), assignee: 'Cheryl' },
    { id: 49, title: 'Add real time data', status: 'Completed', dueDate: new Date(2025, 0, 23), assignee: 'Cheryl' },
    { id: 50, title: 'Write API Documentation', status: 'Completed', dueDate: new Date(2025, 1, 26), assignee: 'Charlie' },
    { id: 51, title: 'Update Table Data', status: 'Completed', dueDate: new Date(2025, 1, 27), assignee: 'Abhigail' },
    { id: 52, title: 'Update User Interface', status: 'Completed', dueDate: new Date(2025, 1, 14), assignee: 'Bob' },
    { id: 53, title: 'Update test cases', status: 'Completed', dueDate: new Date(2025, 1, 16), assignee: 'Charlie' },
    { id: 54, title: 'Add new features', status: 'Completed', dueDate: new Date(2025, 1, 17), assignee: 'Abhigail' },
    { id: 55, title: 'Develop UI Components', status: 'Completed', dueDate: new Date(2025, 1, 11), assignee: 'Alice' },
    { id: 56, title: 'Fix Bugs', status: 'Completed', dueDate: new Date(2025, 2, 11), assignee: 'Betty' },
    { id: 57, title: 'Review Code', status: 'Completed', dueDate: new Date(2025, 2, 15), assignee: 'Betty' },
    { id: 58, title: 'Review documentation', status: 'Completed', dueDate: new Date(2025, 2, 21), assignee: 'Veronica' },
    { id: 59, title: 'Performance Testing', status: 'Completed', dueDate: new Date(2025, 2, 6), assignee: 'Archie' },
    { id: 60, title: 'Deploy to Production', status: 'Completed', dueDate: new Date(2025, 2, 7), assignee: 'Alice' },
    { id: 61, title: 'Deploy to Staging ', status: 'Completed', dueDate: new Date(2025, 2, 26), assignee: 'Alice' },
  ];

  projects: Project[] = [
    { id: 101, name: 'Website Redesign', description: 'Update company website', status: 'In Progress', dueDate: new Date(2025, 5, 30), progress: 0 },
    { id: 102, name: 'Mobile App Launch', description: 'iOS and Android app', status: 'Not Started', dueDate: new Date(2025, 6, 15), progress: 0 },
    { id: 103, name: 'Internal HR Portal', description: 'New portal for HR', status: 'Completed', dueDate: new Date(2025, 3, 1), progress: 0 },
    { id: 104, name: 'Q3 Marketing Campaign', description: 'Social media campaign', status: 'Not Started', dueDate: new Date(2025, 7, 1), progress: 0 },
  ];

  totalTasks: number = 0;
  tasksCompleted: number = 0;
  tasksInProgress: number = 0;
  tasksNotStarted: number = 0;
  overdueTasks: number = 0;

  totalProjects: number = 0;
  projectsCompleted: number = 0;
  projectsInProgress: number = 0;
  projectsNotStarted: number = 0;

  overallProgress: number = 0;

  upcomingDeadlines: { name: string; deadline: Date; type: 'Task' | 'Project' }[] = [];

  donutChartData: number[] = [];
  donutChartLabels: string[] = ['Completed', 'In Progress', 'Not Started'];

  performanceChartData: number[] = [1, 3, 2, 5, 4, 6];
  performanceChartLabels: string[] = ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5'];

  currentProjectName: string = 'N/A';
  currentProjectProgress: number = 0;
  currentProjectDaysRemaining: number = 0;

  showAllProjects = false;
  showAllTasks = false;

  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.calculateAllSummaries();
    this.prepareUpcomingDeadlines();
    this.prepareChartData();
    this.prepareProjectOverview();
  }

  ngAfterViewInit() {
    this.initializeDonutChart();
    this.initializePerformanceChart();
  }

  calculateAllSummaries(): void {
    const now = new Date();

    this.totalTasks = this.tasks.length;
    this.tasksCompleted = this.tasks.filter(t => t.status === 'Completed').length;
    this.tasksInProgress = this.tasks.filter(t => t.status === 'In Progress').length;
    this.tasksNotStarted = this.tasks.filter(t => t.status === 'Not Started').length;
    this.overdueTasks = this.tasks.filter(t => t.status !== 'Completed' && t.dueDate < now).length;
    this.overallProgress = this.totalTasks > 0 ? Math.round((this.tasksCompleted / this.totalTasks) * 100) : 0;

    this.totalProjects = this.projects.length;
    this.projectsCompleted = this.projects.filter(p => p.status === 'Completed').length;
    this.projectsInProgress = this.projects.filter(p => p.status === 'In Progress').length;
    this.projectsNotStarted = this.projects.filter(p => p.status === 'Not Started').length;
  }

  prepareUpcomingDeadlines(): void {
    const taskDeadlines = this.tasks
      .map(t => ({ 
        name: t.title, 
        deadline: t.dueDate, 
        type: 'Task' as const 
      }))
      .filter(d => d.deadline >= new Date())
      .sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
    
    this.upcomingDeadlines = taskDeadlines;
  }

  prepareChartData(): void {
    this.donutChartData = [
      this.tasksCompleted,
      this.tasksInProgress,
      this.tasksNotStarted
    ];
    this.performanceChartLabels = ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5'];
    this.performanceChartData = [1, 3, 2, 5, 4, 6];
  }

  prepareProjectOverview(): void {
    this.projects.forEach(project => {
      if (project.status === 'Completed') {
        project.progress = 100;
      } else if (project.status === 'In Progress') {
        project.progress = 50; // Example logic for in-progress
      } else {
        project.progress = 0;
      }
    });
  }

  private initializeDonutChart() {
    if (!this.donutChartRef) return;
    const canvas = this.donutChartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (this.donutChart) {
      this.donutChart.destroy();
    }

    this.donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.donutChartLabels,
        datasets: [{
          data: this.donutChartData,
          backgroundColor: [
            '#4ade80',
            '#60a5fa',
            '#a78bfa'
          ],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true }
        }
      }
    });
  }

  private initializePerformanceChart() {
    if (!this.performanceChartRef) return;
    const canvas = this.performanceChartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (this.performanceChart) {
      this.performanceChart.destroy();
    }

    this.performanceChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.performanceChartLabels,
        datasets: [{
          label: 'Tasks Completed Weekly',
          data: this.performanceChartData,
          fill: false,
          borderColor: '#60a5fa',
          pointBackgroundColor: '#60a5fa',
          pointBorderColor: '#60a5fa',
          pointRadius: 4,
          tension: 0.3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#a0aec0' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: {
            ticks: { color: '#a0aec0' },
            grid: { display: false }
          }
        },
        plugins: {
          legend: { display: false }
        }
      }
    });
  }

  toggleProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }

  toggleTasks(): void {
    this.showAllTasks = !this.showAllTasks;
  }
}