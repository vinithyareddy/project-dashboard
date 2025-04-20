import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle.component';
import { FirestoreService } from '../services/firestore.service';
import { Task } from '../models/task.model';
import { Project } from '../models/project.model';
import { take } from 'rxjs';
import { RefreshService } from 'src/app/services/refresh.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  standalone: true,
  imports: [CommonModule, ThemeToggleComponent]
})
export class CalendarComponent implements OnInit {
  currentDate = new Date();
  currentMonth: number;
  currentYear: number;
  calendar: (Date | null)[][] = [];
  tasks: Task[] = [];
  projects: Project[] = [];

  constructor(private firestoreService: FirestoreService,   private refreshService: RefreshService) {
    this.currentMonth = this.currentDate.getMonth();
    this.currentYear = this.currentDate.getFullYear();
  }


  ngOnInit() {
    this.generateCalendar();
    this.loadData(); // 🔁 Initial fetch

    // ✅ Reload on file upload
    this.refreshService.refresh$.subscribe(() => {
      this.loadData();
    });
  }

  loadData(): void {
    this.firestoreService.getTasks().pipe(take(1)).subscribe(tasks => {
      this.tasks = tasks;
    });

    this.firestoreService.getProjects().pipe(take(1)).subscribe(projects => {
      this.projects = projects;
    });
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

  getTasksForDate(date: Date | null): Task[] {
    if (!date) return [];
    return this.tasks.filter(task => {
      const taskDate = task.dueDate instanceof Date ? task.dueDate : task.dueDate.toDate();
      return taskDate.getDate() === date.getDate() &&
             taskDate.getMonth() === date.getMonth() &&
             taskDate.getFullYear() === date.getFullYear();
    });
  }

  getProjectsForDate(date: Date | null): Project[] {
    if (!date) return [];
    return this.projects.filter(project => {
      const projectDate = new Date(project.dueDate);
      return projectDate.getDate() === date.getDate() &&
             projectDate.getMonth() === date.getMonth() &&
             projectDate.getFullYear() === date.getFullYear();
    });
  }

  previousMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar();
  }

  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar();
  }

  getMonthName(): string {
    return new Date(this.currentYear, this.currentMonth).toLocaleString('default', { month: 'long' });
  }
}
