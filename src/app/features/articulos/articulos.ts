import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloService } from '../../core/services/articulo.service';
import { ArticuloStateService } from '../../core/services/articulo-state.service';
import { Articulo } from './articulo.model';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulos.html',
})
export class ArticulosComponent implements OnInit {

  articulos = signal<Articulo[]>([]);
  loadingId = signal<number | null>(null);
  mensaje = signal<string | null>(null);

  constructor(
    public authService: AuthService,
    private articuloService: ArticuloService,
    private articuloState: ArticuloStateService
  ) {
    effect(() => {
      this.articuloState.refrescar$()();
      this.cargarArticulos();
    });
  }

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articuloService.getAll().subscribe({
      next: data => this.articulos.set(data),
      error: () => this.mensaje.set('❌ Error cargando artículos'),
    });
  }

  alquilar(articuloId: number): void {
    const usuario = this.authService.usuario();
    if (!usuario) return;

    this.loadingId.set(articuloId);
    this.mensaje.set(null);

    this.articuloService.alquilar(usuario.id, articuloId).subscribe({
      next: () => {
        this.mensaje.set('✅ Artículo alquilado correctamente');
        this.articuloState.refrescar();
      },
      error: () => this.mensaje.set('❌ Error al alquilar'),
      complete: () => this.loadingId.set(null),
    });
  }
}
