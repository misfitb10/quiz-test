import { Component, OnInit } from '@angular/core';
import {QuizService} from './../services/quiz.service';
import {Observable} from 'rxjs/Observable';
import { timer } from 'rxjs/observable/timer';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  providers: [QuizService]
})

export class QuizComponent implements OnInit {
  questions: any;
  questionsAmount = this.questionsLength();
  nameQuizzer: string = sessionStorage.getItem('name') || null;
  answers: string[];
  answered: {};
  answerNumber = 1;
  questionsLeft = this.questionsAmount;

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

  nextQuestion(event, answer) {
    event.preventDefault();
    console.log('>>> volgende vraag >>>');
    console.log('answer: ', answer);
    this.checkAnswer(answer);

    const parentEl = event.target.parentElement;
    const nextSibling = parentEl.nextSibling;

    parentEl.classList.add('hidden');

    if (nextSibling  !== 'undefined') {
      nextSibling.classList.remove('hidden');
    }

    this.countDownTimer(true);
  }

  changedCheckbox(event) {
    const eventTarget = event.target;

    if (eventTarget.checked) {
      console.log('is checked?: ', eventTarget.checked);
      this.answered = {
        answered: this.answerNumber++,
        correct: '',
        incorrect: ''
      };

      this.questionsLeft--;

      console.log('this.answered: ', this.answered);

    } else {
      this.answered = {
        answered: this.answerNumber--,
        correct: '',
        incorrect: ''
      };

      this.questionsLeft++;

      console.log('is checked?: ', eventTarget.checked);
    }
  }

  checkAnswer(answer) {
    // if answer is correct, then edit the object with answers_correct: +1
    // else anwers_incorrect: +1
    // checking the answer should be done with comparing it to the original JSON (api)
    console.log('>>> check of antwoord correct is: ', answer);
  }

  questionsLength() {
    return this.quizService.getMockData().results.length;
  }

  getQuestions() {
      this.quizService.getQuestionsAPI().subscribe(questions => this.questions = questions.results);
  }



  // TODO's
  showResults() {
    console.log('show results');
  }

  showEaster(event) {
    event.preventDefault();
    const easterContent = document.querySelector('.noShow');
    easterContent.classList.remove('noShow');
  }

  resetShit() {
    console.log('alles moet hiermee gereset worden');
  }

  // getAllAnswers() {
  //   this.quizService.getMockData().results.map(i => {
  //     // console.log('i', i);
  //
  //     let allAnswers: any[];
  //
  //     // console.log('i ', i.incorrect_answers);
  //
  //     const correctAnswer = [i.correct_answer];
  //     const incorrectAnswers = i.incorrect_answers;
  //
  //     allAnswers = [...correctAnswer, ...incorrectAnswers];
  //     this.answers = allAnswers;
  //   });
  // }



  ngOnInit() {
    this.countDownTimer(false);
    this.getQuestions();

    // this.getAllAnswers();
  }
}
