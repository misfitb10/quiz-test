import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {Routing} from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NameComponent } from './name/name.component';
import { QuizTitleComponent } from './quiz/quiz-title/quiz-title.component';
import { QuizIntroComponent } from './quiz/quiz-intro/quiz-intro.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuestionComponent } from './question/question.component';
import { QuestionLabelComponent } from './question/question-label/question-label.component';
import { QuestionNumberComponent } from './question/question-number/question-number.component';
import { QuestionAmountComponent } from './question/question-amount/question-amount.component';
import { QuestionAskedComponent } from './question/question-asked/question-asked.component';
import { AnswersComponent } from './question/answers/answers.component';
import { CountdownComponent } from './countdown/countdown.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResultsComponent } from './results/results.component';

@NgModule({
  declarations: [
    AppComponent,
    NameComponent,
    QuizTitleComponent,
    QuizIntroComponent,
    QuizComponent,
    QuestionComponent,
    QuestionLabelComponent,
    QuestionNumberComponent,
    QuestionAmountComponent,
    QuestionAskedComponent,
    AnswersComponent,
    CountdownComponent,
    PageNotFoundComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule, Routing, HttpClientModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
