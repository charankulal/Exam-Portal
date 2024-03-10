import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private _http: HttpClient) {}

  public quizzes(requestHeader: any) {
    return this._http.get(`${baseUrl}/quiz/`, requestHeader);
  }

  // add quiz function

  public addQuizzes(requestHeader: any, quizData: any) {
    return this._http.post(`${baseUrl}/quiz/`, quizData, requestHeader);
  }

  // delete quiz function

  public deleteQuiz(requestHeader: any, qid: any)
  {
    return this._http.delete(`${baseUrl}/quiz/${qid}`,requestHeader)
  }
}
