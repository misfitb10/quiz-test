import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() public questions;
  @Input() public questionsAmount;
  @Input() public answerChecked;
  @Input() public answers;
  @Input() public questionsLeft;
  @Input() public currentQuestionNumber;

  @Input() public countDown;
  @Input() public initialCount;
  @Input() public count;

  constructor() { }

  ngOnInit() {
  }

}
