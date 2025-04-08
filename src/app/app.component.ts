import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, Event as RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isSidebarCollapsed = false;

showLayout = true;

constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.showLayout = event.url !== '/';
    }
  });
}
}
