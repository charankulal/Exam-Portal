import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css',
})
export class AddCategoryComponent {
  category={
    title:'',
    description:'',
  }
  constructor(private _category:CategoryService, private _snack:MatSnackBar){}

  formSubmit()
  {
    let token= localStorage.getItem('token')
    const headerDict = {


      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization':`Bearer ${token}`,
    }
    const requestOptions = {
      headers: new Headers(headerDict),
    };
    // Checking if title is not null
    if (this.category.title.trim()==''|| this.category.title==null)
    {
      this._snack.open('Title Required!!','',{
        duration:2000
      })
      return;
    }

    // Adding the category
    this._category.addCategory(this.category,requestOptions).subscribe(
      (data:any)=>{
        this._snack.open('Category added successfully','',{
          duration:2000
        })
      },
      (error)=>{
        this._snack.open('Internal server error','',{
          duration:2000
        })
      }
    )
  }
}
