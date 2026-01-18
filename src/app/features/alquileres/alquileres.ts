import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlquilerService } from '../../core/services/alquiler.service';
import { AuthService } from '../../core/services/auth.service';
import { Alquiler } from './alquiler.model';

@Component({
  selector: 'app-alquileres',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alquileres.html',
})
export class AlquileresComponent implements OnInit {
  mensaje = signal<string | null>(null);
  alquileres = signal<Alquiler[]>([]);
  loadingId = signal<number | null>(null);

  // 👇 AQUÍ ESTÁ LA CLAVE
  constructor(
    private alquilerService: AlquilerService,
    public authService: AuthService   // 👈 PUBLIC para usarlo en el template
  ) {}

  ngOnInit(): void {
    this.cargarAlquileres();
  }

  cargarAlquileres(): void {
    this.alquilerService.getAll().subscribe({
      next: data => this.alquileres.set(data),
      error: err => console.error(err),
    });
  }

  devolver(id: number): void {
    this.loadingId.set(id);

    this.alquilerService.devolver(id).subscribe({
      next: () => {
        this.loadingId.set(null);
        this.mensaje.set('✅ Alquiler devuelto correctamente');
        this.cargarAlquileres();

        // opcional: ocultar mensaje tras 3s
        setTimeout(() => this.mensaje.set(null), 3000);
      },
      error: err => {
        this.loadingId.set(null);
        console.error(err);
      }
    });
  }

}
