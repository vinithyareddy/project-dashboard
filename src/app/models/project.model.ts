import { Task } from './task.model';
import { TeamMember } from './team-member.model';

export interface Project {
  id: number;                     // Unique project identifier
  name: string;                   // Name of the project
  description: string;            // Project description
  tasks: Task[];                  // List of tasks related to the project
  teamMembers: TeamMember[];      // List of team members working on the project
  startDate: Date;                // Project start date
  endDate: Date;                  // Project end date
  progress: number;               // Overall progress (percentage)
}
