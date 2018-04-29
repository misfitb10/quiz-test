import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { QuizComponent } from './quiz/quiz.component';
import { NameComponent } from './name/name.component';
import { ResultsComponent } from './results/results.component';
import {Routing} from './app.routes';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NameComponent,
    QuizComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule, Routing, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
