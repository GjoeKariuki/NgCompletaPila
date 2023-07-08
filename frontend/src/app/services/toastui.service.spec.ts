import { TestBed } from '@angular/core/testing';

import { ToastuiService } from './toastui.service';

describe('ToastuiService', () => {
  let service: ToastuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
