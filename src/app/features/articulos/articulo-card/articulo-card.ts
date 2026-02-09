import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-articulo-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule

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
    portadaUrl?: string;
    fechaAlquiler?: string;
    fechaDevolucion?: string;
  };

  @Input() mode: 'alquilar' | 'devolver' | 'readonly' = 'alquilar';

  /** 🔥 indica si la card está animando */
  @Input() animando = false;

  @Output() accion = new EventEmitter<void>();
}

