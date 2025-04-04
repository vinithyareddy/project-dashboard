export interface Task {
  taskTitle: string;
  assignedTo: string;
  status: string;
  priority: string;
  dueDate: Date;  // Ensure this is of type Date
}
