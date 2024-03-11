import { NgFor, JsonPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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
import { ActivatedRoute, RouterLink } from '@angular/router';
import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { error } from 'console';

@Component({
  selector: 'app-add-question',
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
    NgIf,
  ],
  templateUrl: './add-question.component.html',
  styleUrl: './add-question.component.css',
})
export class AddQuestionComponent {
  question = {
    quesId: '',
    content: '',
    answer: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    image: '',
    quiz: {
      qid: '',
    },
  };

  qId: any;
  qTitle: any;
  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // alert(this.qId);
    this.question.quiz.qid = this.qId;
    // this.question.quiz.qid = this.qId;
  }

  formSubmit() {
    // adding the quiz

    // authorization headers
    let token = localStorage.getItem('token');
    const headerDict = {
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new Headers(headerDict),
    };

    this._question.addQuestion(this.question, requestOptions).subscribe(
      (data: any) => {
        Swal.fire('Success', 'Question is added successfully', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Internal Server Error', 'error');
      }
    );
  }
}
