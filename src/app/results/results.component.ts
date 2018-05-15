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
  private score: number;
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
    this.parsedData.answers_correct === 3 ? this.score = 100 : this.score = 50;
    this.percentageScore = this.parsedData.answers_correct / this.totalQuestions * 100;
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
