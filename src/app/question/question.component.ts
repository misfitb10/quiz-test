import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() questions;
  @Input() questionsAmount;
  @Input() answerChecked;
  @Input() answers;
  @Input() questionsLeft;
  @Input() currentQuestionNumber;

  @Input() countDown;
  @Input() initialCount;
  @Input() count;

  constructor() { }

  ngOnInit() {
  }

}