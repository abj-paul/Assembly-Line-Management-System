import { TestBed } from '@angular/core/testing';

import { SharedStuffsService } from './shared-stuffs.service';

describe('SharedStuffsService', () => {
  let service: SharedStuffsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedStuffsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
