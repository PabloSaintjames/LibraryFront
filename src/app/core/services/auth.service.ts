import { Injectable, signal } from '@angular/core';

export interface UsuarioAuth {
  id: number;
  nombre: string;
  rol: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _usuario = signal<UsuarioAuth | null>(null);

  constructor() {
    const saved = localStorage.getItem('usuario');
    if (saved) {
      this._usuario.set(JSON.parse(saved));
    }
  }

  login(usuario: UsuarioAuth) {
    this._usuario.set(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  logout() {
    this._usuario.set(null);
    localStorage.removeItem('usuario');
  }

  usuario() {
    return this._usuario();
  }

  token(): string | null {
    return this._usuario()?.token ?? null;
  }

  isLogged(): boolean {
    return !!this._usuario();
  }

  hasRole(...roles: string[]): boolean {
    const rol = this._usuario()?.rol;
    return rol ? roles.includes(rol) : false;
  }
}
