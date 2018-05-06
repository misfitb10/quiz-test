import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  userData = localStorage.getItem('userData');
  parsedData = JSON.parse(this.userData);
  questionAnsweredAmount = this.parsedData.answered;
  correctAnswers = this.parsedData.answers_correct;
  incorrectAnswers = this.parsedData.answers_incorrect;
  invalidAnswers = this.parsedData.answers_invalid;
  perfectScore: boolean;
  badScore: boolean;

  constructor() { }

  ngOnInit() {
    this.calculateScore();
  }

  calculateScore() {
    if (this.correctAnswers === 3) {
      this.perfectScore = true;
    } else if (this.correctAnswers < 2) {
      this.badScore = true;
    }
  }

  resetData() {
    localStorage.removeItem('userData');
  }

  newQuiz(event) {
    event.preventDefault();
    this.resetData();
  }
}
