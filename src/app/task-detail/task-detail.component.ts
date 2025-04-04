import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  taskTitle: string | null = '';
  taskDetail: any; // To hold the task data fetched by taskTitle

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.taskTitle = params.get('taskTitle');
      this.fetchTaskDetails(); // Fetch task details when the component loads
    });
  }

  fetchTaskDetails(): void {
    // Replace with actual logic to fetch task details from a service, database, or static data
    // Example static data for the task details
    const tasks = [
      { taskTitle: 'Task 1', description: 'Details for Task 1', assignedTo: 'John', status: 'In Progress' },
      { taskTitle: 'Task 2', description: 'Details for Task 2', assignedTo: 'Alice', status: 'Completed' }
    ];
    
    this.taskDetail = tasks.find(task => task.taskTitle === this.taskTitle);
  }
}
