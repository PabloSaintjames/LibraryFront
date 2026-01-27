import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { AuthService } from '../../core/services/auth.service';
import { UsuarioService, Usuario } from '../../core/services/usuario.service';
import { UsuarioDialogComponent } from './usuario-dialog/usuario-dialog';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.scss']
})
export class UsuariosComponent implements OnInit {

  private usuarioService = inject(UsuarioService);
  private dialog = inject(MatDialog);
  private cdr = inject(ChangeDetectorRef);

  authService = inject(AuthService);

  usuarios: Usuario[] = [];
  displayedColumns = ['nombre', 'email', 'rol', 'acciones'];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.usuarioService.getAll().subscribe({
      next: data => {
        this.usuarios = data;
        this.cdr.detectChanges(); // ✅ CLAVE
      },
      error: err => {
        console.error('Error cargando usuarios', err);
        this.cdr.detectChanges();
      }
    });
  }

  abrirDialogoCrear(): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '420px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.usuarioService.create(result).subscribe({
        next: () => this.cargarUsuarios()
      });
    });
  }

  editarUsuario(usuario: Usuario): void {
    const dialogRef = this.dialog.open(UsuarioDialogComponent, {
      width: '420px',
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      this.usuarioService.update(usuario.id, result).subscribe({
        next: () => this.cargarUsuarios()
      });
    });
  }

  eliminarUsuario(usuario: Usuario): void {

    if (usuario.id === this.authService.usuario()?.id) {
      alert('No puedes eliminar tu propio usuario');
      return;
    }

    const confirmar = confirm(
      `¿Seguro que quieres eliminar al usuario "${usuario.nombre}"?`
    );

    if (!confirmar) return;

    this.usuarioService.delete(usuario.id).subscribe({
      next: () => this.cargarUsuarios(),
      error: err => console.error('Error eliminando usuario', err)
    });
  }
}
