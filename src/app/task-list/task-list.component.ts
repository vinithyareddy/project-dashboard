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
    { taskTitle: 'Task 1', assignedTo: 'John', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-10') },
    { taskTitle: 'Task 2', assignedTo: 'Alice', status: 'In Progress', priority: 'Medium', dueDate: new Date('2025-04-12') },
    { taskTitle: 'Task 3', assignedTo: 'Bob', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-15') },
    { taskTitle: 'Task 4', assignedTo: 'Jones', status: 'Completed', priority: 'High', dueDate: new Date('2025-02-11') },
    { taskTitle: 'Task 5', assignedTo: 'James', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-01-18') },
    { taskTitle: 'Task 6', assignedTo: 'Bobby', status: 'Completed', priority: 'Low', dueDate: new Date('2025-02-21') },
    { taskTitle: 'Task 7', assignedTo: 'Betty', status: 'In Progress', priority: 'Medium', dueDate: new Date('2025-04-30') },
    { taskTitle: 'Task 8', assignedTo: 'Veronica', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-29') },
    { taskTitle: 'Task 9', assignedTo: 'Charles', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-02-23') },
    { taskTitle: 'Task 10', assignedTo: 'Cheryl', status: 'Completed', priority: 'High', dueDate: new Date('2025-04-06') },
    { taskTitle: 'Task 11', assignedTo: 'Archie', status: 'In Progress', priority: 'Medium', dueDate: new Date('2025-04-17') },
    { taskTitle: 'Task 12', assignedTo: 'Abhigail', status: 'Completed', priority: 'High', dueDate: new Date('2025-03-25') },
    { taskTitle: 'Task 13', assignedTo: 'Betty', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-30') },
    { taskTitle: 'Task 14', assignedTo: 'Veronica', status: 'In Progress', priority: 'Medium', dueDate: new Date('2025-04-29') },
    { taskTitle: 'Task 15', assignedTo: 'Charles', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-04-01') },
    { taskTitle: 'Task 16', assignedTo: 'Cheryl', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-06') },
    { taskTitle: 'Task 17', assignedTo: 'Archie', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-02-17') },
    { taskTitle: 'Task 18', assignedTo: 'Abhigail', status: 'Completed', priority: 'Low', dueDate: new Date('2025-02-25') },
    { taskTitle: 'Task 19', assignedTo: 'John', status: 'Completed', priority: 'High', dueDate: new Date('2025-04-10') },
    { taskTitle: 'Task 20', assignedTo: 'Alice', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-03-12') },
    { taskTitle: 'Task 21', assignedTo: 'Bob', status: 'Completed', priority: 'Low', dueDate: new Date('2025-02-15') },
    { taskTitle: 'Task 22', assignedTo: 'Jones', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-03-11') },
    { taskTitle: 'Task 23', assignedTo: 'James', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-18') },
    { taskTitle: 'Task 24', assignedTo: 'Bobby', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-03-21') },
    { taskTitle: 'Task 25', assignedTo: 'Archie', status: 'In Progress', priority: 'High', dueDate: new Date('2025-04-17') },
    { taskTitle: 'Task 26', assignedTo: 'Abhigail', status: 'Not Started', priority: 'Low', dueDate: new Date('2025-04-25') },
    { taskTitle: 'Task 27', assignedTo: 'John', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-03-10') },
    { taskTitle: 'Task 28', assignedTo: 'Alice', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-12') },
    { taskTitle: 'Task 29', assignedTo: 'Bob', status: 'Completed', priority: 'High', dueDate: new Date('2025-02-15') },
    { taskTitle: 'Task 30', assignedTo: 'Jones', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-11') },
    { taskTitle: 'Task 31', assignedTo: 'James', status: 'Not Started', priority: 'Medium', dueDate: new Date('2025-04-18') },
    { taskTitle: 'Task 32', assignedTo: 'Bobby', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-21') },
    { taskTitle: 'Task 33', assignedTo: 'Charles', status: 'Not Started', priority: 'Medium', dueDate: new Date('2025-04-23') },
    { taskTitle: 'Task 34', assignedTo: 'Cheryl', status: 'Completed', priority: 'Low', dueDate: new Date('2025-04-06') },
    { taskTitle: 'Task 35', assignedTo: 'Archie', status: 'In Progress', priority: 'High', dueDate: new Date('2025-04-17') },
    { taskTitle: 'Task 36', assignedTo: 'Abhigail', status: 'Not Started', priority: 'Medium', dueDate: new Date('2025-04-25') },
    { taskTitle: 'Task 37', assignedTo: 'Betty', status: 'Completed', priority: 'High', dueDate: new Date('2025-03-30') },
    { taskTitle: 'Task 38', assignedTo: 'Veronica', status: 'Not Started', priority: 'Medium', dueDate: new Date('2025-04-29') },
    { taskTitle: 'Task 39', assignedTo: 'Charles', status: 'Not Started', priority: 'High', dueDate: new Date('2025-04-23') },
    { taskTitle: 'Task 40', assignedTo: 'Cheryl', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-06') },
    { taskTitle: 'Task 41', assignedTo: 'Archie', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-01-17') },
    { taskTitle: 'Task 42', assignedTo: 'Abhigail', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-25') },
    { taskTitle: 'Task 43', assignedTo: 'John', status: 'In Progress', priority: 'Low', dueDate: new Date('2025-04-10') },
    { taskTitle: 'Task 44', assignedTo: 'John', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-02-10') },
    { taskTitle: 'Task 45', assignedTo: 'Alice', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-12') },
    { taskTitle: 'Task 46', assignedTo: 'Bob', status: 'Not Started', priority: 'Medium', dueDate: new Date('2025-04-15') },
    { taskTitle: 'Task 47', assignedTo: 'Jones', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-11') },
    { taskTitle: 'Task 48', assignedTo: 'James', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-02-18') },
    { taskTitle: 'Task 49', assignedTo: 'Bobby', status: 'Completed', priority: 'High', dueDate: new Date('2025-01-21') },
    { taskTitle: 'Task 50', assignedTo: 'Betty', status: 'Not Started', priority: 'Low', dueDate: new Date('2025-04-30') },
    { taskTitle: 'Task 51', assignedTo: 'Veronica', status: 'Not Started', priority: 'Medium', dueDate: new Date('2025-04-29') },
    { taskTitle: 'Task 52', assignedTo: 'Charles', status: 'In Progress', priority: 'High', dueDate: new Date('2025-04-23') },
    { taskTitle: 'Task 53', assignedTo: 'Cheryl', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-06') },
    { taskTitle: 'Task 54', assignedTo: 'Archie', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-03-17') },
    { taskTitle: 'Task 55', assignedTo: 'Abhigail', status: 'Completed', priority: 'High', dueDate: new Date('2025-02-25') },
    { taskTitle: 'Task 56', assignedTo: 'John', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-01-10') },
    { taskTitle: 'Task 57', assignedTo: 'Alice', status: 'Completed', priority: 'Low', dueDate: new Date('2025-03-12') },
    { taskTitle: 'Task 58', assignedTo: 'Bob', status: 'Completed', priority: 'Medium', dueDate: new Date('2025-02-15') },
    { taskTitle: 'Task 59', assignedTo: 'Jones', status: 'In Progress', priority: 'Medium', dueDate: new Date('2025-04-11') },
    { taskTitle: 'Task 60', assignedTo: 'James', status: 'Completed', priority: 'Low', dueDate: new Date('2025-01-18') },
    { taskTitle: 'Task 61', assignedTo: 'Bobby', status: 'Not Started', priority: 'High', dueDate: new Date('2025-04-21') },
  ];

  filteredTasks = this.tasks;
  displayedTasks: Task[] = [];
  visibleTaskCount: number = 6;
  showMore: boolean = true;

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

  // Define taskDueDates by extracting unique dates from the tasks
  taskDueDates = Array.from(new Set(this.tasks.map(task => task.dueDate.toLocaleDateString())));

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

    // Limit the number of visible tasks based on `visibleTaskCount`
    this.displayedTasks = this.filteredTasks.slice(0, this.visibleTaskCount);
  }

  loadMoreTasks() {
    if (this.showMore) {
      this.visibleTaskCount = this.filteredTasks.length; // Show all tasks
    } else {
      this.visibleTaskCount = 6; // Show only 6 tasks
    }
    this.showMore = !this.showMore; // Toggle between Show More and Show Less
    this.applyFilters(); // Reapply the filters with updated task count
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