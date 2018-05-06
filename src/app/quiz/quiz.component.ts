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
  questions: any[];
  questionsAmount = this.quizService.getMockData().results.length;
  nameQuizzer: string = sessionStorage.getItem('name') || null;
  answerChecked: boolean;
  userAnswerValue: string;
  answers: {};
  questionsLeft = this.questionsAmount;

  // User data stuff
  userData = {};
  answeredAmount = 0;
  userAnswers = [];
  correctAnswers = [];
  correctAnswer = '';
  correctAnswersAmount = 0;
  incorrectAnswersAmount = 0;
  invalidAnswersAmount = 0;

  // Time stuff
  countDown;
  count = 5;

  constructor(private quizService: QuizService) {}

  countDownTimer(reset) {
    if (reset) { this.count = 5; }

    this.countDown = timer(0, 1000).pipe(
      take(this.count),
      map(() => --this.count)
    );
  }

  nextQuestion(event, answer, correctAnswer) {
    event.preventDefault();

    // Reset time
    this.countDownTimer(true);

    // Check if answer is (in)correct
    this.checkAnswer(answer, correctAnswer);

    // Put the answer checkbox (checked) back to false
    this.answerChecked = false;

    // Go to the next question
    const parentEl = event.target.parentElement;
    const nextSibling = parentEl.nextSibling;

    parentEl.classList.add('hidden');

    if (nextSibling !== 'undefined') {
      nextSibling.classList.remove('hidden');
    }

    console.log('this.userData', this.userData);
  }

  changedCheckbox(event, answer, answerChecked, correctAnswer) {
    this.userAnswerValue = answer;
    this.answerChecked = answerChecked;
    this.correctAnswer = correctAnswer;
  }

  checkAnswer(answer, correctAnswer) {
    // If checkbox is checked
    if (this.answerChecked) {
      answer === correctAnswer ? ++this.correctAnswersAmount : ++this.incorrectAnswersAmount;

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

  saveAnswer() {
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  getQuestions() {
    this.quizService.getQuestionsAPI().subscribe(questions => {
      this.questions = questions.results;

      let allAnswers: string[];
      const allQuestions = this.questions;
      for (const i of allQuestions) {
        this.correctAnswers = [i.correct_answer];
        const incorrectAnswers = i.incorrect_answers;
        allAnswers = this.shuffle([...this.correctAnswers, ...incorrectAnswers]);
        this.answers = {'allAnswers': allAnswers};
        i.allAnswers = allAnswers;
      }
    });
  }

  showResults(event, answer, correctAnswer) {
    event.preventDefault();

    this.checkAnswer(answer, correctAnswer);
    console.log('this.userData', this.userData);
  }

  // TODO: Make a helper function/polyfill for this
  shuffle(array) {
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

  ngOnInit() {
    this.countDownTimer(false);
    this.getQuestions();
  }
}
