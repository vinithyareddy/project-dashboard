import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.scss']
})
export class TeamMemberComponent implements OnInit {
  // Initializing teamData with empty array
  teamData: { member: string, tasksAssigned: number, tasksCompleted: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    // Initializing teamData with some default values
    this.teamData = [
      { member: 'John', tasksAssigned: 10, tasksCompleted: 8 },
      { member: 'Alice', tasksAssigned: 8, tasksCompleted: 6 },
      { member: 'Bob', tasksAssigned: 12, tasksCompleted: 10 }
    ];
  }
}
