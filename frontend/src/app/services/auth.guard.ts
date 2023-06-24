import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AuthService} from './auth.service'
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot)
:Observable<boolean | UrlTree>|Promise<boolean |UrlTree> | boolean | UrlTree => {
  const authService = new AuthService()
  const router = new Router()
  return authService.getAuthorizeStatus().then((status:boolean) => {
    if(status)
      return true
    else
      router.navigate(['signin'])
      return false
  })
};
