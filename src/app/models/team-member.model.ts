import { Task } from './task.model';  // Import Task model

export interface TeamMember {
  id: number;                      // Unique team member identifier
  name: string;                    // Name of the team member
  role: string;                    // Role of the team member (e.g., Developer, Manager)
  tasks: Task[];                   // List of tasks assigned to this team member
  progress: number;                // Progress (in percentage) of the team member based on assigned tasks
}
