import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule, RouterLink } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    MatIconModule,
    RouterModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  categories: any;

  constructor(private _cat: CategoryService, private _mat: MatSnackBar) {}

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
        this.categories = data;
      },
      (error) => {
        this._mat.open('Internal Server Error!!', '', {
          duration: 3000,
        });
      }
    );
  }
}
