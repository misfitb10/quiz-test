import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-quiz-intro',
  templateUrl: './quiz-intro.component.html',
  styleUrls: ['./quiz-intro.component.css']
})
export class QuizIntroComponent implements OnInit {
  @Input() nameQuizzer;
  @Input() questionsAmount;

  constructor() { }

  ngOnInit() {
  }
}
