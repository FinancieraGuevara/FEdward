import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CronogramaDePagosComponent } from './cronograma-de-pagos.component';

describe('CronogramaDePagosComponent', () => {
  let component: CronogramaDePagosComponent;
  let fixture: ComponentFixture<CronogramaDePagosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CronogramaDePagosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CronogramaDePagosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
