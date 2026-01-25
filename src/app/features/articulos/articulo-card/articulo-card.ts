import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-articulo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './articulo-card.html',
  styleUrls: ['./articulo-card.scss']
})
export class ArticuloCardComponent {

  @Input({ required: true }) articulo!: {
    id: number;
    titulo: string;
    autor?: string;
    disponible: boolean;
    portadaUrl?: string | null;
  };

  /** Modo de la tarjeta */
  @Input() mode: 'alquilar' | 'devolver' = 'alquilar';

  /** Permiso para alquilar */
  @Input() puedeAlquilar = false;

  /** Acción principal */
  @Output() accion = new EventEmitter<void>();
}
