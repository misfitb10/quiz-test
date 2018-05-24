import { Component, OnInit } from '@angular/core';
import {QuizService} from './../services/quiz.service';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';

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
  public answerChecked: boolean;
  public answers: {};
  public questionsLeft = this.questionsAmount;
  public currentQuestionNumber = 1;

  // User data stuff
  public userData = {};
  public answeredAmount = 0;
  public userAnswers = [];
  public userAnswerValue: string;
  public correctAnswers = [];
  public correctAnswer: string;
  public correctAnswersAmount = 0;
  public incorrectAnswersAmount = 0;
  public invalidAnswersAmount = 0;

  // Error
  public error = null;

  // Time stuff
  public countDown;
  public initialCount = 30;
  public count = this.initialCount;

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

  countDownTimer(reset): void {
    if (reset) { this.count = this.initialCount; }

    this.countDown = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }

  nextQuestion(event, answer): void {
    event.preventDefault();

    // Reset time
    this.countDownTimer(true);

    // Check if answer is (in)correct
    this.checkAnswer(answer);

    // Put the answer checkbox (checked) back to false
    this.answerChecked = false;

    // Go to the next question
    const parentEl = event.target.parentElement;
    const nextSibling = parentEl.nextSibling;
    const hiddenClass = 'hidden';

    parentEl.classList.add(hiddenClass);

    if (nextSibling !== 'undefined') {
      nextSibling.classList.remove(hiddenClass);
    }

    console.log('this.userData', this.userData);
  }

  public changedCheckbox(event, correctAnswer): void {
    this.userAnswerValue = event.target.value;
    this.answerChecked = event.target.checked;
    this.correctAnswer = correctAnswer;
  }

  public checkAnswer(answer): void {
    // If checkbox is checked
    if (this.answerChecked) {
      answer === this.correctAnswer ? ++this.correctAnswersAmount : ++this.incorrectAnswersAmount;

      this.userData = {
        answered: ++this.answeredAmount,
        answers: this.userAnswers,
        answers_correct: this.correctAnswersAmount,
        answers_incorrect: this.incorrectAnswersAmount,
        answers_invalid: this.invalidAnswersAmount
      };

      this.userAnswers.push(answer);
    }

    // If checkbox isn't checked, the answer is marked as invalid
    else {
      ++this.invalidAnswersAmount;

      this.userData = {
        answered: this.answeredAmount,
        answers: this.userAnswers,
        answers_correct: this.correctAnswersAmount,
        answers_incorrect: this.incorrectAnswersAmount,
        answers_invalid: this.invalidAnswersAmount
      };
    }

    // One more question lesser, because the question is now answered
    this.questionsLeft--;

    // One more question added to the current question
    this.currentQuestionNumber++;

    // Save answer data
    this.saveAnswer();
  }

  public saveAnswer(): void {
    localStorage.setItem('userData', JSON.stringify(this.userData));
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
      () => this.countDownTimer(true)
    );
  }

  public showResults(event, answer): void {
    event.preventDefault();

    this.checkAnswer(answer);
    console.log('this.userData', this.userData);
  }
}
