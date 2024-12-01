import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarInformacionComponent } from './validar-informacion.component';

describe('ValidarInformacionComponent', () => {
  let component: ValidarInformacionComponent;
  let fixture: ComponentFixture<ValidarInformacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarInformacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarInformacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
