import {ChangeDetectorRef, Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

/* Components */
import { SidenavComponent } from './sidenav/sidenav';
import { ToolbarComponent } from './toolbar/toolbar';

/* Material */
import { MatSidenavModule } from '@angular/material/sidenav';

/* Services */
import { ThemeService } from '../core/services/theme.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    SidenavComponent,
    ToolbarComponent
  ],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class LayoutComponent {

  private breakpoint = inject(BreakpointObserver);
  readonly theme = inject(ThemeService);
  private cdr = inject(ChangeDetectorRef);

  readonly isMobile = signal(false);

  constructor() {
    this.breakpoint
      .observe([Breakpoints.Handset])
      .pipe(takeUntilDestroyed())
      .subscribe(result => this.isMobile.set(result.matches));
  }
}
