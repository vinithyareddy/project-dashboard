import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  tasks = [
    {
      id: 1,
      title: 'Title-1',
      description: 'Write detailed documentation for the project.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'John', contact: 'john@example.com' },
      dueDate: new Date('2025-01-09'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 2,
      title: 'Title-2',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'In Progress',
      assignedMember: { name: 'Alice', contact: 'alice@example.com' },
      dueDate: new Date('2025-04-11'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 3,
      title: 'Title-3',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Bob', contact: 'bob@example.com' },
      dueDate: new Date('2025-03-14'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 4,
      title: 'Title-4',
            description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'Jones', contact: 'jones@example.com' },
      dueDate: new Date('2025-02-10'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 5,
      title: 'Title-5',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'James', contact: 'james@example.com' },
      dueDate: new Date('2025-01-17'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 6,
      title: 'Title-6',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Bobby', contact: 'Bobby@example.com' },
      dueDate: new Date('2025-02-20'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 7,
      title: 'Title-7',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'In Progress',
      assignedMember: { name: 'Betty', contact: 'betty@example.com' },
      dueDate: new Date('2025-04-29'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 8,
      title: 'Title-8',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Veronica', contact: 'veronica@example.com' },
      dueDate: new Date('2025-03-28'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 9,
      title: 'Title-9',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Charles', contact: 'charles@example.com' },
      dueDate: new Date('2025-02-22'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 10,
      title: 'Title-10',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'Cheryl', contact: 'cheryl@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 11,
      title: 'Title-11',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'In Progress',
      assignedMember: { name: 'Archie', contact: 'archie@example.com' },
      dueDate: new Date('2025-04-16'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 12,
      title: 'Title-12',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'Abhigail', contact: 'abhigail@example.com' },
      dueDate: new Date('2025-03-24'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 13,
      title: 'Title-13',
      description: 'Write detailed documentation for the project.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Betty', contact: 'betty@example.com' },
      dueDate: new Date('2025-03-29'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 14,
      title: 'Title-14',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'In Progress',
      assignedMember: { name: 'Veronica', contact: 'veronica@example.com' },
      dueDate: new Date('2025-04-28'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 15,
      title: 'Title-15',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Charles', contact: 'charles@example.com' },
      dueDate: new Date('2025-03-31'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 16,
      title: 'Title-16',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Cheryl', contact: 'cheryl@example.com' },
      dueDate: new Date('2025-01-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 17,
      title: 'Title-17',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Archie', contact: 'archie@example.com' },
      dueDate: new Date('2025-02-16'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 18,
      title: 'Title-18',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Abhigail', contact: 'abhigail@example.com' },
      dueDate: new Date('2025-02-24'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 19,
      title: 'Title-19',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'John', contact: 'john@example.com' },
      dueDate: new Date('2025-04-09'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 20,
      title: 'Title-20',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Alice', contact: 'alice@example.com' },
      dueDate: new Date('2025-03-11'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 21,
      title: 'Title-21',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Bob', contact: 'bob@example.com' },
      dueDate: new Date('2025-02-14'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 22,
      title: 'Title-22',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Jones', contact: 'jones@example.com' },
      dueDate: new Date('2025-03-10'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 23,
      title: 'Title-23',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'James', contact: 'james@example.com' },
      dueDate: new Date('2025-01-17'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 24,
      title: 'Title-24',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Bobby', contact: 'Bobby@example.com' },
      dueDate: new Date('2025-03-20'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 25,
      title: 'Title-25',
      description: 'Write detailed documentation for the project.',
      priority: 'High',
      status: 'In Progress',
      assignedMember: { name: 'Archie', contact: 'archie@example.com' },
      dueDate: new Date('2025-04-16'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 26,
      title: 'Title-26',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Not Started',
      assignedMember: { name: 'Abhigail', contact: 'abhigail@example.com' },
      dueDate: new Date('2025-04-24'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 27,
      title: 'Title-27',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'John', contact: 'john@example.com' },
      dueDate: new Date('2025-03-09'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 28,
      title: 'Title-28',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Alice', contact: 'alice@example.com' },
      dueDate: new Date('2025-03-11'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 29,
      title: 'Title-29',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'Bob', contact: 'bob@example.com' },
      dueDate: new Date('2025-02-14'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 30,
      title: 'Title-30',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Jones', contact: 'jones@example.com' },
      dueDate: new Date('2025-01-10'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 31,
      title: 'Title-31',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'James', contact: 'james@example.com' },
      dueDate: new Date('2025-04-17'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 32,
      title: 'Title-32',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Bobby', contact: 'Bobby@example.com' },
      dueDate: new Date('2025-03-20'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 33,
      title: 'Title-33',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Charles', contact: 'charles@example.com' },
      dueDate: new Date('2025-04-22'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 34,
      title: 'Title-34',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Cheryl', contact: 'cheryl@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 35,
      title: 'Title-35',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'In Progress',
      assignedMember: { name: 'Archie', contact: 'archie@example.com' },
      dueDate: new Date('2025-04-16'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 36,
      title: 'Title-36',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Abhigail', contact: 'abhigail@example.com' },
      dueDate: new Date('2025-04-24'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 37,
      title: 'Title-37',
      description: 'Write detailed documentation for the project.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'Betty', contact: 'betty@example.com' },
      dueDate: new Date('2025-03-29'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 38,
      title: 'Title-38',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Veronica', contact: 'veronica@example.com' },
      dueDate: new Date('2025-04-28'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 39,
      title: 'Title-39',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'Not Started',
      assignedMember: { name: 'Charles', contact: 'charles@example.com' },
      dueDate: new Date('2025-04-22'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 40,
      title: 'Title-40',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Cheryl', contact: 'cheryl@example.com' },
      dueDate: new Date('2025-01-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 41,
      title: 'Title-41',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Archie', contact: 'archie@example.com' },
      dueDate: new Date('2025-01-16'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 42,
      title: 'Title-42',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Abhigail', contact: 'abhigail@example.com' },
      dueDate: new Date('2025-01-24'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 43,
      title: 'Title-43',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'In Progress',
      assignedMember: { name: 'John', contact: 'john@example.com' },
      dueDate: new Date('2025-04-09'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 44,
      title: 'Title-44',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'John', contact: 'john@example.com' },
      dueDate: new Date('2025-02-09'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 45,
      title: 'Title-45',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Alice', contact: 'alice@example.com' },
      dueDate: new Date('2025-03-11'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 46,
      title: 'Title-46',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Bob', contact: 'bob@example.com' },
      dueDate: new Date('2025-04-14'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 47,
      title: 'Title-47',
            description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Jones', contact: 'jones@example.com' },
      dueDate: new Date('2025-01-10'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 48,
      title: 'Title-48',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'James', contact: 'james@example.com' },
      dueDate: new Date('2025-02-17'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 49,
      title: 'Title-49',
      description: 'Write detailed documentation for the project.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'Bobby', contact: 'Bobby@example.com' },
      dueDate: new Date('2025-01-20'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 50,
      title: 'Title-50',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Not Started',
      assignedMember: { name: 'Betty', contact: 'betty@example.com' },
      dueDate: new Date('2025-04-29'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 51,
      title: 'Title-51',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Not Started',
      assignedMember: { name: 'Veronica', contact: 'veronica@example.com' },
      dueDate: new Date('2025-04-28'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 52,
      title: 'Title-52',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'In Progress',
      assignedMember: { name: 'Charles', contact: 'charles@example.com' },
      dueDate: new Date('2025-04-22'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 53,
      title: 'Title-53',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Cheryl', contact: 'cheryl@example.com' },
      dueDate: new Date('2025-03-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 54,
      title: 'Title-54',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Archie', contact: 'archie@example.com' },
      dueDate: new Date('2025-02-24'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 55,
      title: 'Title-55',
      description: 'Build and test the user login and registration system.',
      priority: 'High',
      status: 'Completed',
      assignedMember: { name: 'Abhigail', contact: 'abhigail@example.com' },
      dueDate: new Date('2025-04-05'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 56,
      title: 'Title-56',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'John', contact: 'john@example.com' },
      dueDate: new Date('2025-02-24'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 57,
      title: 'Title-57',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'Alice', contact: 'alice@example.com' },
      dueDate: new Date('2025-03-11'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 58,
      title: 'Title-58',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'Completed',
      assignedMember: { name: 'Bob', contact: 'bob@example.com' },
      dueDate: new Date('2025-02-14'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 59,
      title: 'Title-59',
      description: 'Build and test the user login and registration system.',
      priority: 'Medium',
      status: 'In Progress',
      assignedMember: { name: 'Jones', contact: 'jones@example.com' },
      dueDate: new Date('2025-04-10'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 60,
      title: 'Title-60',
      description: 'Build and test the user login and registration system.',
      priority: 'Low',
      status: 'Completed',
      assignedMember: { name: 'James', contact: 'james@example.com' },
      dueDate: new Date('2025-01-17'),
      isEditMode: false, // Flag for editing task
    },
    {
      id: 61,
      title: 'Title-61',
      description: 'Write detailed documentation for the project.',
      priority: 'High',
      status: 'Not Started',
      assignedMember: { name: 'Bobby', contact: 'bobby@example.com' },
      dueDate: new Date('2025-04-20'),
      isEditMode: false, // Flag for editing task
    },
    
    // Add more tasks here if needed
  ];
  // Display only the first 6 tasks initially
  displayedTasks = this.tasks.slice(0, 6);  // First 6 tasks
  showMore = false;  // Controls whether all tasks are shown or not

  ngOnInit(): void {}

  // Toggle function to show more or show less tasks
  toggleShowMore() {
    this.showMore = !this.showMore;  // Toggle the value
    if (this.showMore) {
      this.displayedTasks = this.tasks;  // Show all tasks
    } else {
      this.displayedTasks = this.tasks.slice(0, 6);  // Show only first 6 tasks
    }
  }


  editTask(task: any) {
    task.isEditMode = !task.isEditMode;
    if (!task.isEditMode) {
      alert('Task has been updated!');
    }
  }

  saveTask(task: any) {
    task.isEditMode = false;
    alert('Task has been updated!');
  }

  deleteTask(taskId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this task?');
    if (confirmDelete) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.toggleShowMore();  // Update the displayed tasks after deletion
    }
  }

  changeStatus(task: any) {
    const newStatus = prompt('Enter new task status:', task.status);
    if (newStatus) {
      task.status = newStatus;
    }
  }
}