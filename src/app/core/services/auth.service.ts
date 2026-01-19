import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _usuario = signal<any | null>(null);
  private _token = signal<string | null>(null);

  constructor(private router: Router) {}

  login(data: any) {
    this._usuario.set({
      id: data.id,
      nombre: data.nombre,
      rol: data.rol
    });
    this._token.set(data.token);
  }

  logout() {
    this._usuario.set(null);
    this._token.set(null);
    this.router.navigate(['/login']);
  }

  usuario() {
    return this._usuario();
  }

  token() {
    return this._token();
  }

  isAuthenticated() {
    return !!this._token();
  }

  hasRole(...roles: string[]) {
    return this._usuario() && roles.includes(this._usuario()!.rol);
  }
}
