import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Router, NavigationEnd, Event as RouterEvent, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent,
    HeaderComponent,
    MatIconModule
  ]
})
export class AppComponent implements OnInit {
  isSidebarCollapsed = false;
  showMainLayout = false;
  title = 'project-dashboard';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showMainLayout = event.urlAfterRedirects !== '/';
    });
  }

  toggleSidebar(): void {
    console.log('AppComponent: toggleSidebar called');
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    console.log('AppComponent: isSidebarCollapsed is now', this.isSidebarCollapsed);
  }

  handleSidebarToggle(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    console.log('Sidebar toggled:', this.isSidebarCollapsed);
  }
}
