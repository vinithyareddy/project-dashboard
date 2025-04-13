import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle.component';
import { FirestoreService } from '../services/firestore.service';
import { Project } from '../models/project.model';
import { take } from 'rxjs';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ThemeToggleComponent
  ],
  providers: [DatePipe]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  projectForm!: FormGroup;
  isEditing = false;
  editingProjectId: string | null = null;
  projectStatuses: string[] = ['Not Started', 'In Progress', 'Completed'];
  selectedDate: Date | null = null;
  showAllProjects = false;

  // 🔍 Filtering states
  filterProjectName: string = '';
  filterAssignee: string = '';
  filterStatus: string = '';
  filterDate: Date | null = null;
  assigneeList: string[] = [];

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      assignee: [''], // ✅ Include this line
      dueDate: [null, Validators.required],
      status: ['Not Started', Validators.required]
    });
    

   this.firestoreService.getProjects().pipe(take(1)).subscribe(projects => {
  this.projects = projects.map(project => ({
    ...project,
    dueDate: project.dueDate instanceof Date
      ? project.dueDate
      : (project.dueDate && typeof project.dueDate === 'object' && 'toDate' in project.dueDate ? (project.dueDate as any).toDate() : null)
  }));
  this.applyFilters();
});

  }

  applyFilters(): void {
    let temp = [...this.projects];

    if (this.filterProjectName) {
      temp = temp.filter(p => p.name.toLowerCase().includes(this.filterProjectName.toLowerCase()));
    }

    if (this.filterAssignee) {
      temp = temp.filter(p => p.assignee === this.filterAssignee);
    }

    if (this.filterStatus) {
      temp = temp.filter(p => p.status === this.filterStatus);
    }

    if (this.filterDate) {
      const filterTime = new Date(this.filterDate).setHours(0, 0, 0, 0);
      temp = temp.filter(p => {
        const due = new Date(p.dueDate).setHours(0, 0, 0, 0);
        return due === filterTime;
      });
    }

    this.filteredProjects = temp.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }

  clearDateFilter(): void {
    this.filterDate = null;
    this.applyFilters();
  }

  showAddProjectForm(): void {
    this.isEditing = true;
    this.editingProjectId = null;
    this.projectForm.reset({ status: 'Not Started' });
  }

  editProject(project: Project): void {
    this.isEditing = true;
    this.editingProjectId = project.id || null;
    this.projectForm.patchValue({
      name: project.name,
      description: project.description,
      dueDate: project.dueDate,
      status: project.status
    });
  }

  saveProject(): void {
    if (this.projectForm.invalid) return;
    const formValue = this.projectForm.value;
    const newProject: Project = { ...formValue };

    if (this.editingProjectId) {
      this.firestoreService.updateProject(this.editingProjectId, newProject).pipe(take(1)).subscribe(() => {
        const index = this.projects.findIndex(p => p.id === this.editingProjectId);
        if (index > -1) this.projects[index] = { ...this.projects[index], ...newProject };
        this.afterChange();
      });
    } else {
      this.firestoreService.addProject(newProject).pipe(take(1)).subscribe(docRef => {
        this.projects.push({ id: docRef.id, ...newProject });
        this.afterChange();
      });
    }
  }

  deleteProject(projectId: string): void {
    this.firestoreService.deleteProject(projectId).pipe(take(1)).subscribe(() => {
      this.projects = this.projects.filter(p => p.id !== projectId);
      this.afterChange();
    });
  }

  afterChange(): void {
    this.assigneeList = [...new Set(this.projects.map(p => p.assignee).filter((a): a is string => !!a))];
    this.applyFilters();
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingProjectId = null;
    this.projectForm.reset({ status: 'Not Started' });
  }

  toggleProjects(): void {
    this.showAllProjects = !this.showAllProjects;
  }
}
