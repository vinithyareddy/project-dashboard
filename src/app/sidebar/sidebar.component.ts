import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isCollapsed = false; // Define the property to toggle sidebar visibility

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed; // Toggle the sidebar
  }
}
