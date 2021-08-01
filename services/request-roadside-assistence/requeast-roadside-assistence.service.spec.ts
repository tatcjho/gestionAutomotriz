import { TestBed } from '@angular/core/testing';

import { RequeastRoadsideAssistenceService } from './requeast-roadside-assistence.service';

describe('RequeastRoadsideAssistenceService', () => {
  let service: RequeastRoadsideAssistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequeastRoadsideAssistenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
