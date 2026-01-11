export interface Articulo {
  id: number;
  titulo: string;
  tipo: 'LIBRO' | 'CD' | 'ARTICULO';
  alquilado: boolean;

  // opcionales según tipo
  autor?: string;
  isbn?: string;
  estiloMusical?: string;
}
