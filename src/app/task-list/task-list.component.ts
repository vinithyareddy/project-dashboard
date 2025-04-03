import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';  // Import Task model

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];  // Declare a variable for the list of tasks

  ngOnInit(): void {
    // Sample data initialization (replace this with API call in real apps)
    this.tasks = [
      { id: 1, title: 'Design Landing Page', description: 'Create the landing page', priority: 'High', status: 'In Progress', assignedTo: 'John', startDate: new Date(), dueDate: new Date(), progress: 50 },
      { id: 2, title: 'Develop API', description: 'Create the backend API', priority: 'Medium', status: 'Not Started', assignedTo: 'Jane', startDate: new Date(), dueDate: new Date(), progress: 0 }
    ];
  }

  displayedColumns: string[] = ['title', 'assignedTo', 'status', 'progress'];  // Define the columns to display in the table
}
