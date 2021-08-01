import { TestBed } from '@angular/core/testing';

import { PaymentRequeestService } from './payment-requeest.service';

describe('PaymentRequeestService', () => {
  let service: PaymentRequeestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentRequeestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
