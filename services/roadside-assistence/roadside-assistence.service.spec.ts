import { TestBed } from '@angular/core/testing';

import { RoadsideAssistenceService } from './roadside-assistence.service';

describe('RoadsideAssistenceService', () => {
  let service: RoadsideAssistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoadsideAssistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
