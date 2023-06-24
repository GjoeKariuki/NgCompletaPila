import { TestBed } from '@angular/core/testing';

import { AnswervotesService } from './answervotes.service';

describe('AnswervotesService', () => {
  let service: AnswervotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnswervotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
