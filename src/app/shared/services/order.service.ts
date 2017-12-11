import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';
import { Observable } from 'rxjs/Observable';
import { Order } from '../models/order';

@Injectable()
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private cartService: ShoppingCartService,
  ) { }

  async placeOrder(order) {
    // here we have two operations that are highly inter-connected
    // and both must succeed/fail together
    // we have to use a transaction to ensure that
    // we can first check the push, if it fails, we return
    // and if cart clearing fails, we remove the pushed order and return
    const result = await this.db.list("/orders").push(order);
    this.cartService.clearCart();
    return result;
  }

  getAllOrders(): Observable<Order[]> {
    return this.db
      .list("/orders")
      .snapshotChanges()
      .map(orders => {
        return orders.map(o => ({ key: o.key, ...o.payload.val() }));
      });
  }

  getOrder(id: string) {
    return this.db.object("/orders/" + id).valueChanges();
  }

  getUserOrders(userId: string): Observable<Order[]>  {
    return this.db
      .list("/orders", ref => ref.orderByChild("userId").equalTo(userId))
      .snapshotChanges()
      .map(orders => {
        return orders.map(o => ({ key: o.key, ...o.payload.val() }));
      });
  }

}
