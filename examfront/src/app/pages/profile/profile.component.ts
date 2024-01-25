import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatTable, MatTableModule} from '@angular/material/table';
import { LoginService } from '../../services/login.service';
import { JsonPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    JsonPipe,
    NgIf,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

   loginService=inject(LoginService)
   user=this.loginService.getUser()
}
