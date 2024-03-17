import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgFor, NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-load-quiz',
  standalone: true,
  imports: [NgFor, MatCardModule, MatButtonModule, NgIf],
  templateUrl: './load-quiz.component.html',
  styleUrl: './load-quiz.component.css',
})
export class LoadQuizComponent {
  catId: any;
  quizzes: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _mat: MatSnackBar
  ) {}
  ngOnInit(): void {
    let token = localStorage.getItem('token');
    console.log(token);
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    this.catId = this._route.snapshot.params['catId'];

    this._route.params.subscribe((params) => {
      this.catId = params['catId'];
      if (this.catId == 0) {
        this._quiz.quizzes(requestOptions).subscribe(
          (data: any) => {
            // console.log(data)
            this.quizzes = data;
            this._mat.open('Loaded all quizzes successfully!!', '', {
              duration: 3000,
            });
          },
          (error) => {
            this._mat.open('Internal Server Error!!', '', {
              duration: 3000,
            });
          }
        );
      } else {
        this._quiz.getQuizzesOfCategory(this.catId, requestOptions).subscribe(
          (data: any) => {
            this.quizzes = data;
            console.log(this.quizzes.length)
            this._mat.open('Loaded all quizzes successfully!!', '', {
              duration: 3000,
            });
          },
          (error) => {
            this._mat.open('Internal Server Error!!', '', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
