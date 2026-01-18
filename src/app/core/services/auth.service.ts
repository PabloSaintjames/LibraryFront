import { Injectable, signal } from '@angular/core';

export interface UsuarioAuth {
  id: number;
  nombre: string;
  rol: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private _usuario = signal<UsuarioAuth | null>(this.getUsuarioStorage());
  private _token = signal<string | null>(localStorage.getItem('token'));

  login(data: any) {
    const usuario: UsuarioAuth = {
      id: data.id,
      nombre: data.nombre,
      rol: data.rol,
    };

    this._usuario.set(usuario);
    this._token.set(data.token);

    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('token', data.token);
  }

  logout() {
    this._usuario.set(null);
    this._token.set(null);
    localStorage.clear();
  }

  usuario() {
    return this._usuario();
  }

  token() {
    return this._token();
  }

  isLoggedIn(): boolean {
    return !!this._token();
  }

  hasRole(...roles: string[]): boolean {
    return !!this._usuario() && roles.includes(this._usuario()!.rol);
  }

  private getUsuarioStorage(): UsuarioAuth | null {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  }
}
