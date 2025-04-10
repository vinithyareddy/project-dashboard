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


interface Project {
  id: number;
  name: string;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
  dueDate: Date;
}

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
    ThemeToggleComponent, //
  ],
  providers: [DatePipe]
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
 { id: 101, name: 'Website Redesign', description: 'Update company website', status: 'In Progress', dueDate: new Date(2025, 5, 30)},
    { id: 102, name: 'Mobile App Launch', description: 'iOS and Android app', status: 'Not Started', dueDate: new Date(2025, 6, 15)},
    { id: 103, name: 'Internal HR Portal', description: 'New portal for HR', status: 'Completed', dueDate: new Date(2025, 3, 1)},
    { id: 104, name: 'Q3 Marketing Campaign', description: 'Social media campaign', status: 'Not Started', dueDate: new Date(2025, 7, 1)},
  ];

  filteredProjects: Project[] = [];
  projectForm!: FormGroup;
  isEditing = false;
  editingProjectId: number | null = null;
  nextId = 5;

  projectStatuses: string[] = ['Not Started', 'In Progress', 'Completed'];

  selectedDate: Date | null = null;

  constructor(private fb: FormBuilder, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      dueDate: [null, Validators.required],
      status: ['Not Started', Validators.required]
    });
    this.applyFilters();
  }

  applyFilters(): void {
    let tempProjects = [...this.projects];

    if (this.selectedDate) {
        const filterDate = new Date(this.selectedDate);
        filterDate.setHours(0, 0, 0, 0);
        const filterTime = filterDate.getTime();

        tempProjects = tempProjects.filter(project => {
            const projectDueDate = new Date(project.dueDate);
            projectDueDate.setHours(0, 0, 0, 0);
            return projectDueDate.getTime() === filterTime;
        });
    }

    this.filteredProjects = tempProjects.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
  }

  clearDateFilter(): void {
      this.selectedDate = null;
      this.applyFilters();
  }

  showAddProjectForm(): void {
    this.isEditing = true;
    this.editingProjectId = null;
    this.projectForm.reset({ status: 'Not Started' });
  }

  editProject(project: Project): void {
    this.isEditing = true;
    this.editingProjectId = project.id;
    this.projectForm.patchValue({
      name: project.name,
      description: project.description,
      dueDate: project.dueDate,
      status: project.status
    });
  }

  saveProject(): void {
    if (this.projectForm.invalid) {
      return;
    }

    const formValue = this.projectForm.value;

    if (this.editingProjectId !== null) {
      const index = this.projects.findIndex(p => p.id === this.editingProjectId);
      if (index > -1) {
        this.projects[index] = { ...this.projects[index], ...formValue };
      }
    } else {
      const newProject: Project = {
        id: this.nextId++,
        name: formValue.name,
        description: formValue.description,
        dueDate: formValue.dueDate,
        status: formValue.status
      };
      this.projects.push(newProject);
    }

    this.applyFilters();
    this.cancelEdit();
  }

  deleteProject(projectId: number): void {
    this.projects = this.projects.filter(p => p.id !== projectId);
    if (this.editingProjectId === projectId) {
      this.cancelEdit();
    }
    this.applyFilters();
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.editingProjectId = null;
    this.projectForm.reset({ status: 'Not Started' });
  }
} 