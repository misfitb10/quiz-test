import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAmountComponent } from './question-amount.component';

describe('QuestionAmountComponent', () => {
  let component: QuestionAmountComponent;
  let fixture: ComponentFixture<QuestionAmountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAmountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
