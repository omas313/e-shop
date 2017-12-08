import { Category } from './../models/category';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list("/categories", ref => ref.orderByChild("displayName"))
      .snapshotChanges()
      .map(categories => {
        return categories.map(c => ({ key: c.key, ...c.payload.val() }));
      });
  }

}
