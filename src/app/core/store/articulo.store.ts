import { Injectable, signal } from '@angular/core';
import { Articulo } from '../../features/articulos/articulo.model';
import { ArticuloService } from '../services/articulo.service';

@Injectable({ providedIn: 'root' })
export class ArticuloStore {

  readonly articulos = signal<Articulo[]>([]);
  readonly loading = signal(false);

  constructor(private articuloService: ArticuloService) {}

  cargar(): void {
    this.loading.set(true);

    this.articuloService.getAll().subscribe({
      next: data => this.articulos.set(data),
      error: err => console.error(err),
      complete: () => this.loading.set(false),
    });
  }
}
