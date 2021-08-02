import { TestBed } from '@angular/core/testing';

import { CostosMantenimientoService } from './costos-mantenimiento.service';

describe('CostosMantenimientoService', () => {
  let service: CostosMantenimientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostosMantenimientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
