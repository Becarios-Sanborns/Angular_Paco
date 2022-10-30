import { TestBed } from '@angular/core/testing';

import { ActualizarTablaBusquedaServiceService } from './actualizar-tabla-busqueda-service.service';

describe('ActualizarTablaBusquedaServiceService', () => {
  let service: ActualizarTablaBusquedaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActualizarTablaBusquedaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
