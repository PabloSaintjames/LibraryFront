import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquilerService } from '../../core/services/alquiler.service';
import { AuthService } from '../../core/services/auth.service';
import { ArticuloCardComponent } from '../articulos/articulo-card/articulo-card';

@Component({
  selector: 'app-alquileres',
  standalone: true,
  imports: [
    CommonModule,
    ArticuloCardComponent
  ],
  templateUrl: './alquileres.html',
  styleUrls: ['./alquileres.scss']
})
export class AlquileresComponent implements OnInit {

  private alquilerService = inject(AlquilerService);
  authService = inject(AuthService);

  alquileres: any[] = [];
  mensaje = '';

  ngOnInit(): void {
    this.cargarAlquileres();
  }

  cargarAlquileres(): void {
    this.alquilerService.getAll().subscribe({
      next: data => this.alquileres = data,
      error: () => this.mensaje = '❌ Error cargando alquileres'
    });
  }

  devolver(id: number): void {
    this.alquilerService.devolver(id).subscribe({
      next: () => {
        this.mensaje = '✅ Alquiler devuelto correctamente';
        this.cargarAlquileres();
      },
      error: () => {
        this.mensaje = '❌ No se pudo devolver el alquiler';
      }
    });
  }

  /** Adaptador para reutilizar ArticuloCard */
  toArticuloCard(a: any) {
    return {
      id: a.id,
      titulo: a.titulo,
      autor: a.autor,
      disponible: false,
      portadaUrl: a.isbn
        ? `https://covers.openlibrary.org/b/isbn/${a.isbn}-L.jpg`
        : null
    };
  }
}
