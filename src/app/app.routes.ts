import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'articulos',
        pathMatch: 'full',
      },
      {
        path: 'articulos',
        loadComponent: () =>
          import('./features/articulos/articulos')
            .then(m => m.ArticulosComponent),
      },
      {
        path: 'alquileres',
        loadComponent: () =>
          import('./features/alquileres/alquileres')
            .then(m => m.Alquileres),
      },
      {
        path: 'usuarios',
        loadComponent: () =>
          import('./features/usuarios/usuarios')
            .then(m => m.Usuarios),
      },
    ],
  },
];
