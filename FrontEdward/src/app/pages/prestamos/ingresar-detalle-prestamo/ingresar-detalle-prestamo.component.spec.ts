import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarDetallePrestamoComponent } from './ingresar-detalle-prestamo.component';

describe('IngresarDetallePrestamoComponent', () => {
  let component: IngresarDetallePrestamoComponent;
  let fixture: ComponentFixture<IngresarDetallePrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarDetallePrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarDetallePrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
