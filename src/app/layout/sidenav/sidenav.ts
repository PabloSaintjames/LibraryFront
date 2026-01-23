import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuService, MenuItem } from '../../core/services/menu.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sidenav.html',
  styleUrls: ['./sidenav.scss']
})
export class SidenavComponent {

  @Output() navigate = new EventEmitter<void>();

  private menuService = inject(MenuService);

  readonly menu: MenuItem[] = this.menuService.getVisibleMenu();

  onNavigate(): void {
    this.navigate.emit();
  }
}
