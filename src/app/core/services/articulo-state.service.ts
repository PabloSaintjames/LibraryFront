import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ArticuloStateService {

  private refrescarSignal = signal(0);

  refrescar() {
    this.refrescarSignal.update(v => v + 1);
  }

  refrescar$() {
    return this.refrescarSignal;
  }

}
