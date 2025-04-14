import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ChangePasswordDialogComponent } from 'src/app/change-password-dialog/change-password-dialog.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import * as XLSX from 'xlsx';
import { Project } from 'src/app/models/project.model';
import { Task } from 'src/app/models/task.model';
import { TeamMember } from 'src/app/models/team.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    RouterModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ]
})
export class HeaderComponent {
  user$: Observable<User | null>;
  isUploading = false;
  fileMessage: string = '';

  private dialog = inject(MatDialog);

  constructor(
    public authService: AuthService,
    private firestoreService: FirestoreService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user$ = authService.getUser();
  }

  logout() {
    this.authService.logout().then(() => this.router.navigate(['/auth']));
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '600px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      autoFocus: true
    });
  }

  onFileUpload(event: any) {
    console.log('📁 File upload triggered');
    this.isUploading = true;
    const file = event.target.files[0];
    if (!file) return;
  
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv',
      'application/csv'
    ];
  
    if (!allowedTypes.includes(file.type)) {
      this.showError('❌ File type not supported. Please upload Excel or CSV.');
      this.isUploading = false;
      return;
    }
  
    const reader = new FileReader();
    reader.onload = async (e: any) => {
      console.log('📖 FileReader loaded');
      const data = new Uint8Array(e.target.result);
      let workbook: XLSX.WorkBook;
  
      try {
        if (file.type.includes('csv')) {
          const text = new TextDecoder('utf-8').decode(data);
          workbook = XLSX.read(text, { type: 'string' });
          console.log('📄 CSV parsed');
        } else {
          workbook = XLSX.read(data, { type: 'array' });
          console.log('📊 Excel parsed');
        }
  
        const [existingProjects, existingTasks, existingTeam] = await Promise.all([
          this.firestoreService.getProjects().toPromise().then(p => p || []),
          this.firestoreService.getTasks().toPromise().then(t => t || []),
          this.firestoreService.getTeamMembers().toPromise().then(tm => tm || [])
        ]);
  
        workbook.SheetNames.forEach(sheetName => {
          const raw = XLSX.utils.sheet_to_json<any>(workbook.Sheets[sheetName], { header: 1 });
          console.log(`🧾 Raw sheet "${sheetName}":`, raw);
          if (!raw || raw.length < 2 || !raw[0] || raw[0].length === 0) {
            console.warn(`⚠️ Sheet "${sheetName}" is empty or has no headers.`);
            return;
          }
          
  
          const headers = raw[0].map((h: any) =>
            h?.toString().trim().toLowerCase().replace(/[^a-z0-9_]/g, '')
          );
                    const json = raw.slice(1).map((row: any[]) =>
            headers.reduce((obj: any, key: string, i: number) => {
              obj[key] = row[i];
              return obj;
            }, {})
          );
          const lowerSheet = sheetName.toLowerCase();
  
          console.log(`📋 Processed "${sheetName}"`, json);
  
          if (lowerSheet.includes('project')) {
            json.forEach((item: any) => {
              if (!item.name || !item.duedate) return;
  
              const project: Project = {
                name: item.name.trim(),
                assignee: item.assignee?.trim() || '',
                description: item.description || '',
                status: item.status || 'Not Started',
                dueDate: this.convertToDate(item.duedate)
              };
  
              const isDuplicate = existingProjects.some(p =>
                p.name === project.name &&
                this.convertToDate(p.dueDate).getTime() === project.dueDate.getTime()
              );
  
              if (!isDuplicate) {
                this.firestoreService.addProject(project).subscribe({
                  next: () => this.showSuccess(`✅ Project "${project.name}" added`),
                  error: () => this.showError(`❌ Failed to upload project: ${project.name}`)
                });
              } else {
                this.showError(`❌ Duplicate project: ${project.name}`);
              }
            });
          }
  
          if (lowerSheet.includes('task')) {
            json.forEach((item: any) => {
              if (!item.name || !item.duedate || !item.assignee) return;
  
              const task: Task = {
                name: this.capitalize(item.name.trim()),
                assignee: this.capitalize(item.assignee.trim()),
                dueDate: this.convertToDate(item.duedate),
                status: item.status || 'Not Started'
              };
  
              const isDuplicate = existingTasks.some(t =>
                t.name === task.name &&
                t.assignee === task.assignee &&
                this.convertToDate(t.dueDate).getTime() === this.convertToDate(task.dueDate).getTime()
              );
  
              if (!isDuplicate) {
                this.firestoreService.addTask(task).subscribe({
                  next: () => this.showSuccess(`✅ Task "${task.name}" added`),
                  error: () => this.showError(`❌ Failed to upload task: ${task.name}`)
                });
              } else {
                this.showError(`❌ Duplicate task: ${task.name}`);
              }
            });
          }
  
          if (lowerSheet.includes('team')) {
            json.forEach((item: any) => {
              if (!item.name || !item.role) return;
  
              const member: TeamMember = {
                name: this.capitalize(item.name.trim()),
                role: this.capitalize(item.role.trim()),
                emails: item.email ? [item.email.trim().toLowerCase()] : [],
                avatarColor: this.getRandomColor()
              };
  
              const isDuplicate = existingTeam.some(m =>
                (m.name === member.name && m.role === member.role) ||
                (member.emails.length && m.emails.includes(member.emails[0]))
              );
  
              if (!isDuplicate) {
                this.firestoreService.addTeamMember(member).subscribe({
                  next: () => this.showSuccess(`✅ Team Member "${member.name}" added`),
                  error: () => this.showError(`❌ Failed to upload team member: ${member.name}`)
                });
              } else {
                this.showError(`❌ Duplicate team member: ${member.name}`);
              }
            });
          }
        });
  
        this.showSuccess('✅ File uploaded and processed successfully.');
      } catch (error) {
        console.error('❌ Parsing failed', error);
        this.showError('❌ Failed to process the file.');
      }
  
      this.isUploading = false;
    };
  
    reader.onerror = () => {
      this.showError('❌ Error uploading file. Please try again.');
      this.isUploading = false;
    };
  
    reader.readAsArrayBuffer(file);
  }
  

  private convertToDate(value: any): Date {
    if (!value) return new Date();
    if (typeof value === 'object' && 'seconds' in value) return new Date(value.seconds * 1000);
    const parsed = new Date(value);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }

  private capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    return '#' + Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('');
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: 'snackbar-success'
    });
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: 'snackbar-error'
    });
  }
}