import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsersService } from '../services/users.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private usersService: UsersService,
    private router: Router
  ) {}

  canActivate(next, state): Observable<boolean> {
    return this.auth.appUser$.map(appUser => appUser.isAdmin);
  }
}
