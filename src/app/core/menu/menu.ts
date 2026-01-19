import { Injectable, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MenuItem } from './menu-item';
import { MENU_ITEMS } from './menu.config';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private auth = inject(AuthService);

  getVisibleMenu(): MenuItem[] {
    return MENU_ITEMS.filter(item =>
      !item.roles || item.roles.some(role => this.auth.hasRole(role))
    );
  }
}
