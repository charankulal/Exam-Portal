import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    FormsModule,
    HttpClientModule,
  ],
  
  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService) {
    
  }
  ngOnInit(): void {
    
  } 
  
  
  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  };

  formSubmit() {
    
    if (this.user.username == '' || this.user.username == null) {
      alert('Username is required');
      return;
    }
    console.log(this.user);
    //addUser function from UserService
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //succcess
        console.log(data)
        alert("Success")
      },
      (error)=>{
        //error
        console.log(error)
        alert("Error")
      }
    )
  }
  
}
