import { QuizService } from './../../../services/quiz.service';
import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { error } from 'console';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-view-quizzes',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    NgFor,
    MatIconModule,
    MatDividerModule,
    MatLineModule,
    MatButtonModule,
    RouterLink,
  ],
  templateUrl: './view-quizzes.component.html',
  styleUrl: './view-quizzes.component.css',
})
export class ViewQuizzesComponent {
  quizzes = [
    {
      qid: '',
      title: '',
      description: '',
      maxMarks: '',
      numberOfQuestions: '',
      active: '',

      category: {
        title: '',
      },
    },
  ];

  constructor(private _quiz: QuizService, private _snack: MatSnackBar) {}

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

    this._quiz.quizzes(requestOptions).subscribe(
      (data: any) => {
        this.quizzes = data;
      },
      (error) => {
        // console.log('Internal Server Error');
        this._snack.open('Internal Server Error', '', {
          duration: 3000,
        });
      }
    );
  }

  // deleting the quiz using quiz id

  deleteQuiz(qId: any) {
    // console.log(qId)
    // Header options
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

    Swal.fire({
      icon: 'info',
      title: 'Are you sure?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this._quiz.deleteQuiz(requestOptions, qId).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((quiz) => quiz.qid != qId);
            this._snack.open('Quiz deleted successfully!!', '', {
              duration: 3000,
            });
          },
          (error) => {
            this._snack.open('Internal Server Error!!', '', {
              duration: 3000,
            });
          }
        );
      }
    });
  }
}
