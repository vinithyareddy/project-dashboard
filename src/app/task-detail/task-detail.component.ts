import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  // Updated array of tasks with isEditMode property
  tasks = [
    {
      id: 1,
      title: 'Complete Project Documentation',
      description: 'Write detailed documentation for the project.',
      priority: 'High',
      status: 'In Progress',
      assignedMember: { name: 'John Doe', contact: 'johndoe@example.com' },
      dueDate: new Date('2025-04-01'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 2,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 3,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 4,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 5,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      startDate: new Date('2025-03-10'),
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 6,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 7,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 8,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 9,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 10,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 11,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 12,
      title: 'Develop User Authentication Module',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Alice Smith', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    // Add more tasks here if needed
  ];

  newComment: string = '';

  constructor() {}

  ngOnInit(): void {}

  // Method to add a comment
  addComment(task: any) {
    if (this.newComment) {
      task.comments.push(this.newComment);
      this.newComment = ''; // Clear the comment input field
    }
  }

  // Method to edit task (toggle edit mode)
  editTask(task: any) {
    task.isEditMode = !task.isEditMode;
    if (!task.isEditMode) {
      alert('Task has been updated!');
    }
  }

  // Method to save changes after editing
  saveTask(task: any) {
    task.isEditMode = false; // Disable edit mode
    alert('Task has been updated!');
  }

  // Method to delete task
  deleteTask(taskId: number): void {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    }
  }

  // Method to change task status
  changeStatus(task: any) {
    const newStatus = prompt('Enter new task status:', task.status);
    if (newStatus) {
      task.status = newStatus;
    }
  }
}


