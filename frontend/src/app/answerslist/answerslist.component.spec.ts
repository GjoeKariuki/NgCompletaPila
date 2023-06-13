import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerslistComponent } from './answerslist.component';

describe('AnswerslistComponent', () => {
  let component: AnswerslistComponent;
  let fixture: ComponentFixture<AnswerslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AnswerslistComponent]
    });
    fixture = TestBed.createComponent(AnswerslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
