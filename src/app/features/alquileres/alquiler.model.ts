export interface Alquiler {
  id: number;
  usuario: string;
  articulo: string;
  vigente: boolean;
  fechaAlquiler: string;
  fechaDevolucion?: string | null;
}
