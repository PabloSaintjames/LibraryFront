import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private dark = signal<boolean>(false);

  constructor() {
    const stored = localStorage.getItem('dark') === 'true';
    this.dark.set(stored);

    this.applyTheme();
  }

  toggle(): void {
    this.dark.update(v => !v);
    localStorage.setItem('dark', String(this.dark()));
    this.applyTheme();
  }

  isDark(): boolean {
    return this.dark();
  }

  /** Aplica clases globales */
  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.dark());
    document.body.classList.toggle('light-theme', !this.dark());
  }
}
