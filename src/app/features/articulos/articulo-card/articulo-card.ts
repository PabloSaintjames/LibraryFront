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
  };

  @Input() puedeAlquilar = false;
  @Input() animando = false;

  @Output() alquilar = new EventEmitter<void>();
}
