import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrls: ['./theme-toggle.component.scss']
})
export class ThemeToggleComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDark ? 'dark' : 'light');

    this.isDarkMode = defaultTheme === 'dark';
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }

  private applyTheme(): void {
    const theme = this.isDarkMode ? 'dark' : 'light';

    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    document.body.classList.toggle('light-mode', !this.isDarkMode);
  }
}
