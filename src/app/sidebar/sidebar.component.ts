import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ChangePasswordDialogComponent } from 'src/app/change-password-dialog/change-password-dialog.component';
import { RouterModule, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { User } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import {  MatDialogModule } from '@angular/material/dialog';


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
  user$: Observable<User | null>;
  @Input() isCollapsed: boolean = false;
  @Output() toggleSidebar = new EventEmitter<void>();

  constructor(private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) {  this.user$ = this.authService.getUser(); // 🔁 Stream of user data
  }
  onToggleSidebar(): void {
    console.log('SidebarComponent: onToggleSidebar called');
    this.toggleSidebar.emit();
  }

  
  logout() {
    this.authService.logout().then(() => this.router.navigate(['/auth']));
  }

  openChangePasswordDialog() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '800px',
      maxWidth: '95vw',
      panelClass: 'custom-dialog-container',
      disableClose: false,
      autoFocus: true
    });
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
