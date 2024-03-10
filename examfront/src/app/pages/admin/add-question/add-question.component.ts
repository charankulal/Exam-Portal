import { NgFor, JsonPipe } from '@angular/common';
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
  qTitle:any;
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this.qId = this._route.snapshot.params['qid'];
    this.qTitle = this._route.snapshot.params['title'];
    // alert(this.qId);
    this.question.quiz.qid = this.qId;
    // this.question.quiz.qid = this.qId;
  }
}
