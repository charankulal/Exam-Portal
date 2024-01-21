import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginData={
    username:'',
    password:'',
  };
  constructor(private snack:MatSnackBar,private login:LoginService) {}
  ngOnInit(): void {

  }

  formSubmit(){
    // alert("Clicked")
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
      this.snack.open("Username is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',})
        return;
    }
    if(this.loginData.password.trim()=='' || this.loginData.password==null)
    {
      this.snack.open("Password is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',})
        return;
    }
    // request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data)
      },(error)=>{
        alert("Error occurred")
      }
    )

  }

}
