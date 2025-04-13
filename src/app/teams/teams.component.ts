import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle.component';
import { FirestoreService } from '../services/firestore.service';
import { TeamMember } from '../models/team.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    ThemeToggleComponent,
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TeamsComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  filteredTeamMembers: TeamMember[] = [];
  teamMemberForm!: FormGroup;
  isEditing = false;
  editingMemberId: string | null = null;
  nextId = 1;
  roleList: string[] = [];
  filterName: string = '';
  selectedRole: string = 'All';
  showAllMembers = false;

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit() {
    this.teamMemberForm = this.fb.group({
      name: ['', Validators.required],
      role: ['', Validators.required],
      email: ['', Validators.email],
      avatarColor: [this.getRandomColor()]
    });

    this.firestoreService.getTeamMembers().pipe(take(1)).subscribe(members => {
      this.teamMembers = members;
      this.updateRoleList();
      this.applyFilters();
    });
  }

  updateRoleList(): void {
    const roles = new Set(this.teamMembers.map(member => member.role));
    this.roleList = ['All', ...Array.from(roles).sort()];
  }

  applyFilters(): void {
    let tempMembers = [...this.teamMembers];
    if (this.filterName) {
      const filterLower = this.filterName.toLowerCase();
      tempMembers = tempMembers.filter(member => member.name.toLowerCase().includes(filterLower));
    }
    if (this.selectedRole && this.selectedRole !== 'All') {
      tempMembers = tempMembers.filter(member => member.role === this.selectedRole);
    }
    this.filteredTeamMembers = tempMembers;
  }

  clearNameFilter(): void {
    this.filterName = '';
    this.applyFilters();
  }

  showAddMemberForm(): void {
    this.isEditing = true;
    this.editingMemberId = null;
    this.teamMemberForm.reset({ avatarColor: this.getRandomColor() });
  }

  editMember(member: TeamMember): void {
    this.isEditing = true;
    this.editingMemberId = member.id || null;
    this.teamMemberForm.patchValue({
      name: member.name,
      role: member.role,
      email: member.emails.length > 0 ? member.emails[0] : '',
      avatarColor: member.avatarColor
    });
  }

  saveMember(): void {
    if (this.teamMemberForm.invalid) return;

    const formValue = this.teamMemberForm.value;
    const emails = formValue.email ? [formValue.email] : [];
    const newMember: TeamMember = {
      name: formValue.name,
      role: formValue.role,
      emails,
      avatarColor: formValue.avatarColor
    };

    if (this.editingMemberId) {
      this.firestoreService.updateTeamMember(this.editingMemberId, newMember).pipe(take(1)).subscribe(() => {
        const index = this.teamMembers.findIndex(m => m.id === this.editingMemberId);
        if (index > -1) this.teamMembers[index] = { ...this.teamMembers[index], ...newMember };
        this.afterChange();
      });
    } else {
      this.firestoreService.addTeamMember(newMember).pipe(take(1)).subscribe(docRef => {
        this.teamMembers.push({ id: docRef.id, ...newMember });
        this.afterChange();
      });
    }
  }

  deleteTeamMember(memberId: string): void {
    this.firestoreService.deleteTeamMember(memberId).pipe(take(1)).subscribe(() => {
      this.teamMembers = this.teamMembers.filter(m => m.id !== memberId);
      this.afterChange();
    });
  }

  afterChange(): void {
    this.updateRoleList();
    this.applyFilters();
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingMemberId = null;
    this.teamMemberForm.reset({ avatarColor: this.getRandomColor() });
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  toggleMembersDisplay(): void {
    this.showAllMembers = !this.showAllMembers;
  }
}
