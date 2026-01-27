import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-usuario-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './usuario-dialog.html',
  styleUrls: ['./usuario-dialog.scss']
})
export class UsuarioDialogComponent {

  form: FormGroup;
  esEdicion = false;

  roles = [
    { label: 'Administrador', value: 'ADMINISTRADOR', id: 1 },
    { label: 'Usuario', value: 'USUARIO', id: 2 },
    { label: 'Operario', value: 'OPERARIO', id: 3 },
    { label: 'Invitado', value: 'INVITADO', id: 4 }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.esEdicion = !!data;

    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      rol: ['', Validators.required]
    });

    // 👉 Si es edición, rellenamos
    if (this.esEdicion) {
      this.form.patchValue({
        nombre: data.nombre,
        email: data.email,
        rol: data.rol.tipo
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    const rolSeleccionado = this.roles.find(
      r => r.value === this.form.value.rol
    );

    this.dialogRef.close({
      nombre: this.form.value.nombre,
      email: this.form.value.email,
      password: this.form.value.password || null,
      rolId: rolSeleccionado!.id
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
