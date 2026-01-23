import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _usuario = signal<any | null>(
    JSON.parse(localStorage.getItem('usuario') || 'null')
  );

  private _token = signal<string | null>(
    localStorage.getItem('token')
  );

  constructor(private router: Router) {}

  login(data: any): void {
    const usuario = {
      id: data.id,
      nombre: data.nombre,
      rol: data.rol
    };

    this._usuario.set(usuario);
    this._token.set(data.token);

    // Persistencia
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', data.token);
  }

  logout(): void {
    this._usuario.set(null);
    this._token.set(null);

    localStorage.removeItem('usuario');
    localStorage.removeItem('token');

    this.router.navigateByUrl('/login'); // fuerza salida
  }

  usuario() {
    return this._usuario();
  }

  token() {
    return this._token();
  }

  isAuthenticated(): boolean {
    return !!this._token();
  }

  hasRole(...roles: string[]): boolean {
    return !!this._usuario() && roles.includes(this._usuario()!.rol);
  }
}
