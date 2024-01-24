import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const loginguardGuard: CanActivateFn = (route, state) => {
  const login=inject(LoginService)
  const router=inject(Router)
  if(!login.isLoggedIn())
  {
    return true
  }
  else{
    if(login.getUserRole()=="NORMAL")
    {
      router.navigate(['/user-dashboard'])
      return false;
    }
    else{
      router.navigate(['/admin'])
      return false;
    }
  }



};
