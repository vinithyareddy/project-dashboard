import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    <h2>Change Password</h2>
    <form [formGroup]="passwordForm" (ngSubmit)="onSubmit()">
      <mat-form-field class="full-width" appearance="outline">
        <mat-label>Current Password</mat-label>
        <input matInput type="password" formControlName="currentPassword" required />
      </mat-form-field>

      <mat-form-field class="full-width" appearance="outline">
        <mat-label>New Password</mat-label>
        <input matInput type="password" formControlName="newPassword" required />
      </mat-form-field>

      <mat-form-field class="full-width" appearance="outline">
        <mat-label>Re-enter New Password</mat-label>
        <input matInput type="password" formControlName="confirmPassword" required />
      </mat-form-field>

      <div *ngIf="message" [ngClass]="{ 'error-msg': isError, 'success-msg': !isError }">
        {{ message }}
      </div>

      <div class="actions">
        <button mat-flat-button color="primary" type="submit" [disabled]="passwordForm.invalid">Update</button>
        <button mat-button type="button" (click)="dialogRef.close()">Cancel</button>
      </div>
    </form>
  `,
  styles: [`
    h2 { margin-top: 0; }
    .full-width { width: 100%; margin-bottom: 1rem; }
    .actions { display: flex; justify-content: space-between; }
    .error-msg { color: red; margin-top: 10px; }
    .success-msg { color: green; margin-top: 10px; }
  `]
})
export class ChangePasswordDialogComponent {
  passwordForm: FormGroup;
  message = '';
  isError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  ) {
    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.passwordForm.invalid) return;

    const { currentPassword, newPassword, confirmPassword } = this.passwordForm.value;

    if (newPassword !== confirmPassword) {
      this.message = '❌ Passwords do not match';
      this.isError = true;
      return;
    }

    try {
      await this.authService.updateUserPassword(currentPassword, newPassword);
      this.message = '✅ Password updated successfully';
      this.isError = false;
      this.passwordForm.reset();
    } catch (error: any) {
      this.message = `❌ ${error.message || 'Failed to update password'}`;
      this.isError = true;
    }
  }
}
