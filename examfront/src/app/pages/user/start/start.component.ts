import { LocationStrategy, NgIf, JsonPipe, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { QuestionService } from '../../../services/question.service';
import Swal from 'sweetalert2';
import { MatCardActions, MatCardModule } from '@angular/material/card';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatButtonModule,
    MatInputModule,
    RouterModule,
    FormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.css',
})
export class StartComponent {
  qid: any;
  questions: any;
  marksGot = 0;
  correctAnswers = 0;
  attempted = 0;
  isSubmit = false;
  timer: any;
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
          this.questions = data;
          this.timer = this.questions.length * 2 * 60;
          this.questions.forEach((q: any) => {
            q['givenAnswer'] = '';
          });
          console.log(this.questions);
          this.startTimer()
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
  submitQuiz() {
    this.marksGot = 0;
    this.attempted = 0;
    this.correctAnswers = 0;
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: 'Submit',
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.isSubmit = true;
        let marksSingle =
          this.questions[0].quiz.maxMarks / this.questions.length;
        // Calculation
        // console.log(this.questions)
        this.questions.forEach((q: any) => {
          if (q.givenAnswer.trim() == q.answer) {
            this.correctAnswers++;

            this.marksGot += marksSingle;
          }

          if (q.givenAnswer.trim() != '') {
            this.attempted++;
          }
        });
      }
      console.log('Correct' + this.correctAnswers);
      console.log('Marks' + this.marksGot);
      console.log('Attempted' + this.attempted);
    });
  }

  

  startTimer() {
    let t = window.setInterval(() => {
      if (this.timer <= 0) {
        this.submitQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime()
  {
    let mm=Math.floor(this.timer/60)
    let ss=this.timer-mm*60
    return `${mm} Min : ${ss} Sec`
  }
}
