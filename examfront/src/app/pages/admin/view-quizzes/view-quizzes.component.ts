import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

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
      qId: 23,
      title: 'Basic Java Quiz',
      description: 'This is java quiz',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',

      category: {
        title: 'Programming',
      },
    },
    {
      qId: 24,
      title: 'Basic Python Quiz',
      description: 'This is Python quiz',
      maxMarks: '50',
      numberOfQuestions: '20',
      active: '',
      category: {
        title: 'Programming',
      },
    },
  ];
}
