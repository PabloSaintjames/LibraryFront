import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor() {
    const dark = localStorage.getItem('dark') === 'true';
    document.body.classList.toggle('dark-theme', dark);
  }


  private dark = signal(true);

  toggle(): void {
    this.dark.set(!this.dark());
    document.body.classList.toggle('dark-theme', this.dark());
    document.body.classList.toggle('light-theme', !this.dark());
  }

  isDark(): boolean {
    return this.dark();
  }
}
