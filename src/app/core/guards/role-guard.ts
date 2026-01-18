import { CanActivateFn, ActivatedRouteSnapshot, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const rolesPermitidos: string[] = route.data['roles'];

  const usuario = auth.usuario();
  if (!usuario) {
    router.navigate(['/login']);
    return false;
  }

  if (rolesPermitidos.includes(usuario.rol)) {
    return true;
  }

  router.navigate(['/unauthorized']);
  return false;
};
