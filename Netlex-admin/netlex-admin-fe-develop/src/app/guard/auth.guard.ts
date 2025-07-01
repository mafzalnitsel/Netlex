import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    if (!this.authService.isUserLoggedIn()){
      this.router.navigate(['/login']);
      return false;
    }
    if (next.data.roles && next.data.roles.indexOf(this.authService.getRole()) === -1){
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }

}
