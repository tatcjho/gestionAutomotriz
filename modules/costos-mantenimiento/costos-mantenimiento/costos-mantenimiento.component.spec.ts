import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostosMantenimientoComponent } from './costos-mantenimiento.component';

describe('CostosMantenimientoComponent', () => {
  let component: CostosMantenimientoComponent;
  let fixture: ComponentFixture<CostosMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostosMantenimientoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostosMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
