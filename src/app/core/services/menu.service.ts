import { Injectable, inject } from '@angular/core';
import { AuthService } from './auth.service';

export interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: string[];
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private auth = inject(AuthService);

  private readonly MENU: MenuItem[] = [
    {
      label: 'Artículos',
      icon: 'menu_book',
      route: 'articulos'
    },
    {
      label: 'Alquileres',
      icon: 'inventory',
      route: 'alquileres',
      roles: ['ADMINISTRADOR', 'OPERARIO']
    },
    {
      label: 'Usuarios',
      icon: 'person',
      route: 'usuarios',
      roles: ['ADMINISTRADOR']
    }
  ];



  getVisibleMenu(): MenuItem[] {
    return this.MENU.filter(item =>
      !item.roles || item.roles.some(role => this.auth.hasRole(role))
    );
  }
}
