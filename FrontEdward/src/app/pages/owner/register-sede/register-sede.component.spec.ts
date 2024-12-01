import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSedeComponent } from './register-sede.component';

describe('RegisterSedeComponent', () => {
  let component: RegisterSedeComponent;
  let fixture: ComponentFixture<RegisterSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterSedeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
