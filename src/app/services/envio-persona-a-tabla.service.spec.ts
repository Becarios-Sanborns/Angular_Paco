import { TestBed } from '@angular/core/testing';

import { EnvioPersonaATablaService } from './envio-persona-a-tabla.service';

describe('EnvioPersonaATablaService', () => {
  let service: EnvioPersonaATablaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvioPersonaATablaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
