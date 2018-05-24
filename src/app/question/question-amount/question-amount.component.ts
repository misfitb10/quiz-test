import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question-amount',
  templateUrl: './question-amount.component.html',
  styleUrls: ['./question-amount.component.css']
})
export class QuestionAmountComponent implements OnInit {
  @Input() questionsAmount;
  @Input() currentQuestionNumber;

  constructor() { }

  ngOnInit() {
  }

}
