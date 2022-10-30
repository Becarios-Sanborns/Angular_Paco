import { TestBed } from '@angular/core/testing';

import { DecrementarIdService } from './decrementar-id.service';

describe('DecrementarIdService', () => {
  let service: DecrementarIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecrementarIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
