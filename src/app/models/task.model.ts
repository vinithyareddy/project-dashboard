export interface Task {
  id: number;                    // Unique identifier for the task
  title: string;                 // Title of the task
  description: string;           // Detailed description of the task
  priority: 'Low' | 'Medium' | 'High';  // Priority of the task
  status: 'Not Started' | 'In Progress' | 'Completed';  // Task status
  assignedTo: string;            // Name of the person assigned to the task
  startDate: Date;               // Task start date
  dueDate: Date;                 // Task due date
  progress: number;              // Progress in percentage (0-100)
}
