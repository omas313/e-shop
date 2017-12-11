import { UsersService } from './users.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import { of } from "rxjs/observable/of";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private route: ActivatedRoute,
    private usersService: UsersService
  ) { 
    // setting our user observable to authState which emits changes
    // we can sub to this in templates with async pipe
    this.user$ = this.afAuth.authState;
  }

  get appUser$(): Observable<AppUser> {
    // switch map, switches to the new observable type inside another obs
    // switchMap is great when we have observable inside an observable
    // so we shouldn't do .subscribe or .map inception

    // NOTE: we shouldn't use async pipe on switchMapped observables because
    // we will end up with an infinite loop of change detection everytime
    // a value is emitted from the nested observables
    // Solution: we sub to it and pass it to template in an object
    return this.user$
      .switchMap(user => {
        return user ? this.usersService.get(user.uid) : Observable.of(null);
      });
  }

  login() {
    // we come here either when we try to access Auth protected page,
    // or when we go to log in page directly

    // if we redirected user to log in, store redirectUrl 
    const returnUrl = this.route.snapshot.queryParamMap.get("returnUrl") || "";
    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth.auth
      .signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    // we should be able to .then after signing in and redirect user 
    // if there is a returnUrl, but this doesnt work for some reason...
    // therefore, we do this in the appComponent 
  }

  logout() {
    this.afAuth.auth.signOut()
      .then(() => this.router.navigate(["/"]));
  }

}
