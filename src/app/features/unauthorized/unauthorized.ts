import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-unauthorized',
  template: `
    <h2>🚫 Acceso denegado</h2>
    <p>No tienes permisos para acceder a esta sección.</p>
  `
})
export class UnauthorizedComponent {}
