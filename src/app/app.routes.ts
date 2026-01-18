import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

export const routes: Routes = [

  {
    path: 'login',
    loadComponent: () =>
      import('./features/login/login')
        .then(m => m.LoginComponent)
  },

  {
    path: 'articulos',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/articulos/articulos')
        .then(m => m.ArticulosComponent)
  },

  {
    path: 'alquileres',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMINISTRADOR', 'OPERARIO', 'USUARIO'] },
    loadComponent: () =>
      import('./features/alquileres/alquileres')
        .then(m => m.AlquileresComponent)
  },

  {
    path: 'usuarios',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMINISTRADOR'] },
    loadComponent: () =>
      import('./features/usuarios/usuarios')
        .then(m => m.UsuariosComponent)
  },

  {
    path: 'unauthorized',
    loadComponent: () =>
      import('./features/unauthorized/unauthorized')
        .then(m => m.UnauthorizedComponent)
  },

  { path: '**', redirectTo: 'articulos' }
];
