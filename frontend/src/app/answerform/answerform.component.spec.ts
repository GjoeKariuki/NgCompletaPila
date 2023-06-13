import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerformComponent } from './answerform.component';

describe('AnswerformComponent', () => {
  let component: AnswerformComponent;
  let fixture: ComponentFixture<AnswerformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnswerformComponent]
    });
    fixture = TestBed.createComponent(AnswerformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
