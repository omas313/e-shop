import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class UsersService {

  constructor(private db: AngularFireDatabase) { }

  get(uid): Observable<AppUser> {
    return this.db.object("/users/" + uid).valueChanges()
      .map(u => u as AppUser);
  }

  save(user: firebase.User) {
    return this.db.object("/users/" + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }

  addOrderId(userId: string, orderId: string) {
    return this.db.list(`/users/${userId}/orders`).push(orderId);
  }

}
