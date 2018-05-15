import { Injectable, isDevMode } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {ApiConfig} from '../models/apiConfig';

@Injectable()
export class QuizService {
  private _apiUrl = 'https://opentdb.com/api.php?amount=3&category=21&type=multiple';

  constructor(private _http: HttpClient) { }

  getQuestionsAPI(): Observable<any> {
    if (isDevMode()) {
      this._apiUrl = 'assets/api.json';
    }

    return this._http.get<ApiConfig>(this._apiUrl).pipe(catchError(this._errorHandler));
  }

  private _errorHandler(error: HttpErrorResponse) {
    return new ErrorObservable(
      `Oops. The following went wrong: ${error.message}`
    );
  }
}
