import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { AsyncPipe, NgIf } from '@angular/common';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    RouterLink,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {


  constructor(public login:LoginService,private router:Router)  {  }

ngOnInit(): void {
}

public logout()
{
  this.login.logout()
  window.location.reload()
}

}
