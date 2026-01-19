import { Routes } from '@angular/router';

/* Layout */
import { LayoutComponent } from './layout/layout';

/* Guards */
import { authGuard } from './core/guards/auth-guard';
import { roleGuard } from './core/guards/role-guard';

/* Public */
import { LandingComponent } from './features/landing/landing';
import { LoginComponent } from './features/login/login';
import { UnauthorizedComponent } from './features/unauthorized/unauthorized';

export const routes: Routes = [

  /* ───── PUBLICAS ───── */

  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },

  /* ───── PRIVADAS (LAYOUT) ───── */

  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [

      {
        path: 'articulos',
        loadComponent: () =>
          import('./features/articulos/articulos')
            .then(m => m.ArticulosComponent)
      },

      {
        path: 'alquileres',
        canActivate: [roleGuard],
        data: { roles: ['ADMINISTRADOR', 'OPERARIO'] },
        loadComponent: () =>
          import('./features/alquileres/alquileres')
            .then(m => m.AlquileresComponent)
      },

      {
        path: 'usuarios',
        canActivate: [roleGuard],
        data: { roles: ['ADMINISTRADOR'] },
        loadComponent: () =>
          import('./features/usuarios/usuarios')
            .then(m => m.UsuariosComponent)
      },

      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'articulos'
      }
    ]
  },

  /* ───── FALLBACK ───── */

  {
    path: '**',
    redirectTo: ''
  }
];
