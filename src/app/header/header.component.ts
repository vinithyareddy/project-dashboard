import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isSidebarCollapsed = false;

  @Output() sidebarToggle = new EventEmitter<boolean>();

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarToggle.emit(this.isSidebarCollapsed);
  }
}
