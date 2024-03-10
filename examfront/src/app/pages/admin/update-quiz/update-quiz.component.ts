import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import Swal from 'sweetalert2';
import { NgFor, JsonPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule, MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CategoryService } from '../../../services/category.service';
// import { Router } from 'express';

@Component({
  selector: 'app-update-quiz',
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
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FormsModule,
    MatOptionModule,
    ReactiveFormsModule,
    JsonPipe,
    RouterModule
  ],
  templateUrl: './update-quiz.component.html',
  styleUrl: './update-quiz.component.css',
})
export class UpdateQuizComponent {


  constructor(
    private _route: ActivatedRoute,
    private router:Router,
    private _quiz: QuizService,
    private _cat: CategoryService,

  ) {}

  qid = undefined;
  quiz = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: {
      cid: '',
      title: '',
    },
  };

  categories = [
    {
      cid: '',
      title: '',
    },
  ];

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

    this._cat.categories(requestOptions).subscribe(
      (data: any) => {
        // categories load

        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
        alert('Error in fetching the data ');
      }
    );

    this.qid = this._route.snapshot.params['qid'];
    // console.log(this.qid)
    this._quiz.getQuiz(requestOptions, this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
        console.log(this.quiz);
      },
      (error) => {
        console.log(error);
      }
    );
    console.log(this.quiz);
  }
  // update form submit

  public updateQuiz() {
    // const router=inject(Router)
    // alert("Test")
    // headers for the authentication
    let token = localStorage.getItem('token');
    console.log(token);
    const headerDict = {
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    // validation

      this._quiz.updateQuiz(this.quiz, requestOptions).subscribe(
        (data: any) => {
          Swal.fire('Successs', 'Quiz Updated', 'success').then((e)=>{

            (<any>this.router).navigate(['/admin/quizzes']);
          });
          // console.log("Hii")
        },
        (error) => {
          Swal.fire('Internal Server Error', 'Failed', 'error');
          console.log(error);
        }
      );

  }
}
