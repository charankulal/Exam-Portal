import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { error } from 'console';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.css',
})
export class InstructionsComponent {
  qid: any;

  constructor(private _route: ActivatedRoute, private _quiz: QuizService) {}

  ngOnInit(): void {
    this.qid = this._route.snapshot.params['qid'];

    // Headers for get method
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

    this._quiz.getQuiz(requestOptions,this.qid).subscribe(
      (data:any)=>{
        console.log(data)
      },
      (error)=>{
        alert("Error in Loading the data")
      }
    )
  }
}
