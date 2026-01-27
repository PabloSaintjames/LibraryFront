import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: {
    tipo: string;
  };
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {

  private readonly API = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.API);
  }

  create(data: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
  }): Observable<Usuario> {
    return this.http.post<Usuario>(this.API, data);
  }
  update(id: number, data: any) {
    return this.http.put(`${this.API}/${id}`, data);
  }
  delete(id: number) {
    return this.http.delete(`${this.API}/${id}`);
  }

}
