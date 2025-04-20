import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js/auto';
import { CommonModule, DatePipe } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle.component';
import { FirestoreService } from '../services/firestore.service';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Timestamp } from '@angular/fire/firestore';
import { RefreshService } from 'src/app/services/refresh.service'; // ✅ Add this if not present


Chart.register(...registerables);

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
    ThemeToggleComponent
  ],
  providers: [DatePipe]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('donutChart') donutChartRef!: ElementRef;
  @ViewChild('performanceChart') performanceChartRef!: ElementRef;

  donutChart!: Chart;
  performanceChart!: Chart;

  tasks: Task[] = [];
  projects: Project[] = [];
  totalTasks = 0;
  tasksCompleted = 0;
  tasksInProgress = 0;
  tasksNotStarted = 0;
  overdueTasks = 0;

  totalProjects = 0;
  projectsCompleted = 0;
  projectsInProgress = 0;
  projectsNotStarted = 0;

  overallProgress = 0;
  upcomingDeadlines: { name: string; deadline: Date; type: 'Task' | 'Project' }[] = [];

  donutChartData: number[] = [];
  donutChartLabels: string[] = ['Completed', 'In Progress', 'Not Started'];
  performanceChartData: number[] = [];
  performanceChartLabels: string[] = [];

  currentProjectName: string = 'N/A';
  currentProjectProgress: number = 0;
  currentProjectDaysRemaining: number = 0;

  showAllProjects = false;
  showAllTasks = false;
  currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendar: (Date | null)[][] = [];

  constructor(private datePipe: DatePipe, private firestoreService: FirestoreService, private authService: AuthService,  private refreshService: RefreshService) {this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();}
    ngOnInit(): void {
      this.authService.getUser().subscribe(user => {
        console.log('🔥 Firebase UID:', user?.uid);
      });
  
      this.generateCalendar();
      this.loadData();
  
      this.refreshService.refresh$.subscribe(() => {
        this.loadData();
      });
    }
  

  fetchData(): void {
    this.firestoreService.getTasks().pipe(take(1)).subscribe(tasks => {
      this.tasks = tasks;
      this.calculateAllSummaries();
      this.prepareUpcomingDeadlines();
      this.prepareChartData();
    });

    this.firestoreService.getProjects().pipe(take(1)).subscribe(projects => {
      this.projects = projects.map(project => {
        let progress = 0;
        if (project.status === 'Completed') progress = 100;
        else if (project.status === 'In Progress') progress = 50;
        return { ...project, progress };
      });
      this.prepareProjectOverview();
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initializeDonutChart();
      this.initializePerformanceChart();
    }, 0);
  }

  convertToDate(date: Date | Timestamp): Date {
    return date instanceof Date ? date : date.toDate();
  }

  calculateAllSummaries(): void {
    const now = new Date();
    this.totalTasks = this.tasks.length;
    this.tasksCompleted = this.tasks.filter(t => t.status === 'Completed').length;
    this.tasksInProgress = this.tasks.filter(t => t.status === 'In Progress').length;
    this.tasksNotStarted = this.tasks.filter(t => t.status === 'Not Started').length;
    this.overdueTasks = this.tasks.filter(t => t.status !== 'Completed' && this.convertToDate(t.dueDate) < now).length;
    this.overallProgress = this.totalTasks > 0 ? Math.round((this.tasksCompleted / this.totalTasks) * 100) : 0;
  }

  prepareUpcomingDeadlines(): void {
    this.upcomingDeadlines = this.tasks
      .map(t => ({ name: t.name, deadline: this.convertToDate(t.dueDate), type: 'Task' as const }))
      .filter(d => d.deadline >= new Date())
      .sort((a, b) => a.deadline.getTime() - b.deadline.getTime());
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
    this.totalProjects = this.projects.length;
    this.projectsCompleted = this.projects.filter(p => p.status === 'Completed').length;
    this.projectsInProgress = this.projects.filter(p => p.status === 'In Progress').length;
    this.projectsNotStarted = this.projects.filter(p => p.status === 'Not Started').length;
  }

  private initializeDonutChart() {
    if (!this.donutChartRef || this.donutChartData.length === 0) return;
    const canvas = this.donutChartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (this.donutChart) this.donutChart.destroy();

    this.donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.donutChartLabels,
        datasets: [{
          data: this.donutChartData,
          backgroundColor: ['#4ade80', '#60a5fa', '#a78bfa'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '75%',
        plugins: { legend: { display: false }, tooltip: { enabled: true } }
      }
    });
  }

  private initializePerformanceChart() {
    if (!this.performanceChartRef || this.performanceChartData.length === 0) return;
    const canvas = this.performanceChartRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (this.performanceChart) this.performanceChart.destroy();

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
          y: { beginAtZero: true, ticks: { color: '#a0aec0' }, grid: { color: 'rgba(255,255,255,0.1)' } },
          x: { ticks: { color: '#a0aec0' }, grid: { display: false } }
        },
        plugins: { legend: { display: false } }
      }
    });
  }

  toggleProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }

  toggleTasks(): void {
    this.showAllTasks = !this.showAllTasks;
  }
 
  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);
    const weeks: (Date | null)[][] = [];
    let currentWeek: (Date | null)[] = [];
    const startingDay = firstDay.getDay();

    for (let i = 0; i < startingDay; i++) currentWeek.push(null);

    for (let day = 1; day <= lastDay.getDate(); day++) {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(new Date(this.currentYear, this.currentMonth, day));
    }

    while (currentWeek.length < 7) currentWeek.push(null);
    weeks.push(currentWeek);
    this.calendar = weeks;
  }
  loadData(): void {
    this.firestoreService.getTasks().pipe(take(1)).subscribe(tasks => {
      this.tasks = tasks;
      this.calculateAllSummaries();
      this.prepareUpcomingDeadlines();
      this.prepareChartData();
    });

    this.firestoreService.getProjects().pipe(take(1)).subscribe(projects => {
      this.projects = projects.map(project => {
        let progress = 0;
        if (project.status === 'Completed') progress = 100;
        else if (project.status === 'In Progress') progress = 50;
        return { ...project, progress };
      });
      this.prepareProjectOverview();
    });
  }

  
}