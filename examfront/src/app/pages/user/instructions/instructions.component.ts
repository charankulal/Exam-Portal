import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, LocationStrategy } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  qid: any;
  quiz: any;

  constructor(
    private _route: ActivatedRoute,
    private _quiz: QuizService,
    private _router: Router,
    private locationSt:LocationStrategy
  ) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    // Headers for get method
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

    this._quiz.getQuiz(requestOptions, this.qid).subscribe(
      (data: any) => {
        this.quiz = data;
      },
      (error) => {
        alert('Error in Loading the data');
      }
    );
  }

  startQuiz() {
    Swal.fire({
      title: 'Do you want to start the quiz?',

      showCancelButton: true,
      confirmButtonText: 'Start',

      icon: 'info',
    }).then((result) => {
      if (result.isConfirmed) {
        this._router.navigate(['/start/'+this.qid])
        history.pushState(null, '', location.href);
    this.locationSt.onPopState(() => {
      history.pushState(null, '', location.href);
      })} else if (result.isDismissed) {
        Swal.fire('Cancel', '', 'info');
      }
    });
  }
}
