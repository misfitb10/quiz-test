import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError} from 'rxjs/operators';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {ApiConfig} from '../models/apiConfig';

@Injectable()
export class QuizService {
  apiUrl = 'https://opentdb.com/api.php?amount=3&category=21&type=multiple';

  // TODO: Make local/prod environment settings
  // apiUrl = 'assets/api.json';

  constructor(private http: HttpClient) { }

  getQuestionsAPI(): Observable<any> {
    return this.http.get<ApiConfig>(this.apiUrl).pipe(catchError(this._errorHandler));
  }

  private _errorHandler(error: HttpErrorResponse) {
    return new ErrorObservable(
      `The following went wrong: ${error.message}`
    );
  }

  // Mock data (temp)
  // Maybe we can use this for dev and the apiUrl for prod?
  getMockData() {
    return {
      'response_code': 0,
      'results': [
        {
          'category': 'Entertainment: Music',
          'type': 'multiple',
          'difficulty': 'medium',
          'question': 'Which Elton John hit starts with the line &quot;When are you gonna come down&quot;?',
          'correct_answer': 'Goodbye Yellow Brick Road',
          'incorrect_answers': [
            'Rocket Man',
            'Bennie and the Jets',
            'Crocodile Rock'
          ]
        },
        {
          'category': 'Entertainment: Film',
          'type': 'multiple',
          'difficulty': 'medium',
          'question': 'What is the name of the dog that played Toto in the 1939 film &quot;The Wizard of Oz&quot;?',
          'correct_answer': 'Terry',
          'incorrect_answers': [
            'Tommy',
            'Teddy',
            'Toto'
          ]
        },
        {
          'category': 'Science & Nature',
          'type': 'multiple',
          'difficulty': 'hard',
          'question': 'If you planted the seeds of Quercus robur what would grow?',
          'correct_answer': 'Trees',
          'incorrect_answers': [
            'Flowers',
            'Vegtables',
            'Grains'
          ]
        }
      ]
    };
  }
}
