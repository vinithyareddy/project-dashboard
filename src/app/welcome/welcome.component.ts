import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  constructor(private router: Router) {}

  navigateToDashboard() {
    // Navigate to dashboard and ensure the URL is updated
    this.router.navigate(['/dashboard']).then(() => {
      // Force a reload of the current route to ensure proper state
      window.location.reload();
    });
  }
}
