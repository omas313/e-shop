import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  selector: 'app-quantity-changer',
  templateUrl: './quantity-changer.component.html',
  styleUrls: ['./quantity-changer.component.css']
})
export class QuantityChangerComponent {

  @Input("description") description = false;
  @Input("shoppingCart") shoppingCart: ShoppingCart;

  // we are actually receving SHoppingCartItem here
  // but they are basically the same minus some irrelevant fields
  @Input("product") product: Product; 


  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }

}
