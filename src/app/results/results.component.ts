import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})

export class ResultsComponent implements OnInit {
  private userData = localStorage.getItem('userData');
  private parsedData = JSON.parse(this.userData);
  private correctAnswers = this.parsedData.answers_correct;
  private incorrectAnswers = this.parsedData.answers_incorrect;
  private invalidAnswers = this.parsedData.answers_invalid;
  private perfectScore: boolean;
  private badScore: boolean;
  private percentageScore: number;

  // This needs to be dynamic, amigo! We have to fix this, because 3 is really final static-like
  private totalQuestions = 3;

  // Removes the userData key in Local Storage, thus removing all userData
  static resetData(): void {
    localStorage.removeItem('userData');
  }

  constructor(private _router: Router) { }

  ngOnInit() {
    this.calculateScore();
  }

  // Calculates score based on correct answers
  private calculateScore() {
    if (this.correctAnswers === 3) {
      this.perfectScore = true;
    } else if (this.correctAnswers < 2) {
      this.badScore = true;
    }

    this.percentageScore = this.correctAnswers / this.totalQuestions * 100;
    return this.percentageScore;
  }

  // Can't tell you about this, sorry
  private secretShit(inputValue): void {
    if (inputValue === 'RESET ALL') {
      localStorage.removeItem('userData');
      sessionStorage.removeItem('name');
      this._router.navigate(['/']);
    }
  }

  // Start a new quiz by resetting the data
  private newQuiz(event): void {
    event.preventDefault();
    ResultsComponent.resetData();
    this._router.navigate(['/quiz']);
  }
}
