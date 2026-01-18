import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Alquiler } from '../../features/alquileres/alquiler.model';

@Injectable({ providedIn: 'root' })
export class AlquilerService {

  private readonly API_URL = 'http://localhost:8080/api/alquileres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Alquiler[]> {
    return this.http.get<Alquiler[]>(this.API_URL);
  }

  devolver(alquilerId: number): Observable<Alquiler> {
    return this.http.put<Alquiler>(`${this.API_URL}/${alquilerId}/devolver`, {});
  }
}
