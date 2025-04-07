import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  // Sample team member data
  teamMembers = [
    {
      name: 'John Doe',
      role: 'Developer',
      taskCount: 5,
      email: 'johndoe@example.com',
    },
    {
      name: 'Alice Smith',
      role: 'Project Manager',
      taskCount: 3,
      email: 'alice.smith@example.com',
    },
    {
      name: 'Bob Johnson',
      role: 'Designer',
      taskCount: 2,
      email: 'bob.johnson@example.com',
    },
    // Add more team members here...
  ];

  constructor() {}

  ngOnInit(): void {}
}
