import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/* Services */
import { MenuService } from '../../core/menu/menu';

/* Material */
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

/* Model */
import { MenuItem } from '../../core/menu/menu-item';

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

  private menuService = inject(MenuService);

  readonly menu: MenuItem[] = this.menuService.getVisibleMenu();
}
