import { JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule, MatOptionModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { json } from 'stream/consumers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';

@Component({
  selector: 'app-add-quiz',
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
  ],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css',
})
export class AddQuizComponent {
  categories = [
    {
      cid: '',
      title: '',
    },
  ];

  QuizData = {
    title: '',
    description: '',
    maxMarks: '',
    numberOfQuestions: '',
    active: true,
    category: null,
  };

  constructor(
    private _cat: CategoryService,
    private _snack: MatSnackBar,
    private _quiz: QuizService
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
  }

  addQuiz() {
    if (this.QuizData.title.trim() == '' || this.QuizData.title == null) {
      this._snack.open('Title required!!', '', {
        duration: 3000,
      });
    }

    // call server
    // defining the header options for the post request
    let token = localStorage.getItem('token');
    const headerDict = {
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    this._quiz.addQuizzes(requestOptions,this.QuizData).subscribe(
      (data:any)=>{
        this._snack.open('Quiz Added', '', {
          duration: 3000,
        });
        this.QuizData = {
          title: '',
          description: '',
          maxMarks: '',
          numberOfQuestions: '',
          active: true,
          category: null,
        };
      },
      (error)=>{
        this._snack.open('Internal Server Error', '', {
          duration: 3000,
        });
      }
    )
  }
}
