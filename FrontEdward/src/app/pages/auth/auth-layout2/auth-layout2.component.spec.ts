import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthLayout2Component } from './auth-layout2.component';

describe('AuthLayout2Component', () => {
  let component: AuthLayout2Component;
  let fixture: ComponentFixture<AuthLayout2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthLayout2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthLayout2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
