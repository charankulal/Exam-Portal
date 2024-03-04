import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatLineModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CategoryService } from '../../../services/category.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-view-categories',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    NgFor,
    MatIconModule,
    MatDividerModule,
    MatLineModule,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './view-categories.component.html',
  styleUrl: './view-categories.component.css',
})
export class ViewCategoriesComponent {
  categories = [
    {
      cid: 23,
      title: 'Programming',
      description: 'This is testing categories',
    },

  ];
  constructor(private _category: CategoryService) {}
  ngOnInit(): void {
    let token= localStorage.getItem('token')
    console.log(token)
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization':`Bearer ${token}`,
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    this._category.categories(requestOptions).subscribe((data:any)=>{
      this.categories=data;
      console.log(this.categories);
    },(error)=>{

      console.log(error)
      Swal.fire("Error!!","Server Error in loading data",'error')
    })
  }
}
