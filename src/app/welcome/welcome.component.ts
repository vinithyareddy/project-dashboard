import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { ThemeToggleComponent } from '../shared/theme-toggle/theme-toggle.component'; // Adjust the path
import { RouterModule } from '@angular/router'; 


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterModule,  ThemeToggleComponent, // 👈 Add this!
  ]
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
