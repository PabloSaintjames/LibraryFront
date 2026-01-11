import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloService } from '../../core/services/articulo.service';
import { Articulo } from './articulo.model';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articulos.html',
})
export class ArticulosComponent implements OnInit {

  articulos = signal<Articulo[]>([]);

  constructor(private articuloService: ArticuloService) {}

  ngOnInit(): void {
    this.articuloService.getAll().subscribe({
      next: (data) => {
        console.log('ARTICULOS DESDE BACKEND', data);
        this.articulos.set(data); // ✅ CLAVE
      },
      error: (err) => console.error('Error cargando artículos', err),
    });
  }
}
