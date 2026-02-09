import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticuloCardComponent } from './articulo-card/articulo-card';
import { ArticuloService } from '../../core/services/articulo.service';
import { AuthService } from '../../core/services/auth.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ArticuloDialogComponent } from './articulo-dialog/articulo-dialog';
import { MatIconModule } from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [
    CommonModule,
    ArticuloCardComponent,
    MatIconModule,
    MatDialogModule,
    MatButton
  ],
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.scss']
})
export class ArticulosComponent implements OnInit {

  private articuloService = inject(ArticuloService);
  private dialog = inject(MatDialog);
  authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  articulos: any[] = [];
  mensaje = '';
  animandoId: number | null = null;

  ngOnInit(): void {
    this.cargarArticulos();
  }

  cargarArticulos(): void {
    this.articuloService.getAll().subscribe({
      next: data => {
        this.articulos = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.mensaje = '❌ Error cargando artículos';
        this.cdr.detectChanges();
      }
    });
  }

  alquilar(articuloId: number): void {
    const usuario = this.authService.usuario();

    if (!usuario) {
      this.mensaje = '❌ Debes iniciar sesión';
      return;
    }

    this.animandoId = articuloId;

    this.articuloService.alquilar(usuario.id, articuloId).subscribe({
      next: () => {
        this.mensaje = '✅ Artículo alquilado correctamente';
        this.animandoId = null;
        this.cargarArticulos();
      },
      error: () => {
        this.animandoId = null;
        this.mensaje = '❌ No se pudo alquilar el artículo';
        this.cdr.detectChanges();
      }
    });
  }

  /* ======================
     NUEVO ARTÍCULO
     ====================== */

  abrirDialogoCrear(): void {
    const dialogRef = this.dialog.open(ArticuloDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.articuloService.create(result).subscribe({
        next: () => {
          this.mensaje = '✅ Artículo creado correctamente';
          this.cargarArticulos();
        },
        error: () => {
          this.mensaje = '❌ Error al crear el artículo';
          this.cdr.detectChanges();
        }
      });
    });
  }

}



