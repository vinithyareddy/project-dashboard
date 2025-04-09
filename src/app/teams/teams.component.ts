import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips'; // For emails
import { DatePipe } from '@angular/common';


interface TeamMember {
  id: number; // Add ID
  name: string;
  role: string;
  emails: string[];
  avatarColor: string;
}

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  standalone: true, // Make standalone
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule // Add
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add CUSTOM_ELEMENTS_SCHEMA
})
export class TeamsComponent implements OnInit {
  teamMembers: TeamMember[] = [
    // Added IDs
    { id: 1, name: 'Alice', role: 'Designer', emails: ['alice@company.org'], avatarColor: '#4361ee' },
    { id: 2, name: 'Bob', role: 'Frontend Developer', emails: ['bob@company.org'], avatarColor: '#7209b7' },
    { id: 3, name: 'Charlie', role: 'Team Lead', emails: ['charlie@company.org'], avatarColor: '#4cc9f0' },
    { id: 4, name: 'Betty', role: 'Software Engineer', emails: ['betty@company.org'], avatarColor: '#6831ee' },
    { id: 5, name: 'Cheryl', role: 'Full Stack Developer', emails: ['cheryl@company.org'], avatarColor: '#654454' },
    { id: 6, name: 'Abhigail', role: 'Backend Developer', emails: ['abhigail@company.org'], avatarColor: '#544423' },
    { id: 7, name: 'James', role: 'Backend Developer', emails: ['james@company.org'], avatarColor: '#124444' },
    { id: 8, name: 'John', role: 'Full Stack Developer', emails: ['john@company.org'], avatarColor: '#654644' },
    { id: 9, name: 'Veronica', role: 'Software Developer', emails: ['veronica@company.org'], avatarColor: '#326944' },
    { id: 10, name: 'Archie', role: 'Designer', emails: ['archie@company.org'], avatarColor: '#023543' },
    { id: 11, name: 'Bobby', role: 'Software Engineer', emails: ['bobby@company.org'], avatarColor: '#245478' },
    { id: 12, name: 'Charles', role: 'Team Manager', emails: ['charles@company.org'], avatarColor: '#ef4336' }
  ];

  filteredTeamMembers: TeamMember[] = [];
  teamMemberForm!: FormGroup;
  isEditing = false;
  editingMemberId: number | null = null;
  nextId = 5;

  // Filter properties
  roleList: string[] = [];
  filterName: string = '';
  selectedRole: string = 'All';

  showAllProjects = false;
  showAllTasks = false;
  showAllMembers = false;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit() {
    this.teamMemberForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.email],
      avatarColor: [this.getRandomColor()]
    });
    this.updateRoleList();
    this.applyFilters(); // Initial load
    console.log('Teams component initialized');
  }

  updateRoleList(): void {
    const roles = new Set(this.teamMembers.map(member => member.role));
    this.roleList = ['All', ...Array.from(roles).sort()];
  }

  applyFilters(): void {
    let tempMembers = [...this.teamMembers];

    // Filter by Name (case-insensitive)
    if (this.filterName) {
      const filterLower = this.filterName.toLowerCase();
      tempMembers = tempMembers.filter(member => 
        member.name.toLowerCase().includes(filterLower)
      );
    }

    // Filter by Role
    if (this.selectedRole && this.selectedRole !== 'All') {
      tempMembers = tempMembers.filter(member => member.role === this.selectedRole);
    }

    this.filteredTeamMembers = tempMembers;
  }

  clearNameFilter(): void {
      this.filterName = '';
      this.applyFilters();
  }

  // --- CRUD Methods ---
  showAddMemberForm(): void {
    this.isEditing = true;
    this.editingMemberId = null;
    this.teamMemberForm.reset({ 
      name: '',
      role: '',
      email: '',
      avatarColor: this.getRandomColor() 
    });
  }

  editMember(member: TeamMember): void {
    this.isEditing = true;
    this.editingMemberId = member.id;
    this.teamMemberForm.patchValue({
      name: member.name,
      role: member.role,
      email: member.emails.length > 0 ? member.emails[0] : '', // Get first email if available
      avatarColor: member.avatarColor
    });
  }

  saveMember(): void {
    if (this.teamMemberForm.invalid) {
      return;
    }
    const formValue = this.teamMemberForm.value;
    // Create an array with the email if it exists
    const emails = formValue.email ? [formValue.email] : [];

    if (this.editingMemberId !== null) {
      // Update
      const index = this.teamMembers.findIndex(m => m.id === this.editingMemberId);
      if (index > -1) {
        this.teamMembers[index] = {
          ...this.teamMembers[index], // Keep existing ID
          name: formValue.name,
          role: formValue.role,
          avatarColor: formValue.avatarColor,
          emails: emails
        };
      }
    } else {
      // Add
      const newMember: TeamMember = {
        id: this.nextId++,
        name: formValue.name,
        role: formValue.role,
        avatarColor: formValue.avatarColor,
        emails: emails
      };
      this.teamMembers.push(newMember);
    }

    this.updateRoleList();
    this.applyFilters();
    this.cancelEdit();
  }

  // Updated delete method
  deleteTeamMember(memberId: number): void { 
    this.teamMembers = this.teamMembers.filter(m => m.id !== memberId);
    if (this.editingMemberId === memberId) {
      this.cancelEdit();
    }
    this.updateRoleList();
    this.applyFilters();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingMemberId = null;
    this.teamMemberForm.reset({ avatarColor: this.getRandomColor() });
  }

  // Helper to get a random color for new members
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  toggleProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }
  
  toggleTasks(): void {
    this.showAllTasks = !this.showAllTasks;
  }
  
  toggleMembersDisplay(): void {
    this.showAllMembers = !this.showAllMembers;
  }
} 