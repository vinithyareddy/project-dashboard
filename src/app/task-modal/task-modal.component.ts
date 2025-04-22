import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog'; // ✅ Required for modal structure
import { MatButtonModule } from '@angular/material/button'; // ✅ For close button

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,    // ✅ Enables <mat-dialog-content> and <mat-dialog-actions>
    MatButtonModule     // ✅ Enables <button mat-button>
  ]
})
export class TaskModalComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; items: string[] }
  ) {}
}
