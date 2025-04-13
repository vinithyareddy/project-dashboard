import { Timestamp } from '@angular/fire/firestore';

export interface Task {
  id?: string;
  name: string;
  assignee: string;
  dueDate: Date | Timestamp;
  status: 'Not Started' | 'In Progress' | 'Completed';
}
