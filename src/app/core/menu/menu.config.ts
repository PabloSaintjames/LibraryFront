import { MenuItem } from './menu-item';

export const MENU_ITEMS: MenuItem[] = [
  {
    label: 'Artículos',
    icon: 'menu_book',
    route: '/app/articulos'
  },
  {
    label: 'Alquileres',
    icon: 'inventory',
    route: '/app/alquileres',
    roles: ['ADMINISTRADOR', 'OPERARIO']
  },
  {
    label: 'Usuarios',
    icon: 'person',
    route: '/app/usuarios',
    roles: ['ADMINISTRADOR']
  }
];
