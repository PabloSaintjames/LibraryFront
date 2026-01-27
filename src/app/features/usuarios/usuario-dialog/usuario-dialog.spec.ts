import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDialog } from './usuario-dialog';

describe('UsuarioDialog', () => {
  let component: UsuarioDialog;
  let fixture: ComponentFixture<UsuarioDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
