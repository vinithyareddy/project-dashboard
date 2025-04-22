import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ChangePasswordDialogComponent } from 'src/app/change-password-dialog/change-password-dialog.component';
import { Observable } from 'rxjs';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class SidebarComponent {
  @Input() isCollapsed: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();
  user$: Observable<User | null>;
  isSidebarVisible: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.user$ = this.authService.getUser();
  }

  onToggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.toggleSidebar.emit();
  }

  logout(): void {
    this.authService.logout().then(() => this.router.navigate(['/auth']));
  }

  openChangePasswordDialog(): void {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      autoFocus: true
    });
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: 'snackbar-success'
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: 'snackbar-error'
    });
  }
}
