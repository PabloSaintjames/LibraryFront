import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  private dark = signal<boolean>(false);

  constructor() {
    const darkStored = localStorage.getItem('dark') === 'true';
    this.dark.set(darkStored);
    document.body.classList.toggle('dark-theme', darkStored);
  }

  toggle(): void {
    const next = !this.dark();
    this.dark.set(next);

    localStorage.setItem('dark', String(next));
    document.body.classList.toggle('dark-theme', next);
  }

  isDark(): boolean {
    return this.dark();
  }


private applyTheme(): void {
    document.body.classList.toggle('dark-theme', this.dark());
    document.body.classList.toggle('light-theme', !this.dark());

    const favicon = document.getElementById('app-favicon') as HTMLLinkElement;
    if (favicon) {
      favicon.href = this.dark()
        ? 'favicon-dark.ico'
        : 'favicon-light.ico';
    }
  }
}
