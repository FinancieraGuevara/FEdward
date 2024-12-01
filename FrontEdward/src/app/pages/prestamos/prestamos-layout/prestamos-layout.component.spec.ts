import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamosLayoutComponent } from './prestamos-layout.component';

describe('PrestamosLayoutComponent', () => {
  let component: PrestamosLayoutComponent;
  let fixture: ComponentFixture<PrestamosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamosLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
