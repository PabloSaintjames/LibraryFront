import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloCardComponent } from './articulo-card/articulo-card';
import { ArticuloService } from '../../core/services/articulo.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [
    CommonModule,
    ArticuloCardComponent
  ],
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.scss']
})
export class ArticulosComponent implements OnInit {

  private articuloService = inject(ArticuloService);
  authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  articulos: any[] = [];
  mensaje = '';

  /** id del artículo que está animando (al alquilar) */
  animandoId: number | null = null;

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articuloService.getAll().subscribe({
      next: (data) => {
        this.articulos = data;
        this.cdr.detectChanges(); // ✅ AQUÍ
      },
      error: () => {
        this.mensaje = '❌ Error cargando artículos';
        this.cdr.detectChanges(); // ✅ AQUÍ
      }
    });
  }

  alquilar(articuloId: number): void {
    const usuario = this.authService.usuario();

    if (!usuario) {
      this.mensaje = '❌ Debes iniciar sesión';
      return;
    }

    // activa animación solo en esa tarjeta
    this.animandoId = articuloId;

    this.articuloService.alquilar(usuario.id, articuloId).subscribe({
      next: () => {
        this.mensaje = '✅ Artículo alquilado correctamente';
        this.animandoId = null;
        this.cargarArticulos(); // ya refresca dentro
      },
      error: () => {
        this.animandoId = null;
        this.mensaje = '❌ No se pudo alquilar el artículo';
        this.cdr.detectChanges();
      }
    });
  }
}
