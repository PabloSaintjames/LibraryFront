import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Articulo } from '../../features/articulos/articulo.model';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {

  private readonly API_URL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(`${this.API_URL}/articulos`);
  }

  alquilar(usuarioId: number, articuloId: number) {
    return this.http.post(`${this.API_URL}/alquileres`, {
      usuarioId,
      articuloId
    });
  }

}
