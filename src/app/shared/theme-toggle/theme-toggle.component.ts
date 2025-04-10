import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ ADD THIS

@Component({
  selector: 'app-theme-toggle',
  standalone: true, // ✅ since it's standalone
  imports: [CommonModule], // ✅ INCLUDE THIS
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const saved = localStorage.getItem('theme') || 'light';
    this.isDarkMode = saved === 'dark';
    document.documentElement.setAttribute('data-theme', saved);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }
}
