import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatLineModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';


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
  ],
  templateUrl: './add-quiz.component.html',
  styleUrl: './add-quiz.component.css'
})
export class AddQuizComponent {
  categories=[
    {
      cid:23,
      title:'Programming',
    }
  ]

}
