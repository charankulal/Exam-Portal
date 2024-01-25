import { Component, OnInit, inject } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatSnackBarModule,
    MatCardModule,
  ],


  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent implements OnInit{
  constructor(private userService:UserService,private snack:MatSnackBar) {

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
      // alert('Username is required');
      this.snack.open("Username is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
      })
      return;
    }
    if (this.user.password==null||this.user.password=='') {
      // alert('Username is required');
      this.snack.open("Password is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
      })
      return;
    }
    if (this.user.firstName==null||this.user.firstName=='') {
      // alert('Username is required');
      this.snack.open("Firstname is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
      })
      return;
    }
    if (this.user.lastName==null||this.user.lastName=='') {
      // alert('Username is required');
      this.snack.open("Lastname is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
      })
      return;
    }
    if (this.user.email==null||this.user.email=='') {
      // alert('Username is required');
      this.snack.open("Email Id is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
      })
      return;
    }
    if (this.user.phone==null||this.user.phone=='') {
      // alert('Username is required');
      this.snack.open("Phone number is required!!",'OK',{
        duration:3000,
        verticalPosition:'bottom',
        horizontalPosition:'center',
      })
      return;
    }
    console.log(this.user);
    //addUser function from UserService
    this.userService.addUser(this.user).subscribe(
      (data)=>{
        //succcess
        console.log(data)
        this.snack.open('User is successfully registered','OK',{
          duration:3000,
        })

      },
      (error)=>{
        //error
        console.log(error)
        // alert("Error")
        this.snack.open('Username is aleady exist..Try with another!!','OK',{
          duration:3000,
        })
      }
    )
  }

}
