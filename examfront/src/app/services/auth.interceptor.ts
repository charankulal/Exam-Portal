import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';




export function authInterceptor (





    req: HttpRequest<any>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<any>> {
    // add the jwt token localStorage request
    let authReq=req
    const token=localStorage.getItem('token')
    console.log("It is working in authinterceptor")
    if(token!='null')
    {
      authReq=req.clone({
        headers:req.headers.append(
            'Authorization','Bearer' +token,
        ),
    })
    }
    return next(authReq)
  }



