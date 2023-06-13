import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionDetailComponent } from './question-detail.component';

describe('QuestionDetailComponent', () => {
  let component: QuestionDetailComponent;
  let fixture: ComponentFixture<QuestionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [QuestionDetailComponent]
    });
    fixture = TestBed.createComponent(QuestionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
