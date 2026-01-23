import { Routes } from '@angular/router';

import { LandingComponent } from './features/landing/landing';
import { LoginComponent } from './features/login/login';

import { LayoutComponent } from './layout/layout';
import { ArticulosComponent } from './features/articulos/articulos';
import { AlquileresComponent } from './features/alquileres/alquileres';
import { UsuariosComponent } from './features/usuarios/usuarios';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  /* ===== PUBLIC ===== */

  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  /* ===== PRIVATE (WITH LAYOUT) ===== */

  {
    path: 'app',
    component: LayoutComponent,
    canActivateChild: [authGuard],
    children: [
      { path: 'articulos', component: ArticulosComponent },
      { path: 'alquileres', component: AlquileresComponent },
      { path: 'usuarios', component: UsuariosComponent }
    ]
  },

  {
    path: '**',
    redirectTo: ''
  }
];
