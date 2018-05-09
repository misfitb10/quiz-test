import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

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
  percentageScore: number;
  totalQuestions = 3;

  constructor(private _router: Router) { }

  ngOnInit() {
    this.calculateScore();
  }

  calculateScore() {
    if (this.correctAnswers === 3) {
      this.perfectScore = true;
    } else if (this.correctAnswers < 2) {
      this.badScore = true;
    }

    this.percentageScore = this.correctAnswers / this.totalQuestions * 100;
  }

  resetData() {
    localStorage.removeItem('userData');
  }

  secretShit(inputValue) {
    if (inputValue === 'RESET ALL') {
      localStorage.removeItem('userData');
      sessionStorage.removeItem('name');
      this._router.navigate(['/']);
    }
  }

  newQuiz(event) {
    event.preventDefault();
    this.resetData();
  }
}
