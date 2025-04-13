import { Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div style="text-align:center; margin-top: 50px;">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  `,
  standalone: true
})
export class NotFoundComponent {}
