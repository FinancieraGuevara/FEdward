import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarDetallesDePrestamosV2Component } from './ingresar-detalles-de-prestamos-v2.component';

describe('IngresarDetallesDePrestamosV2Component', () => {
  let component: IngresarDetallesDePrestamosV2Component;
  let fixture: ComponentFixture<IngresarDetallesDePrestamosV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarDetallesDePrestamosV2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarDetallesDePrestamosV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
