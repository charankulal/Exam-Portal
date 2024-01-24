import { Component } from '@angular/core';
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
export class NavbarComponent {
  constructor(public login:LoginService,private router:Router)
  {

  }
  public logOut()
  {
    this.login.logout()
    // window.location.reload()
    this.router.navigate(['/login'])
  }

}
