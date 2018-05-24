import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAskedComponent } from './question-asked.component';

describe('QuestionAskedComponent', () => {
  let component: QuestionAskedComponent;
  let fixture: ComponentFixture<QuestionAskedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAskedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAskedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
