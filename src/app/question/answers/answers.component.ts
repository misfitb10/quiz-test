import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-answers',
  templateUrl: './answers.component.html',
  styleUrls: ['./answers.component.css']
})
export class AnswersComponent implements OnInit {
  @Input() answerChecked;
  @Input() question;
  @Input() questionsAmount;

  public userData = {};
  public correctAnswer: string;
  public correctAnswersAmount = 0;
  public incorrectAnswersAmount = 0;
  public invalidAnswersAmount = 0;
  public answeredAmount = 0;
  public userAnswers = [];
  public userAnswerValue: string;
  public questionsLeft = this.questionsAmount;
  public currentQuestionNumber = 1;

  constructor() { }

  ngOnInit() { }

  public changedOnCheckbox(event, correctAnswer): void {
    this.userAnswerValue = event.target.value;
    this.answerChecked = event.target.checked;
    this.correctAnswer = correctAnswer;
  }

  nextQuestion(event, answer): void {
    event.preventDefault();

    // Reset time
    // TODO: Fix countDownTimer
    // this.countDownTimer(true);

    // Check if answer is (in)correct
    this.checkAnswer(answer);

    // Put the answer checkbox (checked) back to false
    this.answerChecked = false;

    // Go to the next question
    // TODO: Make this more `dynamic`
    // const parentEl = event.target.parentElement;
    // const nextSibling = parentEl.nextSibling;
    // const hiddenClass = 'hidden';
    //
    // parentEl.classList.add(hiddenClass);
    //
    // if (nextSibling !== 'undefined') {
    //   nextSibling.classList.remove(hiddenClass);
    // }

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

  public showResults(event, answer): void {
    event.preventDefault();

    this.checkAnswer(answer);
    console.log('this.userData', this.userData);
  }
}
