import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Product } from '../models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }


  // API
  
  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object("/shopping-carts/" + cartId).valueChanges()
      .map((dbCart: any) => new ShoppingCart(dbCart.items));
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }
  
  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = await this.getOrCreateCartId();
    this.db.object(`/shopping-carts/${cartId}/items`).remove();    
  }


  // Private methods

  private getItem(cartId, productId) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId() {
    const cartId = localStorage.getItem("cartId");

    // if a cartId exists in storage return it
    if (cartId) return cartId;

    // no cart id in local storage
    // so we create a new one and get returned id
    // save its key in storage, and return it
    const result = await this.createNewCart();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  private createNewCart() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    
    const itemDbObject = this.getItem(cartId, product.key);
    itemDbObject.valueChanges()
      .take(1)
      .subscribe((i: any) => {
        const newQuantity = i ? (i.quantity || 0) + change : 1;
        if (newQuantity === 0) {
          itemDbObject.remove();
          return;
        }
        itemDbObject.update({ 
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: newQuantity
        });
      });
  }
  
}
