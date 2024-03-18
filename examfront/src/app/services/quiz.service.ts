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

  public deleteQuiz(requestHeader: any, qid: any) {
    return this._http.delete(`${baseUrl}/quiz/${qid}`, requestHeader);
  }

  // get a single quiz using id
  public getQuiz(requestHeader: any, qid: any) {
    return this._http.get(`${baseUrl}/quiz/${qid}`, requestHeader);
  }

  // update the quiz by id

  public updateQuiz(quiz: any, requestHeader: any) {
    return this._http.put(`${baseUrl}/quiz/`, quiz, requestHeader);
  }

  // to get quizzes by category

  public getQuizzesOfCategory(cid: any, requestHeader: any) {
    return this._http.get(`${baseUrl}/quiz/category/${cid}`, requestHeader)
  }

  // get active quizzes
  public getActiveQuizzes(requestHeader: any)
  {
    return this._http.get(`${baseUrl}/quiz/active`, requestHeader)
  }

  // get active quizzees by categories

  public getActiveQuizzesOfCategory(cid:any, requestHeader:any)
  {
    return this._http.get(`${baseUrl}/quiz/category/active/${cid}`, requestHeader)
  }
}
