export interface Project {
  id?: string;
  name: string;
  description: string;
  dueDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  assignee?: string; 
  progress?: number; 
}
