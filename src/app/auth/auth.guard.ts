import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from "rxjs";
import { Authservice } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private authService:Authservice, private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
const isAuth = this.authService.getIsAuth();
if (!isAuth) {
  this.router.navigate(['/login']);
}
    return isAuth;
  }

}