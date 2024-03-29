import { LocationStrategy, NgIf, JsonPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-start',
  standalone: true,
  imports: [
    NgIf,
    MatCardModule,
    MatCardActions,
    JsonPipe,
    NgFor,
    MatDividerModule,
    MatButtonModule
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  qid: any;
  questions:any;
  constructor(
    private locationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preventBackButton();
    this.qid = this._route.snapshot.params['qid'];
    let token = localStorage.getItem('token');
    // console.log(token);
    const headerDict = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      Authorization: `Bearer ${token}`,
    };
    const requestOptions = {
      headers: new Headers(headerDict),
    };

    this._question
      .getQuestionsOfQuizForTest(this.qid, requestOptions)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.questions=data
        },
        (error) => {
          console.log(error);
          Swal.fire('Error', 'Error in loading questions of the quiz', 'error');
        }
      );
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }
}
