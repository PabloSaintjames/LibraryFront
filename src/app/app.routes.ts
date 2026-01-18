import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
            .then(m => m.AlquileresComponent),
      },
      {
        path: 'login',
        loadComponent: () =>
          import('./features/login/login')
            .then(m => m.LoginComponent)
      },

      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '',
        redirectTo: 'articulos',
        pathMatch: 'full',
      },
    ],
  },
];
