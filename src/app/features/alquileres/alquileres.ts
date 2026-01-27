import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
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
  private cdr = inject(ChangeDetectorRef);

  alquileres: any[] = [];
  mensaje = '';

  ngOnInit(): void {
    this.cargarAlquileres();
  }

  cargarAlquileres(): void {
    this.alquilerService.getAll().subscribe({
      next: data => {
        this.alquileres = data;
        this.cdr.detectChanges(); // ✅ aquí
      },
      error: () => {
        this.mensaje = '❌ Error cargando alquileres';
        this.cdr.detectChanges(); // ✅ aquí
      }
    });
  }

  devolver(alquilerId: number): void {
    this.alquilerService.devolver(alquilerId).subscribe({
      next: () => {
        this.mensaje = '✅ Alquiler devuelto correctamente';
        this.cargarAlquileres(); // ya refresca y detecta
      },
      error: () => {
        this.mensaje = '❌ No se pudo devolver el alquiler';
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Adaptador para reutilizar <app-articulo-card>
   * Aquí está la clave
   */
  toArticuloCard(a: any) {
    const articulo = a.articulo;

    return {
      id: articulo.id,
      titulo: articulo.titulo,
      autor: articulo.autor,
      disponible: false,
      portadaUrl: articulo.isbn
        ? `https://covers.openlibrary.org/b/isbn/${articulo.isbn}-L.jpg`
        : null
    };
  }
}
