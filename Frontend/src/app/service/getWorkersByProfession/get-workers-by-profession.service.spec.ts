import { TestBed } from '@angular/core/testing';

import { GetWorkersByProfessionService } from './get-workers-by-profession.service';

describe('GetWorkersByProfessionService', () => {
  let service: GetWorkersByProfessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWorkersByProfessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
