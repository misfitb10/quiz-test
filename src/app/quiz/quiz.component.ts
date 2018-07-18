import { Component, OnInit } from '@angular/core';
import {QuizService} from './../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})

export class QuizComponent implements OnInit {
  public title = 'Sports quiz!';
  public nameQuizzer: string = sessionStorage.getItem('name') || null;
  public questions: any[];
  public questionsAmount: number;
  public answers: {};
  public correctAnswers = [];
  public currentQuestionNumber = 0;

  // Error
  public error = null;

  // TODO: Make a helper function/polyfill for this
  static shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
      // Pick a random index
      const index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      const temp = array[counter];
      array[counter] = array[index];
      array[index] = temp;
    }

    return array;
  }


  constructor(private _quizService: QuizService) {}

  ngOnInit() {
    this.getQuestions();
  }

  public getQuestions(): void {
    this._quizService.getQuestionsAPI().subscribe(
      questions => {
        this.questions = questions.results;
        this.questionsAmount = this.questions.length;

        let allAnswers: string[];
        const allQuestions = this.questions;
        for (const question of allQuestions) {
          this.correctAnswers = [question.correct_answer];
          const incorrectAnswers = question.incorrect_answers;
          allAnswers = QuizComponent.shuffle([...this.correctAnswers, ...incorrectAnswers]);
          this.answers = {'allAnswers': allAnswers};
          question.allAnswers = allAnswers;
        }
      },
      error => this.error = error,
      () => {
        // this.countDownTimer(true);
      }
    );
  }
}
