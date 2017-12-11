import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.user$
      .map(user => {
        // if we have a user then route is accessible
        if (user) return true;

        // if we don't have a user, save this url as redirect url
        // and take them to login page
        const options = {
          queryParams: {
            returnUrl: state.url
          }
        };
        // navigate to log in page with queryParams
        this.router.navigate(["/login"], options);
        return false;
      });
  }
}
