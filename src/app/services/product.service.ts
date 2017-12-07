import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getProducts() {
    return this.db.list("/products").snapshotChanges()
      .map(products => {
        return products.map(p => ({ key: p.key, ...p.payload.val() }));
      });
  }

  getProduct(id: string) {
    return this.db.object("/products/" + id).snapshotChanges()
      .map(p => ({ key: p.key, ...p.payload.val() }));
  }

  create(product: Product) {
    return this.db.list("/products").push(product);
  }

  update(id: string, product: Product) {
    return this.db.object("/products/" + id).update(product);
  }

  delete(id: string) {
    // return this.db.object("/products/" + id).remove();
    console.log("deleting: " + id);
  }

}
