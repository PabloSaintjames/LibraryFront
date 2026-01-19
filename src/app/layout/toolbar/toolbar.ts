import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

/* Services */
import { AuthService } from '../../core/services/auth.service';
import { ThemeService } from '../../core/services/theme.service';

/* Material */
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.scss']
})
export class ToolbarComponent {

  @Output() menuToggle = new EventEmitter<void>();

  readonly auth = inject(AuthService);
  readonly theme = inject(ThemeService);

  toggleMenu(): void {
    this.menuToggle.emit();
  }
}
