import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerCard } from './alquiler-card';

describe('AlquilerCard', () => {
  let component: AlquilerCard;
  let fixture: ComponentFixture<AlquilerCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
