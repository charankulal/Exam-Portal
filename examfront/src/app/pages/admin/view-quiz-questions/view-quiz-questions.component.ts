import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-view-quiz-questions',
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
    NgIf,
    NgClass,
  ],
  templateUrl: './view-quiz-questions.component.html',
  styleUrl: './view-quiz-questions.component.css',
})
export class ViewQuizQuestionsComponent {
  qId: any;
  qTitle: any;
  questions = [
    {
      quesId: '',
      content: '',
      answer: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      image: '',
      Quiz: {
        qid: '',
      },
    },
  ];

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];

    // alert(this.qId+this.qTitle)
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

    // Retriving the questions for a particular quiz

    this._question.getQuestionsOfQuiz(this.qId, requestOptions).subscribe(
      (data: any) => {
        console.log(data);
        this.questions = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  deleteQuestion(questionId: any) {
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
    // alert(questionId);
    Swal.fire({
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      title: 'Are you sure to delete this question?',
    }).then((result) => {
      if (result.isConfirmed) {
        //confirm
        this._question.deleteQuestion(questionId, requestOptions).subscribe(
          (data) => {
            this.questions = this.questions.filter((q) => q.quesId != questionId);
            Swal.fire(
              'Success',
              'The question deleted successfully!',
              'success'
            )

          },
          (error) => {
            Swal.fire('Error', 'Internal Server Error!', 'error');
          }
        );
      }
    });
  }
}
