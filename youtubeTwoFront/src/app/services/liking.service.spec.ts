import { TestBed } from '@angular/core/testing';

import { LikingService } from './liking.service';

describe('LikingService', () => {
  let service: LikingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
