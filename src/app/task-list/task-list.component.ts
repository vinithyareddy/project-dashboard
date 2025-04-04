import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../models/task.model'; // Import the Task model

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  tasks: Task[] = [
    { taskTitle: 'Task 1', assignedTo: 'John', status: 'Not Started', priority: 'High', dueDate: new Date('2025-04-10') },
    { taskTitle: 'Task 2', assignedTo: 'Alice', status: 'In Progress', priority: 'Low', dueDate: new Date('2025-04-12') },
    { taskTitle: 'Task 3', assignedTo: 'Bob', status: 'Completed', priority: 'High', dueDate: new Date('2025-04-15') },
    { taskTitle: 'Task 4', assignedTo: 'Jones', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-04-11') },
    { taskTitle: 'Task 5', assignedTo: 'James', status: 'In Progress', priority: 'Low', dueDate: new Date('2025-04-18') },
    { taskTitle: 'Task 6', assignedTo: 'Bobby', status: 'Not Started', priority: 'Low', dueDate: new Date('2025-04-21') },
    { taskTitle: 'Task 7', assignedTo: 'Betty', status: 'In Progress', priority: 'High', dueDate: new Date('2025-04-30') },
    { taskTitle: 'Task 8', assignedTo: 'Vernoica', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-04-29') },
    { taskTitle: 'Task 9', assignedTo: 'Charles', status: 'In Progress', priority: 'Medium', dueDate: new Date('2025-04-23') },
    { taskTitle: 'Task 10', assignedTo: 'Cheryl', status: 'Not Started', priority: 'High', dueDate: new Date('2025-04-06') },
    { taskTitle: 'Task 11', assignedTo: 'Archie', status: 'In Progress', priority: 'Medium', dueDate: new Date('2025-04-17') },
    { taskTitle: 'Task 12', assignedTo: 'Abhigail', status: 'Not Started', priority: 'Low', dueDate: new Date('2025-04-25') },
  ];

  taskStatuses = ['Not Started', 'In Progress', 'Completed'];
  priorities = ['High', 'Medium', 'Low'];
  teamMembers = ['John', 'Alice', 'Bob', 'Jones', 'James', 'Bobby', 'Betty', 'Veronica', 'Charles', 'Cheryl', 'Archie', 'Abhigail'];

  filterStatus = '';
  filterPriority = '';
  filterAssigned = '';
  filterDueDate: string = '';

  taskSummary = {
    notStarted: 0,
    inProgress: 0,
    completed: 0
  };

  taskDueDates = Array.from(new Set(this.tasks.map(task => task.dueDate.toLocaleDateString())));

  filteredTasks = this.tasks;

  displayedColumns: string[] = ['taskTitle', 'assignedTo', 'status', 'priority', 'dueDate', 'action'];

  // New Task Form Variables
  newTask: Task = { taskTitle: '', assignedTo: '', status: '', priority: '', dueDate: new Date() };
  isAddingTask: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateTaskSummary();
    this.applyFilters();
  }

  updateTaskSummary() {
    this.taskSummary.notStarted = this.tasks.filter(task => task.status === 'Not Started').length;
    this.taskSummary.inProgress = this.tasks.filter(task => task.status === 'In Progress').length;
    this.taskSummary.completed = this.tasks.filter(task => task.status === 'Completed').length;
  }

  applyFilters() {
    this.filteredTasks = this.tasks.filter(task => {
      return (
        (this.filterStatus ? task.status === this.filterStatus : true) &&
        (this.filterPriority ? task.priority === this.filterPriority : true) &&
        (this.filterAssigned ? task.assignedTo === this.filterAssigned : true) &&
        (this.filterDueDate ? task.dueDate.toLocaleDateString() === new Date(this.filterDueDate).toLocaleDateString() : true)
      );
    });
  }

  goToTaskDetail(task: Task) {
    this.router.navigate(['/task-detail', task.taskTitle]);
  }

  addTask() {
    if (this.isAddingTask) {
      if (this.newTask.taskTitle && this.newTask.assignedTo && this.newTask.status && this.newTask.priority && this.newTask.dueDate) {
        this.tasks.push({ ...this.newTask });
        this.applyFilters();
        this.isAddingTask = false;
        this.newTask = { taskTitle: '', assignedTo: '', status: '', priority: '', dueDate: new Date() };
      } else {
        alert("Please fill all fields");
      }
    } else {
      this.isAddingTask = true;
    }
  }

  editTask(task: Task) {
    const index = this.tasks.indexOf(task);
    if (index !== -1) {
      this.newTask = { ...task };
      this.isAddingTask = true;
      this.deleteTask(task);
    }
  }

  deleteTask(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.applyFilters();
  }
}
