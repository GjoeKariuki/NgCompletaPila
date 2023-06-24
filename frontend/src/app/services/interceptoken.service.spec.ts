import { TestBed } from '@angular/core/testing';

import { InterceptokenService } from './interceptoken.service';

describe('InterceptokenService', () => {
  let service: InterceptokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
