import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquilerService } from '../../core/services/alquiler.service';
import { ArticuloCardComponent } from '../articulos/articulo-card/articulo-card';

@Component({
  selector: 'app-alquileres',
  standalone: true,
  imports: [CommonModule, ArticuloCardComponent],
  templateUrl: './alquileres.html',
  styleUrls: ['./alquileres.scss']
})
export class AlquileresComponent implements OnInit {

  private alquilerService = inject(AlquilerService);
  private cdr = inject(ChangeDetectorRef);

  alquileresActivos: any[] = [];
  alquileresDevueltos: any[] = [];

  mensaje = '';
  animandoId: number | null = null;

  ngOnInit(): void {
    this.cargarAlquileres();
  }

  cargarAlquileres(): void {
    this.alquilerService.getAll().subscribe({
      next: data => {
        this.alquileresActivos = data.filter(a => !a.fechaDevolucion);
        this.alquileresDevueltos = data.filter(a => a.fechaDevolucion);
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensaje = '❌ Error cargando alquileres';
        this.cdr.detectChanges();
      }
    });
  }

  devolver(id: number): void {
    this.animandoId = id;

    this.alquilerService.devolver(id).subscribe({
      next: () => {
        this.mensaje = '✅ Alquiler devuelto correctamente';
        this.animandoId = null;
        this.cargarAlquileres();
      },
      error: () => {
        this.animandoId = null;
        this.mensaje = '❌ No se pudo devolver el alquiler';
        this.cdr.detectChanges();
      }
    });
  }

  toArticuloCard(a: any) {
    return {
      id: a.id,
      titulo: a.articulo,
      disponible: false,
      portadaUrl: a.isbn
        ? `https://covers.openlibrary.org/b/isbn/${a.isbn}-L.jpg`
        : undefined,
      fechaAlquiler: a.fechaAlquiler,
      fechaDevolucion: a.fechaDevolucion
    };
  }
}
