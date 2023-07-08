import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastuiComponent } from './toastui.component';

describe('ToastuiComponent', () => {
  let component: ToastuiComponent;
  let fixture: ComponentFixture<ToastuiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToastuiComponent]
    });
    fixture = TestBed.createComponent(ToastuiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
