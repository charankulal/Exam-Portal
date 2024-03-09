import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, Injectable, NgModule } from '@angular/core';
import baseUrl from './helper';
import { SignupComponent } from '../pages/signup/signup.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // add user or user registration

  public addUser(user: any) {
    return this.http.post(`${baseUrl}/user/`, user);
  }
}
