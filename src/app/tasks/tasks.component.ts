import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle.component';
import { DatePipe } from '@angular/common';
import { FirestoreService } from '../services/firestore.service';
import { Task } from '../models/task.model';
import { take } from 'rxjs';
import { Timestamp } from '@angular/fire/firestore'; // ✅ Needed to detect Timestamp type
import { RefreshService } from 'src/app/services/refresh.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ThemeToggleComponent,
  ],
  providers: [DatePipe]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  taskForm!: FormGroup;
  isEditing = false;
  editingTaskId: string | null = null;
  taskStatuses: string[] = ['Not Started', 'In Progress', 'Completed'];
  assigneeList: string[] = [];
  selectedAssignee: string = 'All';
  selectedDate: Date | null = null;
  showAllTasks = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private firestoreService: FirestoreService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      assignee: ['', Validators.required],
      dueDate: [null, Validators.required],
      status: ['Not Started', Validators.required]
    });

    this.loadData();

    this.refreshService.refresh$.subscribe(() => {
      this.loadData();
    });
  }

  loadTasks(): void {
    this.firestoreService.getTasks().pipe(take(1)).subscribe(tasks => {
      this.tasks = tasks;
      this.updateAssigneeList();
      this.applyFilters();
    });
  }

  updateAssigneeList(): void {
    const assignees = new Set(this.tasks.map(task => task.assignee));
    this.assigneeList = ['All', ...Array.from(assignees).sort()];
  }

  applyFilters(): void {
    let tempTasks = [...this.tasks];
    if (this.selectedAssignee && this.selectedAssignee !== 'All') {
      tempTasks = tempTasks.filter(task => task.assignee === this.selectedAssignee);
    }
    if (this.selectedDate) {
      const filterDate = new Date(this.selectedDate);
      filterDate.setHours(0, 0, 0, 0);
      const filterTime = filterDate.getTime();
      tempTasks = tempTasks.filter(task => {
        const taskDueDate = this.convertToDate(task.dueDate);
        taskDueDate.setHours(0, 0, 0, 0);
        return taskDueDate.getTime() === filterTime;
      });
    }
    this.filteredTasks = tempTasks.sort((a, b) =>
      this.convertToDate(a.dueDate).getTime() - this.convertToDate(b.dueDate).getTime()
    );
  }

  clearDateFilter(): void {
    this.selectedDate = null;
    this.applyFilters();
  }

  showAddTaskForm(): void {
    this.isEditing = true;
    this.editingTaskId = null;
    this.taskForm.reset({ status: 'Not Started' });
  }

  editTask(task: Task): void {
    this.isEditing = true;
    this.editingTaskId = task.id || null;
    this.taskForm.setValue({
      name: task.name,
      assignee: task.assignee,
      dueDate: this.convertToDate(task.dueDate), // 🔁 ensure compatibility
      status: task.status
    });
  }

  saveTask(): void {
    if (this.taskForm.invalid) return;
    const formValue = this.taskForm.value;
    const newTask: Task = { ...formValue };

    if (this.editingTaskId) {
      this.firestoreService.updateTask(this.editingTaskId, newTask).pipe(take(1)).subscribe(() => {
        const index = this.tasks.findIndex(t => t.id === this.editingTaskId);
        if (index > -1) this.tasks[index] = { ...this.tasks[index], ...newTask };
        this.afterChange();
      });
    } else {
      this.firestoreService.addTask(newTask).pipe(take(1)).subscribe(docRef => {
        this.tasks.push({ id: docRef.id, ...newTask });
        this.afterChange();
      });
    }
  }

  deleteTask(taskId: string): void {
    this.firestoreService.deleteTask(taskId).pipe(take(1)).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== taskId);
      this.afterChange();
    });
  }

  afterChange(): void {
    this.updateAssigneeList();
    this.applyFilters();
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingTaskId = null;
    this.taskForm.reset({ status: 'Not Started' });
  }

  toggleTasksDisplay(): void {
    this.showAllTasks = !this.showAllTasks;
  }

  /**
   * 🔧 Handles both Firestore Timestamp and native Date types safely.
   */
  convertToDate(input: any): Date {
    return input instanceof Date
      ? input
      : (input && typeof input.toDate === 'function')
        ? input.toDate()
        : new Date(input);
  }
  loadData(): void {
    this.firestoreService.getTasks().pipe(take(1)).subscribe(tasks => {
      this.tasks = tasks.map(task => ({
        ...task,
        dueDate: task.dueDate instanceof Date
          ? task.dueDate
          : (task.dueDate && typeof task.dueDate === 'object' && 'toDate' in task.dueDate
              ? (task.dueDate as any).toDate()
              : new Date(task.dueDate))
      }));
      this.updateAssigneeList();
      this.applyFilters();
    });
  }
}
