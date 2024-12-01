import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedeLayoutComponent } from './sede-layout.component';

describe('SedeLayoutComponent', () => {
  let component: SedeLayoutComponent;
  let fixture: ComponentFixture<SedeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SedeLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SedeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
