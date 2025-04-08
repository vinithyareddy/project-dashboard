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
      name: 'John',
      role: 'Software Developer',
      taskCount: 6,
      email: 'john@example.com',
    },
    {
      name: 'Alice',
      role: 'Project Manager',
      taskCount: 5,
      email: 'alice@example.com',
    },
    {
      name: 'Bob',
      role: 'Designer',
      taskCount: 5,
      email: 'bob@example.com',
    },
    {
      name: 'Jones',
      role: 'Front-end Developer',
      taskCount: 5,
      email: 'jones@example.com',
    },
    {
      name: 'James',
      role: 'Team Manager',
      taskCount: 5,
      email: 'james@example.com',
    },
    {
      name: 'Bobby',
      role: 'Back-end Developer',
      taskCount: 5,
      email: 'bobby@example.com',
    },
    {
      name: 'Betty',
      role: 'Designer',
      taskCount: 4,
      email: 'betty@example.com',
    },
    {
      name: 'Veronica',
      role: 'Project Manager',
      taskCount: 4,
      email: 'veronica@example.com',
    },
    {
      name: 'Charles',
      role: 'Software Egineer',
      taskCount: 5,
      email: 'charles@example.com',
    },
    {
      name: 'Cheryl',
      role: 'Software Developer',
      taskCount: 5,
      email: 'cheryl@example.com',
    },
    {
      name: 'Archie',
      role: '.net Developer',
      taskCount: 6,
      email: 'archie@example.com',
    },
    {
      name: 'Abhigail',
      role: 'Designer',
      taskCount: 6,
      email: 'abhigail@example.com',
    },
    // Add more team members here...
  ];

  constructor() {}

  ngOnInit(): void {}
}
