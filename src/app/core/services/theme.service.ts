import { Injectable, signal } from '@angular/core';

const THEME_KEY = 'app-theme';
type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private readonly dark = signal<boolean>(false);

  constructor() {
    this.loadTheme();
  }

  toggle(): void {
    this.dark.update(value => !value);
    this.applyTheme();
    this.saveTheme();
  }

  isDark(): boolean {
    return this.dark();
  }

  /* ───── PRIVADOS ───── */

  private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.dark());
  }

  private saveTheme(): void {
    const mode: ThemeMode = this.dark() ? 'dark' : 'light';
    localStorage.setItem(THEME_KEY, mode);
  }

  private loadTheme(): void {
    const stored = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const isDark = stored === 'dark';
    this.dark.set(isDark);
    this.applyTheme();
  }
}
