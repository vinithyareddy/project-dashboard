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
import { FirestoreService } from '../services/firestore.service';
import { Project } from '../models/project.model';
import { take } from 'rxjs';
import { MatSliderModule } from '@angular/material/slider';


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
    MatSelectModule,  MatSliderModule   ],
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

  // Filter dropdown lists
  projectNameList: string[] = [];
  assigneeList: string[] = [];
  uniqueDueDates: string[] = [];

  // Filter values
  filterProjectName: string = '';
  filterAssignee: string = '';
  filterStatus: string = '';
  filterDate: Date | null = null;
  filterDateString: string = '';

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private firestoreService: FirestoreService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', Validators.required],
      assignee: [''],
      dueDate: [null, Validators.required],
      status: ['Not Started', Validators.required],
      progress: [0] // ✅ This must be added!
    });
    
  
    this.firestoreService.getProjects().pipe(take(1)).subscribe(projects => {
      this.projects = projects.map(project => ({
        ...project,
        dueDate: project.dueDate instanceof Date
          ? project.dueDate
          : (project.dueDate && typeof project.dueDate === 'object' && 'toDate' in project.dueDate ? (project.dueDate as any).toDate() : null)
      }));
      this.afterChange(); // ✅ keep this if you're using it
    });
  }
  

  applyFilters(): void {
    let temp = [...this.projects];

    if (this.filterProjectName) {
      temp = temp.filter(p => p.name === this.filterProjectName);
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

  onDateFilterChange(value: string): void {
    this.filterDateString = value;
    this.filterDate = value ? new Date(value) : null;
    this.applyFilters();
  }

  resetFilters(): void {
    this.filterProjectName = '';
    this.filterAssignee = '';
    this.filterStatus = '';
    this.filterDate = null;
    this.filterDateString = '';
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
      assignee: project.assignee,
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
    this.projectNameList = [...new Set(this.projects.map(p => p.name).filter((n): n is string => !!n))];
    this.uniqueDueDates = [...new Set(this.projects.map(p => this.datePipe.transform(p.dueDate, 'MMM d, y')).filter((d): d is string => !!d))];
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
  onSliderChange(event: any): void {
    const value = event.value;
    this.projectForm.get('progress')?.setValue(value);
  }
  
}