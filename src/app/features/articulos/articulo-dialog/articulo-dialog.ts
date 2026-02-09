import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-articulo-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './articulo-dialog.html',
  styleUrls: ['./articulo-dialog.scss']
})
export class ArticuloDialogComponent {

  form: FormGroup;
  esEdicion = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ArticuloDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.esEdicion = !!data;

    this.form = this.fb.group({
      titulo: ['', Validators.required],
      autor: ['', Validators.required],
      isbn: ['', Validators.required]
    });

    if (this.esEdicion) {
      this.form.patchValue({
        titulo: data.titulo,
        autor: data.autor,
        isbn: data.isbn
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) return;

    this.dialogRef.close({
      tipo: 'LIBRO',
      titulo: this.form.value.titulo,
      autor: this.form.value.autor,
      isbn: this.form.value.isbn
    });
  }


  cancelar(): void {
    this.dialogRef.close();
  }
}
