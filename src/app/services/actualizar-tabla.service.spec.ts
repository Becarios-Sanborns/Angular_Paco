import { TestBed } from '@angular/core/testing';

import { ActualizarTablaService } from './actualizar-tabla.service';

describe('ActualizarTablaService', () => {
  let service: ActualizarTablaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarTablaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
