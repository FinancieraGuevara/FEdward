import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamobienComponent } from './prestamobien.component';

describe('PrestamobienComponent', () => {
  let component: PrestamobienComponent;
  let fixture: ComponentFixture<PrestamobienComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamobienComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrestamobienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
