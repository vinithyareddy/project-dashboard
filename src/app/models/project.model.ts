export interface Project {
  id?: string;
  name: string;
  description: string;
  dueDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  assignee?: string; // ✅ Add this line
  progress?: number; // Optional: for dashboard progress bar
}
