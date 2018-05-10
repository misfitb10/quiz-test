import { RouterModule, Routes } from '@angular/router';
import {NameComponent} from './name/name.component';
import {QuizComponent} from './quiz/quiz.component';
import {ResultsComponent} from './results/results.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: NameComponent },
  { path: 'intro', component: NameComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'results', component: ResultsComponent },
  { path: '**', component: PageNotFoundComponent}
];

export const Routing = RouterModule.forRoot(routes);
