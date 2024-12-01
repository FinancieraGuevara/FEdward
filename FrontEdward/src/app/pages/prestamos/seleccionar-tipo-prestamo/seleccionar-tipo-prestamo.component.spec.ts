import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarTipoPrestamoComponent } from './seleccionar-tipo-prestamo.component';

describe('SeleccionarTipoPrestamoComponent', () => {
  let component: SeleccionarTipoPrestamoComponent;
  let fixture: ComponentFixture<SeleccionarTipoPrestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeleccionarTipoPrestamoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeleccionarTipoPrestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
