import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

interface Task {
  id: number;
  name: string;
  assignee: string;
  dueDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

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
    MatSelectModule
  ],
  providers: [DatePipe]
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [
    { id: 1, name: 'Review Design Mockups', status: 'Completed', dueDate: new Date(2025, 2, 10), assignee: 'Alice' },
    { id: 2, name: 'Develop API Endpoint', status: 'Completed', dueDate: new Date(2025, 2, 18), assignee: 'Bob' },
    { id: 3, name: 'Write Unit Tests', status: 'Completed', dueDate: new Date(2025, 2, 22), assignee: 'Charlie' },
    { id: 4, name: 'Deploy to Staging', status: 'Completed', dueDate: new Date(2025, 3, 5), assignee: 'Betty' },
    { id: 5, name: 'Client Demo Prep', status: 'In Progress', dueDate: new Date(2025, 3, 12), assignee: 'Bobby' },
    { id: 6, name: 'Fix Login Bug', status: 'Completed', dueDate: new Date(2025, 2, 5), assignee: 'Charles' },
    { id: 7, name: 'Update Documentation', status: 'Not Started', dueDate: new Date(2025, 3, 20), assignee: 'James' },
    { id: 8, name: 'Performance Testing', status: 'Not Started', dueDate: new Date(2025, 3, 25), assignee: 'John' },
    { id: 9, name: 'Widget Development', status: 'In Progress', dueDate: new Date(2025, 3, 21), assignee: 'Veronica' },
    { id: 10, name: 'World Map Designing', status: 'Completed', dueDate: new Date(2025, 1, 20), assignee: 'Cheryl' },
    { id: 11, name: 'Back End Development', status: 'Completed', dueDate: new Date(2025, 1, 10), assignee: 'Archie' },
    { id: 12, name: 'Software setup', status: 'Completed', dueDate: new Date(2025, 1, 12), assignee: 'Charles' },
    { id: 13, name: 'Toggle Button Design', status: 'Completed', dueDate: new Date(2025, 1, 5), assignee: 'Archie' },
    { id: 14, name: 'Update Information', status: 'Completed', dueDate: new Date(2025, 1, 25), assignee: 'Alice' },
    { id: 15, name: 'Add New Icons', status: 'Not Started', dueDate: new Date(2025, 3, 23), assignee: 'Bob' },
    { id: 16, name: 'Add real time data', status: 'Completed', dueDate: new Date(2025, 0, 18), assignee: 'Bobby' },
    { id: 17, name: 'Write API Documentation', status: 'Completed', dueDate: new Date(2025, 0, 15), assignee: 'Betty' },
    { id: 18, name: 'Update Table Data', status: 'Completed', dueDate: new Date(2025, 0, 29), assignee: 'Cheryl' },
    { id: 19, name: 'Update User Interface', status: 'Completed', dueDate: new Date(2025, 0, 31), assignee: 'Veronica' },
    { id: 20, name: 'Update test cases', status: 'Completed', dueDate: new Date(2025, 0, 30), assignee: 'Cheryl' },
    { id: 21, name: 'Add new features', status: 'Not Started', dueDate: new Date(2025, 3, 29), assignee: 'James' },
    { id: 22, name: 'Develop UI Components', status: 'Completed', dueDate: new Date(2025, 2, 30), assignee: 'John' },
    { id: 23, name: 'Fix Bugs', status: 'Completed', dueDate: new Date(2025, 1, 11), assignee: 'Alice' },
    { id: 24, name: 'Review Code', status: 'Completed', dueDate: new Date(2025, 1, 19), assignee: 'Cheryl' },
    { id: 25, name: 'Review documentation', status: 'Completed', dueDate: new Date(2025, 0, 28), assignee: 'Betty' },
    { id: 26, name: 'Performance Testing', status: 'Completed', dueDate: new Date(2025, 0, 10), assignee: 'Veronica' },
    { id: 27, name: 'Deploy to Production', status: 'Completed', dueDate: new Date(2025, 0, 13), assignee: 'Alice' },
    { id: 28, name: 'Deploy to Staging ', status: 'Completed', dueDate: new Date(2025, 0, 17), assignee: 'Bob' },
    { id: 29, name: 'Add new widgets', status: 'Completed', dueDate: new Date(2025, 1, 16), assignee: 'Bobby' },
    { id: 30, name: 'Add information icons', status: 'In Progress', dueDate: new Date(2025, 3, 17), assignee: 'Betty' },
    { id: 31, name: 'Deploy to qa', status: 'In Progress', dueDate: new Date(2025, 3, 13), assignee: 'Charlie' },
    { id: 32, name: 'Complete the test cases', status: 'Completed', dueDate: new Date(2025, 3, 2), assignee: 'Charles' },
    { id: 33, name: 'Update the dummy data', status: 'Completed', dueDate: new Date(2025, 3, 6), assignee: 'Alice' },
    { id: 34, name: 'Review Design Mockups', status: 'Completed', dueDate: new Date(2025, 2, 13), assignee: 'James' },
    { id: 35, name: 'Develop API Endpoint', status: 'Completed', dueDate: new Date(2025, 2, 15), assignee: 'Bob' },
    { id: 36, name: 'Write Unit Tests', status: 'Completed', dueDate: new Date(2025, 2, 22), assignee: 'Charlie' },
    { id: 37, name: 'Deploy to Staging', status: 'Completed', dueDate: new Date(2025, 3, 5), assignee: 'Alice' },
    { id: 38, name: 'Client Demo Prep', status: 'In Progress', dueDate: new Date(2025, 3, 12), assignee: 'Bob' },
    { id: 39, name: 'Fix Login Bug', status: 'Completed', dueDate: new Date(2025, 2, 5), assignee: 'Charlie' },
    { id: 40, name: 'Update Documentation', status: 'Completed', dueDate: new Date(2025, 3, 9), assignee: 'Alice' },
    { id: 41, name: 'Performance Testing', status: 'Not Started', dueDate: new Date(2025, 3, 27), assignee: 'Bob' },
    { id: 42, name: 'Widget Development', status: 'Completed', dueDate: new Date(2025, 1, 12), assignee: 'John' },
    { id: 43, name: 'World Map Designing', status: 'Completed', dueDate: new Date(2025, 1, 16), assignee: 'James' },
    { id: 44, name: 'Back End Development', status: 'Completed', dueDate: new Date(2025, 1, 2), assignee: 'Abhigail' },
    { id: 45, name: 'Software setup', status: 'Completed', dueDate: new Date(2025, 1, 4), assignee: 'Abhigail' },
    { id: 46, name: 'Toggle Button Design', status: 'Completed', dueDate: new Date(2025, 0, 22), assignee: 'Alice' },
    { id: 47, name: 'Update Information', status: 'Completed', dueDate: new Date(2025, 0, 12), assignee: 'Abhigail' },
    { id: 48, name: 'Add New Icons', status: 'Completed', dueDate: new Date(2025, 0, 24), assignee: 'Cheryl' },
    { id: 49, name: 'Add real time data', status: 'Completed', dueDate: new Date(2025, 0, 23), assignee: 'Cheryl' },
    { id: 50, name: 'Write API Documentation', status: 'Completed', dueDate: new Date(2025, 1, 26), assignee: 'Charlie' },
    { id: 51, name: 'Update Table Data', status: 'Completed', dueDate: new Date(2025, 1, 27), assignee: 'Abhigail' },
    { id: 52, name: 'Update User Interface', status: 'Completed', dueDate: new Date(2025, 1, 14), assignee: 'Bob' },
    { id: 53, name: 'Update test cases', status: 'Completed', dueDate: new Date(2025, 1, 16), assignee: 'Charlie' },
    { id: 54, name: 'Add new features', status: 'Completed', dueDate: new Date(2025, 1, 17), assignee: 'Abhigail' },
    { id: 55, name: 'Develop UI Components', status: 'Completed', dueDate: new Date(2025, 1, 11), assignee: 'Alice' },
    { id: 56, name: 'Fix Bugs', status: 'Completed', dueDate: new Date(2025, 2, 11), assignee: 'Betty' },
    { id: 57, name: 'Review Code', status: 'Completed', dueDate: new Date(2025, 2, 15), assignee: 'Betty' },
    { id: 58, name: 'Review documentation', status: 'Completed', dueDate: new Date(2025, 2, 21), assignee: 'Veronica' },
    { id: 59, name: 'Performance Testing', status: 'Completed', dueDate: new Date(2025, 2, 6), assignee: 'Archie' },
    { id: 60, name: 'Deploy to Production', status: 'Completed', dueDate: new Date(2025, 2, 7), assignee: 'Alice' },
    { id: 61, name: 'Deploy to Staging ', status: 'Completed', dueDate: new Date(2025, 2, 26), assignee: 'Alice' },
  ];

  filteredTasks: Task[] = [];
  taskForm!: FormGroup;
  isEditing = false;
  editingTaskId: number | null = null;
  nextId = 6;

  taskStatuses: string[] = ['Not Started', 'In Progress', 'Completed'];
  
  assigneeList: string[] = [];
  selectedAssignee: string = 'All';
  selectedDate: Date | null = null;
  showAllTasks = false;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      assignee: ['', Validators.required],
      dueDate: [null, Validators.required],
      status: ['Not Started', Validators.required]
    });
    this.updateAssigneeList();
    this.applyFilters();
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
            const taskDueDate = new Date(task.dueDate);
            taskDueDate.setHours(0, 0, 0, 0);
            return taskDueDate.getTime() === filterTime;
        });
    }

    this.filteredTasks = tempTasks.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
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
    this.editingTaskId = task.id;
    this.taskForm.setValue({
      name: task.name,
      assignee: task.assignee,
      dueDate: task.dueDate,
      status: task.status
    });
  }

  saveTask(): void {
    if (this.taskForm.invalid) {
      return;
    }

    const formValue = this.taskForm.value;

    if (this.editingTaskId !== null) {
      const index = this.tasks.findIndex(t => t.id === this.editingTaskId);
      if (index > -1) {
        this.tasks[index] = { ...this.tasks[index], ...formValue };
      }
    } else {
      const newTask: Task = {
        id: this.nextId++,
        ...formValue
      };
      this.tasks.push(newTask);
    }
    
    this.updateAssigneeList();
    this.applyFilters();
    this.cancelEdit();
  }

  deleteTask(taskId: number): void {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    if (this.editingTaskId === taskId) {
        this.cancelEdit();
    }
    this.updateAssigneeList();
    this.applyFilters();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingTaskId = null;
    this.taskForm.reset({ status: 'Not Started' });
  }

  // Method to toggle between showing all tasks and limited tasks
  toggleTasksDisplay(): void {
    this.showAllTasks = !this.showAllTasks;
  }
} 