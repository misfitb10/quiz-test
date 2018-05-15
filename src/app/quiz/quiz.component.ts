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
  private nameQuizzer: string = sessionStorage.getItem('name') || null;
  private questions: any[];
  private questionsAmount: number;
  private answerChecked: boolean;
  private answers: {};
  private questionsLeft = this.questionsAmount;

  // User data stuff
  private userData = {};
  private answeredAmount = 0;
  private userAnswers = [];
  private userAnswerValue: string;
  private correctAnswers = [];
  private correctAnswer: string;
  private correctAnswersAmount = 0;
  private incorrectAnswersAmount = 0;
  private invalidAnswersAmount = 0;

  // Error
  private error = null;

  // Time stuff
  private countDown;
  private initialCount = 30;
  private count = this.initialCount;

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

  countDownTimer(reset) {
    if (reset) { this.count = this.initialCount; }

    this.countDown = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }

  nextQuestion(event, answer) {
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

  changedCheckbox(event, correctAnswer) {
    this.userAnswerValue = event.target.value;
    this.answerChecked = event.target.checked;
    this.correctAnswer = correctAnswer;
  }

  checkAnswer(answer) {
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

    // Save answer data
    this.saveAnswer();
  }

  private saveAnswer(): void {
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  private getQuestions() {
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

  private showResults(event, answer) {
    event.preventDefault();

    this.checkAnswer(answer);
    console.log('this.userData', this.userData);
  }
}
