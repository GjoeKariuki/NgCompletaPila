import { TestBed } from '@angular/core/testing';

import { QuestiontagsService } from './questiontags.service';

describe('QuestiontagsService', () => {
  let service: QuestiontagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestiontagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
