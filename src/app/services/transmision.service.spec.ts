import { TestBed } from '@angular/core/testing';

import { TransmisionService } from './transmision.service';

describe('TransmisionService', () => {
  let service: TransmisionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransmisionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
