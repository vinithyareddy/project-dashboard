export interface CalendarItem {
    id?: string;
    type: 'Task' | 'Project';
    title: string;
    dueDate: Date;
    status: string;
  }
  